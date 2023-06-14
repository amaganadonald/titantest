import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import moment from 'moment';
import { Cookies } from 'quasar';
export const useRepportStore = defineStore('rapport', {
  state: () => ({
    databases: [],
    chData: [],
    trData: [],
    rpData: [],
    dataTables: [],
    dataReport: [],
    dataInfo: [],
    delData: [],
    filterData: [],
    chargeDatabase: [],
    chargeDataTables: [],
    chargeDataReport: [],
    dataActivite: [],
    loading: false,
    horaireActivity: [],
    datedeb: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    datefin: moment().format('YYYY-MM-DD HH:mm:ss'),
    conso: [],
    consoVeh: [],
    dataDash: [],
    rapconso: [],
    consoJour: [],
    consMois: [],
    consoMoy: [],
    dataPlat: [],
    pannes: [],
    horaires: [],
    horairesQuart: [],
    immoData: [],
    immoDataQuart: [],
    dataKilo: [],
    dispoData: [],
    dispoFamille: [],
    efficience: [],
  }),
  getters: {
    updateDatabase: (state) => state.databases,
  },
  actions: {
    updateData(data: any) {
      this.databases = data;
    },
    changeData(data: any) {
      this.chData = data;
    },
    updateDatab(data: any) {
      //console.log(data)
      this.dataTables = data;
      console.log(this.dataTables);
    },
    changeTrData(data: never[]) {
      this.dataTables.push(...data);
    },
    changeRpData(data: any) {
      this.dataReport = data;
    },
    changeInfoData(data: any) {
      this.dataInfo = data;
    },
    deleteData(data: any) {
      this.delData = data;
    },
    eventFilter(data: any) {
      this.filterData = data;
    },
    chargeTrData(data: never[]) {
      this.chargeDataTables.push(...data);
    },
    chargeAct(data: any) {
      this.dataActivite = data;
    },
    async allActivites(datedeb: any, datefin: any) {
      this.datedeb = datedeb;
      this.datefin = datefin;
      this.loading = true;
      try {
        const req = await api.get(
          `/api/allDataTracking/${datedeb}/${datefin}`,
          {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          }
        );
        this.dataActivite = req.data.datatracking;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async allActivitesKm(datedeb: any, datefin: any) {
      this.loading = true;
      try {
        const req = await api.get(
          `/api/allDatatrackingKm/${datedeb}/${datefin}`,
          {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          }
        );
        this.dataActivite = req.data.datatracking;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async HoaireQuart(datedeb: any, datefin: any) {
      this.loading = true;
      try {
        const req = await api.get(`/api/horaireQuart/${datedeb}/${datefin}`, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        console.log(req.data.datatracking);
        this.horaireActivity = req.data.datatracking;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageActivites(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addDataTracking', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allActivites(this.datedeb, this.datefin);
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateDataTracking/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allActivites(this.datedeb, this.datefin);
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteDataTracking/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allActivites(this.datedeb, this.datefin);
        } catch (error) {
          console.log(error);
        }
      } /* -----------------End Activites------------------------ */
    },
    async allConso() {
      this.loading = true;
      try {
        const req = await api.get('/api/allConsommation', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.conso = req.data.consommation;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async allConsoVeh(code: number | string) {
      this.loading = true;
      try {
        const req = await api.get(`/api/allConsommationVeh/${code}`, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        console.log(req.data.consommation);
        this.consoVeh = req.data.consommation;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageConso(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addConsommation', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allConso();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateConsommation/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allConso();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteConsommation/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allConso();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Conso------------------------ */,
    async analyseDashboard(firstDay: Date, lastDay: Date) {
      this.loading = true;
      try {
        const req = await api.get(
          `/api/analyseDashboard/${firstDay}/${lastDay}`,
          {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          }
        );
        //console.log(req.data);
        this.dataDash = req.data.dataDash;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analyseConso(
      vehicule: object[],
      firstDay: Date,
      lastDay: Date,
      tdeb: any,
      tfin: any
    ) {
      this.loading = true;
      const data = {
        deb: firstDay,
        fin: lastDay,
        vehicle: vehicule,
        tdeb: tdeb,
        tfin: tfin,
      };
      try {
        const req = await api.post('/api/analyseConso', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });

        this.rapconso = req.data.conso;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analyseConsoJour(
      vehicule: object[],
      firstDay: Date,
      lastDay: Date,
      tdeb: any,
      tfin: any
    ) {
      this.loading = true;
      const data = {
        deb: firstDay,
        fin: lastDay,
        vehicle: vehicule,
        tdeb: tdeb,
        tfin: tfin,
      };
      try {
        const req = await api.post('/api/analyseConsoJour', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.consoJour = req.data.conso;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analyseConsoMois(vehicule: object[] | undefined, mois: number[]) {
      this.loading = true;
      const data = {
        mois,
        vehicle: vehicule,
      };
      try {
        const req = await api.post('/api/analyseConsoMois', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        console.log(req.data.conso);
        this.consMois = req.data.conso;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analyseConsoMoy(
      vehicule: object[],
      firstDay: Date,
      lastDay: Date,
      tdeb: any,
      tfin: any
    ) {
      this.loading = true;
      const data = {
        deb: firstDay,
        fin: lastDay,
        vehicle: vehicule,
        tdeb: tdeb,
        tfin: tfin,
      };
      try {
        const req = await api.post('/api/analyseConsoMoy', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        console.log(req.data.conso);
        this.consoMoy = req.data.conso;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async allLastDataPlateforme() {
      this.loading = true;
      try {
        await api
          .get('/api/lastDataPlateforme', {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          })
          .then((response) => {
            this.dataPlat = response.data.dataPlateforme;
          });
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async allLastDataKilometre() {
      this.loading = true;
      try {
        await api
          .get('/api/lastDataKilometre', {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          })
          .then((response) => {
            this.dataKilo = response.data.distance;
          });
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async uploadKilo(data: object[]) {
      this.loading = true;
      try {
        await api.post('/api/addDataKilo', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.allLastDataKilometre();
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async uploadData(data: object[]) {
      this.loading = true;
      try {
        await api.post('/api/addDataPlateforme', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.allLastDataPlateforme();
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analyseHoraire(
      vehicule: object[],
      firstDay: Date,
      lastDay: Date,
      tdeb: any,
      tfin: any
    ) {
      this.loading = true;
      const data = {
        deb: firstDay,
        fin: lastDay,
        vehicle: vehicule,
        tdeb: tdeb,
        tfin: tfin,
      };
      try {
        const req = await api.post('/api/analyseHoraire', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        //console.log(req.data.horaire);
        this.horaires = req.data.horaire;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analysePanne(
      vehicule: object[],
      firstDay: Date,
      lastDay: Date,
      tdeb: any,
      tfin: any
    ) {
      this.loading = true;
      const data = {
        deb: firstDay,
        fin: lastDay,
        vehicle: vehicule,
        tdeb: tdeb,
        tfin: tfin,
      };
      try {
        const req = await api.post('/api/analysePanne', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        console.log(req.data.pannes);
        this.pannes = req.data.pannes;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analyseIntervention(
      vehicule: object[],
      firstDay: Date,
      lastDay: Date,
      tdeb: any,
      tfin: any,
      report: string
    ) {
      this.loading = true;
      const data = {
        deb: firstDay,
        fin: lastDay,
        vehicle: vehicule,
        tdeb: tdeb,
        tfin: tfin,
      };
      try {
        const req = await api.post('/api/analyseIntervention', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        //console.log(req.data.pannes);
        if (report === 'immoTotal') {
          this.immoData = req.data.pannes;
        } else if (report === 'immoQuart') {
          this.immoDataQuart = req.data.pannes;
        } else if (report === 'dispo') {
          this.dispoData = req.data.pannes;
        } else if (report === 'dispoFamille') {
          this.dispoFamille = req.data.pannes;
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analyseHoraireQuart(
      vehicule: object[],
      firstDay: Date,
      lastDay: Date,
      tdeb: any,
      tfin: any
    ) {
      this.loading = true;
      const data = {
        deb: firstDay,
        fin: lastDay,
        vehicle: vehicule,
        tdeb: tdeb,
        tfin: tfin,
      };
      try {
        const req = await api.post('/api/analyseHoraire', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        //console.log(req.data.horaire);
        this.horairesQuart = req.data.horaire;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async analyseEfficience(
      vehicule: object[],
      firstDay: Date,
      lastDay: Date,
      tdeb: any,
      tfin: any,
      report: string
    ) {
      this.loading = true;
      const data = {
        deb: firstDay,
        fin: lastDay,
        vehicle: vehicule,
        tdeb: tdeb,
        tfin: tfin,
      };
      try {
        const req = await api.post('/api/analyseEfficience', data, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        console.log(req.data.panneHoraire);
        if (report === 'efficience') {
          this.efficience = req.data.panneHoraire;
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
});

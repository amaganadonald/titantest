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
  },
});

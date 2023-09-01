import { defineStore } from 'pinia';
import { api } from 'boot/axios';
//import axios from 'axios'
import { Cookies } from 'quasar';
export const useSettingStore = defineStore('settings', {
  state: () => ({
    loading: false,
    status: 0,
    user: [],
    famVeh: [],
    typeVeh: [],
    parc: [],
    site: [],
    activite: [],
    affectation: [],
    groupVeh: [],
    carburant: [],
    typeInt: [],
    marque: [],
    fournisseur: [],
    personnel: [],
    atelier: [],
    fonction: [],
    departement: [],
    personne: [],
    utilisateur: [],
    autorisation: [],
    menus: [],
    profil: [],
    vehicle: [],
    typeDocument: [],
    document: [],
    documentVeh: [],
    chauffeur: [],
    userLogin: [],
    eventSensible: [],
    svgDb: [],
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    /*--------------------Utilisateurs------------------*/
    async login(login: string, password: string) {
      this.status = 0;
      this.loading = true;
      try {
        await api.get(`/api/login/${login}/${password}`).then((response) => {
          //console.log(response)
          //console.log(response.status)
          this.user = response.data;
          this.status = response.status;
        });
        //this.user = req.data.user
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /*--------------------User connect src / stores / settings - store.ts;------------------*/
    async allUserLogin() {
      this.loading = true;
      try {
        await api
          .get('/api/allUserLogin', {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          })
          .then((response) => {
            this.userLogin = response.data.userLogin;
          });
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /*--------------------User connect src / stores / settings - store.ts;------------------*/
    async allEventSensible() {
      this.loading = true;
      try {
        await api
          .get('/api/allEventSensible', {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          })
          .then((response) => {
            this.eventSensible = response.data.eventSensible;
          });
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async allSvgDb() {
      this.loading = true;
      try {
        await api
          .get('/api/allSvgDb', {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          })
          .then((response) => {
            this.svgDb = response.data.svgDb;
          });
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /*--------------------Famille Véhicule src / stores / settings - store.ts;------------------*/
    async allFamVeh() {
      this.loading = true;
      try {
        await api
          .get('/api/allFamilleVeh', {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          })
          .then((response) => {
            this.famVeh = response.data.famVeh;
          });
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageFamVeh(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addFamilleVeh', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFamVeh();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateFamilleVeh/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFamVeh();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteFamilleVeh/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFamVeh();
        } catch (error) {
          console.log(error);
        }
      } /* -----------------End Famille------------------------ */
    },
    async allTypeVeh() {
      this.loading = true;
      try {
        const req = await api.get('/api/allTypeVeh', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.typeVeh = req.data.typeVeh;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageTypeVeh(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addTypeVeh', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeVeh();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateTypeVeh/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeVeh();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteTypeVeh/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeVeh();
        } catch (error) {
          console.log(error);
        }
      } /* -----------------End Famille------------------------ */
    },
    async allParc() {
      this.loading = true;
      try {
        const req = await api.get('/api/allVehicule', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.parc = req.data.vehicule;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async vehicleByCode(code: number | string) {
      this.loading = true;
      try {
        const req = await api.get(`/api/allVehicule/${code}`, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.vehicle = req.data.vehicule;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageParcImg(formData: any, op: string, id: string | number) {
      try {
        if (op === 'add') {
          await api.post('/api/addVehiculeImg', formData, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allParc();
        } else if (op === 'edit') {
          await api.patch(`/api/updateVehiculeImg/${id}`, formData, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
        }
        await this.allParc();
      } catch (error) {
        console.log(error);
      }
    },
    async manageParc(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addVehicule', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allParc();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateVehicule/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allParc();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteVehicule/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allParc();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Parc------------------------ */,
    async allActivites() {
      this.loading = true;
      try {
        const req = await api.get('/api/allActiviteVeh', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.activite = req.data.activiteVeh;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageActivite(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addActiviteVeh', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allActivites();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateActiviteVeh/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allActivites();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteActiviteVeh/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allActivites();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Activités------------------------ */,
    async allAffectation() {
      this.loading = true;
      try {
        const req = await api.get('/api/allAffectation', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.affectation = req.data.affectation;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageAffectation(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addAffectation', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAffectation();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateAffectation/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAffectation();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteAffectation/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAffectation();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Affectation------------------------ */,
    async allSite() {
      this.loading = true;
      try {
        const req = await api.get('/api/allSite', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.site = req.data.site;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageSite(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addSite', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allSite();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateSite/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allSite();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteSite/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allSite();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Site------------------------ */,
    async allGroupVeh() {
      this.loading = true;
      try {
        const req = await api.get('/api/allGroupVeh', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.groupVeh = req.data.groupVeh;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageGroupVeh(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addGroupVeh', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allGroupVeh();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateGroupVeh/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allGroupVeh();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteGroupVeh/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allGroupVeh();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End GROUP------------------------ */,
    async allCarburant() {
      this.loading = true;
      try {
        const req = await api.get('/api/allCarburant', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.carburant = req.data.carburant;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageCarburant(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addCarburant', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allCarburant();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateCarburant/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allCarburant();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteCarburant/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allCarburant();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End TypeInt------------------------ */,
    async allTypeInt() {
      this.loading = true;
      try {
        const req = await api.get('/api/allTypePanne', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.typeInt = req.data.typePanne;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageTypeInt(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addTypePanne', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeInt();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateTypePanne/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeInt();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteTypePanne/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeInt();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Site------------------------ */,
    async allMarque() {
      this.loading = true;
      try {
        const req = await api.get('/api/allMarque', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.marque = req.data.marque;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageMarqueImg(formData: any, op: string, id: string | number) {
      try {
        if (op === 'add') {
          await api.post('/api/addMarqueImg', formData, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allMarque();
        } else if (op === 'edit') {
          await api.patch(`/api/updateMarqueImg/${id}`, formData, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
        }
        await this.allMarque();
      } catch (error) {
        console.log(error);
      }
    },
    async manageMarque(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addMarque', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allMarque();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateMarque/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allMarque();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteMarque/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allMarque();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Marques------------------------ */,
    async allFournisseur() {
      this.loading = true;
      try {
        const req = await api.get('/api/allFournisseur', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.fournisseur = req.data.fournisseur;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageFournisseur(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addFournisseur', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFournisseur();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateFournisseur/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFournisseur();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteFournisseur/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFournisseur();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Fournisseur------------------------ */,
    async allPersonnel() {
      this.loading = true;
      try {
        const req = await api.get('/api/allPersonnel', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.personnel = req.data.personnel;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async personnelByMatricule(id: any) {
      this.loading = true;
      try {
        const req = await api.get(`/api/personnel/${id}`, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.personne = req.data.personnel;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async managePersonnel(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addPersonnel', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPersonnel();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updatePersonnel/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPersonnel();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deletePersonnel/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPersonnel();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Personnel------------------------ */,
    async allFonction() {
      this.loading = true;
      try {
        const req = await api.get('/api/allFonction', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.fonction = req.data.fonction;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageFonction(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addFonction', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFonction();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateFonction/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFonction();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteFonction/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allFonction();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Fonction------------------------ */,
    async allDepartement() {
      this.loading = true;
      try {
        const req = await api.get('/api/allDepartement', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.departement = req.data.departement;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageDepartement(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addDepartement', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allDepartement();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateDepartement/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allDepartement();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteDepartement/${id}`, {
            headers: {},
          });
          await this.allDepartement();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Departement------------------------ */,
    async allAtelier() {
      this.loading = true;
      try {
        const req = await api.get('/api/allAtelier', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.atelier = req.data.atelier;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageAtelier(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addAtelier', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAtelier();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateAtelier/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAtelier();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteAtelier/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAtelier();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Atelier------------------------ */,
    async allUtilisateur() {
      this.loading = true;
      try {
        const req = await api.get('/api/allUsers', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.utilisateur = req.data.users;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async utilisateurById(id: any) {
      this.loading = true;
      try {
        const req = await api.get(`/api/userById/${id}`, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.user = req.data.user;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageUtilisateur(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addUser', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allUtilisateur();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateUp/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allUtilisateur();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteUser/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allUtilisateur();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Utilisateur------------------------ */,
    async manageUtilisateurImg(
      formData: object,
      op: string,
      id: string | number
    ) {
      try {
        if (op === 'add') {
          await api.post('/api/addUserImg', formData, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allUtilisateur();
        } else if (op === 'edit') {
          await api.patch(`/api/updateUpImg/${id}`, formData, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
        }
        await this.allUtilisateur();
      } catch (error) {
        console.log(error);
      }
    } /* -----------------End Utilisateur------------------------ */,
    async allAutorisation() {
      this.loading = true;
      try {
        const req = await api.get('/api/allAutorisation', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.autorisation = req.data.autorisation;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageAutorisation(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addAutorisation', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAutorisation();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateAutorisation/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAutorisation();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteAutorisation/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allAutorisation();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Autorisation------------------------ */,
    async allMenu() {
      this.loading = true;
      try {
        const req = await api.get('/api/allMenu', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.menus = req.data.menu;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageMenu(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addMenu', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allMenu();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateMenu/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allMenu();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteMenu/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allMenu();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Menu------------------------ */,
    async allProfil() {
      this.loading = true;
      try {
        const req = await api.get('/api/allProfil', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.profil = req.data.profil;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageProfil(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addProfil', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allProfil();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateProfil/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allProfil();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteProfil/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allProfil();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Profil------------------------ */,
    async allTypeDocument() {
      this.loading = true;
      try {
        const req = await api.get('/api/allTypeDocument', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.typeDocument = req.data.typedocuments;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageTypeDocument(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addTypeDocument', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeDocument();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateTypeDocument/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeDocument();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteTypeDocument/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allTypeDocument();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Type de Documents------------------------ */,
    async allDocument() {
      this.loading = true;
      try {
        const req = await api.get('/api/allDocuments', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.document = req.data.document;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async allDocumentVeh(code: number | string) {
      this.loading = true;
      try {
        const req = await api.get(`/api/allDocumentsVeh/${code}`, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.documentVeh = req.data.documents;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageDocument(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addDocuments', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allDocument();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateDocuments/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allDocument();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteDocuments/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allDocument();
        } catch (error) {
          console.log(error);
        }
      }
    } /* -----------------End Type de Documents------------------------ */,
    async allChauffeur() {
      this.loading = true;
      try {
        const req = await api.get('/api/allChauffeur', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.chauffeur = req.data.personnel;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
});

import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Cookies } from 'quasar';
export const useMaintenanceStore = defineStore('maintenance', {
  state: () => ({
    pannes: [],
    loading: false,
    intervention: [],
    dataPanne: [],
    panneNlivre: [],
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async allPannes() {
      this.loading = true;
      try {
        const req = await api.get('/api/allPannes', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.pannes = req.data.panne;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async allPannesNonLivre() {
      this.loading = true;
      try {
        const req = await api.get('/api/allPannesNonLivre', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        this.panneNlivre = req.data.panne;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async managePannes(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addPannes', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPannes();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updatePannes/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPannes();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deletePannes/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPannes();
        } catch (error) {
          console.log(error);
        }
      } /* -----------------End Pannes------------------------ */
    },
    async allIntervention() {
      this.loading = true;
      try {
        const req = await api.get('/api/allIntervention', {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('tk'),
          },
        });
        console.log(req.data.intervention);
        this.intervention = req.data.intervention;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async manageIntervention(data: object, op: string, id: string | number) {
      this.loading = true;
      if (op === 'add') {
        try {
          await api.post('/api/addIntervention', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allIntervention();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateIntervention/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allIntervention();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteIntervention/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allIntervention();
        } catch (error) {
          console.log(error);
        }
      } /* -----------------End Intervention------------------------ */
      this.loading = false;
    },
    async manageDataPanne(data: object, op: string, id: string | number) {
      if (op === 'add') {
        try {
          await api.post('/api/addDataPanne', data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPannes();
          await this.allPannesNonLivre();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'edit') {
        try {
          await api.patch(`/api/updateDataPanne/${id}`, data, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPannes();
          await this.allPannesNonLivre();
        } catch (error) {
          console.log(error);
        }
      } else if (op === 'delete') {
        try {
          await api.delete(`/api/deleteDataPanne/${id}`, {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('tk'),
            },
          });
          await this.allPannes();
          await this.allPannesNonLivre();
        } catch (error) {
          console.log(error);
        }
      } /* -----------------End Intervention------------------------ */
    },
  },
});

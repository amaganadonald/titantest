<template>
  <div>
    <div class="d-flex flex-wrap gap-2">
      <button
        class="btn btn-primary w-70"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Plage de temps
      </button>
    </div>
    <!-- right offcanvas -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Generez Rapport</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="fs-15 fw-semibold">Plage de dates</h5>
                <q-separator color="orange" inset /> <br />
                <form>
                  <div class="row">
                    <div class="col-sm-6">
                      <label for="basiInput">Date Debut</label>
                      <input
                        class="form-control form-control-sm"
                        type="date"
                        placeholder=".form-control-sm"
                        v-model="deb"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="labelInput" class="form-label"
                        >Date Fin</label
                      >
                      <input
                        type="date"
                        class="form-control form-control-sm"
                        id="labelInput"
                        v-model="fin"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-sm-6">
                      <label for="basiInput">Heure Debut</label>
                      <input
                        class="form-control form-control-sm"
                        type="time"
                        placeholder=".form-control-sm"
                        v-model="tdeb"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="labelInput" class="form-label"
                        >Heure Fin</label
                      >
                      <input
                        type="time"
                        class="form-control form-control-sm"
                        id="labelInput"
                        v-model="tfin"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-sm-6">
                      <label for="basiInput">Famille</label>
                      <q-select
                        dense
                        option-dense
                        filled
                        v-model="famille"
                        multiple
                        :options="optionsFamille"
                        input-debounce="0"
                        option-label="lib_fam"
                        maps-options
                        emit-value
                        use-input
                        use-chips
                        hide-selected
                      >
                      </q-select>
                    </div>
                    <div class="col-sm-6">
                      <label for="basiInput">Type</label>
                      <q-select
                        dense
                        option-dense
                        filled
                        v-model="type"
                        multiple
                        :options="dataType"
                        input-debounce="0"
                        option-label="lib_type"
                        maps-options
                        emit-value
                        use-input
                        use-chips
                        hide-selected
                      >
                      </q-select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <label for="basiInput">Mois</label>
                      <q-select
                        dense
                        option-dense
                        filled
                        v-model="mois"
                        multiple
                        :options="months"
                        input-debounce="0"
                        option-value="id"
                        option-label="value"
                        maps-options
                        emit-value
                        use-input
                        use-chips
                        hide-selected
                      >
                      </q-select>
                    </div>
                    <div class="col-sm-6">
                      <label for="basiInput">Code Ana</label>
                      <q-select
                        dense
                        option-dense
                        filled
                        v-model="vehicle"
                        multiple
                        :options="dataVeh"
                        input-debounce="0"
                        option-label="code"
                        maps-options
                        emit-value
                        use-input
                        use-chips
                        hide-selected
                      >
                      </q-select>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-lg-12">
                <div class="hstack gap-2 justify-content-end">
                  <!-- Buttons with dropdowns -->
                  <button type="submit" class="btn btn-secondary">
                    Exportez
                  </button>
                  <button
                    @click="generateReport()"
                    v-close-popup
                    class="btn btn-primary"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    visualiser
                  </button>
                </div>
              </div>
              <div
                class="progress animated-progress rounded-bottom rounded-0"
                style="height: 6px"
              >
                <div
                  class="progress-bar bg-black rounded-0"
                  role="progressbar"
                  style="width: 30%"
                  aria-valuenow="30"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div
                  class="progress-bar bg-info rounded-0"
                  role="progressbar"
                  style="width: 50%"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div
                  class="progress-bar rounded-0"
                  role="progressbar"
                  style="width: 20%"
                  aria-valuenow="20"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { useSettingStore } from '../../stores/settings-store';
import { useRepportStore } from '../../stores/repport-store';
import { useQuasar, date } from 'quasar';
import { useRetourneMois } from '../../composable/panneReport';
import { useChangeDate } from '../../composable/panneReport';

export default defineComponent({
  name: 'PlageData',
  props: ['typeReport', 'titleReport', 'plage'],
  emits: ['acquireDats'],
  setup(props, context) {
    const store = useSettingStore();
    const consStore = useRepportStore();
    const $q = useQuasar();
    let deb = ref<Date | string>(date.formatDate(new Date(), 'YYYY-MM-DD'));
    let fin = ref<Date | string>(date.formatDate(new Date(), 'YYYY-MM-DD'));
    let tdeb = ref('00:00');
    let tfin = ref('23:59');
    let famille = ref([]);
    let type = ref([]);
    let vehicle = ref([]);
    let txt = ref('');
    let optionsFamille = computed(() => store.famVeh);
    let optionsType = computed(() => store.typeVeh);
    let optionsVeh = computed(() => store.parc);
    let report = ref(props.typeReport);
    let dataType = ref([]);
    let dataVeh = ref([]);
    let mois = ref([]);
    let months = ref([
      { id: 1, value: 'Janvier' },
      { id: 2, value: 'Fevrier' },
      { id: 3, value: 'Mars' },
      { id: 4, value: 'Avril' },
      { id: 5, value: 'Mai' },
      { id: 6, value: 'Juin' },
      { id: 7, value: 'Juillet' },
      { id: 8, value: 'Aout' },
      { id: 9, value: 'Septembre' },
      { id: 10, value: 'Octobre' },
      { id: 11, value: 'Novembre' },
      { id: 12, value: 'Decembre' },
    ]);
    let t = 0;
    watch(famille, (value) => {
      dataType.value = [];
      t = 0;
      if (value.length > 0) {
        value.forEach((val) => {
          let tbs = optionsType.value.filter((x) => x.fam_veh.id === val.id);
          tbs.forEach((bst) => {
            dataType.value[t] = bst;
            t++;
          });
        });
      } else {
        dataType.value = optionsType.value;
        type.value = [];
      }
    });
    watch(type, (value) => {
      dataVeh.value = [];
      t = 0;
      if (value.length > 0) {
        value.forEach((val) => {
          let tb = optionsVeh.value.filter((x) => x.typeVehId === val.id);

          tb.forEach((ts) => {
            dataVeh.value[t] = ts;
            t++;
          });
        });
      } else {
        dataVeh.value = optionsVeh.value;
      }
    });
    watch(props, (value) => {
      report.value = value.typeReport;
    });
    watch(dataType, (value) => {
      dataVeh.value = [];
      t = 0;
      if (value.length > 0) {
        value.forEach((val) => {
          let tb = optionsVeh.value.filter((x) => x.typeVehId === val.id);
          tb.forEach((ts) => {
            dataVeh.value[t] = ts;
            t++;
          });
        });
      } else {
        dataVeh.value = optionsVeh.value;
      }
    });
    const listVehicle = (vehicles: object[]) => {
      let tx2 = '';
      vehicles.forEach((ve) => {
        if (tx2 === '') {
          tx2 = ve.code;
        } else {
          tx2 = tx2 + ',' + ve.code;
        }
      });
      return tx2;
    };
    const generateReport = async () => {
      txt.value = '';
      let flt = '';
      let familial = [];
      if (
        famille.value.length === 0 &&
        type.value.length === 0 &&
        vehicle.value.length === 0
      ) {
        flt = 'All Fleet';
      } else {
        flt = 'veh';
      }
      if (famille.value.length === 0) {
        familial = optionsFamille.value;
      } else {
        familial = famille.value;
      }
      if (report.value === '') {
        $q.notify({
          color: 'teal-10',
          position: 'top-right',
          message: 'Veuillez choisir un rapport à générer svp',
          icon: 'cloud',
        });
      } else {
        let vehi = [];
        if (vehicle.value.length === 0) {
          vehi = dataVeh.value;
        } else {
          vehi = vehicle.value;
        }

        if (props.plage === 'mois') {
          if (flt === 'veh') {
            txt.value =
              props.titleReport +
              ' (' +
              chgMonth(mois.value) +
              ') <-> vehicule : ' +
              listVehicle(vehi);
          } else {
            txt.value =
              props.titleReport +
              ' (' +
              chgMonth(mois.value) +
              ') <-> vehicule : All fleet';
          }
        } else {
          if (flt === 'veh') {
            vehi = optionsVeh.value;
            txt.value =
              props.titleReport +
              ' (' +
              useChangeDate(deb.value) +
              ' ' +
              tdeb.value +
              ' au ' +
              useChangeDate(fin.value) +
              ' ' +
              tfin.value +
              ') <-> vehicule : ' +
              listVehicle(vehi);
          } else {
            txt.value =
              props.titleReport +
              ' (' +
              useChangeDate(deb.value) +
              ' ' +
              tdeb.value +
              ' au ' +
              useChangeDate(fin.value) +
              ' ' +
              tfin.value +
              ') <-> vehicule : All fleet';
          }
        }
        context.emit(
          'acquireDats',
          deb.value,
          fin.value,
          tdeb.value,
          tfin.value,
          vehi,
          txt.value,
          familial
        );

        if (report.value === 'consoTotal') {
          await consStore.analyseConso(
            vehi,
            deb.value,
            fin.value,
            tdeb.value,
            tfin.value
          );
        } else if (report.value === 'consoMois') {
          await consStore.analyseConsoJour(
            vehi,
            deb.value,
            fin.value,
            tdeb.value,
            tfin.value
          );
        } else if (report.value === 'consoAn') {
          await consStore.analyseConsoMois(vehi, mois.value);
        } else if (report.value === 'consoMoy') {
          await consStore.analyseConsoMoy(
            vehi,
            deb.value,
            fin.value,
            tdeb.value,
            tfin.value
          );
        } else if (
          report.value === 'horaireTotal' ||
          report.value === 'graphHoraireTotal'
        ) {
          await consStore.analyseHoraire(
            vehi,
            deb.value,
            fin.value,
            tdeb.value,
            tfin.value,
            report.value
          );
        } else if (
          report.value === 'horaireQuart' ||
          report.value === 'grapheHoraireQuart'
        ) {
          await consStore.analyseHoraireQuart(
            vehi,
            deb.value,
            fin.value,
            tdeb.value,
            tfin.value,
            report.value
          );
        } else if (
          report.value === 'immoTotal' ||
          report.value === 'immoQuart' ||
          report.value === 'dispo' ||
          report.value === 'dispoFamille'
        ) {
          await consStore.analyseIntervention(
            vehi,
            deb.value,
            fin.value,
            tdeb.value,
            tfin.value,
            report.value
          );
        } else if (report.value === 'efficience') {
          await consStore.analyseEfficience(
            vehi,
            deb.value,
            fin.value,
            tdeb.value,
            tfin.value,
            report.value
          );
        } else if (report.value === 'frequenceDispo') {
          await consStore.totalImmobilisation(
            vehi,
            deb.value,
            fin.value,
            tdeb.value,
            tfin.value,
            report.value
          );
        }
      }
    };
    const chgMonth = (tabMonth: number[]) => {
      let tx = '';
      tabMonth.forEach((elt) => {
        if (tx === '') {
          tx = useRetourneMois(elt);
        } else {
          tx = tx + ',' + useRetourneMois(elt);
        }
      });
      return tx;
    };

    onMounted(async () => {
      await store.allFamVeh();
      await store.allTypeVeh();
      await store.allParc();
      dataType.value = optionsType.value;
      dataVeh.value = optionsVeh.value;
    });
    return {
      deb,
      fin,
      famille,
      optionsFamille,
      tdeb,
      tfin,
      type,
      vehicle,
      optionsType,
      optionsVeh,
      dataType,
      dataVeh,
      generateReport,
      months,
      mois,
    };
  },
});
</script>

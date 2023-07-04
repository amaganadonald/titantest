<template>
  <q-page>
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <!-- start page title -->
          <div class="row">
            <div class="col-12">
              <div
                class="page-title-box d-sm-flex align-items-center justify-content-between"
              >
                <h4 class="mb-sm-0">GRAPHE PANNES</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Graphe</a>
                    </li>
                    <li class="breadcrumb-item active">pannes</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-xl-2">
                  <div class="card card-h-80">
                    <div class="card-body">
                      <PlageData
                        :typeReport="report"
                        @acquireDats="acquireDate"
                        :titleReport="titleReport"
                        :plage="plage"
                      />
                      <div class="step-arrow-nav mt-n3 mx-n3 mb-3">
                        <br />
                        <ul
                          class="nav nav-pills nav-justified custom-nav"
                          role="tablist"
                        >
                          <div
                            class="external-event fc-event bg-soft-success text-success"
                            data-class="bg-soft-success"
                            id="pills-bill-info-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-bill-info"
                            type="button"
                            role="tab"
                            aria-controls="pills-bill-info"
                            aria-selected="false"
                            @click="
                              actualReport(
                                'immoTotal',
                                'Graphe Immobilisation du ',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >immobilisation
                          </div>
                          <div
                            class="external-event fc-event bg-soft-info text-info"
                            data-class="bg-soft-info"
                            id="pills-bill-address-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-bill-address"
                            type="button"
                            role="tab"
                            aria-controls="pills-bill-address"
                            aria-selected="false"
                            @click="
                              actualReport(
                                'immoQuart',
                                'Immobilisation Par Quart du ',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >immo Quart
                          </div>
                          <div
                            class="external-event fc-event bg-soft-warning text-warning"
                            data-class="bg-soft-warning"
                            id="pills-payment-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-payment"
                            type="button"
                            role="tab"
                            aria-controls="pills-payment"
                            aria-selected="false"
                            @click="
                              actualReport(
                                'dispo',
                                '% Disponibilité du ',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Disponibilté
                          </div>
                          <div
                            class="external-event fc-event bg-soft-warning text-warning"
                            data-class="bg-soft-warning"
                            id="pills-famille-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-famille"
                            type="button"
                            role="tab"
                            aria-controls="pills-famille"
                            aria-selected="false"
                            @click="
                              actualReport(
                                'dispoFamille',
                                '% Disponibilité Famille du ',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Disponibilté Famille
                          </div>
                          <div
                            class="external-event fc-event bg-soft-warning text-warning"
                            data-class="bg-soft-warning"
                            id="pills-frequance-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-frequance"
                            type="button"
                            role="tab"
                            aria-controls="pills-frequance"
                            aria-selected="false"
                            @click="
                              actualReport(
                                'frequenceDispo',
                                'Frequence Intervention du ',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >% et Frequence Intervention
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end col-->

                <div class="col-xl-10">
                  <div class="card card-h-100">
                    <div class="card-body">
                      <div class="tab-content">
                        <div
                          class="tab-pane fade"
                          id="pills-bill-info"
                          role="tabpanel"
                          aria-labelledby="pills-bill-info-tab"
                        >
                          <div>
                            <BarChart
                              :legendConsoTot="legendImmo"
                              :dataConso="dataImmo"
                              :title="rpl"
                              unite="H"
                            />
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="pills-bill-address"
                          role="tabpanel"
                          aria-labelledby="pills-bill-address-tab"
                        >
                          <div>
                            <BarChartInverse
                              :legendConsoTot="legendImmoQrt"
                              :dataConso="dataImmoQrt"
                              :title="rpl"
                              unite="H"
                            />
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="pills-payment"
                          role="tabpanel"
                          aria-labelledby="pills-payment-tab"
                        >
                          <div>
                            <BarChartLine
                              :legendConsoTot="legendDispo"
                              :dataConso="dataDispo"
                              :title="rpl"
                              unite="%"
                            />
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="pills-famille"
                          role="tabpanel"
                          aria-labelledby="pills-famille-tab"
                        >
                          <div>
                            <BarChartLine
                              :legendConsoTot="legendDispoF"
                              :dataConso="dataDispoF"
                              :title="rpl"
                              unite="%"
                            />
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="pills-frequance"
                          role="tabpanel"
                          aria-labelledby="pills-frequance-tab"
                        >
                          <div>
                            <PieChartData
                              :legend="legendePie"
                              :titre="titlePie"
                              :dataGraph="dataPieGraph"
                            />
                            <br /><br />
                            <PieChart
                              :legend="legendePieF"
                              :titre="titlePieF"
                              :dataGraph="dataPieGraphF"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end tab pane -->
                    </div>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!--end row-->
            </div>
          </div>
        </div>
        <!-- container-fluid -->
      </div>
      <!-- End Page-content -->
    </div></q-page
  >
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import PlageData from '../components/Modals/PlageData.vue';
import { useRepportStore } from '../stores/repport-store';
import BarChart from 'src/components/charts/BarChart.vue';
import BarChartInverse from 'src/components/charts/BarChartInverse.vue';
import BarChartLine from 'src/components/charts/BarChartLine.vue';
import PieChart from '../components/charts/PieChart.vue';
import PieChartData from '../components/charts/PieChartData.vue';
import {
  useCalculImmoPanne,
  useCalculImmoPanneQuart,
  useCalculDispo,
  useCalculDispoFamille,
} from 'src/composable/panneReport';
import { dataCons } from '../types/dataCons';
import { dataconsDate } from '../types/dataCons';
export default defineComponent({
  name: 'GrapheIntervention',
  components: {
    PlageData,
    BarChart,
    BarChartInverse,
    BarChartLine,
    PieChart,
    PieChartData,
  },
  setup() {
    const consStore = useRepportStore();
    let report = ref('');
    let dataBasePanne = computed(() => consStore.immoData);
    let dataBasePanneQuart = computed(() => consStore.immoDataQuart);
    let dataPanne = ref([]);
    let databaseDispo = computed(() => consStore.dispoData);
    let databaseDispoF = computed(() => consStore.dispoFamille);
    let databaseImmo = computed(() => consStore.totalImmo);
    let dataTimes = ref([]);
    let dataQuart = ref([]);
    let dataJour = ref<dataconsDate[]>([]);
    let data = ref<dataCons[]>([]);
    let rpl = ref('');
    let debut = ref<Date>();
    let fini = ref<Date>();
    let tdebut = ref<string>();
    let tfini = ref<string>();
    let vehs = ref<object[]>();
    let choix = ref<string>('');
    let dataDisponibilite = ref([]);
    let dataDisponibiliteF = ref([]);
    let titleReport = ref<string>('');
    let plage = ref<string>('');
    let legendImmo = ref([]);
    let dataImmo = ref([]);
    let legendImmoQrt = ref([]);
    let dataImmoQrt = ref([]);
    let legendDispo = ref([]);
    let dataDispo = ref([]);
    let legendDispoF = ref([]);
    let dataDispoF = ref([]);
    let titlePie = ref('Frequence Type de panne');
    let legendePie = ref([]);
    let dataPieGraph = ref([]);
    let titlePieF = ref('Pourcentage Type de panne');
    let legendePieF = ref([]);
    let dataPieGraphF = ref([]);
    const acquireDate = (
      deb: Date,
      fin: Date,
      tdeb: string,
      tfin: string,
      vehicle: object[],
      txt: string,
      flt: string
    ) => {
      rpl.value = txt;
      debut.value = deb;
      fini.value = fin;
      tdebut.value = tdeb;
      tfini.value = tfin;
      vehs.value = vehicle;
      choix.value = flt;
    };
    const refreshTables = async () => {
      await consStore.analyseConso(
        vehs.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
    };
    const actualReport = (txt: string, title: string, plages: string) => {
      rpl.value = '';
      if (txt === 'immoTotal') {
        rpl.value = 'Immobilisation';
      } else if (txt === 'immoQuart') {
        rpl.value = 'Immobilisation Par Quart ';
      } else if (txt === 'dispo') {
        rpl.value = '% Disponibilité';
      } else if (txt === 'dispoFamille') {
        rpl.value = '% Disponibilité Famille';
      }
      titleReport.value = title;
      plage.value = plages;
      report.value = txt;
    };

    watch(dataBasePanne, (val) => {
      legendImmo.value = [];
      dataImmo.value = [];
      dataPanne.value = useCalculImmoPanne(
        dataBasePanne.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
      dataPanne.value.forEach((dt) => {
        legendImmo.value.push(dt.code);
        dataImmo.value.push(((dt.immo / 86400) * 24).toFixed(2));
      });
    });
    watch(dataBasePanneQuart, (val) => {
      legendImmoQrt.value = [];
      dataImmoQrt.value = [];
      dataQuart.value = useCalculImmoPanneQuart(
        dataBasePanneQuart.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
      let quart1 = [];
      let quart2 = [];
      let quart3 = [];
      dataQuart.value.forEach((ds) => {
        for (let r of Object.keys(ds)) {
          if (r === 'immoQuart1') {
            legendImmoQrt.value.push(ds.code);
            quart1.push(((ds.immoQuart1 / 86400) * 24).toFixed(2));
          } else if (r === 'immoQuart2') {
            legendImmoQrt.value.push(ds.code);
            quart2.push(((ds.immoQuart2 / 86400) * 24).toFixed(2));
          } else if (r === 'immoQuart3') {
            legendImmoQrt.value.push(ds.code);
            quart3.push(((ds.immoQuart3 / 86400) * 24).toFixed(2));
          }
        }
      });
      legendImmoQrt.value = [...new Set(legendImmoQrt.value)];
      dataImmoQrt.value.push({
        name: 'Quart 1',
        type: 'bar',
        data: quart1,
        label: {
          show: true,
          formatter: '{c} H',
          position: 'right',
          distance: 0,
        },
      });
      dataImmoQrt.value.push({
        name: 'Quart 2',
        type: 'bar',
        data: quart2,
        label: {
          show: true,
          formatter: '{c} H',
          position: 'right',
          distance: 0,
        },
      });
      dataImmoQrt.value.push({
        name: 'Quart 3',
        type: 'bar',
        data: quart3,
        itemStyle: {
          color: '#a90000',
        },
        label: {
          show: true,
          formatter: '{c} H',
          position: 'right',
          distance: 0,
        },
      });
    });

    watch(databaseDispo, (val) => {
      dataDisponibilite.value = useCalculDispo(
        databaseDispo.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
      //console.log(dataDisponibilite.value);
      dataDisponibilite.value.forEach((dt) => {
        legendDispo.value.push(dt.code);
        dataDispo.value.push(Number(dt.tpsdispo));
      });
    });

    watch(databaseDispoF, (val) => {
      dataDisponibiliteF.value = useCalculDispoFamille(
        databaseDispoF.value,
        choix.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value,
        vehs.value
      );
      dataDisponibiliteF.value.forEach((dt) => {
        legendDispoF.value.push(dt.famille);
        dataDispoF.value.push(Number(dt.tpsdispo));
      });
    });
    watch(databaseImmo, (val) => {
      databaseImmo.value.forEach((dt) => {
        console.log(dt);
        dataPieGraph.value.push({
          value: dt.totalpanne,
          name: dt.type_panne.libelle,
        });
        legendePie.value.push(dt.type_panne.libelle);
        dataPieGraphF.value.push({
          value: ((dt.totalpanne / databaseImmo.value.length) * 100).toFixed(2),
          name: dt.type_panne.libelle,
        });
        legendePie.value.push(dt.type_panne.libelle);
      });
    });

    return {
      actualReport,
      report,
      data,
      acquireDate,
      rpl,
      refreshTables,
      debut,
      fini,
      tdebut,
      tfini,
      dataJour,
      dataPanne,
      dataTimes,
      dataQuart,
      dataBasePanne,
      dataDisponibilite,
      dataDisponibiliteF,
      titleReport,
      plage,
      legendImmo,
      dataImmo,
      legendImmoQrt,
      dataImmoQrt,
      legendDispo,
      dataDispo,
      legendDispoF,
      dataDispoF,
      titlePie,
      legendePie,
      dataPieGraph,
      titlePieF,
      legendePieF,
      dataPieGraphF,
    };
  },
});
</script>

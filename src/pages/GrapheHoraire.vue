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
                <h4 class="mb-sm-0">GRAPHE HORAIRE</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Graphe</a>
                    </li>
                    <li class="breadcrumb-item active">Horaire</li>
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
                                'graphHoraireTotal',
                                'Repartition temps d\'activité',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Temps Conduite
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
                                'horaireQuart',
                                'Graphe kilométrage',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Kilometrage
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
                                'grapheHoraireQuart',
                                'Repartition activite par quart',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Temps conduite par Quart
                          </div>

                          <div
                            class="external-event fc-event bg-soft-danger text-danger"
                            data-class="bg-soft-danger"
                            id="pills-finish-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-finish"
                            type="button"
                            role="tab"
                            aria-controls="pills-finish"
                            aria-selected="false"
                            @click="
                              actualReport(
                                'grapheHoraireQuart',
                                'Kilométrage par quart',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Kilometrage Quart
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
                            <StackedOneColumnChart
                              :legend="legendCode"
                              :dataConso="dataBas"
                              :legendConsoDatJr="legendVal"
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
                            <BarChart
                              :legendConsoTot="legendCode"
                              :dataConso="dataKm"
                              :title="rpl"
                              unite="Km"
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
                            <StackedOneColumnChart
                              :legend="legendCodeQrt"
                              :dataConso="dataBasQrt"
                              :legendConsoDatJr="legendValQrt"
                              :title="rpl"
                              unite="H"
                            />
                          </div>
                        </div>

                        <div
                          class="tab-pane fade"
                          id="pills-finish"
                          role="tabpanel"
                          aria-labelledby="pills-finish-tab"
                        >
                          <div class="text-center py-5">
                            <BarChart
                              :legendConsoTot="legendCodeQrt"
                              :dataConso="dataKmQrt"
                              :title="rpl"
                              unite="Km"
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
          <!-- end row-->
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
import StackedOneColumnChart from 'src/components/charts/StackedOneColumnChart.vue';
import BarChart from 'src/components/charts/BarChart.vue';
import {
  useCalculHoraire,
  useCalculHoraireQuart,
} from 'src/composable/panneReport';
import { dataCons } from '../types/dataCons';
import { dataconsDate } from '../types/dataCons';
export default defineComponent({
  name: 'GrapheHoraire',
  components: {
    PlageData,
    StackedOneColumnChart,
    BarChart,
  },
  setup() {
    const consStore = useRepportStore();
    let report = ref('');
    let dataHoraire = computed(() => consStore.graphHoraire);
    let dataHoraireQuart = computed(() => consStore.graphHoraireQuart);
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
    let legendVal = ref([]);
    let legendCode = ref([]);
    let dataBas = ref([]);
    let dataKm = ref([]);
    let legendValQrt = ref([]);
    let legendCodeQrt = ref([]);
    let dataBasQrt = ref([]);
    let dataKmQrt = ref([]);
    let titleReport = ref<string>('');
    let plage = ref<string>('');

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
      rpl.value = title;
      report.value = txt;
      titleReport.value = title;
      plage.value = plages;
    };

    const stringToHour = (txt: string) => {
      let str = txt.split(':');
      let mn = Number(str[2] / 60) + Number(str[1]);
      return (Number(str[0]) + Number(mn / 60)).toFixed(2);
    };

    watch(dataHoraire, (val) => {
      dataTimes.value = useCalculHoraire(
        val,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
      let eon = [];
      let eoff = [];
      let edile = [];
      dataKm.value = [];
      dataTimes.value.forEach((dataVal) => {
        legendCode.value.push(dataVal.code);
        dataKm.value.push(dataVal.km);
        for (let key of Object.keys(dataVal)) {
          if (key !== 'code' && key !== 'km') legendVal.value.push(key);
        }
        eon.push(stringToHour(dataVal.eon));
        eoff.push(stringToHour(dataVal.eoff));
        edile.push(stringToHour(dataVal.idle));
      });
      dataBas.value.push({
        date: 'eon',
        data: eon,
      });
      dataBas.value.push({
        date: 'eoff',
        data: eoff,
      });
      dataBas.value.push({
        date: 'idle',
        data: edile,
      });
      legendVal.value = [...new Set(legendVal.value)];
      legendCode.value = [...new Set(legendCode.value)];
    });
    watch(dataHoraireQuart, (val) => {
      dataQuart.value = useCalculHoraireQuart(
        val,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
      console.log(dataQuart.value);
      let eon = [];
      let eoff = [];
      let edile = [];
      dataKm.value = [];
      dataQuart.value.forEach((dataVal) => {
        legendCodeQrt.value.push(dataVal.code + '-' + dataVal.quart);
        dataKmQrt.value.push(dataVal.km);
        for (let key of Object.keys(dataVal)) {
          if (key !== 'code' && key !== 'km') legendValQrt.value.push(key);
        }
        eon.push(stringToHour(dataVal.eon));
        eoff.push(stringToHour(dataVal.eoff));
        edile.push(stringToHour(dataVal.idle));
      });
      dataBasQrt.value.push({
        date: 'eon',
        data: eon,
      });
      dataBasQrt.value.push({
        date: 'eoff',
        data: eoff,
      });
      dataBasQrt.value.push({
        date: 'idle',
        data: edile,
      });
      legendValQrt.value = [...new Set(legendValQrt.value)];
      legendCodeQrt.value = [...new Set(legendCodeQrt.value)];
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
      dataHoraire,
      dataTimes,
      dataQuart,
      dataBas,
      legendVal,
      legendCode,
      dataKm,
      dataBasQrt,
      legendValQrt,
      legendCodeQrt,
      dataKmQrt,
      titleReport,
      plage,
    };
  },
});
</script>

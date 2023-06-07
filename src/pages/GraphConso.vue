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
                <h4 class="mb-sm-0">GRAPHE CONSO</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Graphe</a>
                    </li>
                    <li class="breadcrumb-item active">Consommation</li>
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
                      <!--button class="btn btn-primary w-100" id="btn-new-event">
                        <i class="mdi mdi-plus"></i> Create New Event
                      </button-->
                      <!-- Placement Offcanvas -->
                      <PlageData
                        :typeReport="report"
                        @acquireDats="acquireDate"
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
                            @click="actualReport('consoTotal')"
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Conso Totale
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
                            @click="actualReport('consoMois')"
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Conso Journalière
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
                            @click="actualReport('consoAn')"
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Conso Mensuelle
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
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Conso Moyenne
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
                              :legendConsoTot="legendConsoTots"
                              :dataConso="dataCons"
                              :title="rpl"
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
                            <MultipleBarChart
                              :legend="legendConsoJour"
                              :dataConso="dataConsoJour"
                              :legendConsoDatJr="legendConsoDatJr"
                              :title="rpl"
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
                              :legendConsoTot="legendConsoMois"
                              :dataConso="dataConsoMois"
                              :title="rpl"
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
                            <h5>Thank you ! Your Order is Completed !</h5>
                            <p class="text-muted">
                              You will receive an order confirmation email with
                              details of your order.
                            </p>

                            <h3 class="fw-semibold">
                              Order ID:
                              <a
                                href="apps-ecommerce-order-details.html"
                                class="text-decoration-underline"
                                >VZ2451</a
                              >
                            </h3>
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
          <!-- importHoraire/>
            <end page title>
            <TableReport :header="header" :data="data" title="distance" tb="distance" @refreshTable="refreshTable" cbTable="mnDts"/-->
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
import MultipleBarChart from 'src/components/charts/MultipleBarChart.vue';
import { useRetourneMois } from '../composable/panneReport';
import { date } from 'quasar';
export default defineComponent({
  name: 'GraphConso',
  components: { PlageData, BarChart, MultipleBarChart },
  props: ['legendConsoTot', 'dataConso', 'title'],
  setup() {
    const consStore = useRepportStore();
    let report = ref('');
    let rapConso = computed(() => consStore.rapconso);
    let consoJour = computed(() => consStore.consoJour);
    let dataMois = computed(() => consStore.consMois);
    let data = ref([]);
    let rpl = ref('');
    let debut = ref<Date>();
    let fini = ref<Date>();
    let tdebut = ref<string>();
    let tfini = ref<string>();
    let vehs = ref<object[]>();
    let legendConsoTots = ref([]);
    let legendConsoJour = ref([]);
    let legendConsoDatJr = ref([]);
    let legendConsoMois = ref([]);
    let dataCons = ref([]);
    let dataConsoJour = ref([]);
    let dataConsoMois = ref([]);
    let codeBar = ref('');
    let choix = ref('');
    const changeDate = (dbs) => {
      return date.formatDate(dbs, 'DD-MM-YYYY');
    };
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
    const actualReport = (txt: string) => {
      report.value = txt;
    };
    watch(rapConso, (valeur) => {
      legendConsoTots.value = [];
      dataCons.value = [];
      if (valeur.length > 0) {
        valeur.forEach((val) => {
          if (val[0].totalconso != null) {
            legendConsoTots.value.push(val[0].vehicule.code);
            dataCons.value.push(val[0].totalconso);
          }
        });
      }
    });
    watch(consoJour, (valeur: Array<object>) => {
      legendConsoJour.value = [];
      legendConsoDatJr.value = [];
      if (valeur.length > 0) {
        valeur.forEach((val) => {
          if (val.length > 0) {
            val.forEach((v) => {
              legendConsoJour.value.push(v.vehicule.code);
              legendConsoDatJr.value.push(changeDate(v.DateConso));
            });
          }
        });
        legendConsoJour.value = [...new Set(legendConsoJour.value)];
        legendConsoDatJr.value = [...new Set(legendConsoDatJr.value)];
        dataConsoJour.value = [];
        legendConsoDatJr.value.forEach((dj) => {
          let tab = [];
          legendConsoJour.value.forEach((lg) => {
            let dts = 0;
            valeur.forEach((val) => {
              if (val.length > 0) {
                val.forEach((v) => {
                  if (
                    v.vehicule.code === lg &&
                    changeDate(v.DateConso) === dj
                  ) {
                    dts = 1;
                    tab.push(v.QteConso);
                  }
                });
              }
            });
            if (dts === 0) {
              tab.push(0);
            }
          });
          dataConsoJour.value.push({
            date: dj,
            data: tab,
          });
        });
      }
    });

    watch(dataMois, (valeur) => {
      legendConsoMois.value = [];
      dataConsoMois.value = [];
      if (valeur.length > 0) {
        valeur.forEach((val) => {
          legendConsoMois.value.push(useRetourneMois(val.monthConso));
          dataConsoMois.value.push(val.totalconso);
        });
      }
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
      codeBar,
      legendConsoJour,
      dataConsoJour,
      dataCons,
      legendConsoTots,
      legendConsoDatJr,
      legendConsoMois,
      dataConsoMois,
      choix,
    };
  },
});
</script>

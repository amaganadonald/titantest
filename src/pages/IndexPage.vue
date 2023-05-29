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
                <h4 class="mb-sm-0">Analytics</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item active">Analytics</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title -->
          <div class="row">
            <div class="col">
              <div class="h-100">
                <div class="row mb-3 pb-1">
                  <div class="col-12">
                    <div
                      class="d-flex align-items-lg-center flex-lg-row flex-column"
                    >
                      <div class="flex-grow-1">
                        <h4 class="fs-16 mb-1">Good Morning, Donald!</h4>
                        <p class="text-muted mb-0">
                          Here's what's happening with your GMAO today.
                        </p>
                      </div>
                      <div class="mt-3 mt-lg-0">
                        <form action="javascript:void(0);">
                          <div class="row g-3 mb-0 align-items-center">
                            <div class="col-sm-auto">
                              <div class="input-group">
                                <input
                                  type="text"
                                  class="form-control border-0 fs-13 dash-filter-picker shadow"
                                  data-provider="flatpickr"
                                  data-range-date="true"
                                  data-date-format="d M, Y"
                                  data-deafult-date="01 Jan 2022 to 31 Jan 2022"
                                />
                                <div
                                  class="input-group-text bg-secondary border-secondary text-white"
                                >
                                  <i class="ri-calendar-2-line"></i>
                                </div>
                              </div>
                            </div>
                            <!--end col-->
                            <div class="col-auto">
                              <button
                                type="button"
                                class="btn btn-add"
                                @click="refreshDash()"
                              >
                                <i
                                  class="mdi mdi-rotate-3d-variant align-middle me-1"
                                ></i>
                                Refresh Dashboard
                              </button>
                            </div>
                            <!--end col-->
                            <div class="col-auto">
                              <button
                                type="button"
                                class="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn"
                              >
                                <i class="ri-pulse-line"></i>
                              </button>
                            </div>
                            <!--end col-->
                          </div>
                          <!--end row-->
                        </form>
                      </div>
                    </div>
                    <!-- end card header -->
                  </div>
                  <!--end col-->
                </div>
                <!--end row-->

                <div class="row">
                  <div class="col-xl-3 col-md-3">
                    <CardComponent
                      title="Consommation"
                      :year="yearj"
                      :month="monthj"
                      unity="litres"
                      :tot="dataDash.totconso"
                      img="jauge_essence.png"
                    />
                  </div>
                  <!-- end col -->

                  <div class="col-xl-3 col-md-3">
                    <!-- card -->
                    <CardComponent
                      title="Total pannes"
                      :year="yearj"
                      :month="monthj"
                      unity=""
                      :tot="dataDash.totpanne"
                      img="car-service.png"
                    />
                    <!-- end card -->
                  </div>
                  <!-- end col -->

                  <div class="col-xl-3 col-md-3">
                    <!-- card -->
                    <CardComponent
                      title="Total Km"
                      :year="yearj"
                      :month="monthj"
                      unity=""
                      :tot="dataDash.totalkm"
                      img="impoert_fichier.gif"
                    />
                    <!-- end card -->
                  </div>
                  <!-- end col -->

                  <div class="col-xl-3 col-md-3">
                    <!-- card -->
                    <CardComponent
                      title="Age du parc"
                      :year="yearj"
                      :month="monthj"
                      unity=""
                      :tot="ageVeh"
                      img="img-3.png"
                    />
                    <!-- end card -->
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row-->

                <div class="row">
                  <div class="col-xl-8">
                    <div class="card">
                      <div
                        class="card-header border-0 align-items-center d-flex"
                      >
                        <h4 class="card-title mb-0 flex-grow-1">Pannes</h4>
                        <div>
                          <button
                            type="button"
                            class="btn btn-soft-secondary btn-sm"
                          >
                            ALL
                          </button>
                          <button
                            type="button"
                            class="btn btn-soft-secondary btn-sm"
                          >
                            1M
                          </button>
                          <button
                            type="button"
                            class="btn btn-soft-secondary btn-sm"
                          >
                            6M
                          </button>
                          <button
                            type="button"
                            class="btn btn-soft-primary btn-sm"
                          >
                            1Y
                          </button>
                        </div>
                      </div>
                      <!-- end card header -->

                      <div class="card-body p-0 pb-2">
                        <div class="w-100">
                          <div
                            id="customer_impression_charts"
                            class="apex-charts"
                            dir="ltr"
                          >
                            <PieChart
                              :legend="legendePie"
                              :titre="titlePie"
                              :dataGraph="dataPieGraph"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!-- end col -->

                  <div class="col-xl-4">
                    <!-- card -->
                    <div class="card card-height-100">
                      <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">
                          Ratio Disponiblité Type de véhicule
                        </h4>
                        <div class="flex-shrink-0">
                          <button
                            type="button"
                            class="btn btn-soft-primary btn-lg"
                          >
                            <q-icon name="mdi-file-download"></q-icon>
                          </button>
                        </div>
                      </div>
                      <!-- end card header -->

                      <!-- card body -->
                      <div class="card-body">
                        <div class="px-2 py-2 mt-1">
                          <ProgressBar
                            v-for="dsp in disponibilite"
                            :key="dsp.id"
                            :title="dsp.famille"
                            unity="%"
                            :total="dsp.total"
                          />
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!-- end col -->
                </div>

                <div class="row">
                  <div class="col-xl-12">
                    <div class="card">
                      <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">
                          Liste des Véhicules en panne
                        </h4>
                        <div class="flex-shrink-0">
                          <div class="dropdown card-header-dropdown">
                            <a
                              class="text-reset dropdown-btn"
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span class="fw-semibold text-uppercase fs-13"
                                >Sort by: </span
                              ><span class="text-muted"
                                >Today<i class="mdi mdi-chevron-down ms-1"></i
                              ></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                              <a class="dropdown-item" href="#">Today</a>
                              <a class="dropdown-item" href="#">Yesterday</a>
                              <a class="dropdown-item" href="#">Last 7 Days</a>
                              <a class="dropdown-item" href="#">Last 30 Days</a>
                              <a class="dropdown-item" href="#">This Month</a>
                              <a class="dropdown-item" href="#">Last Month</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card header -->

                      <div class="card-body">
                        <div
                          class="table-responsive table-card"
                          style="overflow-x: hidden"
                        >
                          <TableData
                            :header="header"
                            :data="data"
                            title="Pannes en cours"
                            tb="pannes"
                            @refreshTable="refreshTable"
                            cbTable="mnDts"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end row-->

                <!-- end row-->
              </div>
              <!-- end .h-100-->
            </div>
            <!-- end col -->
          </div>
        </div>
        <!-- container-fluid -->
      </div>
      <!-- End Page-content -->
    </div></q-page
  >
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed } from 'vue';
import CardComponent from '../components/CardComponent.vue';
import PieChart from '../components/charts/PieChart.vue';
import ProgressBar from '../components/progressBar/ProgressBar.vue';
import { useRepportStore } from '../stores/repport-store';
import { useQuasar } from 'quasar';
//import moment from 'moment';
import TableData from '../components/tables/TableData.vue';
//import { calcul_immo_panne_active } from '../composable/panneReport.ts';
export default defineComponent({
  name: 'IndexPage',
  components: {
    CardComponent,
    PieChart,
    TableData,
    ProgressBar,
  },
  setup() {
    const store = useRepportStore();
    let titlePie = ref('Repartition Type de panne');
    let legendePie = ref([]);
    const dataDash = computed(() => store.dataDash);
    let firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let data = ref([]);
    let lastDay = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    const $q = useQuasar();
    const monthj = ref('');
    const yearj = ref('');
    let ageVeh = ref('');
    let dataPieGraph = ref([]);
    let legendMultibar = ref(['Eon', 'Idle', 'Eoff']);
    let titleMultibar = ref('Efficience Conduite 6 derniers mois');
    let dataCategoryMultiBar = ref(['Jan', 'Fev', 'Mar', 'Avr', 'May', 'Jun']);
    let dataGraphMultibar = ref([]);
    let disponibilite = ref([]);
    const refreshDash = async () => {
      await store.analyseDashboard(firstDay, lastDay);
    };
    const convertDayToYear = (tab) => {
      let milis = 0;
      tab.forEach((cd) => {
        milis = milis + cd.ageVeh;
      });
      if (Math.floor(milis / 31536000000) !== 0) {
        ageVeh.value = Math.floor(milis / 31536000000 / tab.length) + ' an(s)';
      } else if (Math.floor(milis / 2629746000) != 0) {
        ageVeh.value = Math.floor(milis / 2629746000 / tab.length) + ' mois';
      } else {
        ageVeh.value = Math.floor(milis / tab.length) + ' jours';
      }
    };
    const header = [
      { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number' },
      {
        text: 'Code Ana',
        value: 'vehicule',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Identifiant',
        value: 'idpanne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'DateImmo',
        value: 'DateImmo',
        sortable: true,
        type: 'date',
      },
      {
        text: 'HeureImmo',
        value: 'HeureImmo',
        sortable: true,
        type: 'time',
      },
      {
        text: 'CausePanne',
        value: 'CausePanne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'lieu_panne',
        value: 'lieu_panne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Temps garage',
        value: 'tpanne',
        sortable: true,
        type: 'string',
      },
    ];
    const refreshTable = () => {
      store.analyseDashboard(firstDay, lastDay);
    };
    const frequencePanne = async (tab) => {
      dataPieGraph.value = [];
      legendePie.value = [];
      let total = 0;
      await tab.forEach((tb) => {
        total = total + tb.totalTypanne;
      });
      await tab.forEach((tbs) => {
        let pr = Math.round((tbs.totalTypanne / total) * 100);
        dataPieGraph.value.push({
          value: pr,
          name: tbs.libelle,
        });
        legendePie.value.push(tbs.libelle);
      });
    };
    const ratioDisponibilite = async (tab) => {
      disponibilite.value = [];
      let total = 0;
      await tab.forEach((tb) => {
        total = total + tb.nbTypePanne;
      });
      let i = 1;
      await tab.forEach((tbs) => {
        let pr = 100 - Math.round((tbs.nbTypePanne / total) * 100);
        disponibilite.value.push({
          id: i,
          famille: tbs.lib_type,
          total: pr,
        });
        i = i + 1;
      });
    };
    onBeforeMount(async () => {
      await store.analyseDashboard(firstDay, lastDay);
      if ($q.cookies.get('lang') === 'fr') {
        monthj.value = new Date().toLocaleString('fr-CA', { year: 'numeric' });
        yearj.value = new Date().toLocaleString('fr-CA', { month: 'short' });
      } else {
        monthj.value = new Date().toLocaleString('en-US', { year: 'numeric' });
        yearj.value = new Date().toLocaleString('en-US', { month: 'short' });
      }
      convertDayToYear(dataDash.value.ageVehicule);
      data.value = dataDash.value.pannes;
      /*let immo = calcul_immo_panne_active(
        dataDash.value.pannes,
        firstDay,
        lastDay
      );*/
      await frequencePanne(dataDash.value.typepanne);
      await ratioDisponibilite(dataDash.value.dispo);
      console.log(dataDash);
    });
    return {
      titlePie,
      legendePie,
      dataPieGraph,
      legendMultibar,
      titleMultibar,
      dataGraphMultibar,
      dataCategoryMultiBar,
      disponibilite,
      dataDash,
      monthj,
      yearj,
      refreshDash,
      ageVeh,
      data,
      header,
      refreshTable,
    };
  },
});
</script>

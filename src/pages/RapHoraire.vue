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
                <h4 class="mb-sm-0">RAPPORT HORAIRE</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Rapport</a>
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
                            @click="actualReport('horaireTotal')"
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Temps Conduite
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
                            @click="actualReport('horaireQuart')"
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Temps conduite par Quart
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
                            @click="actualReport('consoMoy')"
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
                            <h5 class="mb-1">{{ rpl }}</h5>
                            <TableRapport
                              :header="header"
                              :data="dataTimes"
                              @refreshTable="refreshTables"
                              :title="rpl"
                              filename="export_horaire"
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
                            <h5 class="mb-1">{{ rpl }}</h5>
                            <TableRapport
                              :header="headerQuart"
                              :data="dataQuart"
                              @refreshTable="refreshTables"
                              :title="rpl"
                              filename="export_Quart"
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
                            <h5 class="mb-1">{{ rpl }}</h5>
                            <TableRapport
                              :header="headerMois"
                              :data="dataHoraire"
                              @refreshTable="refreshTables"
                              :title="rpl"
                              filename="export_conso_mois"
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
import TableRapport from 'src/components/tables/TableRapport.vue';
import {
  useCalculHoraire,
  useCalculHoraireQuart,
} from 'src/composable/panneReport';
import dataCons from '../types/dataCons';
import dateConsDate from '../types/dataCons';
export default defineComponent({
  name: 'RapHoraire',
  components: { PlageData, TableRapport },
  setup() {
    const consStore = useRepportStore();
    let report = ref('');
    let dataHoraire = computed(() => consStore.horaires);
    let dataHoraireQuart = computed(() => consStore.horairesQuart);
    let dataTimes = ref([]);
    let dataQuart = ref([]);
    let dataJour = ref<dateConsDate[]>([]);
    let data = ref<dataCons[]>([]);
    let rpl = ref('');
    let debut = ref<Date>();
    let fini = ref<Date>();
    let tdebut = ref<string>();
    let tfini = ref<string>();
    let vehs = ref<object[]>();
    let choix = ref<string>('');
    const header = [
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        width: 40,
        type: 'string',
        title: 'Code',
        dataKey: 'code',
      },
      {
        text: 'Temps conduite',
        value: 'eon',
        sortable: true,
        type: 'string',
        title: 'Eon',
        dataKey: 'eon',
      },
      {
        text: 'Temps ralenti',
        value: 'idle',
        sortable: true,
        type: 'string',
        title: 'Temps ralenti',
        dataKey: 'idle',
      },
      {
        text: 'Temps Arrêt',
        value: 'eoff',
        sortable: true,
        type: 'string',
        title: 'Temps Arrêt',
        dataKey: 'eoff',
      },
      {
        text: 'Kilométrage',
        value: 'km',
        sortable: true,
        type: 'number',
        title: 'Kilométrage',
        dataKey: 'km',
      },
    ];
    const headerQuart = [
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        width: 40,
        type: 'string',
        title: 'Code',
        dataKey: 'code',
      },
      {
        text: 'Quart',
        value: 'quart',
        sortable: true,
        width: 40,
        type: 'string',
        title: 'Quart',
        dataKey: 'quart',
      },
      {
        text: 'Temps conduite',
        value: 'eon',
        sortable: true,
        type: 'string',
        title: 'Eon',
        dataKey: 'eon',
      },
      {
        text: 'Temps ralenti',
        value: 'idle',
        sortable: true,
        type: 'string',
        title: 'Temps ralenti',
        dataKey: 'idle',
      },
      {
        text: 'Temps Arrêt',
        value: 'eoff',
        sortable: true,
        type: 'string',
        title: 'Temps Arrêt',
        dataKey: 'eoff',
      },
      {
        text: 'Kilométrage',
        value: 'km',
        sortable: true,
        type: 'number',
        title: 'Kilométrage',
        dataKey: 'km',
      },
    ];

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

    watch(dataHoraire, (val) => {
      dataTimes.value = useCalculHoraire(
        val,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
    });
    watch(dataHoraireQuart, (val) => {
      dataQuart.value = useCalculHoraireQuart(
        val,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
    });

    return {
      actualReport,
      report,
      header,
      data,
      acquireDate,
      rpl,
      refreshTables,
      debut,
      fini,
      tdebut,
      tfini,
      headerQuart,
      dataJour,
      dataHoraire,
      dataTimes,
      dataQuart,
    };
  },
});
</script>

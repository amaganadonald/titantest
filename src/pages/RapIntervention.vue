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
                <h4 class="mb-sm-0">RAPPORT PANNES</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Rapport</a>
                    </li>
                    <li class="breadcrumb-item active">Immobilisation</li>
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
                                'Immobilisation du ',
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
                              :data="dataPanne"
                              @refreshTable="refreshTables"
                              :title="rpl"
                              filename="export_immo"
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
                              :header="headerDisponibilite"
                              :data="dataDisponibilite"
                              @refreshTable="refreshTables"
                              :title="rpl"
                              filename="export_sisponibilite"
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
                            <h5 class="mb-1">{{ rpl }}</h5>
                            <TableRapport
                              :header="headerDisponibiliteF"
                              :data="dataDisponibiliteF"
                              @refreshTable="refreshTables"
                              :title="rpl"
                              filename="export_sisponibilite"
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
import TableRapport from 'src/components/tables/TableRapport.vue';
import {
  useCalculImmoPanne,
  useCalculImmoPanneQuart,
  useCalculDispo,
  useCalculDispoFamille,
} from 'src/composable/panneReport';
import { dataCons } from '../types/dataCons';
import { dataconsDate } from '../types/dataCons';
export default defineComponent({
  name: 'RapIntervention',
  components: { PlageData, TableRapport },
  setup() {
    const consStore = useRepportStore();
    let report = ref('');
    let dataBasePanne = computed(() => consStore.immoData);
    let dataBasePanneQuart = computed(() => consStore.immoDataQuart);
    let dataPanne = ref([]);
    let databaseDispo = computed(() => consStore.dispoData);
    let databaseDispoF = computed(() => consStore.dispoFamille);
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
    const header = [
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        type: 'string',
        title: 'Code',
        dataKey: 'code',
      },
      {
        text: 'Immat',
        value: 'Immat',
        sortable: true,
        type: 'string',
        title: 'Immat',
        dataKey: 'Immat',
      },
      {
        text: 'Famille',
        value: 'famille',
        sortable: true,
        type: 'string',
        title: 'Famille',
        dataKey: 'famille',
      },
      {
        text: 'Type',
        value: 'typeVeh',
        sortable: true,
        type: 'string',
        title: 'Type',
        dataKey: 'typeVeh',
      },
      {
        text: 'Temps panne',
        value: 'tpsimmo',
        sortable: true,
        type: 'number',
        title: 'Temps en panne',
        dataKey: 'tpsimmo',
      },
    ];
    const headerQuart = [
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        type: 'string',
        title: 'Code',
        dataKey: 'code',
      },
      {
        text: 'Immat',
        value: 'Immat',
        sortable: true,
        type: 'string',
        title: 'Immat',
        dataKey: 'Immat',
      },
      {
        text: 'Famille',
        value: 'famille',
        sortable: true,
        type: 'string',
        title: 'Famille',
        dataKey: 'famille',
      },
      {
        text: 'Type',
        value: 'typeVeh',
        sortable: true,
        type: 'string',
        title: 'Type',
        dataKey: 'typeVeh',
      },
      {
        text: 'Quart I',
        value: 'quart1',
        sortable: true,
        type: 'number',
        title: 'Quart I',
        dataKey: 'quart1',
      },
      {
        text: 'Quart II',
        value: 'quart2',
        sortable: true,
        type: 'number',
        title: 'Quart II',
        dataKey: 'quart2',
      },
      {
        text: 'Quart III',
        value: 'quart3',
        sortable: true,
        type: 'number',
        title: 'Quart III',
        dataKey: 'quart3',
      },
      {
        text: 'Total',
        value: 'total',
        sortable: true,
        type: 'number',
        title: 'Total Immo',
        dataKey: 'total',
      },
    ];

    const headerDisponibilite = [
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        type: 'string',
        title: 'Code',
        dataKey: 'code',
      },
      {
        text: 'Immat',
        value: 'Immat',
        sortable: true,
        type: 'string',
        title: 'Immat',
        dataKey: 'Immat',
      },
      {
        text: 'Famille',
        value: 'famille',
        sortable: true,
        type: 'string',
        title: 'Famille',
        dataKey: 'famille',
      },
      {
        text: 'Type',
        value: 'typeVeh',
        sortable: true,
        type: 'string',
        title: 'Type',
        dataKey: 'typeVeh',
      },
      {
        text: '% disponibilte',
        value: 'tpsdispo',
        sortable: true,
        type: 'number',
        title: '% disponibilte',
        dataKey: 'tpsdispo',
      },
      {
        text: '% panne',
        value: 'tpspanne',
        sortable: true,
        type: 'number',
        title: '% panne',
        dataKey: 'tpspanne',
      },
    ];

    const headerDisponibiliteF = [
      {
        text: 'Famille',
        value: 'famille',
        sortable: true,
        type: 'string',
        title: 'Famille',
        dataKey: 'famille',
      },
      {
        text: '% disponibilte',
        value: 'tpsdispo',
        sortable: true,
        type: 'number',
        title: '% disponibilte',
        dataKey: 'tpsdispo',
      },
      {
        text: '% panne',
        value: 'tpspanne',
        sortable: true,
        type: 'number',
        title: '% panne',
        dataKey: 'tpspanne',
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
      dataPanne.value = useCalculImmoPanne(
        dataBasePanne.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
    });
    watch(dataBasePanneQuart, (val) => {
      console.log(dataBasePanneQuart.value);
      dataQuart.value = useCalculImmoPanneQuart(
        dataBasePanneQuart.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
    });

    watch(databaseDispo, (val) => {
      dataDisponibilite.value = useCalculDispo(
        databaseDispo.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
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
      dataPanne,
      dataTimes,
      dataQuart,
      dataBasePanne,
      headerDisponibilite,
      dataDisponibilite,
      headerDisponibiliteF,
      dataDisponibiliteF,
      titleReport,
      plage,
    };
  },
});
</script>

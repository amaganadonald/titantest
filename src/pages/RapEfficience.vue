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
                <h4 class="mb-sm-0">RAPPORT EFFICIENCE</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Rapport</a>
                    </li>
                    <li class="breadcrumb-item active">Efficience</li>
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
                                'efficience',
                                'Efficience Parc du ',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Efficience
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
                                'efficienceMeca',
                                'Efficience Mecanique du ',
                                'select'
                              )
                            "
                          >
                            <i
                              class="mdi mdi-checkbox-blank-circle font-size-11 me-2"
                            ></i
                            >Efficience Mecanique
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
                              :data="data"
                              @refreshTable="refreshTables"
                              :title="rpl"
                              filename="export_efficience"
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
                              :header="headerJour"
                              :data="dataJour"
                              @refreshTable="refreshTables"
                              :title="rpl"
                              filename="export_conso_jour"
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
import { useCalculEfficience, secToTime } from '../composable/panneReport';
import { dataCons, dataconsDate } from '../types/dataCons';
import { date } from 'quasar';
export default defineComponent({
  name: 'RapEfficience',
  components: { PlageData, TableRapport },
  setup() {
    const consStore = useRepportStore();
    let report = ref('');
    let rapEfficience = computed(() => consStore.efficience);
    let consoJour = computed(() => consStore.consoJour);
    let dataMois = computed(() => consStore.consMois);
    let dataJour = ref<dataconsDate[]>([]);
    let data = ref<dataCons[]>([]);
    let rpl = ref('');
    let debut = ref<Date>();
    let fini = ref<Date>();
    let tdebut = ref<string>();
    let tfini = ref<string>();
    let vehs = ref<object[]>();
    let choix = ref<string>('');
    let titleReport = ref<string>('');
    let plage = ref<string>('');
    const header = [
      {
        text: 'Id',
        value: 'id',
        sortable: true,
        width: 20,
        type: 'number',
        title: 'Id',
        dataKey: 'id',
      },
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        width: 40,
        type: 'image',
        title: 'Code',
        dataKey: 'code',
      },
      {
        text: 'Immat',
        value: 'immat',
        sortable: true,
        type: 'string',
        title: 'Immat',
        dataKey: 'immat',
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
        text: 'Marque',
        value: 'marque',
        sortable: true,
        type: 'string',
        title: 'Marque',
        dataKey: 'marque',
      },
      {
        text: 'Temps Conduite',
        value: 'eon',
        sortable: true,
        type: 'time',
        title: 'Temps Conduite',
        dataKey: 'eon',
      },
      {
        text: 'Temps Idle',
        value: 'idle',
        sortable: true,
        type: 'time',
        title: 'Temps arret moteur tournant',
        dataKey: 'idle',
      },
      {
        text: 'Duree panne',
        value: 'tpanne',
        sortable: true,
        type: 'time',
        title: 'Duree panne',
        dataKey: 'tpanne',
      },
      {
        text: 'Temps Arrêt',
        value: 'eoff',
        sortable: true,
        type: 'time',
        title: 'Temps Arrêt',
        dataKey: 'eoff',
      },
    ];
    const headerJour = [
      {
        text: 'Id',
        value: 'id',
        sortable: true,
        width: 20,
        type: 'number',
        title: 'Id',
        dataKey: 'id',
      },
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        width: 40,
        type: 'image',
        title: 'Code',
        dataKey: 'code',
      },
      {
        text: 'Immat',
        value: 'immat',
        sortable: true,
        type: 'string',
        title: 'Immat',
        dataKey: 'immat',
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
        text: 'Marque',
        value: 'marque',
        sortable: true,
        type: 'string',
        title: 'Marque',
        dataKey: 'marque',
      },
      {
        text: '% Temps Dispo',
        value: 'tdispo',
        sortable: true,
        type: 'string',
        title: '% Temps Dispo',
        dataKey: 'tdispo',
      },
      {
        text: '% temps panne',
        value: 'tpanne',
        sortable: true,
        type: 'date',
        title: '% temps panne',
        dataKey: 'tpanne',
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
      await consStore.analyseEfficience(
        vehs.value,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value
      );
    };
    const actualReport = (txt: string, title: string, plages: string) => {
      rpl.value = '';
      if (txt === 'efficience') {
        rpl.value = 'Efficience Parc';
      }
      report.value = txt;
      titleReport.value = title;
      plage.value = plages;
    };
    watch(rapEfficience, (valeur) => {
      let dbEff = useCalculEfficience(
        valeur,
        debut.value,
        fini.value,
        tdebut.value,
        tfini.value,
        vehs.value
      );
      let i = 1;
      dbEff.forEach((ef) => {
        data.value.push({
          id: i,
          code: ef.code.code,
          immat: ef.code.Immat,
          typeVeh: ef.code.type_veh.lib_type,
          marque: ef.code.Marque.libelle,
          eon: ef.horaire.length > 0 ? secToTime(ef.horaire[0].eon) : 0,
          idle: ef.horaire.length > 0 ? secToTime(ef.horaire[0].idle) : 0,
          tpanne: secToTime(ef.panne),
          eoff:
            ef.horaire.length > 0
              ? ef.horaire[0].eoff - ef.panne < 0
                ? 0
                : secToTime(ef.horaire[0].eoff - ef.panne)
              : secToTime(
                  date.getDateDiff(
                    new Date(fini.value + ' ' + tfini.value),
                    new Date(debut.value + ' ' + tdebut.value),
                    'seconds'
                  ) - ef.panne
                ),
        });
        i++;
      });
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
      headerJour,
      dataJour,
      dataMois,
      titleReport,
      plage,
    };
  },
});
</script>

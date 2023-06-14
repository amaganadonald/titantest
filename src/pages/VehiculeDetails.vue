<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="profile-foreground position-relative mx-n4 mt-n4">
          <div class="profile-wid-bg">
            <img :src="ig" alt="" class="profile-wid-img" />
          </div>
        </div>
        <div class="pt-4 mb-4 mb-lg-3 pb-lg-4">
          <div class="row g-4">
            <div class="col-auto">
              <div class="avatar-lg">
                <img
                  :src="ig"
                  alt="user-img"
                  class="img-thumbnail rounded-circle"
                />
              </div>
            </div>
            <!--end col-->
            <div class="col">
              <div class="p-2">
                <h3 class="text-white mb-1">
                  {{ vehicle.code }} - {{ vehicle.Immat }}
                </h3>
                <p class="text-white-75" v-if="vehicle.Marque != null">
                  <img
                    :src="getImageUrl(vehicle.Marque.image)"
                    alt=""
                    class="avatar-xs me-2"
                  />
                  {{ vehicle.Marque.libelle }}
                </p>
                <div class="hstack text-white-50 gap-1">
                  <div>
                    <i
                      class="mdi mdi-cast me-1 text-white-75 fs-16 align-middle"
                    ></i
                    >{{ vehicle.EtahVeh }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end row-->
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div>
              <div class="d-flex">
                <ul
                  class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link fs-14 active"
                      data-bs-toggle="tab"
                      href="#overview-tab"
                      role="tab"
                    >
                      <i class="ri-airplay-fill d-inline-block d-md-none"></i>
                      <span class="d-none d-md-inline-block">Overview</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link fs-14"
                      data-bs-toggle="tab"
                      href="#documents"
                      role="tab"
                    >
                      <i class="ri-folder-4-line d-inline-block d-md-none"></i>
                      <span class="d-none d-md-inline-block">Documents</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link fs-14"
                      data-bs-toggle="tab"
                      href="#activities"
                      role="tab"
                    >
                      <i class="ri-list-unordered d-inline-block d-md-none"></i>
                      <span class="d-none d-md-inline-block"
                        >Immobilisations</span
                      >
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link fs-14"
                      data-bs-toggle="tab"
                      href="#projects"
                      role="tab"
                    >
                      <i class="ri-price-tag-line d-inline-block d-md-none"></i>
                      <span class="d-none d-md-inline-block"
                        >Consommations</span
                      >
                    </a>
                  </li>
                </ul>
                <div class="flex-shrink-0">
                  <button
                    @click="editItem(vehicle)"
                    type="button"
                    class="btn btn-success"
                  >
                    <q-tooltip>Edit Profile</q-tooltip>
                    <i class="fa-regular fa-pen-to-square"></i> Edit Paramètres
                  </button>
                </div>
              </div>
              <!-- Tab panes -->
              <div class="tab-content pt-4 text-muted">
                <div class="tab-pane active" id="overview-tab" role="tabpanel">
                  <div class="row">
                    <div class="col-xxl-3">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title mb-5">Informations</h5>
                          <div
                            class="progress animated-progress custom-progress progress-label"
                          >
                            <div
                              class="progress-bar bg-danger"
                              role="progressbar"
                              style="width: 30%"
                              aria-valuenow="100"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div class="label">100%</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title mb-3">Générales</h5>
                          <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <th class="ps-0" scope="row">
                                    Code analytique
                                  </th>
                                  <td class="text-muted">{{ vehicle.code }}</td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">
                                    Immatriculation
                                  </th>
                                  <td class="text-muted">
                                    {{ vehicle.Immat }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">Libelle</th>
                                  <td class="text-muted">
                                    {{ vehicle.libelle }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">Etat</th>
                                  <td class="text-muted">
                                    {{ vehicle.EtahVeh }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">Puissance</th>
                                  <td class="text-muted">
                                    {{ vehicle.PuissanceVeh }} CV
                                  </td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">Carburant</th>
                                  <td
                                    class="text-muted"
                                    v-if="vehicle.carburant != null"
                                  >
                                    {{ vehicle.carburant.libelle }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">Activité</th>
                                  <td
                                    class="text-muted"
                                    v-if="vehicle.activiteVeh != null"
                                  >
                                    {{ vehicle.activiteVeh.activite_name }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <!-- end card body -->
                      </div>
                      <!-- end card -->
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title mb-4">Fournisseur</h5>
                          <div class="d-flex flex-wrap gap-2">
                            <div v-if="vehicle.Fournisseur != null">
                              {{ vehicle.Fournisseur.libelle }}
                            </div>
                          </div>
                          <div class="d-flex flex-wrap gap-2">
                            <div v-if="vehicle.Fournisseur != null">
                              ({{ vehicle.Fournisseur.description }})
                            </div>
                          </div>
                        </div>
                        <!-- end card body -->
                      </div>
                      <!-- end card -->
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title mb-4">Marque</h5>
                          <div class="d-flex flex-wrap gap-2">
                            <div v-if="vehicle.Marque != null">
                              {{ vehicle.Marque.libelle }}
                            </div>
                          </div>
                          <div class="d-flex flex-wrap gap-2">
                            <div v-if="vehicle.Marque != null">
                              ({{ vehicle.Marque.description }})
                            </div>
                          </div>
                        </div>
                        <!-- end card body -->
                      </div>
                      <!-- end card -->

                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title mb-4">Date</h5>
                          <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <th class="ps-0" scope="row">Acquisition</th>
                                  <td class="text-muted">
                                    {{ changeDate(vehicle.MiseService) }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">
                                    Mise en service
                                  </th>
                                  <td class="text-muted">
                                    {{ changeDate(vehicle.DateService) }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">Tracking</th>
                                  <td class="text-muted">
                                    {{ changeDate(vehicle.DateTracking) }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="ps-0" scope="row">Sortie</th>
                                  <td class="text-muted">
                                    {{ changeDate(vehicle.DateSortie) }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <!-- end card body -->
                      </div>
                      <!-- end card -->

                      <!--end card-->
                    </div>
                    <!--end col-->
                  </div>
                  <!--end row-->
                </div>
                <div class="tab-pane fade" id="activities" role="tabpanel">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title mb-3">Immobilisation</h5>
                      <TableData
                        :header="headerpanne"
                        :data="dataPanne"
                        title="Panne"
                        tb="intervention"
                        @refreshTable="refreshTable"
                        cbTable="mnDts"
                      />
                    </div>
                    <!--end card-body-->
                  </div>
                  <!--end card-->
                </div>
                <!--end tab-pane-->
                <div class="tab-pane fade" id="projects" role="tabpanel">
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-lg-12">
                          <TableData
                            :header="header"
                            :data="cons"
                            title="conso"
                            tb="conso"
                            @refreshTable="refreshTable"
                            cbTable="mnDts"
                          />
                        </div>
                      </div>
                      <!--end row-->
                    </div>
                    <!--end card-body-->
                  </div>
                  <!--end card-->
                </div>
                <q-dialog
                  v-model="seamless"
                  position="right"
                  seamless
                  transition-show="fade"
                  transition-hide="slide-down"
                >
                  <q-card style="width: 600px; max-width: 90vw">
                    <q-card-section>
                      <UploadFiles
                        :code="vehicle"
                        :operation="op"
                        :closeModal="closeModal"
                      />
                    </q-card-section>
                  </q-card>
                </q-dialog>
                <!--end tab-pane-->
                <div class="tab-pane fade" id="documents" role="tabpanel">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-4">
                        <h5 class="card-title flex-grow-1 mb-0">Documents</h5>
                        <div class="flex-shrink-0">
                          <label for="formFile" class="btn btn-danger"
                            ><i
                              class="mdi mdi-format-vertical-align-bottom me-1 align-bottom"
                              @click="openModal()"
                            ></i>
                            Upload File</label
                          >
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="card">
                            <div class="card-body">
                              <q-dialog
                                v-model="pdfModal"
                                position="right"
                                seamless
                                transition-show="fade"
                                transition-hide="slide-down"
                              >
                                <q-card style="width: 1200px; max-width: 90vw">
                                  <q-card-section>
                                    <PdfviewerVue :src="ulr" />
                                  </q-card-section>
                                </q-card>
                              </q-dialog>
                              <div class="table-responsive">
                                <table
                                  class="table table-borderless align-middle mb-0"
                                >
                                  <thead class="table-light">
                                    <tr>
                                      <th scope="col">File Name</th>
                                      <th scope="col">Type</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Date Expiration</th>
                                      <th scope="col">Delais</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="doc in document" :key="doc.id">
                                      <td>
                                        <div class="d-flex align-items-center">
                                          <div class="avatar-sm">
                                            <div
                                              class="avatar-title bg-soft-primary text-primary rounded fs-20"
                                            >
                                              <img
                                                src="../assets/images/pdf.png"
                                                alt="pdf"
                                                v-if="
                                                  doc.type === 'application/pdf'
                                                "
                                                class="avatar-xs"
                                              />
                                              <img
                                                src="../assets/images/officeWord.png"
                                                alt="pdf"
                                                v-else-if="
                                                  doc.type ===
                                                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                                "
                                                class="avatar-xs"
                                              />
                                              <img
                                                src="../assets/images/excel.png"
                                                alt="pdf"
                                                v-else-if="
                                                  doc.type ===
                                                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                                "
                                                class="avatar-xs"
                                              />
                                              <i
                                                class="ri-file-zip-fill"
                                                v-else
                                              ></i>
                                            </div>
                                          </div>
                                          <div class="ms-3 flex-grow-1">
                                            <h6 class="fs-15 mb-0">
                                              <span
                                                @click="openPdf(doc.url)"
                                                style="cursor: pointer"
                                                >{{ doc.nom }}</span
                                              >
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>{{ doc.typedocumentId }}</td>
                                      <td>
                                        <q-chip
                                          v-if="doc.Status === true"
                                          dense
                                          color="teal"
                                          text-color="white"
                                          ><i
                                            class="fa-solid fa-circle-check"
                                          ></i
                                        ></q-chip>
                                        <q-chip
                                          v-else
                                          dense
                                          color="red"
                                          text-color="white"
                                          ><i
                                            class="fa-sharp fa-solid fa-xmark"
                                          ></i
                                        ></q-chip>
                                      </td>
                                      <td>{{ changeDate(doc.expiration) }}</td>
                                      <td>{{ doc.deadLine }}</td>
                                      <td>
                                        <div class="dropdown">
                                          <a
                                            href="javascript:void(0);"
                                            class="btn btn-light btn-icon"
                                            id="dropdownMenuLink15"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="true"
                                          >
                                            <i
                                              class="mdi mdi-filter-variant"
                                            ></i>
                                          </a>
                                          <ul
                                            class="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuLink15"
                                          >
                                            <li>
                                              <a
                                                class="dropdown-item"
                                                href="javascript:void(0);"
                                                ><i
                                                  class="ri-eye-fill me-2 align-middle text-muted"
                                                ></i
                                                >View</a
                                              >
                                            </li>
                                            <li>
                                              <a
                                                class="dropdown-item"
                                                href="javascript:void(0);"
                                                ><i
                                                  class="ri-download-2-fill me-2 align-middle text-muted"
                                                ></i
                                                >Download</a
                                              >
                                            </li>
                                            <li class="dropdown-divider"></li>
                                            <li>
                                              <a
                                                class="dropdown-item"
                                                href="javascript:void(0);"
                                                ><i
                                                  class="ri-delete-bin-5-line me-2 align-middle text-muted"
                                                ></i
                                                >Delete</a
                                              >
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end tab-pane-->
              </div>
              <!--end tab-content-->
            </div>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
  </div>
  <!-- end main content-->
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingStore } from '../stores/settings-store';
import { useRepportStore } from '../stores/repport-store';
import { useMaintenanceStore } from '../stores/maintenance-store';
import { date, useQuasar } from 'quasar';
import UploadFiles from '../components/Modals/UploadFiles.vue';
import PdfviewerVue from '../components/PdfviewerVue.vue';
import TableData from '../components/tables/TableData.vue';
export default defineComponent({
  name: 'VehiculeDetails',
  components: {
    UploadFiles,
    PdfviewerVue,
    TableData,
  },
  setup() {
    const router = useRouter();
    const store = useSettingStore();
    const storeCons = useRepportStore();
    const storePanne = useMaintenanceStore();
    const vehicle = computed(() => store.vehicle);
    const document = computed(() => store.documentVeh);
    let typeDoc = computed(() => store.typeDocument);
    const cons = computed(() => storeCons.consoVeh);
    const $q = useQuasar();
    const pdfModal = ref(false);
    const ulr = ref(null);
    const ig = ref('');
    const op = ref('');
    let seamless = ref(false);
    let operation = ref('');
    let dataPannes = computed(() => storePanne.dataPanneCode);
    let dataPanne = ref([]);
    const opeData = ref<object>([]);
    const getImageUrl = (img: any) => {
      if (img != null) {
        return $q.cookies.get('ht') + img;
      }
    };
    let code = ref();
    const editItem = (item: object) => {
      console.log(item);
      operation.value = 'edit';
      opeData.value = item;
      seamless.value = true;
    };
    const changeDate = (dbs: string | number | Date) => {
      return date.formatDate(dbs, 'DD-MM-YYYY');
    };
    const openModal = () => {
      op.value = 'add';
      seamless.value = true;
    };
    const closeModal = async () => {
      await store.allDocumentVeh(code.value);
      seamless.value = false;
    };
    const openPdf = (url) => {
      console.log(getImageUrl(url));
      ulr.value = getImageUrl(url);
      pdfModal.value = true;
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
        text: 'Date',
        value: 'DateConso',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Heure',
        value: 'HeureConso',
        sortable: true,
        type: 'time',
      },
      {
        text: 'Quantité',
        value: 'QteConso',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Carburant',
        value: 'carburant',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Chauffeur',
        value: 'personnel',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Action',
        value: 'operation',
        sortable: true,
        type: 'action',
      },
    ];
    const headerpanne = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      {
        text: 'Code ana',
        value: 'vehicule',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Code Intervention',
        value: 'idIntervention',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Bon panne',
        value: 'idpanne',
        sortable: true,
        type: 'string',
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
      { text: 'TypeInt', value: 'type_panne', sortable: true, type: 'object' },
      { text: 'DetailInt', value: 'DetailInt', sortable: true, type: 'string' },
      {
        text: 'DateImmo',
        value: 'DateImmo',
        sortable: true,
        type: 'date',
      },

      { text: 'DateDebInt', value: 'DateDebInt', sortable: true, type: 'date' },

      { text: 'DateFinInt', value: 'DateFinInt', sortable: true, type: 'date' },

      {
        text: 'DateSortie',
        value: 'DateSortie',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Durée Intervention',
        value: 'immo',
        sortable: true,
        type: 'string',
      },

      { text: 'ap5', value: 'ap5', sortable: true, type: 'string' },
    ];
    watch(dataPannes, (val) => {
      dataPanne.value = [];
      let idInterv = '';
      let typepanne = '';
      let detailPanne = '';
      let dateDebInt = '';
      let dateFinInt = '';
      let ap5 = '';
      val.forEach((elt) => {
        console.log(elt);
        if (elt.intervention !== null) {
          idInterv = elt.intervention.id;
          typepanne = elt.intervention.type_panne;
          detailPanne = elt.intervention.DetailInt;
          dateDebInt = elt.intervention.DateDebInt;
          dateFinInt = elt.intervention.DateFinInt;
          ap5 = elt.intervention.ap5;
        }
        dataPanne.value.push({
          id: elt.id,
          vehicule: elt.vehicule,
          idIntervention: idInterv,
          idpanne: elt.idpanne,
          CausePanne: elt.CausePanne,
          lieu_panne: elt.lieu_panne,
          type_panne: typepanne,
          DetailInt: detailPanne,
          DateImmo: elt.DateImmo,
          DateDebInt: dateDebInt,
          DateFinInt: dateFinInt,
          DateSortie: elt.DateSortie,
          immo: elt.tpanne,
          ap5: ap5,
        });
      });
      console.log(cons.value);
      //dataPanne.value = val;
    });
    const refreshTable = async () => {
      await storeCons.allConsoVeh(router.currentRoute.value.params.code);
    };
    onMounted(async () => {
      code.value = router.currentRoute.value.params.code;
      await store.vehicleByCode(code.value);
      await store.allTypeDocument();
      await store.allDocumentVeh(code.value);
      await storeCons.allConsoVeh(code.value);
      await storePanne.allInterventionByCode(code.value);
      ig.value = getImageUrl(vehicle.value.image);
    });
    return {
      vehicle,
      ig,
      editItem,
      operation,
      opeData,
      seamless,
      getImageUrl,
      changeDate,
      openModal,
      op,
      closeModal,
      document,
      pdfModal,
      openPdf,
      ulr,
      cons,
      header,
      refreshTable,
      headerpanne,
      dataPanne,
    };
  },
});
</script>

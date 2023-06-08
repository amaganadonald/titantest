<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row g-2">
          <div class="row">
            <div class="col-xl-3 col-lg-4">
              <div class="card">
                <div class="card-header">
                  <div class="d-flex mb-3">
                    <div class="flex-grow-1">
                      <h5 class="fs-16">Profil</h5>
                    </div>
                  </div>
                </div>

                <div class="accordion accordion-flush filter-accordion">
                  <div class="card-body border-bottom">
                    <div>
                      <ul
                        class="list-unstyled mb-0 filter-list"
                        v-for="item in dataProf"
                        :key="item.id"
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
                          @click="viewProfile(item)"
                        >
                          {{ item.name }}
                        </div>
                      </ul>
                    </div>
                  </div>

                  <div class="accordion-item"></div>
                  <!-- end accordion-item -->

                  <div class="accordion-item"></div>
                  <!-- end accordion-item -->
                </div>
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->
            <q-dialog
              v-model="seamless"
              position="right"
              seamless
              transition-show="fade"
              transition-hide="slide-down"
            >
              <q-card style="width: 800px; max-width: 90vw">
                <q-card-section>
                  <ManageDataVue
                    :head="headers"
                    :data="opeData"
                    :operation="operation"
                    :title="$props.title"
                    :tbname="$props.tb"
                    @closeModal="closeModal"
                  />
                </q-card-section>
              </q-card>
            </q-dialog>
            <div class="col-xl-9 col-lg-8">
              <div>
                <div class="card">
                  <div class="card-header border-0">
                    <div class="row g-4">
                      <div class="col-sm-auto">
                        <button
                          @click="New2()"
                          type="button"
                          class="btn btn-primary"
                        >
                          <q-tooltip>ajouter Profil</q-tooltip>
                          <i class="fa-solid fa-circle-plus"></i> Add</button
                        >&nbsp;
                        <button
                          @click="manages('edit')"
                          v-if="dataMenus.length > 0 || dataAuth != null"
                          type="button"
                          class="btn btn-danger"
                        >
                          <q-tooltip>modifier profil</q-tooltip>
                          <i class="fa-solid fa-trash-can"></i> editer</button
                        >&nbsp;
                        <button
                          @click="manages('delete')"
                          v-if="dataMenus.length > 0 || dataAuth != null"
                          type="button"
                          class="btn btn-danger"
                        >
                          <q-tooltip>supprimer profil</q-tooltip>
                          <i class="fa-solid fa-trash-can"></i> delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- end card header -->
                  <div class="card-body">
                    <div class="row">
                      <div class="col-4" v-if="dataAuth != null">
                        <h2 class="accordion-header" id="flush-headingDiscount">
                          <button
                            class="accordion-button bg-transparent shadow-none collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseDiscount"
                            aria-expanded="true"
                            aria-controls="flush-collapseDiscount"
                          >
                            <span
                              class="text-muted text-uppercase fs-12 fw-medium"
                              >Autorisations</span
                            >
                            <span
                              class="badge bg-success rounded-pill align-middle ms-1 filter-badge"
                            ></span>
                          </button>
                        </h2>
                        <div
                          id="flush-collapseDiscount"
                          class="accordion-collapse collapse show"
                          aria-labelledby="flush-headingDiscount"
                        >
                          <div class="accordion-body text-body pt-1">
                            <div class="d-flex flex-column gap-2 filter-check">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.cp"
                                  id="COPY"
                                  checked
                                  v-if="dataAuth.cp === true"
                                />
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.cp"
                                  id="COPY"
                                  v-else
                                />
                                <div class="form-check-label flex-grow-1">
                                  <div>
                                    <h5 class="fs-14 mb-1">COPY</h5>
                                    <p class="fs-13 text-muted mb-0">
                                      Copie des données
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.ad"
                                  id="ADD"
                                  checked
                                  v-if="dataAuth.ad === true"
                                />
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.ad"
                                  id="ADD"
                                  v-else
                                />
                                <div class="form-check-label flex-grow-1">
                                  <div>
                                    <h5 class="fs-14 mb-1">ADD</h5>
                                    <p class="fs-13 text-muted mb-0">
                                      Ajouter données
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.del"
                                  id="DELETE"
                                  checked
                                  v-if="dataAuth.del === true"
                                />
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.del"
                                  id="DELETE"
                                  v-else
                                />
                                <div class="form-check-label flex-grow-1">
                                  <div>
                                    <h5 class="fs-14 mb-1">DELETE</h5>
                                    <p class="fs-13 text-muted mb-0">
                                      Supprimer données
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.up"
                                  id="UPDATE"
                                  checked
                                  v-if="dataAuth.up === true"
                                />
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.up"
                                  id="UPDATE"
                                  v-else
                                />
                                <div class="form-check-label flex-grow-1">
                                  <div>
                                    <h5 class="fs-14 mb-1">UPDATE</h5>
                                    <p class="fs-13 text-muted mb-0">
                                      Mise à jour des données
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.upl"
                                  id="productdiscountRadio3"
                                  checked
                                  v-if="dataAuth.upl === true"
                                />
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="dataAuth.upl"
                                  id="UPLOAD"
                                  v-else
                                />
                                <div class="form-check-label flex-grow-1">
                                  <div>
                                    <h5 class="fs-14 mb-1">UPLOAD</h5>
                                    <p class="fs-13 text-muted mb-0">
                                      importer des données
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end tab pane -->

                      <div class="col-8" v-if="dataMenus.length > 0">
                        <h2 class="accordion-header" id="flush-headingBrands">
                          <button
                            class="accordion-button bg-transparent shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseBrands"
                            aria-expanded="true"
                            aria-controls="flush-collapseBrands"
                          >
                            <span
                              class="text-muted text-uppercase fs-12 fw-medium"
                              >Menus</span
                            >
                            <span
                              class="badge bg-success rounded-pill align-middle ms-1 filter-badge"
                            ></span>
                          </button>
                        </h2>

                        <div
                          id="flush-collapseBrands"
                          class="accordion-collapse collapse show"
                          aria-labelledby="flush-headingBrands"
                        >
                          <div class="accordion-body text-body pt-0">
                            <div class="search-box search-box-sm">
                              <input
                                type="text"
                                class="form-control bg-light border-0"
                                id="searchBrandsList"
                                placeholder="Search Menu..."
                                v-model="searchValue"
                              />
                              <i class="ri-search-line search-icon"></i>
                            </div>
                            <div
                              class="row align-items-center d-flex flex-column gap-2 mt-3 filter-check"
                              v-for="men in dataMenus"
                              :key="men.id"
                            >
                              <div col-sm-3>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="Boat"
                                    id="productBrandRadio5"
                                    checked
                                  />
                                  <label
                                    class="form-check-label"
                                    for="productBrandRadio5"
                                    >{{ men.name }}</label
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end tab pane -->

                      <!-- end tab pane -->
                    </div>
                    <!-- end tab content -->
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->
              </div>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { watch, defineComponent, computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import ManageDataVue from '../Modals/ManageData.vue';

export default defineComponent({
  name: 'TableProfil',
  props: ['dataP', 'head', 'tb', 'title'],
  components: {
    ManageDataVue,
  },
  setup(props) {
    let pg = ref(true);
    const { t } = useI18n({ useScope: 'global' });
    let manage2 = ref(false);
    let action = ref(null);
    let loading = ref(false);
    let selected = ref([]);
    let donnees = ref([]);
    let op = ref(null);
    let filter = ref('');
    let dataProf = computed(() => props.dataP);
    let dataAuth = ref(null);
    let dataMenus = ref([]);
    let dataMen = ref([]);
    let settings = ref([]);
    let pro = ref('');
    let headers = ref('');
    let searchValue = ref('');
    let selectedMenu = ref(['Tableau de Bord']);
    let operation = ref('');
    let seamless = ref(false);
    let opeData = ref([]);
    let selectedItem = ref([]);

    const New2 = () => {
      operation.value = 'add';
      opeData.value = [];
      seamless.value = true;
    };
    const manages = (op) => {
      operation.value = op;
      opeData.value = selectedItem.value;
      seamless.value = true;
    };

    watch(searchValue, (currentvalue) => {
      console.log(currentvalue);
      if (searchValue.value != '') {
        dataMenus.value = dataMen.value.filter(
          (dt) =>
            dt.name.toLowerCase().startsWith(currentvalue.toLowerCase()) ||
            dt.name.toLowerCase().endsWith(currentvalue)
        );
      } else {
        dataMenus.value = dataMen.value;
      }
      console.log(dataMenus.value);
    });

    const viewProfile = (item) => {
      selectedItem.value = item;
      dataAuth.value = item.autorisation;
      dataMen.value = item.menus;
      dataMenus.value = item.menus;
    };

    const filterDate = function (str) {
      return moment(String(str)).format('DD/MM/YYYY');
    };

    const closeModal = () => {
      seamless.value = false;
    };

    onMounted(() => {
      headers.value = props.head;
    });
    return {
      filterDate,
      manages,
      New2,
      viewProfile,
      dataAuth,
      dataMen,
      settings,
      selectedMenu,
      pro,
      dataMenus,
      searchValue,
      dataProf,
      filter,
      loading,
      selected,
      headers,
      seamless,
      operation,
      opeData,
      closeModal,
    };
  },
});
</script>

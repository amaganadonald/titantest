<template>
  <!-- ============================================================== -->
  <!-- Start right Content here -->
  <!-- ============================================================== -->
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">FICHE PANNE</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="javascript: void(0);">Pannes</a>
                  </li>
                  <li class="breadcrumb-item active">Fiche panne</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <!-- end page title -->

        <div class="row g-4 mb-3">
          <div class="col-sm-auto">
            <div>
              <button type="button" class="btn btn-primary" @click="addItem()">
                <q-tooltip>Add data</q-tooltip>
                <i class="fa-solid fa-circle-plus"></i> Add Data
              </button>
            </div>
          </div>
          <div class="col-sm">
            <div class="d-flex justify-content-sm-end gap-2">
              <div class="search-box ms-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                />
                <i class="ri-search-line search-icon"></i>
              </div>

              <select
                class="form-control w-md"
                data-choices
                data-choices-search-false
              >
                <option value="All">All</option>
                <option value="Today">Today</option>
                <option value="Yesterday" selected>Yesterday</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Month">This Month</option>
                <option value="Last Year">Last Year</option>
              </select>
            </div>
          </div>
        </div>
        <q-dialog
          v-model="seamless"
          position="bottom"
          seamless
          transition-show="fade"
          transition-hide="slide-down"
        >
          <q-card style="width: 1100px; max-width: 90vw">
            <q-card-section>
              <panneComponent
                :operation="operation"
                :data="dataForm"
                @close-modal="closePopup"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
        <div class="row">
          <div
            v-for="pn in dataShow"
            :key="pn.id"
            class="col-xxl-3 col-sm-6 project-card"
          >
            <div class="card card-height-100">
              <div class="card-body">
                <div class="d-flex flex-column h-100">
                  <div class="d-flex">
                    <div class="flex-grow-1">
                      <p class="text-muted mb-4">
                        <q-tooltip> Temps au garage </q-tooltip>
                        {{ tpGarage(pn.DateImmo) }} en panne
                      </p>
                    </div>
                    <div class="flex-shrink-0">
                      <div class="d-flex gap-1 align-items-center">
                        <button
                          type="button"
                          class="btn avatar-xs mt-n1 p-0 favourite-btn"
                        >
                          <span class="avatar-title bg-transparent fs-15">
                            <i class="ri-star-fill"></i>
                          </span>
                        </button>
                        <div class="dropdown">
                          <button
                            class="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i
                              data-feather="more-horizontal"
                              class="fa-regular fa-pen-to-square operation-icon"
                            ></i>
                          </button>

                          <div class="dropdown-menu dropdown-menu-end">
                            <span
                              class="dropdown-item"
                              @click="manageItem('view', pn)"
                              style="cursor: pointer"
                              ><i
                                class="fa-solid fa-window-restore align-bottom me-2 text-muted"
                              ></i>
                              View</span
                            >
                            <span
                              class="dropdown-item"
                              @click="manageItem('edit', pn)"
                              style="cursor: pointer"
                              ><i
                                class="fa-regular fa-pen-to-square align-bottom me-2 text-muted"
                              ></i>
                              Edit</span
                            >
                            <div class="dropdown-divider"></div>
                            <span
                              class="dropdown-item"
                              @click="manageItem('delete', pn)"
                              style="cursor: pointer"
                              ><i
                                class="fa-solid fa-trash-can align-bottom me-2 text-muted"
                              ></i>
                              Remove</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex mb-2">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar-sm">
                        <span class="avatar-title bg-soft-warning rounded p-2">
                          <img
                            :src="getImageUrl(pn.vehicule.image)"
                            alt=""
                            class="img-fluid p-1"
                          />
                        </span>
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h5 class="mb-1 fs-15">
                        <span
                          class="text-dark"
                          style="cursor: pointer"
                          @click="manageItem('view', pn)"
                          >{{ pn.vehicule.code }} ({{
                            pn.vehicule.Immat
                          }})</span
                        >
                      </h5>
                      <p class="text-muted text-truncate-two-lines mb-3">
                        {{ pn.CausePanne }}
                        <q-tooltip> Cause de la panne </q-tooltip>
                      </p>
                    </div>
                  </div>
                  <div class="mt-auto">
                    <div class="d-flex mb-2">
                      <div class="flex-grow-1">
                        <div>
                          {{ pn.lieu_panne }}
                          <q-tooltip> Lieu de la panne </q-tooltip>
                        </div>
                      </div>
                      <div class="flex-shrink-0">
                        <div>
                          <span class="badge badge-gradient-primary"
                            ><q-tooltip> Numéro du bon </q-tooltip
                            >{{ pn.idpanne }}</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="progress progress-sm animated-progress">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        aria-valuenow="34"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 100%"
                      ></div>
                      <!-- /.progress-bar -->
                    </div>
                    <!-- /.progress -->
                  </div>
                </div>
              </div>
              <!-- end card body -->
              <div class="card-footer bg-transparent border-top-dashed py-2">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1">
                    <div class="avatar-group">
                      <a
                        href="javascript: void(0);"
                        class="avatar-group-item"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Darline Williams"
                      >
                        <div class="avatar-xxs">
                          <img
                            :src="getImageUrl(pn.vehicule.Marque.image)"
                            alt=""
                            class="rounded-circle img-fluid"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="flex-shrink-0">
                    <div class="text-muted">
                      <q-tooltip>Date de la panne </q-tooltip>
                      {{ changeDate(pn.DateImmo) }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card footer -->
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->

        <div class="row g-0 text-center text-sm-start align-items-center mb-4">
          <div class="col-sm-6">
            <div>
              <p class="mb-sm-0 text-muted">
                Showing <span class="fw-semibold">{{ currPage }}</span> to
                <span class="fw-semibold">{{ limit }}</span> of
                <span class="fw-semibold text-decoration-underline">{{
                  pages
                }}</span>
                entries
              </p>
            </div>
          </div>
          <!-- end col -->

          <div class="col-sm-6">
            <ul
              class="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0"
            >
              <li class="page-item disabled" v-if="currPage === 1">
                <span class="page-link" style="cursor: pointer">Previous</span>
              </li>
              <li class="page-item" v-else>
                <span
                  class="page-link"
                  @click="previousPage()"
                  style="cursor: pointer"
                  >Previous</span
                >
              </li>
              <template v-for="n in pages" :key="n">
                <li class="page-item active" v-if="currPage === n">
                  <span
                    class="page-link"
                    style="cursor: pointer"
                    @click="selectPage(n)"
                    >{{ n }}</span
                  >
                </li>
                <li class="page-item" v-else>
                  <span
                    style="cursor: pointer"
                    class="page-link"
                    @click="selectPage(n)"
                    >{{ n }}</span
                  >
                </li>
              </template>

              <li class="page-item disabled" v-if="pages === currPage">
                <span style="cursor: pointer" class="page-link">Next</span>
              </li>
              <li class="page-item" v-else>
                <span
                  style="cursor: pointer"
                  class="page-link"
                  @click="nextPage()"
                  >Next</span
                >
              </li>
            </ul>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
  </div>
  <!-- end main content-->
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import panneComponent from '../components/panneComponent.vue';
import { useMaintenanceStore } from '../stores/maintenance-store';
import moment from 'moment';
import { date } from 'quasar';
export default defineComponent({
  name: 'FichePanne',
  components: {
    panneComponent,
  },
  setup() {
    const store = useMaintenanceStore();
    let data = computed(() => store.panneNlivre);
    let dbs = ref('');
    let operation = ref('');
    let seamless = ref(false);
    let dataShow = ref([]);
    let dataForm = ref([]);
    let currPage = ref(1);
    let pages = ref(1);
    let range = ref([]);
    let limit = ref(10);
    const addItem = () => {
      operation.value = 'add';
      dataForm.value = [];
      seamless.value = true;
    };
    const manageItem = (txt, tab) => {
      operation.value = txt;
      dataForm.value = tab;
      seamless.value = true;
    };
    const closePopup = () => {
      seamless.value = false;
    };
    const tpGarage = (date: Date) => moment(new Date()).to(moment(date), true);

    const nextPage = () => {
      let page = currPage.value + 1;
      selectPage(page);
    };

    const previousPage = () => {
      let page = currPage.value - 1;
      selectPage(page);
    };

    const selectPage = (page) => {
      const start = Number(limit.value) * (page - 1);
      const end = start + Number(limit.value);
      dataShow.value = data.value.slice(start, end);
      currPage.value = page;
    };
    const changeDate = (dbs: string | number | Date) => {
      return date.formatDate(dbs, 'DD-MM-YYYY');
    };
    const changeInfoTable = (data) => {
      console.log(data);
      if (limit.value !== undefined) {
        let page = Math.floor(data.length / Number(limit.value));
        console.log(page);
        console.log(data.length % Number(limit.value));
        pages.value = data.length % Number(limit.value) === 0 ? page : page + 1;
        console.log(pages.value);
        range.value = [...Array(pages.value).keys()];
        console.log(Array(pages.value));
      }
      dataShow.value =
        limit.value && data ? data.slice(0, Number(limit.value)) : data;
      console.log(dataShow.value);
    };
    const getImageUrl = (img: any) => {
      if (img != null) {
        return new URL(`http://localhost:4000${img}`, import.meta.url);
      }
    };
    watch(data, (val) => {
      currPage.value = 1;
      changeInfoTable(data.value);
    });
    onMounted(async () => {
      await store.allPannesNonLivre();
      changeInfoTable(data.value);
    });
    return {
      addItem,
      seamless,
      operation,
      data,
      dbs,
      dataShow,
      selectPage,
      currPage,
      pages,
      tpGarage,
      changeDate,
      getImageUrl,
      manageItem,
      dataForm,
      limit,
      nextPage,
      previousPage,
      closePopup,
    };
  },
});
</script>

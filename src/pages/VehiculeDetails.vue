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
                      <h5 class="card-title mb-3">Activities</h5>
                      <div class="acitivity-timeline">
                        <div class="acitivity-item d-flex">
                          <div class="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-1.jpg"
                              alt=""
                              class="avatar-xs rounded-circle acitivity-avatar"
                            />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">
                              Oliver Phillips
                              <span
                                class="badge bg-soft-primary text-primary align-middle"
                                >New</span
                              >
                            </h6>
                            <p class="text-muted mb-2">
                              We talked about a project on linkedin.
                            </p>
                            <small class="mb-0 text-muted">Today</small>
                          </div>
                        </div>
                        <div class="acitivity-item py-3 d-flex">
                          <div class="flex-shrink-0 avatar-xs acitivity-avatar">
                            <div
                              class="avatar-title bg-soft-success text-success rounded-circle"
                            >
                              N
                            </div>
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">
                              Nancy Martino
                              <span
                                class="badge bg-soft-secondary text-secondary align-middle"
                                >In Progress</span
                              >
                            </h6>
                            <p class="text-muted mb-2">
                              <i
                                class="ri-file-text-line align-middle ms-2"
                              ></i>
                              Create new project Buildng product
                            </p>
                            <div class="avatar-group mb-2">
                              <a
                                href="javascript: void(0);"
                                class="avatar-group-item"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Christi"
                              >
                                <img
                                  src="assets/images/users/avatar-4.jpg"
                                  alt=""
                                  class="rounded-circle avatar-xs"
                                />
                              </a>
                              <a
                                href="javascript: void(0);"
                                class="avatar-group-item"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Frank Hook"
                              >
                                <img
                                  src="assets/images/users/avatar-3.jpg"
                                  alt=""
                                  class="rounded-circle avatar-xs"
                                />
                              </a>
                              <a
                                href="javascript: void(0);"
                                class="avatar-group-item"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title=" Ruby"
                              >
                                <div class="avatar-xs">
                                  <div
                                    class="avatar-title rounded-circle bg-light text-primary"
                                  >
                                    R
                                  </div>
                                </div>
                              </a>
                              <a
                                href="javascript: void(0);"
                                class="avatar-group-item"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="more"
                              >
                                <div class="avatar-xs">
                                  <div class="avatar-title rounded-circle">
                                    2+
                                  </div>
                                </div>
                              </a>
                            </div>
                            <small class="mb-0 text-muted">Yesterday</small>
                          </div>
                        </div>
                        <div class="acitivity-item py-3 d-flex">
                          <div class="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              alt=""
                              class="avatar-xs rounded-circle acitivity-avatar"
                            />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">
                              Natasha Carey
                              <span
                                class="badge bg-soft-success text-success align-middle"
                                >Completed</span
                              >
                            </h6>
                            <p class="text-muted mb-2">
                              Adding a new event with attachments
                            </p>
                            <div class="row">
                              <div class="col-xxl-4">
                                <div
                                  class="row border border-dashed gx-2 p-2 mb-2"
                                >
                                  <div class="col-4">
                                    <img
                                      src="assets/images/small/img-2.jpg"
                                      alt=""
                                      class="img-fluid rounded"
                                    />
                                  </div>
                                  <!--end col-->
                                  <div class="col-4">
                                    <img
                                      src="assets/images/small/img-3.jpg"
                                      alt=""
                                      class="img-fluid rounded"
                                    />
                                  </div>
                                  <!--end col-->
                                  <div class="col-4">
                                    <img
                                      src="assets/images/small/img-4.jpg"
                                      alt=""
                                      class="img-fluid rounded"
                                    />
                                  </div>
                                  <!--end col-->
                                </div>
                                <!--end row-->
                              </div>
                            </div>
                            <small class="mb-0 text-muted">25 Nov</small>
                          </div>
                        </div>
                        <div class="acitivity-item py-3 d-flex">
                          <div class="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-6.jpg"
                              alt=""
                              class="avatar-xs rounded-circle acitivity-avatar"
                            />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">Bethany Johnson</h6>
                            <p class="text-muted mb-2">
                              added a new member to velzon dashboard
                            </p>
                            <small class="mb-0 text-muted">19 Nov</small>
                          </div>
                        </div>
                        <div class="acitivity-item py-3 d-flex">
                          <div class="flex-shrink-0">
                            <div class="avatar-xs acitivity-avatar">
                              <div
                                class="avatar-title rounded-circle bg-soft-danger text-danger"
                              >
                                <i class="ri-shopping-bag-line"></i>
                              </div>
                            </div>
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">
                              Your order is placed
                              <span
                                class="badge bg-soft-danger text-danger align-middle ms-1"
                                >Out of Delivery</span
                              >
                            </h6>
                            <p class="text-muted mb-2">
                              These customers can rest assured their order has
                              been placed.
                            </p>
                            <small class="mb-0 text-muted">16 Nov</small>
                          </div>
                        </div>
                        <div class="acitivity-item py-3 d-flex">
                          <div class="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-7.jpg"
                              alt=""
                              class="avatar-xs rounded-circle acitivity-avatar"
                            />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">Lewis Pratt</h6>
                            <p class="text-muted mb-2">
                              They all have something to say beyond the words on
                              the page. They can come across as casual or
                              neutral, exotic or graphic.
                            </p>
                            <small class="mb-0 text-muted">22 Oct</small>
                          </div>
                        </div>
                        <div class="acitivity-item py-3 d-flex">
                          <div class="flex-shrink-0">
                            <div class="avatar-xs acitivity-avatar">
                              <div
                                class="avatar-title rounded-circle bg-soft-info text-info"
                              >
                                <i class="ri-line-chart-line"></i>
                              </div>
                            </div>
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">Monthly sales report</h6>
                            <p class="text-muted mb-2">
                              <span class="text-danger">2 days left</span>
                              notification to submit the monthly sales report.
                              <a
                                href="javascript:void(0);"
                                class="link-warning text-decoration-underline"
                                >Reports Builder</a
                              >
                            </p>
                            <small class="mb-0 text-muted">15 Oct</small>
                          </div>
                        </div>
                        <div class="acitivity-item d-flex">
                          <div class="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-8.jpg"
                              alt=""
                              class="avatar-xs rounded-circle acitivity-avatar"
                            />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">
                              New ticket received
                              <span
                                class="badge bg-soft-success text-success align-middle"
                                >Completed</span
                              >
                            </h6>
                            <p class="text-muted mb-2">
                              User
                              <span class="text-secondary">Erica245</span>
                              submitted a ticket.
                            </p>
                            <small class="mb-0 text-muted">26 Aug</small>
                          </div>
                        </div>
                      </div>
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
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingStore } from '../stores/settings-store';
import { useRepportStore } from '../stores/repport-store';
import { date } from 'quasar';
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
    const vehicle = computed(() => store.vehicle);
    const document = computed(() => store.documentVeh);
    let typeDoc = computed(() => store.typeDocument);
    const cons = computed(() => storeCons.consoVeh);
    const pdfModal = ref(false);
    const ulr = ref(null);
    const ig = ref('');
    const op = ref('');
    let seamless = ref(false);
    let operation = ref('');
    const opeData = ref<object>([]);
    const getImageUrl = (img: any) => {
      //console.log(img);
      if (img != null) {
        return new URL(`http://localhost:4000${img}`, import.meta.url);
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
        width: 300,
        type: 'object',
      },
      {
        text: 'Date',
        value: 'DateConso',
        sortable: true,
        width: 150,
        type: 'date',
      },
      {
        text: 'Heure',
        value: 'HeureConso',
        sortable: true,
        width: 200,
        type: 'time',
      },
      {
        text: 'Quantité',
        value: 'QteConso',
        sortable: true,
        width: 100,
        type: 'string',
      },
      {
        text: 'Carburant',
        value: 'carburt',
        sortable: true,
        width: 200,
        type: 'string',
      },
      {
        text: 'Action',
        value: 'operation',
        sortable: true,
        width: 80,
        type: 'action',
      },
    ];
    const refreshTable = async () => {
      await storeCons.allConsoVeh(router.currentRoute.value.params.code);
    };
    onMounted(async () => {
      console.log(router.currentRoute.value.params.code);
      code.value = router.currentRoute.value.params.code;
      await store.vehicleByCode(code.value);
      await store.allTypeDocument();
      await store.allDocumentVeh(code.value);
      await storeCons.allConsoVeh(code.value);
      ig.value = getImageUrl(vehicle.value.image);
      console.log(vehicle.value);
      console.log(document.value);
      console.log(typeDoc);
      console.log(Object.entries(cons));
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
    };
  },
});
</script>

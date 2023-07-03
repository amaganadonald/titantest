<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row g-2">
          <div class="col-sm-4">
            <div class="search-box">
              <input
                type="text"
                class="form-control"
                id="search-opts"
                placeholder="Search datas..."
                v-model="searchValue"
              />
              <i class="mdi mdi-magnify search-widget-icon search-icon"></i>
            </div>
          </div>
          <div class="col-sm-auto ms-auto">
            <div class="list-grid-nav hstack gap-1">
              <button
                type="button"
                @click="refreshTable()"
                class="btn btn-soft-info nav-link btn-icon fs-14"
              >
                <i class="mdi mdi-rotate-3d-variant"></i>
              </button>
              <button
                type="button"
                id="grid-view-button"
                class="btn btn-soft-info nav-link btn-icon fs-14"
              >
                <i class="mdi mdi-file-excel"></i>
              </button>
              <button
                type="button"
                id="list-view-button"
                class="btn btn-soft-info nav-link btn-icon fs-14"
              >
                <i class="mdi mdi-file-pdf-box w-sm"></i>
              </button>
              <button
                type="button"
                id="dropdownMenuLink1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                class="btn btn-soft-info btn-icon fs-14"
              >
                <i class="mdi mdi-filter-variant"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                <div class="card">
                  <div class="card-header">
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1">
                        <h6 class="card-title mb-0">
                          Filtrer {{ $props.title }}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="card-body collapse show" id="collapseexample1">
                    <div class="row">
                      <input
                        type="email"
                        class="form-control form-control-sm"
                        id="colFormLabelSm"
                        placeholder="Email"
                      />
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <label for="basiInput" class="form-label"
                          >Basic Input</label
                        >
                        <input
                          type="password"
                          class="form-control"
                          id="basiInput"
                        />
                      </div>
                      <div class="col-12">
                        <label for="labelInput" class="form-label"
                          >Input with Label</label
                        >
                        <input
                          type="password"
                          class="form-control"
                          id="labelInput"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                v-if="btnadd === 'add'"
                @click="addItem()"
                type="button"
                class="btn btn-primary"
              >
                <q-tooltip>Add data</q-tooltip>
                <i class="fa-solid fa-circle-plus"></i> Add Data
              </button>
              <button
                v-if="itemsSelected.length > 0"
                type="button"
                class="btn btn-danger"
              >
                <q-tooltip>delete data</q-tooltip>
                <i class="fa-solid fa-trash-can"></i> delete Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <q-dialog
              v-model="seamless"
              position="right"
              seamless
              transition-show="fade"
              transition-hide="slide-down"
            >
              <q-card
                v-if="$props.cbTable === 'cpl'"
                style="width: 900px; max-width: 90vw"
              >
                <q-card-section>
                  <ComplexData
                    :head="headers"
                    :data="opeData"
                    :operation="operation"
                    :title="titre"
                    :tbname="$props.tb"
                    @closeModal="closeModal"
                  />
                </q-card-section>
              </q-card>
              <q-card v-else style="width: 600px; max-width: 90vw">
                <q-card-section>
                  <ManageDataVue
                    :head="headers"
                    :data="opeData"
                    :operation="operation"
                    :title="titre"
                    :tbname="$props.tb"
                    @closeModal="closeModal"
                  />
                </q-card-section>
              </q-card>
            </q-dialog>
            <div class="live-preview">
              <div class="table-responsive table-card">
                <EasyDataTable
                  :headers="headers"
                  :items="items"
                  :loading="loading"
                  :rows-per-page="10"
                  :search-value="searchValue"
                  multi-sort
                  table-class-name="customize-table"
                  header-text-direction="center"
                  body-text-direction="center"
                  :body-row-class-name="bodyRowClassNameFunction"
                  alternating
                  border-cell
                  buttons-pagination
                  v-model:items-selected="itemsSelected"
                  @click-row="showRow"
                  theme-color="#1d90ff"
                >
                  <template #item-datej="{ datej }">
                    {{ changeDate(datej) }}
                  </template>
                  <template #item-code="{ code }">
                    <span style="cursor: pointer" @click="goToVehicle(code)">{{
                      code
                    }}</span>
                  </template>
                  <template #item-matricule="{ matricule }">
                    <q-btn
                      v-if="$props.tb === 'personnel'"
                      color="teal-10"
                      outline
                      @click="goProfile(matricule)"
                      >{{ matricule }}</q-btn
                    >
                    <span v-else>{{ matricule }}</span>
                  </template>
                  <template #item-id="{ id }">
                    <q-btn
                      v-if="$props.tb === 'utilisateur'"
                      no-caps
                      color="teal-10"
                      outline
                      @click="goLogin(id)"
                      >{{ id }}</q-btn
                    >
                    <span v-else>{{ id }}</span>
                  </template>
                  <template #item-MiseService="{ MiseService }">
                    {{ changeDate(MiseService) }}
                  </template>
                  <template #item-DateTracking="{ DateTracking }">
                    {{ changeDate(DateTracking) }}
                  </template>
                  <template #item-DateService="{ DateService }">
                    {{ changeDate(DateService) }}
                  </template>
                  <template #item-DateSortie="{ DateSortie }">
                    {{ changeDateTime(DateSortie) }}
                  </template>
                  <template #item-DateImmo="{ DateImmo }">
                    {{ changeDateTime(DateImmo) }}
                  </template>
                  <template #item-DateConso="{ DateConso }">
                    {{ changeDate(DateConso) }}
                  </template>
                  <template #item-DateDebInt="{ DateDebInt }">
                    {{ changeDateTime(DateDebInt) }}
                  </template>
                  <template #item-DateFinInt="{ DateFinInt }">
                    {{ changeDateTime(DateFinInt) }}
                  </template>
                  <template v-slot:[`panne.DateImmo`]="{ panne }">
                    {{ changeDateTime(panne.DateImmo) }}
                  </template>
                  <template #item-fam_veh="{ fam_veh }">
                    <span v-if="fam_veh != null">{{ fam_veh.lib_fam }}</span>
                  </template>
                  <template #item-personnel="{ personnel }">
                    <span v-if="personnel != null"
                      >{{ personnel.nom }}-{{ personnel.matricule }}</span
                    >
                  </template>
                  <template #item-menus="{ menus }">
                    <div
                      v-for="mn in menus"
                      :key="mn.id"
                      class="d-block font-weight-light text-truncate text-caption"
                      style="max-width: 140px; white-space: wrap"
                    >
                      {{ mn.name }}
                    </div>
                  </template>
                  <template #item-type_panne="{ type_panne }">
                    <span v-if="type_panne != null">{{
                      type_panne.libelle
                    }}</span>
                  </template>
                  <template #item-activiteVeh="{ activiteVeh }">
                    <span v-if="activiteVeh != null">{{
                      activiteVeh.activite_name
                    }}</span>
                  </template>
                  <template #item-Marque="{ Marque }">
                    <span v-if="Marque != null">{{ Marque.libelle }}</span>
                  </template>
                  <template #item-autorisation="{ autorisation }">
                    <span v-if="autorisation != null">{{
                      autorisation.name
                    }}</span>
                  </template>
                  <template #item-profil="{ profil }">
                    <span v-if="profil != null">{{ profil.name }}</span>
                  </template>
                  <template #item-carburant="{ carburant }">
                    <span v-if="carburant != null">{{
                      carburant.libelle
                    }}</span>
                  </template>
                  <template #item-Fournisseur="{ Fournisseur }">
                    <span v-if="Fournisseur != null">{{
                      Fournisseur.libelle
                    }}</span>
                  </template>
                  <template #item-type_veh="{ type_veh }">
                    <span v-if="type_veh != null">{{ type_veh.lib_type }}</span>
                  </template>
                  <template #item-vehicule="{ vehicule }">
                    <span v-if="vehicule != null">{{ vehicule.code }}</span>
                  </template>
                  <template #item-passwd="{ passwd }">
                    <span v-if="passwd">-</span>
                  </template>
                  <template #item-image="{ image }">
                    <img :src="getImageUrl(image)" class="avatar-xxs me-2" />
                  </template>
                  <template #item-url_photo="{ url_photo }">
                    <img
                      :src="getImageUrl(url_photo)"
                      class="avatar-xxs me-2"
                    />
                  </template>
                  <template #item-Status="{ Status }">
                    <q-chip
                      v-if="Status === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-status="{ status }">
                    <q-chip
                      v-if="status === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-tracking="{ tracking }">
                    <q-chip
                      v-if="tracking === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-ad="{ ad }">
                    <q-chip
                      v-if="ad === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-up="{ up }">
                    <q-chip
                      v-if="up === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-cp="{ cp }">
                    <q-chip
                      v-if="cp === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-del="{ del }">
                    <q-chip
                      v-if="del === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-tpanne="{ tpanne }">
                    <q-chip dense color="red" text-color="white">{{
                      tpanne
                    }}</q-chip>
                  </template>
                  <template #item-rd="{ rd }">
                    <q-chip
                      v-if="rd === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-upl="{ upl }">
                    <q-chip
                      v-if="upl === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-exp="{ exp }">
                    <q-chip
                      v-if="exp === true"
                      dense
                      color="teal"
                      text-color="white"
                      ><i class="fa-solid fa-circle-check"></i
                    ></q-chip>
                    <q-chip v-else dense color="red" text-color="white"
                      ><i class="fa-sharp fa-solid fa-xmark"></i
                    ></q-chip>
                  </template>
                  <template #item-fonction="{ fonction }">
                    <span v-if="fonction != null">{{ fonction.libelle }}</span>
                  </template>
                  <template #item-operation="item">
                    <div class="operation-wrapper">
                      <i
                        class="fa-regular fa-pen-to-square operation-icon"
                        @click="editItem(item)"
                      >
                        <q-tooltip>edit</q-tooltip>
                      </i>
                      <i
                        class="fa-solid fa-trash-can operation-icon"
                        @click="deleteItem(item)"
                      >
                        <q-tooltip>delete</q-tooltip>
                      </i>
                      <i
                        class="fa-solid fa-window-restore operation-icon"
                        @click="viewItem(item)"
                      >
                        <q-tooltip>view</q-tooltip>
                      </i>
                    </div>
                  </template>
                </EasyDataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import type {
  Header,
  Item,
  ClickRowArgument,
  SortType,
  BodyRowClassNameFunction,
  FilterOption,
} from 'vue3-easy-data-table';
import ManageDataVue from '../Modals/ManageData.vue';
import ComplexData from '../Modals/ComplexData.vue';
import { useSettingStore } from '../../stores/settings-store';
import { date, useQuasar } from 'quasar';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { useRouter } from 'vue-router';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'TablePanne',
  components: {
    ManageDataVue,
    ComplexData,
  },
  props: ['header', 'data', 'title', 'tb', 'cbTable', 'addbtn'],
  emits: ['refreshTable'],
  setup(props, context) {
    const router = useRouter();
    const $q = useQuasar();
    const headers = ref<Header[]>([]);
    const items = ref<Item[]>([]);
    const searchValue = ref('');
    let seamless = ref(false);
    let filterLibelle = ref('');
    let showLibelleFilter = ref(false);
    let operation = ref('');
    const store = useSettingStore();
    let titre = ref('');
    let btnadd = ref('');
    // let db = ref(props.data)
    const opeData = ref<object>([]);
    const itemsSelected = ref<Item[]>([]);
    const sortBy: string[] = ['number', 'weight'];
    const sortType: SortType[] = ['desc', 'asc'];
    const colorTheme = ref('#f48225');
    const showRow = (item: ClickRowArgument) => {
      if (itemsSelected.value.filter((ite) => ite.id === item.id).length > 0) {
        itemsSelected.value.filter((ite) => ite.id !== item.id);
      } else {
        itemsSelected.value.push(item);
      }
    };
    const bodyRowClassNameFunction: BodyRowClassNameFunction = (
      item: Item,
      rowNumber: number
    ): string => {
      if (itemsSelected.value.filter((ite) => ite.id === item.id).length > 0)
        return 'fail-row';
    };
    const filterOptions = computed((): FilterOption[] => {
      const filterOptionsArray: FilterOption[] = [];
      filterOptionsArray.push({
        field: 'lib_fam',
        criteria: filterLibelle.value,
        comparison: (value, criteria): boolean =>
          value != null &&
          criteria != null &&
          typeof value === 'string' &&
          value.includes(`name-${criteria}`),
      });
      return filterOptionsArray;
    });
    const editItem = (item: object) => {
      console.log(item);
      operation.value = 'edit';
      opeData.value = item;
      seamless.value = true;
    };
    const deleteItem = (item: object) => {
      operation.value = 'delete';
      opeData.value = item;
      seamless.value = true;
    };
    const addItem = () => {
      operation.value = 'add';
      opeData.value = [];
      seamless.value = true;
    };
    const viewItem = (item: object) => {
      operation.value = 'view';
      opeData.value = item;
      seamless.value = true;
    };
    const loading = computed(() => store.loading);
    const closeModal = () => {
      seamless.value = false;
    };
    const refreshTable = () => {
      context.emit('refreshTable');
    };
    onMounted(() => {
      headers.value = props.header;
      items.value = props.data;
      btnadd.value = props.addbtn;
    });
    const changeDate = (dbs: string | number | Date) => {
      return date.formatDate(dbs, 'DD-MM-YYYY');
    };
    const changeDateTime = (dbs: string | number | Date) => {
      return date.formatDate(dbs, 'DD-MM-YYYY HH:mm:ss');
    };
    const goProfile = (matricule: any) => {
      router.push(`/personnel/${matricule}`);
    };
    const goLogin = (id: any) => {
      router.push(`/utilisateur/${id}`);
    };
    const goToVehicle = (code: number | string) => {
      router.push(`/parcMateriels/${code}`);
    };
    let exportToCSV = () => {
      let csvData = props.data;
      let fileName = props.title;
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { data: ws }, SheetNames: ['Famveh'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };
    const getImageUrl = (img: any) => {
      console.log(img);
      if (img != null) {
        return $q.cookies.get('ht') + img;
      }
    };
    watch(props, () => {
      items.value = props.data;
    });
    return {
      headers,
      items,
      refreshTable,
      searchValue,
      seamless,
      operation,
      deleteItem,
      addItem,
      viewItem,
      opeData,
      itemsSelected,
      sortBy,
      sortType,
      colorTheme,
      editItem,
      loading,
      titre,
      closeModal,
      changeDate,
      exportToCSV,
      goProfile,
      goLogin,
      showRow,
      bodyRowClassNameFunction,
      filterLibelle,
      filterOptions,
      showLibelleFilter,
      getImageUrl,
      goToVehicle,
      changeDateTime,
      btnadd,
    };
  },
});
</script>
<style>
.customize-table {
  --easy-table-header-font-size: 10px;
  --easy-table-header-height: 10px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #2d3a4f;

  --easy-table-header-item-padding: 10px 15px;
  --easy-table-loading-mask-background-color: #2d3a4f;
}
.fail-row {
  --easy-table-body-row-background-color: #1e5581;
  --easy-table-body-row-font-color: #fff;
}
.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
.player-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
}
</style>

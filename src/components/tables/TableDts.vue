<template>
    <div>
        <div class="card">
                        <div class="card-body">
                            <div class="row g-2">
                                <div class="col-sm-4">
                                    <div class="search-box">
                                        <input type="text" class="form-control" id="search-options" placeholder="Search datas..." v-model="searchValue">
                                        <i class="mdi mdi-magnify search-widget-icon search-icon"></i>
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-sm-auto ms-auto">
                                    <div class="list-grid-nav hstack gap-1">
                                        <button type="button" id="grid-view-button" class="btn btn-soft-info nav-link btn-icon fs-14"><i class="mdi mdi-file-excel"></i></button>
                                        <button type="button" id="list-view-button" class="btn btn-soft-info nav-link  btn-icon fs-14"><i class="mdi mdi-file-pdf-box w-sm"></i></button>
                                        <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" class="btn btn-soft-info btn-icon fs-14"><i class="mdi mdi-filter-variant"></i></button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                           <!-- Basic Input -->
                                           <div class="card">
                                <div class="card-header">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1">
                                            <h6 class="card-title mb-0">Card with Spinner Loader</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body collapse show" id="collapseexample1">
                                    <div class="row">
                                            <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Email">
                                    </div>
                                    <div class="row">
                                            <div class="col-12">
                                                <label for="basiInput" class="form-label">Basic Input</label>
                                                <input type="password" class="form-control" id="basiInput">
                                            </div>

                                            <!-- Input with Label -->
                                            <div class="col-12">
                                                <label for="labelInput" class="form-label">Input with Label</label>
                                                <input type="password" class="form-control" id="labelInput">
                                            </div>
                                           </div>
                                        </div>
                                </div>
                            </div>

                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalgrid">
                                        <q-tooltip>Add data</q-tooltip>
                                        <i class="fa-solid fa-circle-plus"></i>   Add Data
                                    </button>
                                    <button v-if="itemsSelected.length>0" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModalgrid">
                                        <q-tooltip>delete data</q-tooltip>
                                        <i class="fa-solid fa-trash-can"></i>   delete Data
                                    </button>
                                    </div>
                                </div>
                                <!--end col-->
                            </div>
                            <!--end row-->
                        </div>
                    </div>
        <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <!--div class="card-header align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalgrid">
                                        <q-tooltip>Add data</q-tooltip>
                                        <i class="fa-solid fa-circle-plus"></i>   Add Data
                                    </button>
                                    <button v-if="itemsSelected.length>0" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModalgrid">
                                        <q-tooltip>delete data</q-tooltip>
                                        <i class="fa-solid fa-trash-can"></i>   delete Data
                                    </button>
                                </h4>
                                    <div class="flex-shrink-0">
                                        <div class="position-relative">
                                            <input type="text" class="form-control" v-model="searchValue" placeholder="Search..." autocomplete="off" id="search-options">
                                            <span class="mdi mdi-magnify search-widget-icon"></span>
                                            <span class="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none" id="search-close-options"></span>
                                            <label for="responsive-table-showcode" class="form-label text-muted">Show Code</label>
                                            <input class="form-check-input code-switcher" type="checkbox" id="responsive-table-showcode">

                                        </div>
                                    </div>
                                </div--><!-- end card header -->

                                <div class="card-body">
                                    <!-- Grids in modals -->

                                    <!--div class="modal fade" id="exampleModalgrid" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"-->
                                    <q-dialog v-model="seamless" seamless position="bottom">
                                        <q-card style="width: 350px">
                                            <q-card-section class="row items-center no-wrap">
                                               <AddData/>
                                            </q-card-section>
                                        </q-card>
                                    </q-dialog>
                                    <!--/div-->
                                    <div class="live-preview">
                                        <div class="table-responsive table-card">
                                            <!--EasyDataTable
                                                :headers="headers"
                                                :items="items"
                                                alternating
                                                border-cell
                                                buttons-pagination
                                                :rows-per-page="10"
                                                @click-row="showRow"
                                                :items-selected="itemsSelected"
                                                :sort-by="sortBy"
                                                :sort-type="sortType"
                                                multi-sort
                                                :search-value="searchValue"

                                                :theme-color="colorTheme"
                                                table-class-name="customize-table"
                                                header-text-direction="center"
                                                body-text-direction="center"
                                            >
                                            <template #expand="item">
                                                <div style="padding: 15px">
                                                    {{item.fam_veh}} won championships
                                                </div>
                                            </template>loading
                                            < show-index >
                                            </EasyDataTable-->
                                            <EasyDataTable
                                                :headers="headers"
                                                :items="items"
                                                :loading="loading"
                                                v-model:items-selected="itemsSelected"
                                                multi-sort
                                                :body-row-class-name="bodyRowClassNameFunction"
                                                table-class-name="customize-table"
                                                header-text-direction="center"
                                                body-text-direction="center"
                                                :rows-per-page="10"
                                                :search-value="searchValue"
                                            >

                                                <template #item-team="{ teamName, teamUrl }">
                                                    <a :href="teamUrl">{{ teamName }}</a>
                                                </template>
                                                <template #item-operation="item">
                                                    <div class="operation-wrapper">
                                                        <i class="fa-regular fa-pen-to-square operation-icon" @click="editItem(item)">
                                                            <q-tooltip>edit</q-tooltip>
                                                        </i>
                                                        <i class="fa-solid fa-trash-can operation-icon" @click="editItem(item)">
                                                            <q-tooltip>delete</q-tooltip>
                                                        </i>
                                                        <i class="fa-solid fa-window-restore operation-icon">
                                                            <q-tooltip>view</q-tooltip>
                                                        </i>
                                                    </div>
                                                </template>
                                                <!--template #item-indicator.weight="item">
                                                    {{ item.indicator.weight }}
                                                </template-->
                                            </EasyDataTable>
                                            {{ itemsSelected }}
                                        </div>
                                        <!-- end table responsive -->
                                        <!-- end table responsive -->
                                    </div>

                                </div><!-- end card-body -->
                            </div><!-- end card -->
                        </div><!-- end col -->
                    </div>
                    <!--end row-->
    </div>
    </template>
    <script lang="ts">
      import { computed, defineComponent, onMounted, ref } from 'vue';
      import Vue3EasyDataTable from 'vue3-easy-data-table'
      import 'vue3-easy-data-table/dist/style.css'
      import type { Header, Item, ClickRowArgument, SortType, BodyRowClassNameFunction } from 'vue3-easy-data-table';
      import AddData from '../Modals/AddData.vue';
      import { useSettingStore } from '../../stores/settings-store';
      export default defineComponent({
        name: 'TableDts',
        components: {
          EasyDataTable: Vue3EasyDataTable,
          AddData
        },
        props: ['header', 'data'],
        setup(props) {
            const store = useSettingStore();
            let itemSelect = ref([]);
            let seamless = ref(false);
            const headers = ref<Header[]>([]);
            const items = ref<Item[]>([]);
            const showRow = (item: ClickRowArgument) => {
              if (itemsSelected.value.filter(ite => ite.id === item.id).length > 0) {
                itemsSelected.value.filter(ite => ite.id !== item.id)
              } else {
                itemsSelected.value.push(item)
              }
            };
            const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {

            if (itemsSelected.value.filter(ite => ite.id === item.id).length > 0) return 'fail-row';
            };
            const itemsSelected = ref<Item[]>([]);
            const searchValue = ref('');
            const sortBy: string[] = ['number', 'weight'];
            const sortType: SortType[] = ['desc', 'asc'];
            const colorTheme = ref('#f48225')
            const editItem = (item:object) => {
                console.log(item)
                itemSelect.value.pop(item);
                seamless.value = true
            }
            const loading = computed(()=>store.loading);
            onMounted(()=>{
               headers.value= props.header;
               items.value = props.data
            })
            return{
              headers,
              items,
              showRow,
              itemsSelected,
              sortBy,
              sortType,
              searchValue,
              colorTheme,
              editItem,
              loading,
              seamless,
              bodyRowClassNameFunction
            }
        }
      })
    </script>
    <style>
    .customize-table {
      /*--easy-table-border: 1px solid #f2f2f3;
      --easy-table-row-border: 1px solid #f2f4f7;*/

      --easy-table-header-font-size: 10px;
      --easy-table-header-height: 10px;
      --easy-table-header-font-color: #c1cad4;
      --easy-table-header-background-color: #2d3a4f;

      --easy-table-header-item-padding: 10px 15px;

      /*--easy-table-body-even-row-font-color: #fff;
      --easy-table-body-even-row-background-color: #4c5d7a;

      --easy-table-body-row-font-color: #c0c7d2;
      --easy-table-body-row-background-color: #f9fafd;
      --easy-table-body-row-height: 50px;
      --easy-table-body-row-font-size: 14px;

      --easy-table-body-row-hover-font-color: #2d3a4f;
      --easy-table-body-row-hover-background-color: #eee;

      --easy-table-body-item-padding: 10px 15px;

      --easy-table-footer-background-color: #2d3a4f;
      --easy-table-footer-font-color: #c0c7d2;
      --easy-table-footer-font-size: 14px;
      --easy-table-footer-padding: 0px 10px;
      --easy-table-footer-height: 50px;

      --easy-table-rows-per-page-selector-width: 70px;
      --easy-table-rows-per-page-selector-option-padding: 10px;
      --easy-table-rows-per-page-selector-z-index: 1;


      --easy-table-scrollbar-track-color: #2d3a4f;
      --easy-table-scrollbar-color: #2d3a4f;
      --easy-table-scrollbar-thumb-color: #4c5d7a;;
      --easy-table-scrollbar-corner-color: #2d3a4f;*/

      --easy-table-loading-mask-background-color: #2d3a4f;

    }
    .fail-row  {
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

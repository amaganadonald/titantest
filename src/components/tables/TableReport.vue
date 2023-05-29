<template>
    <div>
        <div class="card">
                        <div class="card-body">
                            <div class="row g-2">
                                <div class="col-sm-4">
                                    <div class="search-box" v-if="$props.tb==='transport'">
                                        <input type="text" class="form-control" id="search-opts" placeholder="Parcèlles séparée par un espace" v-model="piste" @blur="(event) => changeParcel()">
                                        <i class="mdi mdi-magnify search-widget-icon search-icon"></i>
                                    </div>
                                    <div class="search-box" v-else>
                                        <input type="text" class="form-control" id="search-opts" placeholder="Search datas..." v-model="searchValue">
                                        <i class="mdi mdi-magnify search-widget-icon search-icon"></i>
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-sm-auto ms-auto">
                                    <div class="list-grid-nav hstack gap-1">
                                        <input type="datetime-local" @blur="()=>datedebChange()" v-model="datedeb" class="form-control" id="datedeb" placeholder="Date debut">
                                        <input type="datetime-local" v-model="datefin" class="form-control" id="datefin" placeholder="Date fin">
                                        <button type="button" class="btn btn-primary" @click="generer()" v-if="$props.tb==='transport'"><q-tooltip>générer rapport</q-tooltip> Générer  </button>
                                        <button type="button" class="btn btn-primary" @click="calculReport()" v-else>
                                            <q-tooltip>générer rapport</q-tooltip>Calcul
                                        </button>

                                        <button type="button" @click="refreshTable()" class="btn btn-soft-info nav-link btn-icon fs-14"><i class="mdi mdi-rotate-3d-variant"></i></button>
                                        <button @click="exportToCSV()" type="button" id="grid-view-button" class="btn btn-soft-info nav-link btn-icon fs-14"><i class="mdi mdi-file-excel"></i></button>
                                        <button type="button" id="list-view-button" class="btn btn-soft-info nav-link  btn-icon fs-14"><i class="mdi mdi-file-pdf-box w-sm"></i></button>
                                        <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" class="btn btn-soft-info btn-icon fs-14"><i class="mdi mdi-filter-variant"></i></button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                           <!-- Basic Input -->
                                           <div class="card">
                                <div class="card-header">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1">
                                            <h6 class="card-title mb-0">Filtrer  {{ $props.title }}</h6>
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

                                    <!--button type="button" class="btn btn-primary" @click="addItem()">
                                        <q-tooltip>Add data</q-tooltip>
                                        <i class="fa-solid fa-circle-plus"></i>   Add Data
                                    </button>
                                    <button v-if="itemsSelected.length>0" type="button" class="btn btn-danger" >  <q-tooltip>delete data</q-tooltip>
                                        <i class="fa-solid fa-trash-can"></i>   delete Data
                                    </button-->
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
                                <div class="card-body">
                                    <q-dialog v-model="seamless" position="right" seamless transition-show="fade" transition-hide="slide-down">
                                        <q-card style="width: 1200px; max-width: 120vw;">


                                            <q-card-section>
                                                <TableDetails :head="head" :code="codeVeh" @closeModal="closeModal"/>
                                            </q-card-section>
                                        </q-card>
                                    </q-dialog>
                                    <div class="live-preview">
                                        <div class="table-responsive table-card">
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
                                                <template #item-startmove="{ startmove }">
                                                    {{changeDate(startmove) }}
                                                </template>
                                                <template #item-endmov="{ endmov }">
                                                    {{changeDate(endmov) }}
                                                </template>
                                                <template #item-tdrive="{ tdrive }">
                                                    {{secToTime(tdrive) }}
                                                </template>
                                                <template #item-idle="{ idle }">
                                                    {{secToTime(idle) }}
                                                </template>
                                                <template #item-stoptime="{ stoptime }">
                                                    {{secToTime(stoptime) }}
                                                </template>
                                                <template #item-operation="item">
                                                    <div class="operation-wrapper">
                                                        <i class="fa-regular fa-pen-to-square operation-icon" @click="detailsData(item)">
                                                            <q-tooltip>view</q-tooltip>
                                                        </i>
                                                        <!--i class="fa-solid fa-trash-can operation-icon" @click="deleteItem(item)">
                                                            <q-tooltip>delete</q-tooltip>
                                                        </i-->
                                                    </div>
                                                </template>
                                            </EasyDataTable>
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
      import { computed, defineComponent, onMounted, ref, watch } from 'vue';
      import Vue3EasyDataTable from 'vue3-easy-data-table'
      import 'vue3-easy-data-table/dist/style.css'
      import  { Header, Item, ClickRowArgument, SortType, BodyRowClassNameFunction } from 'vue3-easy-data-table';
      import TableDetails from './TableDetails.vue';
      import { useSettingStore } from '../../stores/settings-store';
      import { useRepportStore } from '../../stores/repport-store';
      import { date, useQuasar } from 'quasar'
      import * as XLSX from 'xlsx';
      import * as FileSaver from 'file-saver';
      import { useRouter } from 'vue-router';
      import dataRapport from  '../../composable/CentralReport'
      import useExcel from '../../composable/ExportExcel';
      import moment from 'moment'

      export default defineComponent({
        name: 'TableReport',
        components: {
          EasyDataTable: Vue3EasyDataTable,
          TableDetails
        },
        props: ['header', 'data', 'title', 'tb'],
        emits: ['refreshTable'],
        setup(props, context) {
            const router = useRouter()
            const $q = useQuasar();
            const store = useSettingStore();
            const store2 = useRepportStore()
            let itemSelect = ref([]);
            let seamless = ref(false);
            const headers = ref<Header[]>([]);
            const items = ref<Item[]>([]);
            let operation = ref('')
            let dbq = computed(()=>store2.dataTables)
            let titre = ref('')
            let piste = ref($q.localStorage.getItem('parcel'))
            let db = ref(props.data)
            let codeVeh = ref({})
            let datedeb = ref(date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'))
            let datefin = ref(date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'))
            const { generateRapport } = dataRapport(store2.dataTables);
            const { exportNewExcel } = useExcel(store2.dataReport);
            const opeData = ref<object>([]);
            const showRow = (item: ClickRowArgument) => {
              if (itemsSelected.value.filter(ite => ite.id === item.id).length > 0) {
                itemsSelected.value.filter(ite => ite.id !== item.id)
              } else {
                itemsSelected.value.push(item)
              }
            }
            const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {

            if (itemsSelected.value.filter(ite => ite.id === item.id).length > 0) return 'fail-row';
            };
            const itemsSelected = ref<Item[]>([]);
            const searchValue = ref('');
            const sortBy: string[] = ['number', 'weight'];
            const sortType: SortType[] = ['desc', 'asc'];
            const colorTheme = ref('#f48225')
            const detailsData = (item:object) => {
                console.log(item.Engin)
                codeVeh.value = item.Engin
                seamless.value = true
            }
            const editItem = (item:object) => {
                console.log(item)
                operation.value = 'edit'
                opeData.value = item
                seamless.value = true
            }
            const deleteItem = (item:object) => {
                operation.value = 'delete'
                opeData.value = item
                seamless.value = true
            }
            const addItem = () => {
                operation.value = 'add'
                opeData.value = []
                seamless.value = true
            }
            const viewItem = (item:object) => {
                operation.value = 'view'
                opeData.value = item
                seamless.value = true
            }
            const loading = computed(()=>store.loading);
            const closeModal = () => {
                seamless.value = false
            }
            const refreshTable = () => {
                context.emit('refreshTable')
            }
            const changeDate = (dbs: string|number|Date) => {
                return moment(dbs).format('DD-MM-YYYY HH:mm:ss')
            }
            const goProfile = (matricule: any) => {
                router.push(`/personnel/${matricule}`)
            }
            const goLogin = (id: any) => {
                router.push(`/utilisateur/${id}`)
            }
            const changeParcel = () => {
                //console.log(piste.value)
                $q.localStorage.set('parcel', piste.value);
            }
            const datedebChange = () => {
                console.log(datedeb.value)
            }
            const generer = () => {
                generateRapport(datedeb.value)
            }
            const calculReport = () => {
                ///console.log(store2.dataTables)
                if (props.tb === 'horaire') {
                    store2.allActivites(moment(datedeb.value).format('YYYY-MM-DD HH:mm:ss'), moment(datefin.value).format('YYYY-MM-DD HH:mm:ss'))
                } else if (props.tb === 'distance') {
                    store2.allActivitesKm(moment(datedeb.value).format('YYYY-MM-DD HH:mm:ss'), moment(datefin.value).format('YYYY-MM-DD HH:mm:ss'))
                } else if (props.tb === 'horaireQuart') {
                    store2.HoaireQuart(moment(datedeb.value).format('YYYY-MM-DD HH:mm:ss'), moment(datefin.value).format('YYYY-MM-DD HH:mm:ss'))
                }
            }
            let exportToCSV = () => {
                exportNewExcel(store2.dataReport)
            };
            let head = ref([
                //{ text: 'ID', value: 'ID', sortable: true, width: 20, type: 'number'},
                { text: 'Code', value: 'code', sortable: true, width: 60, type: 'string'},
                { text: 'Date', value: 'date', sortable: true, width: 60, type: 'string'},
                { text: 'Heure', value: 'heure', sortable: true, width: 60, type: 'string'},
                { text: 'Event', value: 'event', sortable: true, width: 150, type: 'string'},
                { text: 'Region', value: 'region', sortable: true, width: 140, type: 'string' },
                { text: '% carburant', value: 'fuel_percent', sortable: true, width: 20, type: 'string'},
                { text: 'Qté Carburant', value: 'fuel_qte', sortable: true, width: 20, type: 'number'},
                { text: 'Compteur Km', value: 'compteur', sortable: true, width: 100, type: 'string'},
                { text: 'Vitesse Max', value: 'vitesse', sortable: true,  width: 40, type: 'string'},
                { text: 'RPM', value: 'rpm', sortable: true, width: 40, type: 'number'},
                //{ text: 'Date', value: 'dateHeure', sortable: true, width: 40, type: 'date'},
                { text: 'Adresse', value: 'adresse', sortable: true, width: 20, type: 'string'},
            ]);
            const secToTime = (totalSeconds: number) => {
                return moment.utc(totalSeconds*1000).format('HH:mm:ss')
            }
            onMounted(()=>{
               headers.value= props.header;
               items.value = props.data
               titre.value = props.title
               console.log(items.value)
               console.log(dbq.value)
            })
            watch(props, ()=>{
                items.value = props.data
            })
            return{
              operation,
              deleteItem,
              addItem,
              viewItem,
              opeData,
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
              bodyRowClassNameFunction,
              titre,
              closeModal,
              refreshTable,
              changeDate,
              exportToCSV,
              goProfile,
              goLogin,
              piste,
              changeParcel,
              generer,
              head,
              codeVeh,
              detailsData,
              datedeb,
              datefin,
              datedebChange,
              secToTime,
              calculReport
            }
        }
      })
    </script>
    <style>
    .customize-table {

      --easy-table-header-font-size: 10px;
      --easy-table-header-height: 10px;
      --easy-table-header-font-color: #c1cad4;
      --easy-table-header-background-color: #2d3a4f;

      --easy-table-header-item-padding: 10px 15px;
      --easy-table-loading-mask-background-color: #2d3a4f;
      --easy-table-body-row-font-size: 11px;

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

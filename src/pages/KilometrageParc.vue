<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">KILOMETRAGES</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Databases</a></li>
                                    <li class="breadcrumb-item active">Kilométrage</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <importHoraire/>
            <!-- end page title-->
            <TableReport :header="header" :data="data" title="distance" tb="distance" @refreshTable="refreshTable" cbTable="mnDts"/>

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    </div></q-page>
    </template>
    <script lang="ts">
      import { computed, defineComponent, onMounted } from 'vue';
      import TableReport from '../components/tables/TableReport.vue';
      import { useRepportStore} from '../stores/repport-store'
      import importHoraire from '../components/imports/importHoraire.vue';
      import moment from 'moment'
      export default defineComponent({
        name: 'KilometrageParc',
        components: {
            TableReport,
            importHoraire
        },
        setup() {
            const store = useRepportStore();
            let data = computed(()=>store.dataActivite)
            let datedeb = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
            let datefin = moment().format('YYYY-MM-DD HH:mm:ss')
            const header = [
               { text: 'Action', value: 'operation', sortable: true, width: 15, type: 'action'},
               { text: 'Id', value: 'id', sortable: true, width: 15, type: 'number'},
               { text: 'Code', value: 'code', sortable: true, width: 150, type: 'string'},
               { text: 'Date debut', value: 'startmove', sortable: true, width: 200, type: 'date'},
               { text: 'Date fin', value: 'endmov', sortable: true, width: 200, type: 'date'},
               { text: 'Kilométrage', value: 'distance', sortable: true, width: 200, type: 'string'},
               //{ text: 'Ralenti', value: 'Ralenti', sortable: true, width: 60, type: 'string'},
               //{ text: 'Arret', value: 'Arret', sortable: true, width: 100, type: 'string'},
            ]
            const refreshTable = ()=>{
                store.allActivitesKm(datedeb, datefin);
            }
            /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
            onMounted(()=>{
                store.allActivitesKm(datedeb, datefin);
                //console.log(store.typeVeh)
            })
            return{
              header,
              data,
              refreshTable
            }
        }
      })
    </script>

<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">HORAIREs</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Databases</a></li>
                                    <li class="breadcrumb-item active">Horaire</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <importHoraire/>
            <!-- end page title-->
            <TableReport :header="header" :data="data" title="horaire" tb="horaire" @refreshTable="refreshTable" cbTable="mnDts"/>

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
        name: 'HoraireParc',
        components: {
            TableReport,
            importHoraire
        },
        setup() {
            const store = useRepportStore();
            let data = computed(()=>store.dataActivite)
            //let datedeb = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
            //let datefin = moment().format('YYYY-MM-DD HH:mm:ss')
            const header = [
               { text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
               { text: 'Id', value: 'id', sortable: true, width: 15, type: 'number'},
               { text: 'Code', value: 'code', sortable: true, width: 100, type: 'string'},
               { text: 'Date', value: 'startmove', sortable: true, width: 200, type: 'date'},
               { text: 'Temps Conduite', value: 'tdrive', sortable: true, width: 150, type: 'string'},
               { text: 'Ralenti', value: 'idle', sortable: true, width: 150, type: 'string'},
               { text: 'Arret', value: 'stoptime', sortable: true, width: 150, type: 'string'},
            ]
            const refreshTable = ()=>{
                store.allActivites(store.datedeb, store.datefin)
            }
            /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
            onMounted(()=>{
                store.allActivites(store.datedeb, store.datefin)
                console.log(data)
            })
            return{
              header,
              data,
              refreshTable
            }
        }
      })
    </script>

<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">{{$t('parcMateriels') }}</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Vehicules</a></li>
                                    <li class="breadcrumb-item active">Parc</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <!-- end page title-->
            <TableData :header="header" :data="data" title="Parc_Matériels" tb="vehicule" @refreshTable="refreshTable" cbTable="cpl"/>

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    </div></q-page>
    </template>
    <script lang="ts">
      import { computed, defineComponent, onMounted } from 'vue';
      import TableData from '../components/tables/TableData.vue';
      import { useSettingStore } from '../stores/settings-store';

      export default defineComponent({
        name: 'ParcMateriels',
        components: {
          TableData
        },
        setup() {
            const store = useSettingStore();
            let data = computed(()=>store.parc)
            const header = [
               { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number'},
               { text: 'Code', value: 'code', sortable: true, width: 150, type: 'string'},
               { text: 'Immat', value: 'Immat', sortable: true, width: 150, type: 'string'},
               { text: 'Libelle', value: 'libelle', sortable: true, width: 150, type: 'string'},
               { text: 'Marque', value: 'Marque', sortable: true, width: 60, type: 'object'},
               { text: 'Etat', value: 'EtahVeh', sortable: true, width: 200, type: 'object'},
               //{ text: 'Site', value: 'Site', sortable: true, width: 60, type: 'object'},
               { text: 'Fournisseur', value: 'Fournisseur', sortable: true, width: 60, type: 'object'},
               { text: 'Activite', value: 'activiteVeh', sortable: true, width: 60, type: 'object'},
               { text: 'Type', value: 'type_veh', sortable: true, width: 60, type: 'object'},
               { text: 'Carburant', value: 'carburant', sortable: true, width: 60, type: 'object'},
               { text: 'Puissance', value: 'PuissanceVeh', sortable: true, width: 60, type: 'string'},
               { text: 'tracking', value: 'tracking', sortable: true, width: 60, type: 'boolean'},
               { text: 'Acquisition', value: 'MiseService', sortable: true, width: 60, type: 'date'},
               { text: 'DateTracking', value: 'DateTracking', sortable: true, width: 60, type: 'date'},
               { text: 'DateService', value: 'DateService', sortable: true, width: 60, type: 'date'},
               { text: 'DateSortie', value: 'DateSortie', sortable: true, width: 60, type: 'date'},
               { text: 'Status', value: 'Status', sortable: true, width: 60, type: 'boolean'},
               { text: 'Image', value: 'image', sortable: true, width: 80, type: 'image'},
               { text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
            ]
            const refreshTable = ()=>{
                store.allParc();
            }
            /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
            onMounted(()=>{
                store.allParc();
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

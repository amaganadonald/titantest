<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">TYPE VEHICULE</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Vehicules</a></li>
                                    <li class="breadcrumb-item active">Type</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <!-- end page title-->
            <TableData :header="header" :data="data" title="Type_vehicules" tb="type_veh" @refreshTable="refreshTable" cbTable="mnDts"/>

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
        name: 'TypeVehicule',
        components: {
          TableData
        },
        setup() {
            const store = useSettingStore();
            let data = computed(()=>store.typeVeh)
            const header = [
               { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number'},
               { text: 'Code', value: 'id_tpe', sortable: true, width: 150, type: 'string'},
               { text: 'Libelle', value: 'lib_type', sortable: true, width: 150, type: 'string'},
               { text: 'Famille', value: 'fam_veh', sortable: true, width: 150, type: 'object'},
               { text: 'Creation', value: 'datej', sortable: true, width: 60, type: 'date'},
               { text: 'Observation', value: 'observation', sortable: true, width: 200, type: 'string'},
               { text: 'Status', value: 'Status', sortable: true, width: 20, type: 'boolean'},
               { text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
            ]
            const refreshTable = ()=>{
                store.allTypeVeh();
            }
            /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
            onMounted(()=>{
                store.allTypeVeh();
                console.log(store.typeVeh)
            })
            return{
              header,
              data,
              refreshTable
            }
        }
      })
    </script>

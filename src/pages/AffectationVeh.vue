<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Affectation</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Vehicules</a></li>
                                    <li class="breadcrumb-item active">Affectation</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <!-- end page title-->
            <TableData :header="header" :data="data" title="Affectation" tb="affectation" @refreshTable="refreshTable" cbTable="mnDts"/>

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    </div></q-page>
    </template>
    <script lang="ts">
      import { computed, defineComponent, onMounted, onBeforeMount } from 'vue';
      import TableData from '../components/tables/TableData.vue';
      import { useSettingStore } from '../stores/settings-store';

      export default defineComponent({
        name: 'AffectationVeh',
        components: {
          TableData
        },
        setup() {
            const store = useSettingStore();
            let data = computed(()=>store.affectation)
            const header = [
               { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number'},
               { text: 'Engin', value: 'code_veh', sortable: true, width: 200, type: 'string'},
               { text: 'Attelage', value: 'code_attelage', sortable: true, width: 200, type: 'string'},
               { text: 'debut', value: 'datedeb', sortable: true, width: 60, type: 'date'},
               { text: 'fin', value: 'datefin', sortable: true, width: 60, type: 'date'},
               { text: 'Observation', value: 'observation', sortable: true, width: 200, type: 'string'},
               { text: 'Status', value: 'Status', sortable: true, width: 20, type: 'boolean'},
               { text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
            ]
            const refreshTable = ()=>{
                store.allAffectation();
            }
            onBeforeMount(()=>{
                store.allAffectation();
            })
            onMounted(()=>{
                store.allAffectation();
            })
            return{
              header,
              data,
              refreshTable
            }
        }
      })
    </script>

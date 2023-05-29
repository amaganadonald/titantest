<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Atelier</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Admin</a></li>
                                    <li class="breadcrumb-item active">atelier</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <!-- end page title-->
            <TableData :header="header" :data="data" title="atelier" tb="atelier" @refreshTable="refreshTable" cbTable="mnDts"/>

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
        name: 'AtelierParc',
        components: {
          TableData
        },
        setup() {
            const store = useSettingStore();
            let data = computed(()=>store.atelier)
            const header = [
               { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number'},
               { text: 'Code', value: 'code', sortable: true, width: 150, type: 'string'},
               { text: 'Libelle', value: 'libelle', sortable: true, width: 150, type: 'string'},
               { text: 'Description', value: 'description', sortable: true, width: 100, type: 'string'},
               { text: 'Datej', value: 'datej', sortable: true, width: 200, type: 'date'},
               { text: 'Status', value: 'Status', sortable: true, width: 60, type: 'boolean'},
               { text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
            ]
            const refreshTable = ()=>{
                store.allAtelier()
            }
            /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
            onMounted(()=>{
                store.allAtelier()
            })
            return{
              header,
              data,
              refreshTable
            }
        }
      })
    </script>

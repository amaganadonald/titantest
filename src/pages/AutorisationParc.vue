<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Autorisation</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Admin</a></li>
                                    <li class="breadcrumb-item active">autorisation</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <!-- end page title-->
            <TableData :header="header" :data="data" title="autorisation" tb="autorisation" @refreshTable="refreshTable" cbTable="mnDts"/>

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
        name: 'AutorisationParc',
        components: {
          TableData
        },
        setup() {
            const store = useSettingStore();
            let data = computed(()=>store.autorisation)
            const header = [
               { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number'},
               { text: 'Nom', value: 'name', sortable: true, width: 200, type: 'string'},
               { text: 'Description', value: 'description', sortable: true, width: 200, type: 'string'},
               { text: 'Ajouter', value: 'ad', sortable: true, width: 60, type: 'boolean'},
               { text: 'Mise à jour', value: 'up', sortable: true, width: 140, type: 'boolean'},
               { text: 'Copier', value: 'cp', sortable: true, width: 60, type: 'boolean'},
               { text: 'Supprimer', value: 'del', sortable: true, width: 60, type: 'boolean'},
               { text: 'Renommer', value: 'rd', sortable: true, width: 60, type: 'boolean'},
               { text: 'Importer', value: 'upl', sortable: true, width: 60, type: 'boolean'},
               { text: 'Exporter', value: 'exp', sortable: true, width: 60, type: 'boolean'},
               { text: 'Status', value: 'Status', sortable: true, width: 150, type: 'boolean'},
               { text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
            ]
            const refreshTable = ()=>{
                store.allAutorisation()
            }
            /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
            onMounted(()=>{
                store.allAutorisation()
            })
            return{
              header,
              data,
              refreshTable
            }
        }
      })
    </script>

<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Personnels</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Vehicules</a></li>
                                    <li class="breadcrumb-item active">Personnels</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <!-- end page title-->
            <TableData :header="header" :data="data" title="personnel" tb="personnel" @refreshTable="refreshTable" cbTable="mnDts"/>

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
        name: 'PersonnelVeh',
        components: {
          TableData
        },
        setup() {
            const store = useSettingStore();
            let data = computed(()=>store.personnel)
            const header = [
               { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number'},
               { text: 'Matricule', value: 'matricule', sortable: true, width: 150, type: 'string'},
               { text: 'Nom', value: 'nom', sortable: true, width: 150, type: 'string'},
               { text: 'Date Naissance', value: 'datenais', sortable: true, width: 100, type: 'date'},
               { text: 'Cni', value: 'cni', sortable: true, width: 200, type: 'string'},
               { text: 'Telephone', value: 'tel', sortable: true, width: 60, type: 'string'},
               { text: 'Adresse', value: 'adresse', sortable: true, width: 60, type: 'string'},
               { text: 'Email', value: 'email', sortable: true, width: 60, type: 'string'},
               { text: 'Fonction', value: 'fonction', sortable: true, width: 60, type: 'object'},
               { text: 'Status', value: 'Status', sortable: true, width: 60, type: 'boolean'},
               { text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
            ]
            const refreshTable = ()=>{
                store.allPersonnel()
            }
            /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
            onMounted(()=>{
                store.allPersonnel()
            })
            return{
              header,
              data,
              refreshTable
            }
        }
      })
    </script>

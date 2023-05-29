<template>
    <q-page>
        <div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Utilisateurs</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Admin</a></li>
                                    <li class="breadcrumb-item active">utlisateurs</li>
                                </ol>
                            </div>

                    </div>
                </div>
            </div>
            <!-- end page title-->
            <TableData :header="header" :data="data" title="utilisateur" tb="utilisateur" @refreshTable="refreshTable" cbTable="mnDts"/>

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
        name: 'UtilisateurParc',
        components: {
          TableData
        },
        setup() {
            const store = useSettingStore();
            let data = computed(()=>store.utilisateur)
            const header = [
               { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number'},
               { text: 'Login', value: 'login', sortable: true, width: 150, type: 'string'},
               { text: 'Password', value: 'passwd', sortable: true, width: 150, type: 'string'},
               { text: 'Nom', value: 'nom', sortable: true, width: 100, type: 'string'},
               { text: 'Prenom', value: 'prenom', sortable: true, width: 200, type: 'string'},
               { text: 'langue', value: 'langue', sortable: true, width: 60, type: 'object'},
               { text: 'Adresse', value: 'adresse', sortable: true, width: 60, type: 'string'},
               { text: 'telephone', value: 'tel', sortable: true, width: 60, type: 'string'},
               { text: 'Email', value: 'email', sortable: true, width: 60, type: 'string'},
               { text: 'observation', value: 'observation', sortable: true, width: 60, type: 'string'},
               { text: 'profil', value: 'profil', sortable: true, width: 60, type: 'object'},
               { text: 'matricule', value: 'matricule', sortable: true, width: 60, type: 'string'},
               { text: 'Status', value: 'Status', sortable: true, width: 60, type: 'boolean'},
               { text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
            ]
            const refreshTable = ()=>{
                store.allUtilisateur()
            }
            /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
            onMounted(()=>{
                store.allUtilisateur()
            })
            return{
              header,
              data,
              refreshTable
            }
        }
      })
    </script>

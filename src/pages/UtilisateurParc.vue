<template>
  <q-page>
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <!-- start page title -->
          <div class="row">
            <div class="col-12">
              <div
                class="page-title-box d-sm-flex align-items-center justify-content-between"
              >
                <h4 class="mb-sm-0">Utilisateurs</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Admin</a>
                    </li>
                    <li class="breadcrumb-item active">utlisateurs</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="utilisateur"
            tb="utilisateur"
            @refreshTable="refreshTable"
            cbTable="mnDts"
          />
        </div>
        <!-- container-fluid -->
      </div>
      <!-- End Page-content -->
    </div></q-page
  >
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import TableData from '../components/tables/TableData.vue';
import { useSettingStore } from '../stores/settings-store';

export default defineComponent({
  name: 'UtilisateurParc',
  components: {
    TableData,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.utilisateur);
    const header = [
      { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number' },
      {
        text: 'Login',
        value: 'login',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Photo',
        value: 'url_photo',
        sortable: true,
        type: 'image',
      },
      { text: 'Nom', value: 'nom', sortable: true, type: 'string' },
      {
        text: 'Prenom',
        value: 'prenom',
        sortable: true,
        type: 'string',
      },
      {
        text: 'langue',
        value: 'langue',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Adresse',
        value: 'adresse',
        sortable: true,
        type: 'string',
      },
      {
        text: 'telephone',
        value: 'tel',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Email',
        value: 'email',
        sortable: true,
        type: 'string',
      },
      {
        text: 'observation',
        value: 'observation',
        sortable: true,
        type: 'string',
      },
      {
        text: 'profil',
        value: 'profil',
        sortable: true,
        type: 'object',
      },
      {
        text: 'matricule',
        value: 'matricule',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Status',
        value: 'Status',
        sortable: true,
        type: 'boolean',
      },

      {
        text: 'Password',
        value: 'passwd',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Action',
        value: 'operation',
        sortable: true,
        type: 'action',
      },
    ];
    const refreshTable = async () => {
      await store.allUtilisateur();
    };
    onMounted(async () => {
      await store.allUtilisateur();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

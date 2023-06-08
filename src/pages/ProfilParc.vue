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
                <h4 class="mb-sm-0">Profil</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Admin</a>
                    </li>
                    <li class="breadcrumb-item active">profil</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <TableProfil
            :dataP="data"
            :head="header"
            tb="profil"
            @refreshTable="refreshTable"
            title="profil"
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
import { useSettingStore } from '../stores/settings-store';
import TableProfil from '../components/tables/TableProfil.vue';

export default defineComponent({
  name: 'ProfilParc',
  components: {
    TableProfil,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.profil);
    const header = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      { text: 'Libelle', value: 'name', sortable: true, type: 'string' },
      {
        text: 'Description',
        value: 'description',
        sortable: true,
        type: 'string',
      },
      { text: 'Menus', value: 'menus', sortable: true, type: 'accord' },
      {
        text: 'Autorisation',
        value: 'autorisation',
        sortable: true,
        type: 'object',
      },
      { text: 'Status', value: 'Status', sortable: true, type: 'boolean' },
      { text: 'Action', value: 'operation', sortable: true, type: 'action' },
    ];
    const refreshTable = async () => {
      await store.allProfil();
    };

    onMounted(async () => {
      await store.allProfil();
      console.log(data.value);
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

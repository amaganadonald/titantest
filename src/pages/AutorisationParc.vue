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
                <h4 class="mb-sm-0">Autorisation</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Admin</a>
                    </li>
                    <li class="breadcrumb-item active">autorisation</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="autorisation"
            tb="autorisation"
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
  name: 'AutorisationParc',
  components: {
    TableData,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.autorisation);
    const header = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      { text: 'Nom', value: 'name', sortable: true, type: 'string' },
      {
        text: 'Description',
        value: 'description',
        sortable: true,
        type: 'string',
      },
      { text: 'Ajouter', value: 'ad', sortable: true, type: 'boolean' },
      { text: 'Mise à jour', value: 'up', sortable: true, type: 'boolean' },
      { text: 'Copier', value: 'cp', sortable: true, type: 'boolean' },
      { text: 'Supprimer', value: 'del', sortable: true, type: 'boolean' },
      { text: 'Renommer', value: 'rd', sortable: true, type: 'boolean' },
      { text: 'Importer', value: 'upl', sortable: true, type: 'boolean' },
      { text: 'Exporter', value: 'exp', sortable: true, type: 'boolean' },
      { text: 'Status', value: 'Status', sortable: true, type: 'boolean' },
      { text: 'Action', value: 'operation', sortable: true, type: 'action' },
    ];
    const refreshTable = () => {
      store.allAutorisation();
    };
    /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
    onMounted(() => {
      store.allAutorisation();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

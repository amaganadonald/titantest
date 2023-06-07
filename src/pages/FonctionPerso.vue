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
                <h4 class="mb-sm-0">Fonction</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Admin</a>
                    </li>
                    <li class="breadcrumb-item active">fonction</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="fonction"
            tb="fonction"
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
  name: 'FonctionPerso',
  components: {
    TableData,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.fonction);
    const header = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      { text: 'Code', value: 'code', sortable: true, type: 'string' },
      { text: 'Libelle', value: 'libelle', sortable: true, type: 'string' },
      {
        text: 'Description',
        value: 'description',
        sortable: true,
        type: 'string',
      },
      { text: 'Datej', value: 'datej', sortable: true, type: 'date' },
      { text: 'Status', value: 'Status', sortable: true, type: 'boolean' },
      { text: 'Action', value: 'operation', sortable: true, type: 'action' },
    ];
    const refreshTable = () => {
      store.allFonction();
    };
    /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
    onMounted(() => {
      store.allFonction();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

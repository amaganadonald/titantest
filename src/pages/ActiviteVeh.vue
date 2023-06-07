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
                <h4 class="mb-sm-0">Activités</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Vehicules</a>
                    </li>
                    <li class="breadcrumb-item active">Activités</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="Activités"
            tb="activiteVeh"
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
  name: 'ActiviteVeh',
  components: {
    TableData,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.activite);
    const header = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      { text: 'Code', value: 'code', sortable: true, type: 'string' },
      {
        text: 'Libelle',
        value: 'activite_name',
        sortable: true,
        type: 'string',
      },
      { text: 'Creation', value: 'datej', sortable: true, type: 'date' },
      {
        text: 'Observation',
        value: 'observation',
        sortable: true,
        type: 'string',
      },
      { text: 'Status', value: 'Status', sortable: true, type: 'boolean' },
      { text: 'Action', value: 'operation', sortable: true, type: 'action' },
    ];
    const refreshTable = () => {
      store.allActivites();
    };
    /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
    onMounted(() => {
      store.allActivites();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

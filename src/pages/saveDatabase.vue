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
          <TableRapport
            :header="header"
            :data="data"
            title="Save Database"
            tb="dbsvg"
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
import TableRapport from '../components/tables/TableRapport.vue';
import { useSettingStore } from '../stores/settings-store';

export default defineComponent({
  name: 'saveDatabase',
  components: {
    TableRapport,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.svgDb);
    const header = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      { text: 'Fichier', value: 'name', sortable: true, type: 'string' },
      {
        text: 'Date de sauvagarde',
        value: 'date',
        sortable: true,
        type: 'string',
      },
      //{ text: 'Creation', value: 'datej', sortable: true, type: 'date' },
    ];
    const refreshTable = async () => {
      await store.allSvgDb();
    };

    onMounted(async () => {
      await store.allSvgDb();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

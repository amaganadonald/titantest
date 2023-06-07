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
                <h4 class="mb-sm-0">Pannes</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Maintenance</a>
                    </li>
                    <li class="breadcrumb-item active">Pannes</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="pannes"
            tb="pannes"
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
import { useMaintenanceStore } from '../stores/maintenance-store';

export default defineComponent({
  name: 'PannesParc',
  components: {
    TableData,
  },
  setup() {
    const store = useMaintenanceStore();
    let data = computed(() => store.pannes);
    const header = [
      { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number' },
      {
        text: 'Code',
        value: 'vehicule',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Bon panne',
        value: 'idpanne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Immo',
        value: 'DateImmo',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Conducteur',
        value: 'personnel',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Cause',
        value: 'CausePanne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'lieu',
        value: 'lieu_panne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Sortie',
        value: 'DateSortie',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Temps panne',
        value: 'tpanne',
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
        text: 'Action',
        value: 'operation',
        sortable: true,
        type: 'action',
      },
    ];
    const refreshTable = () => {
      store.allPannes();
    };
    onMounted(async () => {
      await store.allPannes();
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

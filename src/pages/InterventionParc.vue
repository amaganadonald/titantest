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
                <h4 class="mb-sm-0">Intervention</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Maintenance</a>
                    </li>
                    <li class="breadcrumb-item active">Intervention</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="intervention"
            tb="intervention"
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
  name: 'InterventionParc',
  components: {
    TableData,
  },
  setup() {
    const store = useMaintenanceStore();
    let data = computed(() => store.intervention);
    const header = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      {
        text: 'Code ana',
        value: 'panne.vehicule.code',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Code Intervention',
        value: 'idIntervention',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Bon panne',
        value: 'panne.idpanne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'CausePanne',
        value: 'panne.CausePanne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'lieu_panne',
        value: 'panne.lieu_panne',
        sortable: true,
        type: 'string',
      },
      { text: 'TypeInt', value: 'type_panne', sortable: true, type: 'object' },
      { text: 'DetailInt', value: 'DetailInt', sortable: true, type: 'string' },
      {
        text: 'DateImmo',
        value: 'panne.DateImmo',
        sortable: true,
        type: 'date',
      },

      { text: 'DateDebInt', value: 'DateDebInt', sortable: true, type: 'date' },

      { text: 'DateFinInt', value: 'DateFinInt', sortable: true, type: 'date' },

      {
        text: 'DateSortie',
        value: 'panne.DateSortie',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Durée Intervention',
        value: 'immo',
        sortable: true,
        type: 'string',
      },

      { text: 'ap5', value: 'ap5', sortable: true, type: 'string' },
      {
        text: 'observation',
        value: 'observation',
        sortable: true,
        type: 'string',
      },
    ];
    const refreshTable = () => {
      store.allIntervention();
    };
    onMounted(() => {
      store.allIntervention();
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

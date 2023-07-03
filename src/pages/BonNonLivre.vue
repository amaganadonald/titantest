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
                <h4 class="mb-sm-0">BON PANNE NON LIVRE</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Historique</a>
                    </li>
                    <li class="breadcrumb-item active">pannes en cours</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TablePanne
            :header="header"
            :data="data"
            title="BonNonLivre"
            tb="panne"
            @refreshTable="refreshTable"
            cbTable="mnDts"
            addbtn="adds"
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
import TablePanne from '../components/tables/TablePanne.vue';
import { useMaintenanceStore } from '../stores/maintenance-store';

export default defineComponent({
  name: 'BonNonLivre',
  components: {
    TablePanne,
  },
  setup() {
    const store = useMaintenanceStore();
    let data = computed(() => store.panneNlivre);
    const header = [
      { text: 'Numéro Bon', value: 'idpanne', sortable: true, type: 'number' },
      { text: 'Code', value: 'vehicule.code', sortable: true, type: 'string' },
      {
        text: 'Immat',
        value: 'vehicule.Immat',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Date panne',
        value: 'DateImmo',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Cause Panne',
        value: 'CausePanne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Lieu panne',
        value: 'lieu_panne',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Durée Garage',
        value: 'tpanne',
        sortable: true,
        type: 'string',
      },
      { text: 'Status', value: 'Status', sortable: true, type: 'boolean' },
      //{ text: 'Action', value: 'operation', sortable: true, type: 'action' },
    ];
    const refreshTable = async () => {
      await store.allPannesNonLivre();
    };

    onMounted(async () => {
      await store.allPannesNonLivre();
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

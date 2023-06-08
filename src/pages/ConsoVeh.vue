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
                <h4 class="mb-sm-0">Consommation</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Database</a>
                    </li>
                    <li class="breadcrumb-item active">Consommation</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="conso"
            tb="conso"
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
import { defineComponent, onMounted, computed } from 'vue';
import TableData from '../components/tables/TableData.vue';
import { useRepportStore } from '../stores/repport-store';
export default defineComponent({
  name: 'ConsoVeh',
  components: {
    TableData,
  },
  setup() {
    const store = useRepportStore();
    let data = computed(() => store.conso);
    const header = [
      { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number' },
      {
        text: 'Code Ana',
        value: 'vehicule',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Date',
        value: 'DateConso',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Heure',
        value: 'HeureConso',
        sortable: true,
        type: 'time',
      },
      {
        text: 'Quantité',
        value: 'QteConso',
        sortable: true,
        type: 'number',
      },
      {
        text: 'Carburant',
        value: 'carburant',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Chauffeur',
        value: 'personnel',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Action',
        value: 'operation',
        sortable: true,
        type: 'action',
      },
    ];
    const refreshTable = async () => {
      await store.allConso();
    };
    onMounted(async () => {
      await store.allConso();
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

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
                <h4 class="mb-sm-0">FAMILLE VEHICULE</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Vehicules</a>
                    </li>
                    <li class="breadcrumb-item active">Famille</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page -->
          <TableData
            :header="header"
            :data="data"
            title="Famille_vehicules"
            tb="fam_veh"
            @refreshTable="refreshTable"
            cbTable="mnDts"
          />
        </div>
      </div>
      <!-- End Page-content -->
    </div></q-page
  >
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import TableData from '../components/tables/TableData.vue';
import { useSettingStore } from '../stores/settings-store';

export default defineComponent({
  name: 'FamilleVehicule',
  components: {
    TableData,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.famVeh);
    const header = [
      { text: 'Id', value: 'id', sortable: true, width: 20, type: 'number' },
      {
        text: 'Code',
        value: 'id_fam',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Libelle',
        value: 'lib_fam',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Creation',
        value: 'datej',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Observation',
        value: 'observation',
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
      store.allFamVeh();
    };
    onMounted(async () => {
      await store.allFamVeh();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

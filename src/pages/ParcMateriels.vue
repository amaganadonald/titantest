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
                <h4 class="mb-sm-0">{{ $t('parcMateriels') }}</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Vehicules</a>
                    </li>
                    <li class="breadcrumb-item active">Parc</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="Parc_Matériels"
            tb="vehicule"
            @refreshTable="refreshTable"
            cbTable="cpl"
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
  name: 'ParcMateriels',
  components: {
    TableData,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.parc);
    const header = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Immat',
        value: 'Immat',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Libelle',
        value: 'libelle',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Marque',
        value: 'Marque',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Etat',
        value: 'EtahVeh',
        sortable: true,
        type: 'object',
      },
      //{ text: 'Site', value: 'Site', sortable: true, width: 60, type: 'object'},
      {
        text: 'Fournisseur',
        value: 'Fournisseur',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Activite',
        value: 'activiteVeh',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Type',
        value: 'type_veh',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Carburant',
        value: 'carburant',
        sortable: true,
        type: 'object',
      },
      {
        text: 'Puissance',
        value: 'PuissanceVeh',
        sortable: true,
      },
      {
        text: 'tracking',
        value: 'tracking',
        sortable: true,
        type: 'boolean',
      },
      {
        text: 'Acquisition',
        value: 'MiseService',
        sortable: true,
        type: 'date',
      },
      {
        text: 'DateTracking',
        value: 'DateTracking',
        sortable: true,
        type: 'date',
      },
      {
        text: 'DateService',
        value: 'DateService',
        sortable: true,
        type: 'date',
      },
      {
        text: 'DateSortie',
        value: 'DateSortie',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Status',
        value: 'Status',
        sortable: true,
        type: 'boolean',
      },
      {
        text: 'Image',
        value: 'image',
        sortable: true,
        type: 'image',
      },
      {
        text: 'Action',
        value: 'operation',
        sortable: true,
        type: 'action',
      },
    ];
    const refreshTable = async () => {
      await store.allParc();
    };
    /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
    onMounted(async () => {
      await store.allParc();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

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
                <h4 class="mb-sm-0">TRANSPORT CANNES</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Reporting</a>
                    </li>
                    <li class="breadcrumb-item active">Transport</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <importTransport />
          <!-- end page title-->
          <TableReport
            :header="header"
            :data="data"
            title="transport"
            tb="transport"
            @refreshTable="refreshTable"
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
import importTransport from '../components/imports/importTransport.vue';
import TableReport from '../components/tables/TableReport.vue';
import { useRepportStore } from '../stores/repport-store';
export default defineComponent({
  name: 'TransportCannes',
  components: {
    TableReport,
    importTransport,
  },
  setup() {
    const store = useRepportStore();
    let data = computed(() => store.dataReport);
    const header = [
      { text: 'Action', value: 'operation', sortable: true, type: 'action' },
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      { text: 'Date', value: 'Date', sortable: true, type: 'string' },
      { text: 'Quart', value: 'Quart', sortable: true, type: 'string' },
      { text: 'Usine', value: 'Site', sortable: true, type: 'string' },
      { text: 'Engin', value: 'Engin', sortable: true, type: 'string' },
      {
        text: 'Depart Usine',
        value: 'Hdepart_Usine',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Retour Usine',
        value: 'Harrivée_Usine',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Temps Usine',
        value: 'Enceinte_Usine',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Durée Voyage',
        value: 'Durée_Voyage',
        sortable: true,
        type: 'string',
      },
      { text: 'Km', value: 'Km_Voyage', sortable: true, type: 'string' },
      { text: 'Parcelle', value: 'Chantier', sortable: true, type: 'string' },
      {
        text: 'Arrivée Parcelle',
        value: 'Harrivée_chantier',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Départ Parcelle',
        value: 'Hdépart_chantier',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Durée Parcelle',
        value: 'Durée_chantier',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Temps aller',
        value: 'Temps_aller',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Temps Retour',
        value: 'Temps_retour',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Durée Cycle',
        value: 'Durée_total_cycle',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Pont bascule',
        value: 'pont_bascule',
        sortable: true,
        type: 'string',
      },
      { text: 'Conso', value: 'consommation', sortable: true, type: 'string' },
      {
        text: 'Temps Dechargement',
        value: 'Temps_Dechargement',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Vitesse Max',
        value: 'Vitesse_Max',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Vitesse Moy',
        value: 'Vitesse_Moy',
        sortable: true,
        type: 'string',
      },
      { text: 'Panne', value: 'Panne', sortable: true, type: 'string' },
      {
        text: 'Observation',
        value: 'Observation',
        sortable: true,
        type: 'string',
      },
    ];
    const refreshTable = () => {
      //store.allTypeVeh();
    };
    /*onBeforeMount(()=>{
                store.allFamVeh();
            })*/
    onMounted(() => {
      //store.allTypeVeh();
      //console.log(store.typeVeh)
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

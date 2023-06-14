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
                <h4 class="mb-sm-0">ACTIVITE HORAIRE</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Reporting</a>
                    </li>
                    <li class="breadcrumb-item active">Horaire</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!--importHoraire/>
            < end page title-->
          <TableReport
            :header="header"
            :data="data"
            title="horaireQuart"
            tb="horaireQuart"
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
import TableReport from '../components/tables/TableReport.vue';
import { useRepportStore } from '../stores/repport-store';
///import importHoraire from '../components/imports/importHoraire.vue';
export default defineComponent({
  name: 'ActiviteHoraire',
  components: {
    TableReport,
    //importHoraire
  },
  setup() {
    const store = useRepportStore();
    let data = computed(() => store.horaireActivity);
    const header = [
      //{ text: 'Action', value: 'operation', sortable: true, width: 80, type: 'action'},
      //{ text: 'Id', value: 'id', sortable: true, width: 15, type: 'number'},
      { text: 'Code', value: 'code', sortable: true, type: 'string' },
      { text: 'Quart', value: 'quart', sortable: true, type: 'string' },
      {
        text: 'Temps Conduite',
        value: 'tdrive',
        sortable: true,
        type: 'string',
      },
      { text: 'Ralenti', value: 'idle', sortable: true, type: 'string' },
      { text: 'Arret', value: 'stoptime', sortable: true, type: 'string' },
      { text: 'Km', value: 'distance', sortable: true, type: 'string' },
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

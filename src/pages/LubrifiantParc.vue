<template>
  <!-- ============================================================== -->
  <!-- Start right Content here -->
  <!-- ============================================================== -->
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">LUBRIFIANT</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="javascript: void(0);">Database</a>
                  </li>
                  <li class="breadcrumb-item active">Lubrifiant</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <!-- end page title -->

        <div class="row mt-2">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title mb-0">Files Upload</h4>
                  </div>
                  <!-- end card header -->

                  <div class="card-body">
                    <div class="input-group">
                      <input
                        type="file"
                        class="form-control"
                        id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                        accept=".xls, .xlsx"
                        name="fichier"
                        multiple
                        @change="fileChange()"
                        ref="fichier"
                      />
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="importFile()"
                        id="inputGroupFileAddon04"
                      >
                        Upload
                      </button>
                    </div>
                    <br /><br />
                    <TableRapport
                      :header="header"
                      :data="data"
                      title="Data Lubrifiant"
                      filename="data_lubrifiant"
                    />
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
  </div>
  <!-- end main content-->
</template>
<script>
import * as XLSX from 'xlsx';
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRepportStore } from 'src/stores/repport-store';
import TableRapport from 'src/components/tables/TableRapport.vue';

export default defineComponent({
  name: 'LubrifiantParc',
  components: {
    TableRapport,
  },
  setup() {
    const $q = useQuasar();
    let fichier = ref(null);
    let loading = ref(false);
    let datab = ref([]);
    const store = useRepportStore();
    let data = computed(() => store.dataLubrifiant);
    const importFile = async () => {
      loading.value = true;
      console.log(datab.value);
      await store.uploadLubrifiant(datab.value);
      $q.notify({
        message: 'Import reussie',
        color: 'teal-10',
        position: 'top-right',
        textColor: 'white',
        icon: 'cloud',
      });
      const fls = document.getElementById('inputGroupFile04');
      fls.innerHTML = '';
      loading.value = false;
      fichier.value = null;
    };

    const sendFile = () => {
      console.log(fichier.value.files);
    };
    const header = [
      {
        text: 'Id',
        value: 'id',
        sortable: true,
        type: 'number',
        title: 'Id',
        dataKey: 'id',
      },
      {
        text: 'Code',
        value: 'code',
        sortable: true,
        type: 'string',
        title: 'Code',
        dataKey: 'code',
      },
      {
        text: 'Organe',
        value: 'Organe',
        sortable: true,
        type: 'string',
        title: 'Daqtete',
        dataKey: 'organe',
      },
      {
        text: 'Site',
        value: 'siteconso',
        sortable: true,
        type: 'string',
        title: 'Site',
        dataKey: 'siteconso',
      },
      {
        text: 'Date',
        value: 'Datelub',
        sortable: true,
        type: 'date',
        title: 'Date',
        dataKey: 'Datelub',
      },
      {
        text: 'Entretien',
        value: 'Entretien',
        sortable: true,
        type: 'string',
        title: 'Entretien',
        dataKey: 'Entretien',
      },
      {
        text: 'Huile',
        value: 'huile',
        sortable: true,
        type: 'string',
        title: 'Huile',
        dataKey: 'huile',
      },
      {
        text: 'statetat',
        value: 'statetat',
        sortable: true,
        type: 'string',
        title: 'statetat',
        dataKey: 'statetat',
      },
      {
        text: 'Qte',
        value: 'Qte',
        sortable: true,
        type: 'number',
        title: 'Qte',
        dataKey: 'Qte',
      },
    ];
    const fileChange = () => {
      if (fichier.value != undefined && fichier.value != null) {
        for (let r = 0; r < fichier.value.files.length; r++) {
          var filereader = new FileReader();
          filereader.readAsArrayBuffer(fichier.value.files[r]);
          filereader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, {
              type: 'buffer',
              cellDates: true,
            });
            const wsname = wb.SheetNames[0];
            const wsname1 = wb.SheetNames[1];
            const ws = wb.Sheets[wsname];
            const ws1 = wb.Sheets[wsname1];
            const datas = XLSX.utils.sheet_to_json(ws, ws1);

            datas.map(async (db) => {
              await datab.value.push({
                code: db.code,
                qte: db.qte,
                siteconso: db.siteconso,
                Datelub: db.Datelub,
                huile: db.huile,
                Entretien: db.Entretien,
                statetat: db.statetat,
                Qte: db.Qte,
              });
            });
          };
        }
      }
    };

    onMounted(async () => {
      await store.allDataLubrifiant();
    });
    return {
      fichier,
      importFile,
      loading,
      sendFile,
      fileChange,
      data,
      header,
    };
  },
});
</script>

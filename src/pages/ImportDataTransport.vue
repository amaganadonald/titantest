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
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">IMPORT DATA TRANSPORT CANNES</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Import</a></li>
                            <li class="breadcrumb-item active">Transport</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
        <!-- end page title -->

        <div class="row mt-2">
                        <div class="col-lg-12">
                            
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title mb-0">Files Upload</h4>
                                        </div><!-- end card header -->

                                        <div class="card-body">
                                            <div class="input-group">
                                            <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".xls, .xlsx" name="fichier" multiple @change="sendFile()" ref="fichier">
                                            <button class="btn btn-outline-secondary" type="button" @click="importFile()" id="inputGroupFileAddon04">Upload</button>
                                            </div>
                                        </div>
                                        <!-- end card body -->
                                    </div>
                                    <!-- end card -->
                                </div> <!-- end col -->

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
  import { date } from 'quasar';
  //import { useTableauStore } from 'src/stores/tableau-store';
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { useQuasar } from 'quasar';
  //import moment from 'moment';
  import { useRepportStore} from 'src/stores/repport-store'
  
  
  export default defineComponent({
    name: 'ImportDataTransport',
    components: { },
    setup() {
      const $q = useQuasar();
      let fichier = ref(null);
      let loading = ref(false);
      let datab = ref([]);
      const store = useRepportStore()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let dataBases = ref([]);
      const importFile = () => {
        loading.value = true;
        //let dataConvert = [];
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
              //console.log(ws);
              const datas = XLSX.utils.sheet_to_json(ws, ws1);
             // dataConvert = [...dataBases.value, ...datas];
              //console.log(datas);
              //console.log(dataConvert);
              //filereader.DONE();
              datas.map((db) => {
                //identifiant.value = identifiant.value + 1;
                datab.value.push({
                  code: db.NN,
                  date: db.PD,
                  heure: db.PT,
                  event: db.EN,
                  region: db.EI,
                  compteur: db.O,
                  vitesse: db.S,
                  rpm: db.R,
                  dateHeure: db.T,
                  fuel_percent: db.FL,
                  fuel_qte: db.FQ,
                  adresse: db.address,
                });
              });
              //console.log(dataTable.value);
            };
          }
        }
        setTimeout(() => {
            store.changeTrData(datab.value);
            //store.importCsv(datab.value);
            //console.log(datab.value);
        },2000)
        //console.log(dataTable.value)
                $q.notify({
                  message: 'Import reussie',
                  color: 'teal-10',
                  position: 'top-right',
                  textColor: 'white',
                  icon: 'cloud',
                });
          
        loading.value = false;
        fichier.value = null;
      };
  
       const sendFile = () => {
        console.log(fichier.value.files)
       }

       const fileChange = () => {
        console.log(fichier)
       }
  
      onMounted(() => {
        console.log()
      });
      return {
        fichier,
        importFile,
        loading,
        sendFile,
        fileChange
      };
    },
  });
  </script>
 
<template>

    <div class="row mt-2">
                    <div class="col-lg-12">
                        
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title mb-0">Importez Fichier</h4>
                                    </div><!-- end card header -->

                                    <div class="card-body">
                                        <div class="input-group">
                                        <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".xls, .xlsx" name="fichier" ref="fichier">
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

</template>
<script>
import * as XLSX from 'xlsx';
//import { useTableauStore } from 'src/stores/tableau-store';
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar, date } from 'quasar';
import moment from 'moment';
import { useRepportStore} from 'src/stores/repport-store'


export default defineComponent({
name: 'ImportDataTransport',
components: { },
setup() {
  const $q = useQuasar();
  let fichier = ref(null);
  let loading = ref(false);
  let dataBases = ref([]);
  let datetemps = ref(date.formatDate(Date.now(), 'DD-MM-YYYY 05:00'))
  let filenam = ref('Temps_Conduite_du_' + date.formatDate(Date.now(), 'DDMMYYYY'))
  let tableau = ref([])
  const store = useRepportStore()

  const importFile = () => {
      console.log(fichier.value.files[0])
      loading.value = true;
      if (fichier.value != undefined && fichier.value != null) {
        var filereader = new FileReader();
        filereader.readAsArrayBuffer(fichier.value.files[0]);
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
          const dataConvert = [...dataBases.value, ...datas];
          console.log(dataConvert);
          generateDatas(dataConvert)
          //let code = retourneCode(dataConvert);
          //retourneTemps(code, dataConvert);
        };
      }
      //fichier.value = null
      loading.value = false;
    }

    const generateDatas = (tab) => {
        let strmov, endmov = ''
        let tabRejet = []
        let quart = 0
        let q1 = moment('05:10:00', 'HH:mm a')
        let q2 = moment('13:10:00', 'HH:mm a')
        let q3 = moment('21:10:00', 'HH:mm a')
        let dd = ''
        //console.log(moment(d1).format('HH:mm'))
        //console.log(Date.parse())
        tableau.value = []
        tab.forEach(elt => {
           if (Date.parse(elt.START_MOVE) !=Date.parse(strmov) && Date.parse(elt.END_MOVE) !=Date.parse(endmov)) {
               dd = moment(moment(elt.END_MOVE).format('HH:mm'), 'HH:mm a')
              if( q1.isBefore(dd) && q2.isAfter(dd)) {quart = 1}
              else if(q2.isBefore(dd) && q3.isAfter(dd)) {quart = 2}
              else {quart=3}
                if (elt.IDLE_TIME_SECS < 0) {
                    tableau.value.push({
                        code: elt.V_NICK_NAME,
                        date: elt.DT_DRIVE_DATE,
                        engon: elt.EGN_ON,
                        startmove:  elt.START_MOVE,
                        startloc: elt.START_LOCATION,
                        destination: elt.DESTINATION,
                        endmov: elt.END_MOVE,
                        engoff: elt.EGN_OFF,
                        distance: elt.DISTANCE,
                        tdrive: elt.TRIP_TIME_SECS,
                        startidle: elt.IDLE_AT_START,
                        idleduring: elt.IDLE_AT_START,
                        idleend: elt.IDLE_AT_START,
                        idle: elt.IDLE_AT_START,
                        stoptime: elt.ON_LOCATION_SEC,
                        quart: quart
                    })
                } else {
                        tableau.value.push({
                        code: elt.V_NICK_NAME,
                        date: elt.DT_DRIVE_DATE,
                        engon: elt.EGN_ON,
                        startmove:  elt.START_MOVE,
                        startloc: elt.START_LOCATION,
                        destination: elt.DESTINATION,
                        endmov: elt.END_MOVE,
                        engoff: elt.EGN_OFF,
                        distance: elt.DISTANCE,
                        tdrive: elt.TRIP_TIME_SECS,
                        startidle: elt.IDLE_AT_START,
                        idleduring: elt.IDLE_AT_DURING,
                        idleend: elt.IDLE_AT_END,
                        idle: elt.IDLE_TIME_SECS,
                        stoptime: elt.ON_LOCATION_SEC,
                        quart: quart
                    })
                }
                strmov = elt.START_MOVE
                endmov = elt.END_MOVE
           } else {
            tabRejet.push({
                    code: elt.V_NICK_NAME,
                    date: elt.DT_DRIVE_DATE,
                    engon: elt.EGN_ON,
                    startmove: elt.START_MOVE,
                    startloc: elt.START_LOCATION,
                    destination: elt.DESTINATION,
                    endmov: elt.END_MOVE,
                    engoff: elt.EGN_OFF,
                    distance: elt.DISTANCE,
                    tdrive: elt.TRIP_TIME_SECS,
                    startidle: elt.IDLE_AT_START,
                    idleduring: elt.IDLE_AT_DURING,
                    idleend: elt.IDLE_AT_END,
                    idle: elt.IDLE_TIME_SECS,
                    stoptime: elt.ON_LOCATION_SEC
                })
                strmov = elt.START_MOVE
                endmov = elt.END_MOVE
            }
        });
        console.log(tableau.value)
        store.manageActivites(tableau.value, 'add')
    }

    const splitDate = (date) => {
      let dd = date.split(' ');
      let kk = dd[0].split('-');
      return kk[0] + '' + kk[1] + '' + kk[2];
    }

    // function qui met un datetime au format anglis
    const changeDatetime = (datetime) => {
      let dat = datetime.split(' ');
      let chgdat = dat[0].split('-');
      return new Date(
        chgdat[2] + '-' + chgdat[1] + '-' + chgdat[0] + ' ' + dat[1]
      );
    }
    // function qui met un datetime au format anglis
    const changeDatetime2 = (datetime) => {
      let dat = datetime.split(' ');
      let chgdat = dat[0].split('/');
      return new Date(
        chgdat[2] + '-' + chgdat[1] + '-' + chgdat[0] + ' ' + dat[1]
      );
    }

    // function qui retourne les differents temps en fonction des quarts
    const retourneTemps = (code, tabs) => {
      let r = 0;
      filenam.value = 'Temps_activite_du_' + splitDate(datetemps.value);
      code.forEach((cod) => {
        let dab = [];
        let debqt1 = changeDatetime(datetemps.value);
        let finqt1 = addHourToDate(debqt1, 8);
        let debqt2 = addHourToDate(debqt1, 8);
        let finqt2 = addHourToDate(debqt1, 16);
        let debqt3 = addHourToDate(debqt1, 16);
        let finqt3 = addDaysToDate(debqt1, 1);
        let tbfilterqt1 = tabs.filter(
          (tb) =>
            tb.V_NICK_NAME === cod &&
            Date.parse(new Date(tb.G__POS_DATETIME)) >= Date.parse(debqt1) &&
            Date.parse(new Date(tb.G__POS_DATETIME)) <= Date.parse(finqt1)
        );
        let dataQuart1 = calculTemps(tbfilterqt1, cod, debqt1, finqt1, 1);
        //console.log(dataQuart1);
        let tbfilterqt2 = tabs.filter(
          (tb) =>
            tb.V_NICK_NAME === cod &&
            Date.parse(new Date(tb.G__POS_DATETIME)) >= Date.parse(debqt2) &&
            Date.parse(new Date(tb.G__POS_DATETIME)) <= Date.parse(finqt2)
        );
        //console.log(tbfilterqt2);
        let dataQuart2 = calculTemps(tbfilterqt2, cod, debqt2, finqt2, 2);
        //console.log(dataQuart2);
        let tbfilterqt3 = tabs.filter(
          (tb) =>
            tb.V_NICK_NAME === cod &&
            Date.parse(new Date(tb.G__POS_DATETIME)) >= Date.parse(debqt3) &&
            Date.parse(new Date(tb.G__POS_DATETIME)) <= Date.parse(finqt3)
        );
        //console.log(tbfilterqt3);
        let dataQuart3 = calculTemps(tbfilterqt3, cod, debqt3, finqt3, 3);
        tableau.value.push({
          id: r,
          code: dataQuart1[0],
          quart: dataQuart1[1],
          eon: dataQuart1[2],
          eidle: dataQuart1[3],
          eoff: dataQuart1[4],
          km: dataQuart1[5].toFixed(2),
        });
        r++;
        tableau.value.push({
          id: r,
          code: dataQuart2[0],
          quart: dataQuart2[1],
          eon: dataQuart2[2],
          eidle: dataQuart2[3],
          eoff: dataQuart2[4],
          km: dataQuart2[5].toFixed(2),
        });
        r++;
        tableau.value.push({
          id: r,
          code: dataQuart3[0],
          quart: dataQuart3[1],
          eon: dataQuart3[2],
          eidle: dataQuart3[3],
          eoff: dataQuart3[4],
          km: dataQuart3[5].toFixed(2),
        });
        r++;
      });
      console.log(tableau.value)
      store.chargeAct(tableau.value)
    }

    const calculTemps = (tab, code, deb, fin, quart) => {
      let tableau = [];
      let conduite = 0;

      let dconduite = '';
      let statuscond = '';
      let idle = 0;
      let km = 0;
      let dkm = '';
      let i = 0;
      tab.map((tb) => {
        //console.log(new Date(tb.G__POS_DATETIME).toISOString())
        if (i === 0) {
          if (tb.REASON === 'Début conduite') {
            dconduite = new Date(tb.G__POS_DATETIME);
            statuscond = 'deb';
          } else if (tb.REASON === 'Fin conduite') {
            conduite =
              conduite +
              soustrairedate(new Date(deb), new Date(tb.G__POS_DATETIME));
            statuscond = 'fin';
          } else {
            dconduite = new Date(deb);
            statuscond = 'deb';
          }
          dkm = tb.G_CURRENT_ODOMETER;
          i = i + 1;
        } else if (i === tab.length - 1) {
          if (tb.REASON === 'Fin conduite') {
            conduite =
              conduite +
              soustrairedate(dconduite, new Date(tb.G__POS_DATETIME));
            //console.log(conduite)
          } else if (statuscond === 'deb') {
            conduite =
              conduite +
              soustrairedate(
                new Date(dconduite),
                new Date(tb.G__POS_DATETIME)
              );
          }
        } else {
          i = i + 1;
          //kilometrage
          km = km + (tb.G_CURRENT_ODOMETER - dkm);
          dkm = tb.G_CURRENT_ODOMETER;
          //temps de conduite
          if (tb.REASON === 'Début conduite') {
            statuscond = 'deb';
            dconduite = new Date(tb.G__POS_DATETIME);
          } else if (tb.REASON === 'Fin conduite') {
            statuscond = 'fini';
            conduite =
              conduite +
              soustrairedate(dconduite, new Date(tb.G__POS_DATETIME));
          }
        }
      });
      idle = calculTempsInactivite(tab, code, deb, fin, quart);
      if (conduite >= idle) {
        conduite = conduite - idle;
      }
      tableau.push(
        code,
        quart,
        new Date(conduite * 1000).toISOString().substring(14, 19),
        new Date(idle * 1000).toISOString().substring(14, 19),
        new Date((480 - (conduite + idle)) * 1000)
          .toISOString()
          .substring(14, 19),
        km
      );
      //console.log(tableau)
      return tableau;
    }

    const calculTempsInactivite = (tab, code, deb, fin, quart) => {
      let tableau = [];
      let conduite = 0;

      let dconduite = '';
      let statuscond = '';
      let idle = 0;
      let km = 0;
      let dkm = '';
      let i = 0;
      tab.map((tb) => {
        //console.log(new Date(tb.G__POS_DATETIME).toISOString())
        if (i === 0) {
          if (tb.REASON === 'Début durée inactivité ') {
            dconduite = new Date(tb.G__POS_DATETIME);
            statuscond = 'deb';
          } else if (tb.REASON === 'Fin durée inactivité ') {
            conduite =
              conduite +
              soustrairedate(new Date(deb), new Date(tb.G__POS_DATETIME));
            statuscond = 'fin';
          } else {
            dconduite = new Date(tb.G__POS_DATETIME);
            statuscond = 'debs';
          }
          dkm = tb.G_CURRENT_ODOMETER;
          i = i + 1;
        } else if (i === tab.length - 1) {
          if (tb.REASON === 'Fin période inactivité ') {
            conduite =  conduite +
              soustrairedate(dconduite, new Date(tb.G__POS_DATETIME));
            //console.log(conduite)
          } else if (statuscond === 'deb') {
            conduite =
              conduite +
              soustrairedate(
                new Date(dconduite),
                new Date(tb.G__POS_DATETIME)
              );
          }
        } else {
          i = i + 1;
          //kilometrage
          km = km + (tb.G_CURRENT_ODOMETER - dkm);
          dkm = tb.G_CURRENT_ODOMETER;
          //temps de conduite
          if (tb.REASON === 'Début durée inactivité ') {
            statuscond = 'deb';
            dconduite = new Date(tb.G__POS_DATETIME);
          } else if (tb.REASON === 'Fin période inactivité ') {
            statuscond = 'fini';
            conduite =
              conduite +
              soustrairedate(dconduite, new Date(tb.G__POS_DATETIME));
          }
        }
      })
      return conduite;
    }

    const soustrairedate = (deb, fin) => {
      var difference = Math.abs(fin - deb)
      var heur = difference / (1000 * 60)
      return heur
    }

    const retourneCode = (tab) => {
      var cbx = [];
      tab.map((tb) => {
        if (!cbx.includes(tb.V_NICK_NAME)) cbx.push(tb.V_NICK_NAME);
      });
      return cbx;
    }

    const addDaysToDate = (date, days) => {
      var res = new Date(date);
      res.setDate(res.getDate() + days);
      return res;
    }

    const addHourToDate = (date, hour) => {
      var res = new Date(date);
      res.setTime(res.getTime() + hour * 60 * 60 * 1000);
      return res;
    }

  onMounted(() => {
    console.log()
  });
  return {
    fichier,
    importFile,
    loading,
  };
},
});
</script>

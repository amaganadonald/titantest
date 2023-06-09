import moment from 'moment';
import { date } from 'quasar';
import Months from 'src/types/Months';
import { ref } from 'vue';
const soustraireDatetime = (deb: Date, fin: Date) => {
  const unit = 'seconds';
  let seconds = 0;
  //if (date.isValid(new Date(deb)) && date.isValid(fin)) {
  seconds = date.getDateDiff(new Date(deb), new Date(fin), unit);
  //}
  return seconds;
};

const secToTime = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  let dayTransform = hours + ':' + minutes + ':' + seconds;
  if (days !== 0) {
    dayTransform = days + 'j' + ' ' + hours + ':' + minutes + ':' + seconds;
  }
  return dayTransform;
};

const secToTimeHour = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return hours + ':' + minutes + ':' + seconds;
};

const useCalcul_immo_panne_active = (tab: [], datedeb: Date, datefin: Date) => {
  let immo = 0;
  tab.forEach((tb) => {
    let deb = datedeb;
    if (moment(new Date(tb.DateImmo)).isAfter(moment(new Date(datedeb)))) {
      deb = tb.DateImmo;
    }
    immo = immo + soustraireDatetime(new Date(datefin), new Date(deb));
    console.log(soustraireDatetime(new Date(datefin), new Date(deb)));
  });
  return secToTime(immo);
};

const calculImmo = (data: object, debutRange: Date, finRange: Date) => {
  let deb = debutRange;
  let fin = finRange;
  if (moment(new Date(data.DateImmo)).isAfter(moment(deb))) {
    deb = data.DateImmo;
  }
  if (data.DateSortie === null) {
    fin = finRange;
  } else if (
    moment(new Date(data.DateSortie)).isBefore(moment(new Date(fin)))
  ) {
    fin = data.DateSortie;
  }
  return soustraireDatetime(new Date(fin), new Date(deb));
};

const useCalculImmoPanneQuart = (
  tab: [],
  datedeb: Date,
  datefin: Date,
  tdatedeb,
  tdatefin
) => {
  let allImmoQuart1 = 0;
  let allImmoQuart2 = 0;
  let allImmoQuart3 = 0;
  const tabFinal = [];
  let veh = {};
  tab.forEach((panne: object[]) => {
    allImmoQuart1 = 0;
    allImmoQuart2 = 0;
    allImmoQuart3 = 0;
    const debQuart1 = new Date(datedeb + ' ' + '05:00');
    const debQuart2 = new Date(datedeb + ' ' + '13:00');
    const finQuart2 = new Date(datedeb + ' ' + '21:00');
    const finQuart3 = new Date(datefin + ' ' + '05:00');
    veh = {};
    const debpanne = panne[0].DateImmo;
    const findebpanne = panne[panne.length - 1].DateImmo;
    const finPanne = panne[panne.length - 1].DateSortie;
    const panneEncours = panne.filter((pb) => pb.DateSortie === null);
    if (panneEncours.length > 0) {
      veh = panneEncours[0];
      if (new Date(findebpanne) < new Date(debQuart1)) {
        allImmoQuart1 =
          allImmoQuart1 + soustraireDatetime(debQuart2, debQuart1);
      } else if (
        new Date(findebpanne) < new Date(debQuart2) &&
        new Date(findebpanne) > new Date(debQuart1)
      ) {
        allImmoQuart1 =
          allImmoQuart1 + soustraireDatetime(debQuart2, findebpanne);
      }
      if (new Date(findebpanne) < new Date(debQuart2)) {
        allImmoQuart2 =
          allImmoQuart2 + soustraireDatetime(finQuart2, debQuart2);
      } else if (
        new Date(findebpanne) < new Date(finQuart2) &&
        new Date(findebpanne) > new Date(debQuart2)
      ) {
        allImmoQuart2 =
          allImmoQuart2 + soustraireDatetime(finQuart2, findebpanne);
      }
      if (new Date(findebpanne) < new Date(finQuart2)) {
        allImmoQuart3 =
          allImmoQuart3 + soustraireDatetime(finQuart3, finQuart2);
      } else if (
        new Date(findebpanne) < new Date(finQuart3) &&
        new Date(findebpanne) > new Date(finQuart2)
      ) {
        allImmoQuart3 =
          allImmoQuart3 + soustraireDatetime(finQuart3, findebpanne);
      }
    }
    const panneoff = panne.filter((pf) => pf.DateSortie != null);
    if (panneoff.length > 0) {
      veh = panneoff[0];
      panneoff.forEach((pan) => {
        if (
          new Date(pan.DateImmo) < new Date(debQuart2) &&
          new Date(pan.DateSortie) > new Date(debQuart1)
        ) {
          let debQt1 = pan.DateImmo;
          let finQt1 = pan.DateSortie;
          if (new Date(pan.DateImmo) < new Date(debQuart1)) {
            debQt1 = debQuart1;
          }
          if (new Date(pan.DateSortie) > new Date(debQuart2)) {
            finQt1 = debQuart2;
          }
          allImmoQuart1 = allImmoQuart1 + soustraireDatetime(finQt1, debQt1);
        }

        if (
          new Date(pan.DateImmo) < new Date(finQuart2) &&
          new Date(pan.DateSortie) > new Date(debQuart2)
        ) {
          let debQt2 = pan.DateImmo;
          let finQt2 = pan.DateSortie;
          if (new Date(pan.DateImmo) < new Date(debQuart2)) {
            debQt2 = debQuart2;
          }
          if (new Date(pan.DateSortie) > new Date(finQuart2)) {
            finQt2 = finQuart2;
          }
          allImmoQuart2 = allImmoQuart2 + soustraireDatetime(finQt2, debQt2);
        }

        if (
          new Date(pan.DateImmo) < new Date(finQuart3) &&
          new Date(pan.DateSortie) > new Date(finQuart2)
        ) {
          let debQt3 = pan.DateImmo;
          let finQt3 = pan.DateSortie;
          if (new Date(pan.DateImmo) < new Date(finQuart2)) {
            debQt3 = debQuart1;
          }
          if (new Date(pan.DateSortie) > new Date(finQuart3)) {
            finQt3 = debQuart2;
          }
          allImmoQuart3 = allImmoQuart3 + soustraireDatetime(finQt3, debQt3);
        }
      });
    }
    // console.log(veh);
    tabFinal.push({
      code: veh.vehicule.code,
      panneId: veh.idpanne,
      immoQuart1: allImmoQuart1,
      immoQuart2: allImmoQuart2,
      immoQuart3: allImmoQuart3,
      Immat: veh.vehicule.Immat,
      marque: veh.vehicule.Marque.libelle,
      typeVeh: veh.vehicule.type_veh.lib_type,
      famille: veh.vehicule.type_veh.fam_veh.lib_fam,
      quart1: secToTime(allImmoQuart1),
      quart2: secToTime(allImmoQuart2),
      quart3: secToTime(allImmoQuart3),
      total: secToTime(allImmoQuart1 + allImmoQuart2 + allImmoQuart3),
    });
  });
  return tabFinal;
};

const useCalculImmoPanne = (
  tab: [],
  datedeb: Date,
  datefin: Date,
  tdatedeb,
  tdatefin
) => {
  let allImmo = 0;
  const tabFinal = [];
  let veh = {};
  tab.forEach((panne: object[]) => {
    allImmo = 0;
    veh = {};
    panne.forEach((pd) => {
      const deb = new Date(datedeb + ' ' + tdatedeb);
      const fin = new Date(datefin + ' ' + tdatefin);
      allImmo = allImmo + calculImmo(pd, deb, fin);
      veh = pd;
    });
    if (allImmo != 0) {
      tabFinal.push({
        code: veh.vehicule.code,
        panneId: veh.idpanne,
        immo: allImmo,
        tpsimmo: secToTime(allImmo),
        Immat: veh.vehicule.Immat,
        marque: veh.vehicule.Marque.libelle,
        typeVeh: veh.vehicule.type_veh.lib_type,
        famille: veh.vehicule.type_veh.fam_veh.lib_fam,
      });
    }
  });
  //console.log(tabFinal);
  return tabFinal;
};

const useTpsImmo = (tabImmo, datedeb: Date, datefin: Date, tdeb, tfin) => {
  let tpsIm = 0;
  let dl = 0;
  let dbi = '';
  let stom = '';
  tabImmo.forEach((immo) => {
    if (dl === 0) {
      if (immo.event === 'Début durée inactivité') {
        dbi = immo.date;
        stom = 'di';
      } else if (immo.event === 'Fin période inactivité') {
        stom = 'fi';
        tpsIm =
          tpsIm +
          soustraireDatetime(
            new Date(immo.date),
            new Date(datedeb + ' ' + tdeb)
          );
      }
      dl++;
    } else {
      if (immo.event === 'Début durée inactivité') {
        stom = 'di';
        dbi = immo.date;
      } else if (immo.event === 'Fin période inactivité') {
        stom = 'fi';
        tpsIm = tpsIm + soustraireDatetime(new Date(immo.date), new Date(dbi));
      }
    }
  });
  if (stom === 'di') {
    tpsIm =
      tpsIm + soustraireDatetime(new Date(datefin + ' ' + tfin), new Date(dbi));
  }
  return tpsIm;
};
const useTpsHoraire = (
  tabHoraire,
  datedeb: Date,
  datefin: Date,
  tdeb,
  tfin
) => {
  let tpsHor = 0;
  let dl = 0;
  let dbi = '';
  let stor = '';
  tabHoraire.forEach((horaire) => {
    if (dl === 0) {
      if (horaire.event === 'Début conduite') {
        dbi = horaire.date;
        stor = 'di';
      } else if (horaire.event === 'Fin conduite') {
        stor = 'fi';
        tpsHor =
          tpsHor +
          soustraireDatetime(
            new Date(horaire.date),
            new Date(datedeb + ' ' + tdeb)
          );
      }
      dl++;
    } else {
      if (horaire.event === 'Début conduite') {
        stor = 'di';
        dbi = horaire.date;
      } else if (horaire.event === 'Fin conduite') {
        stor = 'fi';
        tpsHor =
          tpsHor + soustraireDatetime(new Date(horaire.date), new Date(dbi));
      }
    }
  });
  if (stor === 'di') {
    tpsHor =
      tpsHor +
      soustraireDatetime(new Date(datefin + ' ' + tfin), new Date(dbi));
  }
  return tpsHor;
};

const useKilometrage = (tab: object[]) => {
  let dis = 0;
  let compteur = 0;
  let y = 0;
  //console.log(tab.length);
  //console.log(tab[0].compteur);
  //console.log(tab[tab.length - 1].compteur);
  tab.forEach((datas) => {
    if (y === 0) {
      compteur = datas.compteur;
      y++;
    } else {
      if (datas.compteur - compteur > 0) {
        dis = dis + (datas.compteur - compteur);
        compteur = datas.compteur;
      } else {
        compteur = datas.compteur;
      }
    }
  });
  return dis.toFixed(2);
};

const useCalculHoraire = (
  tab: object[],
  datedeb: Date,
  datefin: Date,
  tdeb,
  tfin
) => {
  const dataFinal = [];

  tab.forEach((datas) => {
    if (datas.length > 0) {
      const tbImmo = datas.filter(
        (db) =>
          db.event === 'Début durée inactivité' ||
          db.event === 'Fin période inactivité'
      );
      console.log(tbImmo);
      const tbWork = datas.filter(
        (db) => db.event === 'Début conduite' || db.event === 'Fin conduite'
      );
      const tkilo = datas.filter(
        (db) =>
          new Date(db.date) < new Date(datefin + ' ' + tfin) &&
          new Date(db.date) > new Date(datedeb + ' ' + tdeb)
      );
      const idle = useTpsImmo(tbImmo, datedeb, datefin, tdeb, tfin);
      const tpcond = useTpsHoraire(tbWork, datedeb, datefin, tdeb, tfin);
      const tkil = useKilometrage(tkilo);
      dataFinal.push({
        code: datas[0].code,
        eon: secToTimeHour(tpcond - idle),
        idle: secToTimeHour(idle),
        eoff: secToTimeHour(
          soustraireDatetime(
            new Date(datefin + ' ' + tfin),
            new Date(datedeb + ' ' + tdeb)
          ) - tpcond
        ),
        km: tkil,
      });
    }
  });
  //console.log(dataFinal);
  return dataFinal;
};

const useCalculHoraireQuart = (
  tab: object[],
  datedeb: Date,
  datefin: Date,
  tdeb,
  tfin
) => {
  console.log(tab);
  const dataFinal = [];
  const debutQuart1 = datedeb + ' ' + '05:00';
  const finQuart1 = datedeb + ' ' + '13:00';
  const debutQuart2 = datedeb + ' ' + '13:00';
  const finQuart2 = datedeb + ' ' + '21:00';
  const debutQuart3 = datedeb + ' ' + '21:00';
  const finQuart3 = datefin + ' ' + '05:00';
  tab.forEach((datas) => {
    if (datas.length > 0) {
      const tbImmoQuart1 = datas.filter(
        (db) =>
          (db.event === 'Début durée inactivité' ||
            db.event === 'Fin période inactivité') &&
          new Date(db.date) < new Date(finQuart1) &&
          new Date(db.date) > new Date(debutQuart1)
      );
      const tbImmoQuart2 = datas.filter(
        (db) =>
          (db.event === 'Début durée inactivité' ||
            db.event === 'Fin période inactivité') &&
          new Date(db.date) < new Date(finQuart2) &&
          new Date(db.date) > new Date(debutQuart2)
      );
      const tbImmoQuart3 = datas.filter(
        (db) =>
          (db.event === 'Début durée inactivité' ||
            db.event === 'Fin période inactivité') &&
          new Date(db.date) < new Date(debutQuart3) &&
          new Date(db.date) > new Date(finQuart3)
      );
      const tbWorkQuart1 = datas.filter(
        (db) =>
          (db.event === 'Début conduite' || db.event === 'Fin conduite') &&
          new Date(db.date) < new Date(finQuart1) &&
          new Date(db.date) > new Date(debutQuart1)
      );
      const tbWorkQuart2 = datas.filter(
        (db) =>
          (db.event === 'Début conduite' || db.event === 'Fin conduite') &&
          new Date(db.date) < new Date(finQuart2) &&
          new Date(db.date) > new Date(debutQuart2)
      );
      const tbWorkQuart3 = datas.filter(
        (db) =>
          (db.event === 'Début conduite' || db.event === 'Fin conduite') &&
          new Date(db.date) < new Date(finQuart3) &&
          new Date(db.date) > new Date(debutQuart3)
      );
      const tkiloQuart1 = datas.filter(
        (db) =>
          new Date(db.date) < new Date(finQuart1) &&
          new Date(db.date) > new Date(debutQuart1)
      );
      const tkiloQuart2 = datas.filter(
        (db) =>
          new Date(db.date) < new Date(finQuart2) &&
          new Date(db.date) > new Date(debutQuart2)
      );
      const tkiloQuart3 = datas.filter(
        (db) =>
          new Date(db.date) < new Date(finQuart3) &&
          new Date(db.date) > new Date(debutQuart3)
      );
      const idleQuart1 = useTpsImmo(
        tbImmoQuart1,
        datedeb,
        datedeb,
        '05:00',
        '13:00'
      );
      const idleQuart2 = useTpsImmo(
        tbImmoQuart2,
        datedeb,
        datedeb,
        '13:00',
        '21:00'
      );
      const idleQuart3 = useTpsImmo(
        tbImmoQuart3,
        datedeb,
        datefin,
        '21:00',
        '05:00'
      );
      const tpcondQuart1 = useTpsHoraire(
        tbWorkQuart1,
        datedeb,
        datedeb,
        '05:00',
        '13:00'
      );
      const tpcondQuart2 = useTpsHoraire(
        tbWorkQuart2,
        datedeb,
        datedeb,
        '13:00',
        '21:00'
      );
      const tpcondQuart3 = useTpsHoraire(
        tbWorkQuart3,
        datedeb,
        datefin,
        '21:00',
        '05:00'
      );
      const tkilQuart1 = useKilometrage(tkiloQuart1);
      const tkilQuart2 = useKilometrage(tkiloQuart2);
      const tkilQuart3 = useKilometrage(tkiloQuart3);
      dataFinal.push({
        code: datas[0].code,
        quart: 1,
        eon: secToTimeHour(tpcondQuart1 - idleQuart1),
        idle: secToTimeHour(idleQuart1),
        eoff: secToTimeHour(
          soustraireDatetime(new Date(finQuart1), new Date(debutQuart1)) -
            tpcondQuart1
        ),
        km: tkilQuart1,
      });
      dataFinal.push({
        code: datas[0].code,
        quart: 2,
        eon: secToTimeHour(tpcondQuart2 - idleQuart2),
        idle: secToTimeHour(idleQuart2),
        eoff: secToTimeHour(
          soustraireDatetime(new Date(finQuart2), new Date(debutQuart2)) -
            tpcondQuart2
        ),
        km: tkilQuart2,
      });
      dataFinal.push({
        code: datas[0].code,
        quart: 3,
        eon: secToTimeHour(tpcondQuart3 - idleQuart3),
        idle: secToTimeHour(idleQuart3),
        eoff: secToTimeHour(
          soustraireDatetime(new Date(finQuart3), new Date(debutQuart3)) -
            tpcondQuart3
        ),
        km: tkilQuart3,
      });
    }
  });
  return dataFinal;
};

const months = ref<Months[]>([
  { id: 1, value: 'Janvier' },
  { id: 2, value: 'Fevrier' },
  { id: 3, value: 'Mars' },
  { id: 4, value: 'Avril' },
  { id: 5, value: 'Mai' },
  { id: 6, value: 'Juin' },
  { id: 7, value: 'Juillet' },
  { id: 8, value: 'Aout' },
  { id: 9, value: 'Septembre' },
  { id: 10, value: 'Octobre' },
  { id: 11, value: 'Novembre' },
  { id: 12, value: 'Decembre' },
]);
const useRetourneMois = (mois: number) => {
  const frs = months.value.filter((mnt) => mnt.id === mois);
  return frs[0].value;
};

const useChangeDate = (dbs) => {
  return date.formatDate(dbs, 'DD-MM-YYYY');
};

const useCalculDispo = (
  tab: [],
  datedeb: Date,
  datefin: Date,
  tdatedeb,
  tdatefin
) => {
  let allImmo = 0;
  const tabFinal = [];
  let veh = {};
  const timeps = soustraireDatetime(
    new Date(datefin + ' ' + tdatefin),
    new Date(datedeb + ' ' + tdatedeb)
  );
  tab.forEach((panne: object[]) => {
    allImmo = 0;
    veh = {};
    panne.forEach((pd) => {
      const deb = new Date(datedeb + ' ' + tdatedeb);
      const fin = new Date(datefin + ' ' + tdatefin);
      allImmo = allImmo + calculImmo(pd, deb, fin);
      veh = pd;
    });
    if (allImmo != 0) {
      tabFinal.push({
        code: veh.vehicule.code,
        panneId: veh.idpanne,
        immo: allImmo,
        tpsdispo: (100 - (allImmo * 100) / timeps).toFixed(2),
        tpspanne: ((allImmo * 100) / timeps).toFixed(2),
        Immat: veh.vehicule.Immat,
        marque: veh.vehicule.Marque.libelle,
        typeVeh: veh.vehicule.type_veh.lib_type,
        famille: veh.vehicule.type_veh.fam_veh.lib_fam,
      });
    }
  });
  //console.log(tabFinal);
  return tabFinal;
};

const numberOfVehicle = (famille: number, vehicules: object[]) => {
  const fml = vehicules.filter((veh) => famille === veh.type_veh.famVehId);
  return fml;
};

const useCalculDispoFamille = (
  tab: [],
  famille: [],
  datedeb: Date,
  datefin: Date,
  tdatedeb,
  tdatefin,
  vehicules: []
) => {
  let allImmo = 0;
  const tabFinal = [];
  const tbFam = [];
  let veh = {};
  const timeps = soustraireDatetime(
    new Date(datefin + ' ' + tdatefin),
    new Date(datedeb + ' ' + tdatedeb)
  );
  //console.log(tab);
  tab.forEach((panne: object[]) => {
    allImmo = 0;
    veh = {};
    panne.forEach((pd) => {
      const deb = new Date(datedeb + ' ' + tdatedeb);
      const fin = new Date(datefin + ' ' + tdatefin);
      allImmo = allImmo + calculImmo(pd, deb, fin);
      veh = pd;
    });
    if (allImmo > 0) {
      tbFam.push({
        code: veh.vehicule.code,
        panneId: veh.idpanne,
        immo: allImmo,
        tpsdispo: (100 - (allImmo * 100) / timeps).toFixed(2),
        tpspanne: ((allImmo * 100) / timeps).toFixed(2),
        Immat: veh.vehicule.Immat,
        marque: veh.vehicule.Marque.libelle,
        typeVeh: veh.vehicule.type_veh.lib_type,
        famille: veh.vehicule.type_veh.fam_veh.lib_fam,
      });
    }
  });
  //console.log(tbFam);
  famille.forEach((fm) => {
    let totDispo = 0;
    let totPanne = 0;
    //console.log(fm.lib_fam + ' ' + numberOfVehicle(fm.id, vehicules));
    const totvehfam = numberOfVehicle(fm.id, vehicules);
    console.log(totvehfam);
    if (totvehfam.length > 0) {
      totvehfam.forEach((vehfam) => {
        if (tbFam.filter((famfam) => famfam.code === vehfam.code).length > 0) {
          console.log(vehfam);
          tbFam.forEach((tbF) => {
            if (tbF.famille === fm.lib_fam && tbF.code === vehfam.code) {
              totDispo = totDispo + Number(tbF.tpsdispo);
              totPanne = totPanne + Number(tbF.tpspanne);
            }
          });
        } else {
          totDispo = totDispo + 100;
        }
      });
      console.log(
        totDispo +
          ' -' +
          totPanne +
          ' - ' +
          totvehfam.length +
          '-fm ' +
          fm.lib_fam
      );
      tabFinal.push({
        tpsdispo: (totDispo / totvehfam.length).toFixed(2),
        tpspanne: (totPanne / totvehfam.length).toFixed(2),
        famille: fm.lib_fam,
        nbVeh: totvehfam.length,
        totvehfam: totvehfam,
      });
    }
  });
  //console.log(tabFinal);
  return tabFinal;
};
const CalculHoraire = (
  tab: object[],
  datedeb: Date,
  datefin: Date,
  tdeb,
  tfin
) => {
  const dataFinal = [];
  const tbImmo = tab.filter(
    (db) =>
      db.event === 'Début durée inactivité' ||
      db.event === 'Fin période inactivité'
  );
  //console.log(tbImmo);
  const tbWork = tab.filter(
    (db) => db.event === 'Début conduite' || db.event === 'Fin conduite'
  );
  //console.log(tbWork);
  const tkilo = tab.filter(
    (db) =>
      new Date(db.date) < new Date(datefin + ' ' + tfin) &&
      new Date(db.date) > new Date(datedeb + ' ' + tdeb)
  );
  const idle = useTpsImmo(tbImmo, datedeb, datefin, tdeb, tfin);
  const tpcond = useTpsHoraire(tbWork, datedeb, datefin, tdeb, tfin);
  const tkil = useKilometrage(tkilo);
  dataFinal.push({
    eon: tpcond - idle,
    idle: idle,
    eoff:
      soustraireDatetime(
        new Date(datefin + ' ' + tfin),
        new Date(datedeb + ' ' + tdeb)
      ) - tpcond,
    km: tkil,
  });
  //console.log(dataFinal);
  return dataFinal;
};

const useCalculEfficience = (
  tab: [],
  datedeb: Date,
  datefin: Date,
  tdatedeb: string,
  tdatefin: string,
  vehicules: []
) => {
  //console.log(tab);
  const deb = new Date(datedeb + ' ' + tdatedeb);
  const fin = new Date(datefin + ' ' + tdatefin);
  const eff = [];
  tab.forEach((tb) => {
    let allImmo = 0;
    let datahorair = [];
    if (tb.panne.length === 0) {
      allImmo = 0;
    } else {
      tb.panne.forEach((pb) => {
        allImmo = allImmo + calculImmo(pb, deb, fin);
      });
    }
    if (tb.horaire.length === 0) {
      datahorair = [];
    } else {
      datahorair = CalculHoraire(
        tb.horaire,
        datedeb,
        datefin,
        tdatedeb,
        tdatefin
      );
    }
    eff.push({
      code: tb.code,
      panne: allImmo,
      horaire: datahorair,
    });
  });
  return eff;
};

export {
  useCalcul_immo_panne_active,
  useRetourneMois,
  useChangeDate,
  useCalculImmoPanne,
  useCalculHoraire,
  useCalculHoraireQuart,
  useCalculImmoPanneQuart,
  useCalculDispo,
  useCalculDispoFamille,
  useCalculEfficience,
  secToTime,
};

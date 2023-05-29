import { ref } from 'vue'
import { date, useQuasar } from 'quasar'
import { useRepportStore } from '../stores/repport-store';
import moment from 'moment';
export default function dataRapport(dataBaseInfo) {
    const $q = useQuasar();
    const store = useRepportStore()
        //recuperer tous les codes engins dans le fichiers
    const recupCodes = (tab) => {
            let codes = [];
            tab.map((tb) => {
                if (!codes.includes(tb.code)) {
                    codes.push(tb.code);
                }
            });
            return codes;
        }
        //function qui converti en seconde les heures
    const convertHeures = (heure) => {
        var a = [];
        a = heure.split(':');
        return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    }
    const SplitDate = (date) => {
        let ds = ''
        let dt = ''
        if (date != '') {
            let dts = date.split(' ')
            dt = dts[0]
        }
        ds = dt.split('-')
        return ds[2] + '-' + ds[1] + '-' + ds[0]
    }
    const secToTime = (totalSeconds) => {
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        return hours + ':' + minutes + ':' + seconds;
    }
    const dateEn = (dat) => {
        if (dat.length > 0) {
            let rdat = dat.split(' ');
            let vdat = rdat[0].split('/');
            return vdat[2] + '/' + vdat[1] + '/' + vdat[0] + ' ' + rdat[1];
        }
    }
    const soustraireDatetime = (deb, fin) => {
        //console.log(new Date(dateEn(fin)));
        const unit = 'seconds';
        let seconds = 0;
        if (deb != '' && fin != '') {
            seconds = date.getDateDiff(
                new Date(dateEn(fin)),
                new Date(dateEn(deb)),
                unit
            );
        }
        return seconds;
    }
    const generateRapport = async(datedeb) => {
        let datetemps = datedeb + ' ' + '00:00'
            //const { addToDate } = date;
            //const unit = 'seconds';
        let parcelles = $q.localStorage.getItem('parcel');
        if (parcelles != '') {
            let parcel = parcelles.split(',');
            /*let olddate = convertDate(datetemps.value);
            const newDate = addToDate(new Date(convertDate(datetemps.value)), {
              days: 1,
            });*/
            //codes des engins prsents
            //let result = dataTable.value;
            let result = dataBaseInfo;
            //let eg = recupCodes(dataTable.value);
            let eg = recupCodes(dataBaseInfo);
            //console.log(eg);
            //let vitess = [];
            let vitee = [];
            let vitessemoy = [];
            let i = 0;
            let k = 0;
            let j = 0;
            let h = 0;
            let n = 0;
            let m = 0;
            let quart = [];
            let z = 0;
            let tempsusine = [];
            let tusine = 0;
            let dureetrajet = [];
            let vn = 0;
            let intr = [];
            let km = [];
            let arrparcelle = [];
            let o = 0;
            let departparcelle = [];
            let site = [];
            let p = 0;
            let data = [];
            let arrUsine = [];
            let departUsine = [];
            let totq1 = 0;
            let totq2 = 0;
            let totq3 = 0;
            let ts = 0;
            let kml = 0;
            let dtrajet = 0;
            let dept = '';
            let tmp = '';
            let colCode = [];
            let b = 0;
            let tottpsaller1 = 0;
            let tottpsaller2 = 0;
            let tottpsaller3 = 0;
            let dureepar1 = 0;
            let dureepar2 = 0;
            let dureepar3 = 0;
            let dass = '';
            let dass1 = '';
            let dass2;
            let tottpsretour1 = 0;
            let tottpsretour2 = 0;
            let tottpsretour3 = 0;
            let dass3 = 0;
            let tottpsusine1 = 0;
            let tottpsusine2 = 0;
            let tottpsusine3 = 0;
            let totkm1 = 0;
            let totkm2 = 0;
            let totkm3 = 0;
            //let mess = 2;
            let depusine = '';
            let cons = 0;
            let conso = [];
            //let dtrajetp = '';
            let dportique = [];
            let dpontBascule = [];
            let gv = 0;
            let pb = 0;
            let arrivebrut = [];
            let departbrut = [];
            let tabFinal = [];
            //console.log(result);
            //pour chaque code engin on recherche ses données
            await eg.map((engin) => {
                const dataParcelle = result.filter(
                    (d) => parcel.indexOf(d.region) !== -1 && d.code === engin
                );
                //console.log(dataParcelle)
                let usineNkt = 'ENCEINTE USINE NKOTENG';
                let usineMbjk = 'ENCEINTE USINE MBANDJOCK';
                let comeUsine = 'Arrivée dans la région';
                let goUsine = 'Départ de la région';
                const dataUsine = result.filter(
                    (e) =>
                    ((e.event === comeUsine && e.region === usineNkt) ||
                        (e.event === goUsine && e.region === usineNkt) ||
                        (e.event === comeUsine && e.region === usineMbjk) ||
                        (e.event === goUsine && e.region === usineMbjk)) &&
                    e.code === engin
                );
                //console.log(dataUsine)
                ts = 0;
                kml = 0;
                dept = '';
                tmp = '';
                totq1 = 0;
                totq2 = 0;
                totq3 = 0;
                let das = '';
                tottpsaller1 = 0;
                tottpsaller2 = 0;
                tottpsaller3 = 0;
                dass = '';
                dass1 = '';
                dureepar1 = 0;
                dureepar2 = 0;
                dureepar3 = 0;
                tottpsretour1 = 0;
                tottpsretour2 = 0;
                tottpsretour3 = 0;
                tottpsusine1 = 0;
                tottpsusine2 = 0;
                tottpsusine3 = 0;
                totkm1 = 0;
                totkm2 = 0;
                totq3 = 0;
                //let a = [];
                depusine = '';
                //let seconds = 0;
                if (dataParcelle.length > 0) {
                    dataUsine.forEach(function(ca) {
                        //si la premiere ligne est la date de depart
                        if (ca.event === 'Départ de la région') {
                            dept = moment(ca.dateHeure).format('DD/MM/YYYY HH:mm:ss');
                            das = ca.dateHeure;
                            depusine = ca.region;
                            cons = ca.fuel_qte;
                            kml = ca.compteur;
                            dtrajet = ca.dateHeure;
                            ts++;
                        } else if (ca.event === 'Arrivée dans la région') {
                            //si la première ligne est la date d'arrivée
                            //dtrajetp = ca.datEvent
                            if (ts === 0) {
                                dureetrajet[m] = { dureetrajet: '0' };
                                // heure arrivée enceinte usine
                                arrivebrut[k] = { Date: ca.dateHeure };
                                arrUsine[k] = {
                                    Date: moment(ca.dateHeure).format('DD/MM/YYYY HH:mm:ss'),
                                };
                                data[i] = { code_engin: ca.code };
                                conso[i] = { conso: 0 };
                                vitee[i] = { vitesse: 0 };
                                vitessemoy[i] = { vitessemoy: 0 };
                                if (depusine !== ca.region) {
                                    site[i] = { parcelle: depusine + '/' + ca.region };
                                } else {
                                    site[i] = { parcelle: ca.region };
                                }
                                departUsine[j] = { Date: '' };
                                departbrut[j] = { Date: '' };
                                arrparcelle[o] = {
                                    parcelle: '',
                                    arrparcelle: '',
                                };
                                departparcelle[p] = {
                                    departparcelle: '',
                                };
                                km[h] = { km: 0 };
                                colCode[i] = b;
                                if (
                                    Number(moment(ca.dateHeure).format('H')) * Number(3600) >
                                    Number(4 * 3600) &&
                                    Number(moment(ca.dateHeure).format('H')) * Number(3600) <
                                    Number(12 * 3600)
                                ) {
                                    quart[i] = '1';
                                    totq1++;
                                    tottpsaller1 = tottpsaller1 + 0;
                                    dureepar1 = dureepar1 + 0;
                                    tottpsretour1 = tottpsretour1 + 0;
                                    tottpsusine1 = tottpsusine1 + 0;
                                    totkm1 = totkm1 + 0;
                                } else if (
                                    Number(moment(ca.dateHeure).format('H')) * Number(3600) >
                                    Number(12 * 3600) &&
                                    Number(moment(ca.dateHeure).format('H')) * Number(3600) <
                                    Number(20 * 3600)
                                ) {
                                    quart[i] = '2';
                                    totq2++;
                                    tottpsaller2 = tottpsaller2 + 0;
                                    dureepar2 = dureepar1 + 0;
                                    tottpsretour2 = tottpsretour2 + 0;
                                    tottpsusine2 = tottpsusine2 + 0;
                                    totkm2 = totkm2 + 0;
                                } else {
                                    quart[i] = '3';
                                    totq3++;
                                    tottpsaller3 = tottpsaller3 + 0;
                                    dureepar3 = dureepar1 + 0;
                                    tottpsretour3 = tottpsretour3 + 0;
                                    tottpsusine3 = tottpsusine3 + 0;
                                    totkm3 = totkm3 + 0;
                                }
                                //console.log(colCode)
                                m++;
                                k++;
                                ts++;
                                i++;
                                b++;
                                j++;
                                o++;
                                p++;
                                h++;
                            } else {
                                const datan = result.filter(
                                    (d) =>
                                    d.code === engin &&
                                    d.dateHeure > dtrajet &&
                                    d.dateHeure < ca.dateHeure
                                );
                                var mv = 0;
                                var totmw = 0;
                                var tfmw = 0;
                                datan.forEach(function(vits) {
                                    totmw = totmw + vits.vitesse;
                                    tfmw = tfmw + 1;
                                    if (vits.vitesse > mv) {
                                        mv = vits.vitesse;
                                    }
                                });
                                if (
                                    Number((ca.compteur - kml).toFixed(2)) > 5 ||
                                    ca.compteur === kml
                                ) {
                                    if (kml === 0) {
                                        km[h] = { km: 0 };
                                    } else {
                                        km[h] = { km: Number((ca.compteur - kml).toFixed(2)) };
                                    }
                                    vitee[i] = { vitesse: mv };
                                    vitessemoy[i] = {
                                        vitessemoy: Number((totmw / tfmw).toFixed(0)),
                                    };
                                    conso[i] = { conso: Number(cons - ca.fuel_qte) };
                                    arrivebrut[k] = ca.dateHeure;
                                    departbrut[j] = das;
                                    departUsine[j] = { Date: dept };
                                    arrUsine[k] = {
                                        Date: moment(ca.dateHeure).format('DD/MM/YYYY HH:mm:ss'),
                                    };
                                    dureetrajet[m] = {
                                        dureetrajet: moment
                                            .utc(new Date(ca.dateHeure) - new Date(dtrajet))
                                            .format('HH:mm:ss'),
                                    };
                                    const filterParcelle = dataParcelle.filter(
                                        (d) => d.dateHeure > dtrajet && d.dateHeure < ca.dateHeure
                                    );
                                    if (filterParcelle.length > 0) {
                                        arrparcelle[o] = {
                                            parcelle: filterParcelle[0].region,
                                            arrparcelle: moment(filterParcelle[0].dateHeure).format(
                                                'DD/MM/YYYY HH:mm:ss'
                                            ),
                                        };
                                        departparcelle[p] = {
                                            departparcelle: moment(
                                                filterParcelle[filterParcelle.length - 1].dateHeure
                                            ).format('DD/MM/YYYY HH:mm:ss'),
                                        };
                                        if (
                                            Number(moment(ca.dateHeure).format('H')) *
                                            Number(3600) >
                                            Number(4 * 3600) &&
                                            Number(moment(ca.dateHeure).format('H')) *
                                            Number(3600) <
                                            Number(12 * 3600)
                                        ) {
                                            quart[i] = '1';
                                            totq1++;
                                            totkm1 =
                                                totkm1 + Number((ca.dateHeure - kml).toFixed(2));
                                            dass = moment
                                                .utc(
                                                    new Date(filterParcelle[0].dateHeure) -
                                                    new Date(das)
                                                )
                                                .format('HH:mm:ss');
                                            tottpsaller1 = tottpsaller1 + convertHeures(dass);
                                            dass1 = moment
                                                .utc(
                                                    new Date(
                                                        filterParcelle[
                                                            filterParcelle.length - 1
                                                        ].dateHeure
                                                    ) - new Date(filterParcelle[0].dateHeure)
                                                )
                                                .format('HH:mm:ss');
                                            dureepar1 = dureepar1 + convertHeures(dass1);
                                            dass2 = moment
                                                .utc(
                                                    new Date(ca.dateHeure) -
                                                    new Date(
                                                        filterParcelle[
                                                            filterParcelle.length - 1
                                                        ].dateHeure
                                                    )
                                                )
                                                .format('HH:mm:ss');
                                            tottpsretour1 = tottpsretour1 + convertHeures(dass2);
                                            dass3 = moment
                                                .utc(new Date(ca.dateHeure) - new Date(das))
                                                .format('HH:mm:ss');
                                            tottpsusine1 = tottpsusine1 + convertHeures(dass3);
                                        } else if (
                                            Number(moment(ca.dateHeure).format('H')) *
                                            Number(3600) >
                                            Number(12 * 3600) &&
                                            Number(moment(ca.dateHeure).format('H')) *
                                            Number(3600) <
                                            Number(20 * 3600)
                                        ) {
                                            quart[i] = '2';
                                            totq2++;
                                            totkm2 =
                                                totkm2 + Number((ca.compteur - kml).toFixed(2));
                                            dass = moment
                                                .utc(
                                                    new Date(filterParcelle[0].dateHeure) -
                                                    new Date(das)
                                                )
                                                .format('HH:mm:ss');
                                            tottpsaller2 = tottpsaller2 + convertHeures(dass);
                                            dass1 = moment
                                                .utc(
                                                    new Date(
                                                        filterParcelle[
                                                            filterParcelle.length - 1
                                                        ].dateHeure
                                                    ) - new Date(filterParcelle[0].dateHeure)
                                                )
                                                .format('HH:mm:ss');
                                            dureepar2 = dureepar2 + convertHeures(dass1);
                                            dass2 = moment
                                                .utc(
                                                    new Date(ca.dateHeure) -
                                                    new Date(
                                                        filterParcelle[
                                                            filterParcelle.length - 1
                                                        ].dateHeure
                                                    )
                                                )
                                                .format('HH:mm:ss');
                                            tottpsretour2 = tottpsretour2 + convertHeures(dass2);
                                            dass3 = moment
                                                .utc(new Date(ca.dateHeure) - new Date(das))
                                                .format('HH:mm:ss');
                                            tottpsusine2 = tottpsusine2 + convertHeures(dass3);
                                        } else {
                                            quart[i] = '3';
                                            totq3++;
                                            totkm3 =
                                                totkm3 + Number((ca.compteur - kml).toFixed(2));
                                            dass = moment
                                                .utc(
                                                    new Date(filterParcelle[0].dateHeure) -
                                                    new Date(das)
                                                )
                                                .format('HH:mm:ss');
                                            tottpsaller3 = tottpsaller3 + convertHeures(dass);
                                            dass1 = moment
                                                .utc(
                                                    new Date(
                                                        filterParcelle[
                                                            filterParcelle.length - 1
                                                        ].dateHeure
                                                    ) - new Date(filterParcelle[0].dateHeure)
                                                )
                                                .format('HH:mm:ss');
                                            dureepar3 = dureepar3 + convertHeures(dass1);
                                            dass2 = moment
                                                .utc(
                                                    new Date(ca.dateHeure) -
                                                    new Date(
                                                        filterParcelle[
                                                            filterParcelle.length - 1
                                                        ].dateHeure
                                                    )
                                                )
                                                .format('HH:mm:ss');
                                            tottpsretour3 = tottpsretour3 + convertHeures(dass2);
                                            dass3 = moment
                                                .utc(new Date(ca.dateHeure) - new Date(das))
                                                .format('HH:mm:ss');
                                            tottpsusine3 = tottpsusine3 + convertHeures(dass3);
                                        }
                                    } else {
                                        arrparcelle[o] = {
                                            parcelle: '',
                                            arrparcelle: '',
                                        };
                                        departparcelle[p] = {
                                            departparcelle: '',
                                        };
                                        km[h] = { km: 0 };
                                        vitee[i] = { vitesse: 0 };
                                        vitessemoy[i] = { vitessemoy: 0 };
                                        tottpsaller1 = tottpsaller1 + 0;
                                        tottpsaller2 = tottpsaller2 + 0;
                                        tottpsaller3 = tottpsaller3 + 0;
                                        dureepar1 = dureepar1 + 0;
                                        dureepar2 = dureepar2 + 0;
                                        dureepar3 = dureepar3 + 0;
                                        tottpsretour1 = tottpsretour1 + 0;
                                        tottpsretour2 = tottpsretour2 + 0;
                                        tottpsretour3 = tottpsretour3 + 0;
                                        tottpsusine1 = tottpsusine1 + 0;
                                        tottpsusine2 = tottpsusine2 + 0;
                                        tottpsusine3 = tottpsusine3 + 0;
                                        totkm1 = totkm1 + 0;
                                        totkm2 = totkm2 + 0;
                                        totkm3 = totkm3 + 0;
                                    }
                                    data[i] = { code_engin: ca.code };
                                    site[i] = { parcelle: ca.region };
                                    colCode[i] = b;
                                    j++;
                                    o++;
                                    p++;
                                    m++;
                                    k++;
                                    ts++;
                                    i++;
                                    b++;
                                    h++;
                                }
                            }
                        }
                    });
                }
            });
            let portq2 = 'PORTIQUE II NKT';
            let portq1 = 'PORTIQUE I NKT';
            let portq3 = 'PORTIQUE III NKT';
            let portq4 = 'PORTIQUE I MBJK';
            //let entret = 'STATION ENTRETIEN NKOTENG';
            let pbasculenkt = 'PONT BASCULE NKOTENG';
            let pbasculembj = 'PONT BASCULE MBANDJOCK';

            data.forEach(function(t) {
                const portque = result.filter(
                    (d) =>
                    (d.region === portq1 ||
                        d.region === portq2 ||
                        d.region === portq3 ||
                        d.region === portq4) &&
                    d.code === t.code_engin &&
                    d.dateHeure > arrivebrut[gv] &&
                    d.dateHeure < departbrut[gv + 1]
                );
                if (portque.length > 0) {
                    dportique[gv] = {
                        tport: moment
                            .utc(
                                new Date(portque[portque.length - 1].dateHeure) -
                                new Date(portque[0].dateHeure)
                            )
                            .format('HH:mm:ss'),
                    };
                } else {
                    dportique[gv] = { tport: '00:00:00' };
                } //})
                gv++;
            });
            data.forEach(function(t) {
                const bascule = result.filter(
                    (d) =>
                    (d.region === pbasculenkt || d.region === pbasculembj) &&
                    d.code === t.code_engin &&
                    d.dateHeure > arrivebrut[pb] &&
                    d.dateHeure < departbrut[pb + 1]
                );
                if (bascule.length > 0) {
                    dpontBascule[pb] = {
                        tbascule: moment
                            .utc(
                                new Date(bascule[bascule.length - 1].dateHeure) -
                                new Date(bascule[0].dateHeure)
                            )
                            .format('HH:mm:ss'),
                    };
                } else {
                    dpontBascule[pb] = { tbascule: '00:00:00' };
                } //})
                pb++;
            });

            for (let uu = 0; uu < data.length; uu++) {
                let dept = '';
                if (uu + 1 < departUsine.length) {
                    dept = departUsine[uu + 1].Date;
                }

                tabFinal.push({
                    id: uu,
                    Date: SplitDate(datetemps),
                    Quart: quart[uu],
                    Site: site[uu].parcelle,
                    Engin: data[uu].code_engin,
                    Hdepart_Usine: departUsine[uu].Date,
                    Harrivée_Usine: arrUsine[uu].Date,
                    Enceinte_Usine: secToTime(
                        soustraireDatetime(arrUsine[uu].Date, dept)
                    ),
                    Durée_Voyage: dureetrajet[uu].dureetrajet,
                    Km_Voyage: km[uu].km,
                    Chantier: arrparcelle[uu].parcelle,
                    Harrivée_chantier: arrparcelle[uu].arrparcelle,
                    Hdépart_chantier: departparcelle[uu].departparcelle,
                    Durée_chantier: secToTime(
                        soustraireDatetime(
                            arrparcelle[uu].arrparcelle,
                            departparcelle[uu].departparcelle
                        )
                    ),
                    Temps_aller: secToTime(
                        soustraireDatetime(
                            departUsine[uu].Date,
                            arrparcelle[uu].arrparcelle
                        )
                    ),
                    Temps_retour: secToTime(
                        soustraireDatetime(
                            departparcelle[uu].departparcelle,
                            arrUsine[uu].Date
                        )
                    ),
                    Durée_total_cycle: secToTime(
                        soustraireDatetime(arrUsine[uu].Date, dept) +
                        soustraireDatetime(
                            arrparcelle[uu].arrparcelle,
                            departparcelle[uu].departparcelle
                        ) +
                        soustraireDatetime(
                            departUsine[uu].Date,
                            arrparcelle[uu].arrparcelle
                        ) +
                        soustraireDatetime(
                            departparcelle[uu].departparcelle,
                            arrUsine[uu].Date
                        )
                    ),
                    pont_bascule: dpontBascule[uu].tbascule,
                    consommation: conso[uu].conso.toFixed(2),
                    Temps_Dechargement: dportique[uu].tport,
                    Vitesse_Max: vitee[uu].vitesse,
                    Vitesse_Moy: vitessemoy[uu].vitessemoy,
                    Durée_immobilisation: 0,
                    Observation: '',
                });
            }
            console.log(tabFinal);
            store.changeRpData(tabFinal);
        }
    };
    return {
        generateRapport,
    };
}
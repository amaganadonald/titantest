import { ref } from 'vue';
import XLSX from 'xlsx-js-style';

export default function useExcel(dataBaseInfo) {
    let tabRecap = ref([
        'Total',
        'Nombre Voyages',
        'Temps Aller',
        'Durée Chantier',
        'Temps Retour',
        'Duree Voyage',
        'Temps enceinte usine',
        'Duree Cycle',
        'Km Voyage',
        'Conso(L)',
        'Pont Bascule',
        'Duree immobilisation',
        'Dechargement',
        'Temps mis a disposition',
        'Efficiene Mecanique(%)',
        'Efficiene Chantier(%)',
        'Vitesse Max',
        'Vitesse Moy',
        'Observation',
    ]);
    let styleHeureNormale = ref({
        font: {
            name: 'Arial',
            sz: 8,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        numFmt: 'hh:mm:ss',
        //fill: { fgColor: { rgb: "565B7B" } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleDate = ref({
        font: {
            name: 'Arial',
            sz: 8,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        numFmt: 'dd/mm/yyyy',
        //fill: { fgColor: { rgb: "565B7B" } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleHeaders = ref({
        font: {
            name: 'Arial',
            sz: 8,
            bold: true,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        fill: { fgColor: { rgb: '565B7B' }, bgColor: { rgb: '565B7B' } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleRows = ref({
        font: {
            name: 'Arial',
            sz: 8,
            italic: true,
            //color: { rgb: "FFFFFF" },
        },
        //fill: { fgColor: { rgb: "565B7B" } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleRows2 = ref({
        font: {
            name: 'Arial',
            sz: 8,
            italic: true,
            //color: { rgb: "FFFFFF" },
        },
        //fill: { fgColor: { rgb: "565B7B" } },
        alignment: { wrapText: false, vertical: 'center', horizontal: 'center' },
    });
    let styleRowsNumber = ref({
        font: {
            name: 'Arial',
            sz: 8,
            italic: true,
            //color: { rgb: "FFFFFF" },
        },
        numFmt: '0.00',
        //fill: { fgColor: { rgb: "565B7B" } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleHeure = ref({
        font: {
            name: 'Arial',
            sz: 8,
            italic: true,
            //color: { rgb: "FFFFFF" },
        },
        numFmt: 'HH:mm:ss',
        //fill: { fgColor: { rgb: "565B7B" } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleHeureImportant = ref({
        font: {
            name: 'Arial',
            sz: 8,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        numFmt: 'hh:mm:ss',
        fill: { fgColor: { rgb: '565B7B' } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleQuart = ref({
        font: {
            name: 'Arial',
            sz: 8,
            bold: true,
            italic: true,
            color: { rgb: 'FFFFFF' },
            numFmt: '0.00',
        },
        fill: { fgColor: { rgb: '07182F' }, bgColor: { rgb: '07182F' } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleQuartH = ref({
        font: {
            name: 'Arial',
            sz: 8,
            bold: true,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        numFmt: 'hh:mm:ss',
        fill: { fgColor: { rgb: '07182F' }, bgColor: { rgb: '07182F' } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleTotalJ = ref({
        font: {
            name: 'Arial',
            sz: 8,
            bold: true,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        numFmt: '0',
        fill: { fgColor: { rgb: '9F8D2F' }, bgColor: { rgb: '9F8D2F' } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleTotalJH = ref({
        font: {
            name: 'Arial',
            sz: 8,
            bold: true,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        numFmt: 'hh:mm:ss',
        fill: { fgColor: { rgb: '9F8D2F' }, bgColor: { rgb: '9F8D2F' } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleMoyenneJ = ref({
        font: {
            name: 'Arial',
            sz: 8,
            bold: true,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        numFmt: '0.00',
        fill: { fgColor: { rgb: '71D92C' }, bgColor: { rgb: '71D92C' } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });
    let styleMoyenneJH = ref({
        font: {
            name: 'Arial',
            sz: 8,
            bold: true,
            italic: true,
            color: { rgb: 'FFFFFF' },
        },
        numFmt: 'hh:mm:ss',
        fill: { fgColor: { rgb: '71D92C' }, bgColor: { rgb: '71D92C' } },
        alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
    });

    let columnsData = ref([
        'Date',
        'Quart',
        'Chantier',
        'Nombre de voyage',
        'Pont Bascule',
        'Usine',
        'SIC TEMPS USINE',
        'Parcelle',
        'Piste',
        'Indicateur',
    ]);
    let dataJour = ref([
        ['', '']
    ]);
    let dataInfo = ref([
        [' ', '1', '', '', '', '', '', '', '', ''],
        [' ', '2', '', '', '', '', '', '', '', ''],
        [' ', '3', '', '', '', '', '', '', '', ''],
        ['Total jour', ' ', '', '', '', '', '', '', '', ''],
        ['A ce jour', ' ', '', '', '', '', '', '', '', ''],
    ]);
    let dataNkoteng = ref([
        [' ', '1', '', '', '', '', '', '', '', ''],
        [' ', '2', '', '', '', '', '', '', ''],
        [' ', '3', '', '', '', '', '', '', '', ''],
        ['Total jour', ' ', '', '', '', '', '', '', '', ''],
        ['A ce jour', ' ', '', '', '', '', '', '', , '', ''],
    ]);

    const filterDb = (databa, str) => {
        return databa.filter((vc) => vc.Site === str);
    };
    const exportNewExcel = (dataBaseInfo) => {
        //step1: create new book
        console.log(dataBaseInfo);
        const wb = XLSX.utils.book_new();
        //step2: create data rows and styles
        let headers = [
            'Date',
            'Quart',
            'Site',
            'Code Engin',
            'Hdepart Usine',
            'Harrivée Usine',
            'Temps Mis Enceinte Usine',
            'Durée Voyage',
            'Km Voyage',
            'Chantier',
            'Harrivée chantier',
            'Hdépart chantier',
            'Durée chantier',
            'Temps aller',
            'Temps retour',
            'Durée total cycle',
            'Temps du dechargement',
            'consommation',
            'Pont Bascule',
            'Vitesse Max',
            'Vitesse Moy',
            'Durée immobilisation',
        ];
        //console.log(headers);
        let headersDb = [
            'Date',
            'Quart',
            'Site',
            'Code Engin',
            'Hdepart Usine',
            'Harrivée Usine',
            'Temps Mis Enceinte Usine',
            'Durée Voyage',
            'Km Voyage',
            'Chantier',
            'Harrivée chantier',
            'Hdépart chantier',
            'Durée chantier',
            'Temps aller',
            'Temps retour',
            'Durée total cycle',
            'Temps du dechargement',
            'consommation',
            'Pont Bascule',
            'Vitesse Max',
            'Vitesse Moy',
            'Durée immobilisation',
            'Piste',
        ];
        let row = dataBaseInfo;
        let columns = [
            'Date',
            'Quart',
            'Chantier',
            'Nombre de voyage',
            'Pont Bascule',
            'Usine',
            'SIC TEMPS USINE',
            'Parcelle',
            'Piste',
            'Indicateur',
        ];
        let data = [];
        let data2 = [];
        //step3: create worksheet with rows; add worksheet to worfkbook
        //const wsDatabase = XLSX.utils.aoa_to_sheet([headers, row]);
        const wsDatabase = uigrid_to_sheet(dataBaseInfo, headersDb);
        //sheet nkoteng
        //const wsNkoteng = XLSX.utils.aoa_to_sheet([headers]);
        const wsNkoteng = uigrid_to_sheetSite(
            filterDb(dataBaseInfo, 'ENCEINTE USINE NKOTENG'),
            headers
        );
        //sheet mbandjock
        //const wsMbandjock = XLSX.utils.aoa_to_sheet([headers]);
        const wsMbandjock = uigrid_to_sheetSite(
            filterDb(dataBaseInfo, 'ENCEINTE USINE MBANDJOCK'),
            headers
        );
        //sheet Synthse
        var wsSynthese = uigrid_to_sheetSynthese(
            dataInfo.value,
            columnsData.value,
            dataNkoteng.value
        );

        var wsJour = uigrid_to_jour(dataJour.value);

        wsSynthese['D11'] = { f: 'SUM(D8:D10)' };
        wsSynthese['D21'] = { f: 'SUM(D18:D20)' };
        //const wsSynthese = XLSX.utils.aoa_to_sheet(data, columns);
        //size of colums
        //ws["!cols"] = [{ height: 30 }, { width: 20 }, { width: 20 }];
        XLSX.utils.book_append_sheet(wb, wsDatabase, 'database');
        //new Book
        //deuxieme onglets
        XLSX.utils.book_append_sheet(wb, wsNkoteng, 'Site Nkoteng');
        XLSX.utils.book_append_sheet(wb, wsMbandjock, 'Site Mbandjock');
        XLSX.utils.book_append_sheet(wb, wsSynthese, 'SYNTHESE');
        XLSX.utils.book_append_sheet(wb, wsJour, 'Jour');
        //step4: write excel file to browser
        XLSX.writeFile(wb, 'TransportCannes.xlsx');
    };

    // tableau dynamique du jour
    const uigrid_to_jour = (data) => {
        var o = [],
            oo = [];
        let row1 = [{ v: 'Jour', t: 's', s: styleRows2.value }];
        let row2 = [{ v: 'Nombre de convoi', t: 's', s: styleRows2.value }];
        let row3 = [{ v: 'Temps voyage moyen', t: 's', s: styleRows2.value }];
        let row4 = [{ v: 'Temps Cycle moyen', t: 's', s: styleRows2.value }];
        let row5 = [{ v: 'Vitesse moyenne', t: 's', s: styleRows2.value }];
        let row6 = [
            { v: 'Nombre de rotation convoi', t: 's', s: styleRows2.value },
        ];
        o.push(row1);
        o.push(row2);
        o.push(row3);
        o.push(row4);
        o.push(row5);
        o.push(row6);
        o.push(oo);
        return XLSX.utils.aoa_to_sheet(o);
    };
    // tableau dynamique de la database
    const uigrid_to_sheet = (data, columns) => {
        //console.log(data);
        var o = [],
            oo = [],
            i = 0,
            j = 0;
        let k = 2;
        let cbx = [];
        /* column headers */
        for (j = 0; j < columns.length; ++j)
            oo.push({ v: columns[j], t: 's', s: styleHeaders.value });
        oo.push({ v: '08:00:00', t: 's', s: styleHeureNormale.value });
        o.push(oo);
        /* table data */
        for (i = 0; i < data.length; ++i) {
            oo = [];
            cbx = Object.values(data[i]);
            for (j = 0; j < cbx.length; ++j) {
                if (j === 7) {
                    oo.push({
                        f: `E${k + 1}-F${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 8) {
                    oo.push({ f: `F${k}-E${k}`, t: 's', s: styleHeure.value });
                } else if (j === 13) {
                    oo.push({
                        f: `L${k}-K${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 14) {
                    oo.push({
                        f: `K${k}-E${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 15) {
                    oo.push({
                        f: `F${k}-L${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 16) {
                    oo.push({
                        f: `SUM(G${k},O${k},M${k},N${k})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 17) {
                    oo.push({ v: cbx[j], t: 's', s: styleHeure.value });
                } else if (j === 21) {
                    oo.push({ v: cbx[j], t: 's', s: styleHeure.value });
                } else if (j === 19) {
                    oo.push({ v: cbx[j], t: 's', s: styleHeureImportant.value });
                } else if (j === 23) {
                    oo.push({
                        f: `N${k}+O${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 9 || j === 18 || j === 20) {
                    oo.push({
                        v: cbx[j],
                        t: 'n',
                        s: styleRowsNumber.value,
                    });
                } else if (j === 0) {} else {
                    oo.push({ v: cbx[j], t: 's', s: styleRows.value });
                }
            }
            o.push(oo);
            k++;
        }
        /* aoa_to_sheet converts an array of arrays into a worksheet object */
        return XLSX.utils.aoa_to_sheet(o);
    };
    // tableau dynamique de la Synthese
    const uigrid_to_sheetSynthese = (data, columns, data2) => {
        var o = [],
            oo = [],
            i = 0,
            j = 0;
        let k = 8;
        let r = 2;
        let tx = 3000;
        let usineNkt = [
            { v: 'ENCEINTE USINE NKOTENG', t: 's', s: styleRows2.value },
        ];
        let usineMbj = [
            { v: 'ENCEINTE USINE MBANDJOCK', t: 's', s: styleRows2.value },
        ];
        let rowVide = [{ v: '', t: 's' }];
        let row1 = [{ v: 'SOSUCAM', t: 's', s: styleRows2.value }];
        let row2 = [{ v: 'DIRECTION DES CULTURES', t: 's', s: styleRows2.value }];
        let row3 = [{ v: 'MECANISATION', t: 's', s: styleRows2.value }];
        let row4 = [{ v: 'TRACKING', t: 's', s: styleRows2.value }];
        let row5 = [{
            v: 'JOURNALIER SITE MBANDJOCK ',
            t: 's',
            s: {
                font: { name: 'Courier', sz: 15 },
                alignment: { wrapText: false },
            },
        }, ];
        o.push(row1);
        o.push(row2);
        o.push(row3);
        o.push(row4);
        o.push(row5);
        o.push(usineMbj);
        /* column headers */

        for (j = 0; j < columns.length; ++j)
            oo.push({ v: columns[j], t: 's', s: styleHeaders.value });
        o.push(oo);
        /* table data */
        for (i = 0; i < data.length; ++i) {
            oo = [];
            //console.log(data[i][3]);
            for (j = 0; j < data[i].length; ++j) {
                if (j === 3) {
                    oo.push({
                        f: `COUNTIFS(database!B${r}:B${tx},B${k},database!C${r}:C${tx},A6)`,
                        t: 'n',
                        s: styleRows.value,
                    });
                } else if (j === 4) {
                    oo.push({
                        f: `SUMIFS(database!S${r}:S${tx},database!C${r}:C${tx},A6,database!B${r}:B${tx},B${k})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 7) {
                    oo.push({
                        f: `SUMIFS(database!M${r}:M${tx},database!C${r}:C${tx},A6,database!B${r}:B${tx},B${k})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 5) {
                    oo.push({
                        f: `SUMIFS(database!G${r}:G${tx},database!C${r}:C${tx},A6,database!B${r}:B${tx},B${k})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 8) {
                    oo.push({
                        f: `SUMIFS(database!W${r}:W${tx},database!C${r}:C${tx},A6,database!B${r}:B${tx},B${k})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else {
                    oo.push({ v: data[i][j], t: 's', s: styleRows.value });
                }
            }
            o.push(oo);
            k++;
        }
        o.push(rowVide);
        o.push(usineNkt);
        let row6 = [{
            v: 'JOURNALIER SITE NKOTENG',
            t: 's',
            s: {
                font: { name: 'Courier', sz: 18 },
                alignment: { wrapText: false },
            },
        }, ];
        o.push(row6);
        o.push(rowVide);
        //Journalier site de nkoteng
        /* column headers */
        i = 0;
        let cv = 0;
        j = 0;
        oo = [];
        let kn = 18;
        for (cv = 0; cv < columns.length; ++cv)
            oo.push({ v: columns[cv], t: 's', s: styleHeaders.value });
        o.push(oo);
        /* table data */
        for (i = 0; i < data2.length; ++i) {
            oo = [];
            //console.log(data[i][3]);
            for (j = 0; j < data2[i].length; ++j) {
                if (j === 3) {
                    oo.push({
                        f: `COUNTIFS(database!B${r}:B${tx},B${kn},database!C${r}:C${tx},A14)`,
                        t: 'n',
                        s: styleRows.value,
                    });
                } else if (j === 4) {
                    oo.push({
                        f: `SUMIFS(database!S${r}:S${tx},database!C${r}:C${tx},A14,database!B${r}:B${tx},B${kn})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 7) {
                    oo.push({
                        f: `SUMIFS(database!M${r}:M${tx},database!C${r}:C${tx},A14,database!B${r}:B${tx},B${kn})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 5) {
                    oo.push({
                        f: `SUMIFS(database!G${r}:G${tx},database!C${r}:C${tx},A14,database!B${r}:B${tx},B${kn})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 8) {
                    oo.push({
                        f: `SUMIFS(database!W${r}:W${tx},database!C${r}:C${tx},A14,database!B${r}:B${tx},B${kn})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else {
                    oo.push({ v: data2[i][j], t: 's', s: styleRows.value });
                }
            }
            o.push(oo);
            k++;
            kn++;
        }
        o.push(rowVide);
        o.push(rowVide);
        let row15 = [{
            v: 'JOURNALIER SOSUCAM',
            t: 's',
            s: {
                font: { name: 'Courier', sz: 18 },
                alignment: { wrapText: false },
            },
        }, ];
        o.push(row15);
        o.push(rowVide);
        //Journalier site de nkoteng
        /* column headers */
        i = 0;
        cv = 0;
        j = 0;
        oo = [];
        kn = 28;
        for (cv = 0; cv < columns.length; ++cv)
            oo.push({ v: columns[cv], t: 's', s: styleHeaders.value });
        o.push(oo);
        /* table data */
        for (i = 0; i < data2.length; ++i) {
            oo = [];
            //console.log(data[i][3]);
            for (j = 0; j < data2[i].length; ++j) {
                if (j === 3) {
                    oo.push({
                        f: `COUNTIFS(database!B${r}:B${tx},B${kn})`,
                        t: 'n',
                        s: styleRows.value,
                    });
                } else if (j === 4) {
                    oo.push({
                        f: `SUMIFS(database!S${r}:S${tx},database!B${r}:B${tx},B${kn})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 7) {
                    oo.push({
                        f: `SUMIFS(database!M${r}:M${tx},database!B${r}:B${tx},B${kn})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 5) {
                    oo.push({
                        f: `SUMIFS(database!G${r}:G${tx},database!B${r}:B${tx},B${kn})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 8) {
                    oo.push({
                        f: `SUMIFS(database!W${r}:W${tx},database!B${r}:B${tx},B${kn})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else {
                    oo.push({ v: data2[i][j], t: 's', s: styleRows.value });
                }
            }
            o.push(oo);
            k++;
            kn++;
        }
        console.log(o);
        /* aoa_to_sheet converts an array of arrays into a worksheet object */
        return XLSX.utils.aoa_to_sheet(o);
    };
    //tableau dynamique en fonction du site
    const uigrid_to_sheetSite = (data, columns) => {
        var o = [],
            oo = [],
            i = 0,
            j = 0;
        let k = 2;
        let kindice = 2;
        let tailleTableau = data.length;
        let row = [];
        let cbx = [];
        /* column headers */
        for (j = 0; j < columns.length; ++j)
            oo.push({ v: columns[j], t: 's', s: styleHeaders.value });
        oo.push({ v: '08:00:00', t: 's', s: styleHeureNormale.value });
        o.push(oo);
        /* table data */
        for (i = 0; i < data.length; ++i) {
            oo = [];
            cbx = Object.values(data[i]);
            for (j = 0; j < cbx.length; ++j) {
                if (j === 7) {
                    oo.push({
                        f: `E${k + 1}-F${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 8) {
                    oo.push({ f: `F${k}-E${k}`, t: 's', s: styleHeure.value });
                } else if (j === 13) {
                    oo.push({
                        f: `L${k}-K${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 14) {
                    oo.push({
                        f: `K${k}-E${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 15) {
                    oo.push({
                        f: `F${k}-L${k}`,
                        t: 's',
                        s: styleHeureImportant.value,
                    });
                } else if (j === 16) {
                    oo.push({
                        f: `SUM(G${k},O${k},M${k},N${k})`,
                        t: 's',
                        s: styleHeure.value,
                    });
                } else if (j === 17) {
                    oo.push({ v: cbx[j], t: 's', s: styleHeure.value });
                } else if (j === 21) {
                    oo.push({ v: cbx[j], t: 's', s: styleHeure.value });
                } else if (j === 19) {
                    oo.push({ v: cbx[j], t: 's', s: styleHeureImportant.value });
                } else if (j === 9 || j === 18 || j === 20) {
                    oo.push({
                        v: cbx[j],
                        t: 'n',
                        s: styleRowsNumber.value,
                    });
                } else if (j === 0) {} else {
                    oo.push({ v: cbx[j], t: 's', s: styleRows.value });
                }
            }
            o.push(oo);
            if (i + 1 === tailleTableau) {
                row = [
                    { v: ' ', t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[0], t: 's', s: styleHeaders.value },
                    { v: '', t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[1], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[2], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[3], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[4], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[5], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[6], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[7], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[8], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[9], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[10], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[11], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[12], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[13], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[14], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[15], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[16], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[17], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[18], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[19], t: 's', s: styleHeaders.value },
                ];
                o.push(row);
                //Quart 1
                let Quart1 = [
                    { v: '', t: 's', s: styleQuart.value },
                    { v: '', t: 's', s: styleQuart.value },
                    { v: 'Quart 1', t: 's', s: styleQuart.value },
                    { f: `COUNTIF(B${kindice}:B${k},1)`, t: 'n', s: styleQuart.value },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,N${kindice}:N${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,M${kindice}:M${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,O${kindice}:O${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,H${kindice}:H${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,G${kindice}:G${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,P${kindice}:P${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,I${kindice}:I${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,R${kindice}:R${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,S${kindice}:S${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,V${kindice}:V${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},1,V${kindice}:V${k}))`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},1,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleQuart.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},1,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},1,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `MAXIFS(T${kindice}:T${k},B${kindice}:B${k},1)`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                ];
                o.push(Quart1);

                //Quart 2
                let Quart2 = [
                    { v: '', t: 's', s: styleQuart.value },
                    { v: '', t: 's', s: styleQuart.value },
                    { v: 'Quart 2', t: 's', s: styleQuart.value },
                    { f: `COUNTIF(B${kindice}:B${k},2)`, t: 'n', s: styleQuart.value },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,N${kindice}:N${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,M${kindice}:M${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,O${kindice}:O${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,H${kindice}:H${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,G${kindice}:G${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,P${kindice}:P${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,I${kindice}:I${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,R${kindice}:R${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,S${kindice}:S${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,V${kindice}:V${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},2,V${kindice}:V${k}))`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},2,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleQuart.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},2,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},2,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `MAXIFS(T${kindice}:T${k},B${kindice}:B${k},2)`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                ];
                o.push(Quart2);

                //Quart 3
                let Quart3 = [
                    { v: '', t: 's', s: styleQuart.value },
                    { v: '', t: 's', s: styleQuart.value },
                    { v: 'Quart 3', t: 's', s: styleQuart.value },
                    { f: `COUNTIF(B${kindice}:B${k},3)`, t: 'n', s: styleQuart.value },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,N${kindice}:N${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,M${kindice}:M${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,O${kindice}:O${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,H${kindice}:H${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,G${kindice}:G${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,P${kindice}:P${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,I${kindice}:I${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,R${kindice}:R${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,S${kindice}:S${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k}))`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleQuart.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},3,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `MAXIFS(T${kindice}:T${k},B${kindice}:B${k},3)`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                ];
                o.push(Quart3);
                //Total jour

                let totalJour = [
                    { v: '', t: 's', s: styleTotalJ.value },
                    { v: 'Total Jour', t: 's', s: styleTotalJ.value },
                    { v: '', t: 's', s: styleTotalJ.value },
                    {
                        f: `SUM(D${k + 2}:D${k + 4})`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `SUM(N${kindice}:N${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(M${kindice}:M${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(O${kindice}:O${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(H${kindice}:H${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(G${kindice}:G${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(P${kindice}:P${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(I${kindice}:I${k})`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `SUM(R${kindice}:R${k})`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `SUM(S${kindice}:S${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(V${kindice}:V${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k}))`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},3,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `MAX(B${kindice}:B${k})`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                ];
                o.push(totalJour);
                //Moyenne jour

                let moyenneJour = [
                    { v: '', t: 's', s: styleMoyenneJ.value },
                    { v: 'Moyenne Jour', t: 's', s: styleMoyenneJ.value },
                    { v: '', t: 's', s: styleMoyenneJ.value },
                    {
                        f: `average(D${k + 2}:D${k + 4})`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `average(N${kindice}:N${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(M${kindice}:M${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(O${kindice}:O${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(H${kindice}:H${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(G${kindice}:G${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(P${kindice}:P${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(I${kindice}:I${k})`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `average(R${kindice}:R${k})`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `average(S${kindice}:S${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(V${kindice}:V${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k}))`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},3,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `MAX(B${kindice}:B${k},3)`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                ];
                o.push(moyenneJour);
                kindice = k + 7;
                k = k + 6;
            } else if (data[i].Engin != data[i + 1].Engin) {
                row = [
                    { v: ' ', t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[0], t: 's', s: styleHeaders.value },
                    { v: '', t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[1], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[2], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[3], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[4], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[5], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[6], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[7], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[8], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[9], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[10], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[11], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[12], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[13], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[14], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[15], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[16], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[17], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[18], t: 's', s: styleHeaders.value },
                    { v: tabRecap.value[19], t: 's', s: styleHeaders.value },
                ];
                o.push(row);
                let Quart1 = [
                    { v: '', t: 's', s: styleQuart.value },
                    { v: '', t: 's', s: styleQuart.value },
                    { v: 'Quart 1', t: 's', s: styleQuart.value },
                    { f: `COUNTIF(B${kindice}:B${k},1)`, t: 'n', s: styleQuart.value },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,N${kindice}:N${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,M${kindice}:M${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,O${kindice}:O${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,H${kindice}:H${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,G${kindice}:G${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,P${kindice}:P${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,I${kindice}:I${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,R${kindice}:R${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,S${kindice}:S${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,V${kindice}:V${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},1,Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},1,V${kindice}:V${k}))`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},1,V${kindice}:V${k})))/$W$1*100`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},1,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},1,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `MAXIFS(T${kindice}:T${k},B${kindice}:B${k},1)`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                ];
                o.push(Quart1);

                //Quart 2
                let Quart2 = [
                    { v: '', t: 's', s: styleQuart.value },
                    { v: '', t: 's', s: styleQuart.value },
                    { v: 'Quart 2', t: 's', s: styleQuart.value },
                    { f: `COUNTIF(B${kindice}:B${k},2)`, t: 'n', s: styleQuart.value },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,N${kindice}:N${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,M${kindice}:M${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,O${kindice}:O${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,H${kindice}:H${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,G${kindice}:G${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,P${kindice}:P${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,I${kindice}:I${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,R${kindice}:R${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,S${kindice}:S${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,V${kindice}:V${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},2,Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},2,V${kindice}:V${k}))`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},2,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleQuart.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},2,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},2,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `MAXIFS(T${kindice}:T${k},B${kindice}:B${k},2)`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                ];
                o.push(Quart2);

                //Quart 3
                let Quart3 = [
                    { v: '', t: 's', s: styleQuart.value },
                    { v: '', t: 's', s: styleQuart.value },
                    { v: 'Quart 3', t: 's', s: styleQuart.value },
                    { f: `COUNTIF(B${kindice}:B${k},3)`, t: 'n', s: styleQuart.value },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,N${kindice}:N${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,M${kindice}:M${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,O${kindice}:O${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,H${kindice}:H${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,G${kindice}:G${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,P${kindice}:P${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,I${kindice}:I${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,R${kindice}:R${k})`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,S${kindice}:S${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `SUMIF(B${kindice}:B${k},3,Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k}))`,
                        t: 's',
                        s: styleQuartH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleQuart.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},3,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                    {
                        f: `MAXIFS(T${kindice}:T${k},B${kindice}:B${k},3)`,
                        t: 'n',
                        s: styleQuart.value,
                    },
                ];
                o.push(Quart3);
                //Total jour

                let totalJour = [
                    { v: '', t: 's', s: styleTotalJ.value },
                    { v: 'Total Jour', t: 's', s: styleTotalJ.value },
                    { v: '', t: 's', s: styleTotalJ.value },
                    {
                        f: `SUM(D${k + 2}:D${k + 4})`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `SUM(N${kindice}:N${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(M${kindice}:M${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(O${kindice}:O${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(H${kindice}:H${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(G${kindice}:G${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(P${kindice}:P${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(I${kindice}:I${k})`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `SUM(R${kindice}:R${k})`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `SUM(S${kindice}:S${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(V${kindice}:V${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `SUM(Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},3,Q${kindice}:Q${k}))`,
                        t: 's',
                        s: styleTotalJH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},3,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                    {
                        f: `MAX(B${kindice}:B${k})`,
                        t: 'n',
                        s: styleTotalJ.value,
                    },
                ];
                o.push(totalJour);
                //Moyenne jour

                let moyenneJour = [
                    { v: '', t: 's', s: styleMoyenneJ.value },
                    { v: 'Moyenne Jour', t: 's', s: styleMoyenneJ.value },
                    { v: '', t: 's', s: styleMoyenneJ.value },
                    {
                        f: `average(D${k + 2}:D${k + 4})`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `average(N${kindice}:N${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(M${kindice}:M${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(O${kindice}:O${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(H${kindice}:H${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(G${kindice}:G${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(P${kindice}:P${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `average(I${kindice}:I${k})`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `average(R${kindice}:R${k})`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `average(S${kindice}:S${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `SUM(V${kindice}:V${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `SUM(Q${kindice}:Q${k})`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `$W$1-(SUMIF(B${kindice}:B${k},3,Q${kindice}:Q${k}))`,
                        t: 's',
                        s: styleMoyenneJH.value,
                    },
                    {
                        f: `($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))/$W$1*100`,
                        t: 's',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `(SUMIF(B${kindice}:B${k},3,H${kindice}:H${k}))/($W$1-(SUMIF(B${kindice}:B${k},3,V${kindice}:V${k})))*100`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                    {
                        f: `MAX(T${kindice}:T${k})`,
                        t: 'n',
                        s: styleMoyenneJ.value,
                    },
                ];
                o.push(moyenneJour);
                kindice = k + 7;
                k = k + 6;
            }
            k++;
        }
        /* aoa_to_sheet converts an array of arrays into a worksheet object */
        return XLSX.utils.aoa_to_sheet(o);
    };

    return {
        exportNewExcel,
    };
}
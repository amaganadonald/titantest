<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row g-2">
          <div class="col-sm-4">
            <div class="search-box">
              <input
                type="text"
                class="form-control"
                id="search-opts"
                placeholder="Search datas..."
                v-model="searchValue"
              />
              <i class="mdi mdi-magnify search-widget-icon search-icon"></i>
            </div>
          </div>
          <div class="col-sm-auto ms-auto">
            <div class="list-grid-nav hstack gap-1">
              <button
                type="button"
                @click="refreshTable()"
                class="btn btn-soft-info nav-link btn-icon fs-14"
              >
                <i class="mdi mdi-rotate-3d-variant"></i>
              </button>
              <button
                type="button"
                id="grid-view-button"
                class="btn btn-soft-info nav-link btn-icon fs-14"
                @click="exportToCSV()"
              >
                <i class="mdi mdi-file-excel"></i>
              </button>
              <button
                type="button"
                id="list-view-button"
                class="btn btn-soft-info nav-link btn-icon fs-14"
                @click="generatePdf()"
              >
                <i class="mdi mdi-file-pdf-box w-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div class="live-preview">
              <div class="table-responsive table-card">
                <EasyDataTable
                  :headers="headers"
                  :items="items"
                  :loading="loading"
                  :rows-per-page="10"
                  :search-value="searchValue"
                  multi-sort
                  table-class-name="customize-table"
                  header-text-direction="center"
                  body-text-direction="center"
                  :body-row-class-name="bodyRowClassNameFunction"
                  alternating
                  border-cell
                  buttons-pagination
                  theme-color="#1d90ff"
                >
                  <template #item-monthConso="{ monthConso }">
                    {{ useRetourneMois(monthConso) }}
                  </template>
                  <template #item-date="{ date }">
                    {{ changeDateTime(date) }}
                  </template>
                </EasyDataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import type {
  Header,
  Item,
  ClickRowArgument,
  SortType,
  BodyRowClassNameFunction,
  FilterOption,
} from 'vue3-easy-data-table';
import { useSettingStore } from '../../stores/settings-store';
import { date } from 'quasar';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { useRouter } from 'vue-router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useRetourneMois } from '../../composable/panneReport';
export default defineComponent({
  name: 'TableRapport',
  components: {},
  props: ['header', 'data', 'title', 'tb', 'cbTable', 'filename'],
  emits: ['refreshTable'],
  setup(props, context) {
    const router = useRouter();
    const headers = ref<Header[]>([]);
    const items = ref<Item[]>([]);
    const searchValue = ref('');
    let seamless = ref(false);
    let filterLibelle = ref('');
    let showLibelleFilter = ref(false);
    let operation = ref('');
    const store = useSettingStore();
    let titre = computed(() => props.title);
    // let db = ref(props.data)
    const opeData = ref<object>([]);
    const itemsSelected = ref<Item[]>([]);
    const sortBy: string[] = ['number', 'weight'];
    const sortType: SortType[] = ['desc', 'asc'];
    const colorTheme = ref('#f48225');

    const showRow = (item: ClickRowArgument) => {
      if (itemsSelected.value.filter((ite) => ite.id === item.id).length > 0) {
        itemsSelected.value.filter((ite) => ite.id !== item.id);
      } else {
        itemsSelected.value.push(item);
      }
    };
    const bodyRowClassNameFunction: BodyRowClassNameFunction = (
      item: Item,
      rowNumber: number
    ): string => {
      if (itemsSelected.value.filter((ite) => ite.id === item.id).length > 0)
        return 'fail-row';
    };
    const filterOptions = computed((): FilterOption[] => {
      const filterOptionsArray: FilterOption[] = [];
      filterOptionsArray.push({
        field: 'lib_fam',
        criteria: filterLibelle.value,
        comparison: (value, criteria): boolean =>
          value != null &&
          criteria != null &&
          typeof value === 'string' &&
          value.includes(`name-${criteria}`),
      });
      return filterOptionsArray;
    });
    const loading = computed(() => store.loading);
    const refreshTable = () => {
      context.emit('refreshTable');
    };
    onMounted(() => {
      headers.value = props.header;
      items.value = props.data;
    });
    const changeDate = (dbs: string | number | Date) => {
      return date.formatDate(dbs, 'DD-MM-YYYY');
    };
    const changeDateTime = (dbs: string | number | Date) => {
      return date.formatDate(dbs, 'DD-MM-YYYY HH:mm:ss');
    };
    let exportToCSV = () => {
      let csvData = items.value;
      let fileName = props.filename;
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };
    const generatePdf = () => {
      const columns = headers.value;
      console.log(columns);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter',
      });
      doc.setFontSize(14).text(titre.value, 0.5, 1.0);
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      doc.autoTable({
        columns,
        body: items.value,
        margin: { left: 0.5, top: 1.25 },
        styles: {
          font: 'times',
          fontStyle: 'normal',
          fontSize: 10,
        },
        columnStyles: { halign: 'center', fillColor: [100, 255, 255] },
        headStyles: {
          fillColor: '#006064',
        },
        lineColor: 10,
        lineWidth: 4,
      });

      doc
        .setFont('times')
        .setFontSize(10)
        .setTextColor(0, 0, 255)
        .text(
          'rapport généré par TITAN - SMARTRACK - ' +
            new Date().toISOString().substr(0, 10),
          0.5,
          doc.internal.pageSize.height - 0.5
        )
        .save(`${props.filename}.pdf`);
    };
    watch(props, () => {
      items.value = props.data;
    });
    return {
      headers,
      items,
      refreshTable,
      searchValue,
      seamless,
      operation,
      opeData,
      itemsSelected,
      sortBy,
      sortType,
      colorTheme,
      loading,
      titre,
      changeDate,
      exportToCSV,
      showRow,
      bodyRowClassNameFunction,
      filterLibelle,
      filterOptions,
      showLibelleFilter,
      generatePdf,
      useRetourneMois,
      changeDateTime,
    };
  },
});
</script>
<style>
.customize-table {
  --easy-table-header-font-size: 10px;
  --easy-table-header-height: 10px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #2d3a4f;

  --easy-table-header-item-padding: 10px 15px;
  --easy-table-loading-mask-background-color: #2d3a4f;
}
.fail-row {
  --easy-table-body-row-background-color: #1e5581;
  --easy-table-body-row-font-color: #fff;
}
.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
.player-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
}
</style>

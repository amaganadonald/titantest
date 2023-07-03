<template>
  <div style="overflow: hidden">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalgridLabel">
        {{ $t($props.operation).toUpperCase() }}
        {{ $t($props.tbname).toUpperCase() }}
      </h5>
      <q-btn icon="close" flat round dense v-close-popup />
    </div>

    <q-separator color="orange" inset /><br /><br />

    <div class="row g-4">
      <div class="form-group row">
        <label for="vehicule" class="col-sm-2 col-form-label">Fichier</label>
        <div class="col-sm-10">
          <input
            type="file"
            class="form-control"
            id="fichier"
            aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"
            accept=".xls, .xlsx"
            name="fichier"
            ref="fichier"
          />
        </div>
      </div>

      <div class="col-lg-12">
        <div class="hstack gap-2 justify-content-end">
          <button type="button" class="btn btn-light" v-close-popup>
            Close
          </button>
          <button
            v-if="$props.operation != 'view'"
            type="submit"
            class="btn btn-primary"
            @click="submitInfo()"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useMaintenanceStore } from 'src/stores/maintenance-store';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
export default defineComponent({
  name: 'UploadData',
  props: ['operation', 'titles', 'tbname'],
  emits: ['closeModalUpl'],
  setup(props, context) {
    const store = useMaintenanceStore();
    const { locale, t } = useI18n({ useScope: 'global' });
    let fichier = ref(null);
    let loading = ref(false);
    let dataBases = ref([]);
    const submitInfo = async () => {
      console.log(fichier.value.files[0]);
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
        };
      }
      //fichier.value = null;
      loading.value = false;
      context.emit('closeModalUpl');
    };
    onMounted(async () => {
      fichier.value = null;
      console.log(props);
    });
    return {
      fichier,
      submitInfo,
      locale,
      t,
    };
  },
});
</script>

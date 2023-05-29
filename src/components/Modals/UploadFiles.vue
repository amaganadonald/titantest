<template>
  <div style="overflow: hidden">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalgridLabel">
        Upload de documents
      </h5>
      <q-btn icon="close" flat round dense v-close-popup />
    </div>

    <q-separator color="orange" inset /><br /><br />
    <div v-bind="getRootProps()" class="dropzone">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
      <aside>
        <h4>{{ doc }}</h4>
      </aside>
    </div>
    <br />
    <div class="form-group row">
      <label for="date_expiration" class="col-sm-4 col-form-label"
        >Date expiration</label
      >
      <div class="col-sm-8">
        <input
          type="date"
          class="form-control"
          id="date_expiration"
          placeholder="Date expiration"
          v-model="date_expiration"
        />
      </div>
    </div>
    <br />
    <div class="form-group row">
      <label for="ratio" class="col-sm-4 col-form-label">Ratio jours</label>
      <div class="col-sm-8">
        <input
          type="number"
          class="form-control"
          id="ratio"
          placeholder="Nombre de jours avant Alerte"
          v-model="ratio"
        />
      </div>
    </div>
    <br />
    <div class="form-group row">
      <label for="typeDocument" class="col-sm-4 col-form-label"
        >Type de Document</label
      >
      <div class="col-sm-8">
        <select
          v-model="typeDocument"
          id="typeDocument"
          class="form-select mb-3"
        >
          <option value="0" selected>Selectionner un type de document</option>
          <option
            v-for="(ite, index) in typeDocuments"
            :key="index"
            :value="ite.id"
          >
            {{ ite.libelle }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <label for="status" class="col-sm-4 col-form-label">status</label>
      <div class="col-sm-6">
        <input
          type="checkbox"
          class="form-check-input"
          id="status"
          v-model="status"
        />
      </div>
    </div>
    <div class="col-lg-12">
      <div class="hstack gap-2 justify-content-end">
        <button type="button" class="btn btn-light">reset</button>
        <button type="submit" class="btn btn-primary" @click="submitInfo()">
          Submit
        </button>
      </div>
    </div>
    <!--end col-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import { useSettingStore } from 'src/stores/settings-store';
export default defineComponent({
  name: 'UploadFiles',
  components: {},
  props: ['code', 'operation', 'closeModal'],
  emits: ['closeModal'],
  setup(props, context) {
    const doc = ref('');
    const file = ref(null);
    const date_expiration = ref(null);
    const ratio = ref(1);
    const status = ref(true);
    const store = useSettingStore();
    const typeDocument = ref('');
    const typeDocuments = computed(() => store.typeDocument);
    function onDrop(acceptFiles, rejectReasons) {
      file.value = acceptFiles[0];
      console.log(acceptFiles);
      doc.value = acceptFiles[0].name;
      console.log(rejectReasons);
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });
    const submitInfo = async () => {
      const formData = new FormData();
      formData.append('nom', file.value.name);
      formData.append('type', file.value.type);
      formData.append('expiration', date_expiration.value);
      formData.append('deadLine', ratio.value);
      formData.append('Status', status.value);
      formData.append('vehicle', props.code.code);
      formData.append('typeDocument', typeDocument.value);
      formData.append('file', file.value);
      await store.manageDocument(formData, props.operation, props.code.id);
      context.emit('closeModal');
    };
    onMounted(async () => {
      await store.allTypeDocument();
    });
    return {
      doc,
      getRootProps,
      getInputProps,
      ...rest,
      date_expiration,
      ratio,
      typeDocument,
      typeDocuments,
      submitInfo,
      status,
    };
  },
});
</script>
<style scoped>
span {
  font-size: 1rem;
  color: #777;
}
.dropzone {
  text-align: center;
  padding: 15px;
  border: 3px dashed #eeeeee;
  background-color: #fafafa;
  color: #bdbdbd;
  margin-bottom: 15px;
}
.accept {
  border-color: #107c10 !important;
}

.reject {
  border-color: #d83b01 !important;
}
</style>

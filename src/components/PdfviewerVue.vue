<template>
  <div style="overflow: hidden">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalgridLabel">Fichier</h5>
      <q-btn icon="close" flat round dense v-close-popup />
    </div>

    <q-separator color="orange" inset /><br /><br />
    <div class="row g-3">
      <div class="q-pa-md q-gutter-sm" style="height: 600px">
        <q-pdfviewer type="html5" :src="sr.href" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'PdfviewerVue',
  props: ['src'],
  setup(props) {
    const sr = ref(props.src);
    onMounted(() => {
      console.log(props.src);
    });
    return {
      sr,
    };
  },
});
</script>

<template>
  <q-page>
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <!-- start page title -->
          <div class="row">
            <div class="col-12">
              <div
                class="page-title-box d-sm-flex align-items-center justify-content-between"
              >
                <h4 class="mb-sm-0">GUIDE DE DEMARRAGE RAPIDE</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Guide</a>
                    </li>
                    <li class="breadcrumb-item active">Help</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <div style="overflow: hidden">
            <div class="row g-3">
              <div class="q-pa-md q-gutter-sm" style="height: 600px">
                <q-pdfviewer type="html5" :src="ig" />
              </div>
            </div>
          </div>
        </div>
        <!-- container-fluid -->
      </div>
      <!-- End Page-content -->
    </div></q-page
  >
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
export default defineComponent({
  name: 'FaqParc',
  components: {},
  setup() {
    const $q = useQuasar();
    let ig = ref('');
    const getImageUrl = () => {
      return $q.cookies.get('ht') + '/documents/titan.pdf';
    };
    onMounted(() => {
      ig.value = getImageUrl();
    });
    return { ig };
  },
});
</script>

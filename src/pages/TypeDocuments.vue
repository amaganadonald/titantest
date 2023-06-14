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
                <h4 class="mb-sm-0">TYPE DE DOCUMENTS</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Paramètres</a>
                    </li>
                    <li class="breadcrumb-item active">Type</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableData
            :header="header"
            :data="data"
            title="Type_documents"
            tb="type_doc"
            @refreshTable="refreshTable"
            cbTable="mnDts"
          />
        </div>
        <!-- container-fluid -->
      </div>
      <!-- End Page-content -->
    </div></q-page
  >
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import TableData from '../components/tables/TableData.vue';
import { useSettingStore } from '../stores/settings-store';

export default defineComponent({
  name: 'TypeDocuments',
  components: {
    TableData,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.typeDocument);
    const header = [
      { text: 'Id', value: 'id', sortable: true, width: 10, type: 'number' },
      {
        text: 'Libelle',
        value: 'code',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Description',
        value: 'libelle',
        sortable: true,
        type: 'string',
      },
      {
        text: 'Status',
        value: 'Status',
        sortable: true,
        type: 'boolean',
      },
      {
        text: 'Action',
        value: 'operation',
        sortable: true,
        type: 'action',
      },
    ];
    const refreshTable = async () => {
      await store.allTypeDocument();
    };
    onMounted(async () => {
      await store.allTypeDocument();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

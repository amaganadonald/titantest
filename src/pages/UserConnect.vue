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
                <h4 class="mb-sm-0">USER LOGIN</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Administrateur</a>
                    </li>
                    <li class="breadcrumb-item active">Log In</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <TableRapport
            :header="header"
            :data="data"
            title="UserLogin"
            tb="userConnect"
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
import TableRapport from '../components/tables/TableRapport.vue';
import { useSettingStore } from '../stores/settings-store';

export default defineComponent({
  name: 'UserConnect',
  components: {
    TableRapport,
  },
  setup() {
    const store = useSettingStore();
    let data = computed(() => store.userLogin);
    const header = [
      { text: 'Id', value: 'id', sortable: true, type: 'number' },
      { text: 'username', value: 'username', sortable: true, type: 'string' },
      {
        text: 'Date Connexion',
        value: 'dateconnect',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Date Deconnexion',
        value: 'datedeconnect',
        sortable: true,
        type: 'date',
      },
      {
        text: 'Ip Address',
        value: 'ipadress',
        sortable: true,
        type: 'string',
      },
      { text: 'Type', value: 'type', sortable: true, type: 'string' },
    ];
    const refreshTable = async () => {
      await store.allUserLogin();
    };

    onMounted(async () => {
      await store.allUserLogin();
    });
    return {
      header,
      data,
      refreshTable,
    };
  },
});
</script>

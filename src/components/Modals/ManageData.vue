<template>
  <div style="overflow: hidden">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalgridLabel">
        {{ $t($props.operation).toUpperCase() }}
        {{ $t($props.title).toUpperCase() }}
      </h5>
      <q-btn icon="close" flat round dense v-close-popup />
    </div>

    <q-separator color="orange" inset /><br /><br />
    <div class="row g-3">
      <div
        class="col-12 col-sm-12"
        v-for="(tab, index) in tabInfo"
        :key="index"
      >
        <div v-if="index == 0" class="form-group row">
          <label
            v-if="$props.operation != 'add'"
            :for="tab.vModel"
            class="col-sm-2 col-form-label"
            >{{ $t(tab.vModel) }}</label
          >
          <div class="col-sm-8" v-if="$props.operation != 'add'">
            <input
              disabled
              type="text"
              class="form-control"
              :id="tab.vModel"
              :placeholder="$t(tab.vModel)"
              :value="tab.vData"
            />
          </div>
        </div>
        <div v-else-if="tab.vType == 'string'" class="form-group row">
          <label :for="tab.vModel" class="col-sm-4 col-form-label">{{
            $t(tab.vModel)
          }}</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              :id="tab.vModel"
              :placeholder="$t(tab.vModel)"
              :value="tab.vData"
              @blur="(event) => changeInput(event, index)"
            />
          </div>
        </div>
        <div v-else-if="tab.vType == 'boolean'" class="form-group row">
          <label :for="tab.vModel" class="col-sm-4 col-form-label">{{
            $t(tab.vModel)
          }}</label>
          <div class="col-sm-6">
            <input
              type="checkbox"
              class="form-check-input"
              :id="tab.vModel"
              :placeholder="$t(tab.vModel)"
              :value="tab.vData"
              @blur="(event) => changeInput(event, index)"
              :checked="tab.vData"
            />
          </div>
        </div>
        <div v-else-if="tab.vType == 'date'" class="form-group row">
          <label :for="tab.vModel" class="col-sm-4 col-form-label">{{
            $t(tab.vModel)
          }}</label>
          <div class="col-sm-8">
            <input
              type="date"
              class="form-control"
              :id="tab.vModel"
              :placeholder="$t(tab.vModel)"
              :value="tab.vData"
              @blur="(event) => changeInput(event, index)"
            />
          </div>
        </div>
        <div v-else-if="tab.vType == 'time'" class="form-group row">
          <label :for="tab.vModel" class="col-sm-4 col-form-label">{{
            $t(tab.vModel)
          }}</label>
          <div class="col-sm-8">
            <input
              type="time"
              class="form-control"
              :id="tab.vModel"
              :placeholder="$t(tab.vModel)"
              :value="tab.vData"
              @blur="(event) => changeInput(event, index)"
            />
          </div>
        </div>
        <div v-else-if="tab.vType == 'number'" class="form-group row">
          <label :for="tab.vModel" class="col-sm-4 col-form-label">{{
            $t(tab.vModel)
          }}</label>
          <div class="col-sm-8">
            <input
              type="number"
              class="form-control"
              :id="tab.vModel"
              :placeholder="$t(tab.vModel)"
              :value="tab.vData"
              @blur="(event) => changeInput(event, index)"
            />
          </div>
        </div>
        <div v-else-if="tab.vType == 'image'" class="form-group row">
          <label :for="tab.vModel" class="col-sm-4 col-form-label">{{
            $t(tab.vModel)
          }}</label>
          <div class="col-sm-12">
            <input
              type="file"
              class="form-control"
              :id="tab.vModel"
              :placeholder="$t(tab.vModel)"
              @blur="(event) => changeInput(event, index)"
            />
          </div>
        </div>
        <div v-else-if="tab.vType == 'accord'" class="form-group row">
          <!--label :for="tab.vModel" class="col-sm-4 col-form-label">{{
            $t(tab.vModel)
          }}</label-->
          <div class="col-6">
            <h3 class="text-muted">{{ $t(tab.vModel) }}</h3>
            <div class="overflow-scroll p-3 mb-" style="height: 250px">
              <draggable
                class="list-group"
                :list="listMenus"
                group="people"
                itemKey="id"
              >
                <template #item="{ element, index }">
                  <div class="list-group">
                    <!-- Overflow -->

                    <label class="list-group-item" style="cursor: pointer">
                      #{{ index }} - {{ element.name }}
                    </label>
                  </div>
                </template>
              </draggable>
            </div>
          </div>

          <div class="col-6">
            <h3 class="text-muted">Choix Menus</h3>
            <div class="overflow-scroll p-3 mb-" style="height: 250px">
              <draggable
                class="list-group"
                :list="choixMenus"
                group="people"
                itemKey="id"
              >
                <template #item="{ element, index }">
                  <div class="list-group">
                    <label class="list-group-item" style="cursor: pointer">
                      #{{ index }} - {{ element.name }}
                    </label>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
        <div v-else-if="tab.vType == 'object'" class="form-group row">
          <label :for="tab.vModel" class="col-sm-4 col-form-label">{{
            $t(tab.vModel)
          }}</label>
          <div class="col-sm-8">
            <select
              v-if="tab.vModel === 'Site'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataSite"
                :key="index"
                :value="ite.id"
              >
                {{ ite.libelle }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'activiteVeh'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataActivity"
                :key="index"
                :value="ite.id"
              >
                {{ ite.activite_name }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'EtahVeh'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataState"
                :key="index"
                :value="ite"
              >
                {{ ite }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'type_veh'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataTypes"
                :key="index"
                :value="ite.id"
              >
                {{ ite.lib_type }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'AffectationVeh'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataGroup"
                :key="index"
                :value="ite.id"
              >
                {{ ite.name }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'carburant'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataCarburant"
                :key="index"
                :value="ite.id"
              >
                {{ ite.libelle }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'Marque'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataMarque"
                :key="index"
                :value="ite.id"
              >
                {{ ite.libelle }}
              </option>
            </select>
            <select
              v-else-if="
                tab.vModel === 'fournisseur' || tab.vModel === 'Fournisseur'
              "
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataFournisseur"
                :key="index"
                :value="ite.id"
              >
                {{ ite.libelle }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'fonction' || tab.vModel === 'Fonction'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataFonction"
                :key="index"
                :value="ite.id"
              >
                {{ ite.libelle }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'vehicule' || tab.vModel === 'Vehicule'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataVehicules"
                :key="index"
                :value="ite.id"
              >
                {{ ite.code }}
              </option>
            </select>
            <select
              v-else-if="
                tab.vModel === 'autorisation' || tab.vModel === 'Autorisation'
              "
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataAutorisation"
                :key="index"
                :value="ite.id"
              >
                {{ ite.name }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'profil' || tab.vModel === 'Profil'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataProfil"
                :key="index"
                :value="ite.id"
              >
                {{ ite.name }}
              </option>
            </select>
            <select
              v-else-if="tab.vModel === 'langue' || tab.vModel === 'Langue'"
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataLangue"
                :key="index"
                :value="ite"
              >
                {{ ite }}
              </option>
            </select>
            <select
              v-else-if="
                tab.vModel === 'personnel' || tab.vModel === 'Personnel'
              "
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataConducteur"
                :key="index"
                :value="ite.id"
              >
                {{ ite.nom }} * {{ ite.matricule }}
              </option>
            </select>
            <select
              v-else
              v-model="tab.vData"
              :id="tab.vModel"
              class="form-select mb-3"
              @change="selectInfo(this.value)"
              @click="openSel(tab.vModel)"
            >
              <option value="0" selected>{{ $t(tab.vModel) }}</option>
              <option
                v-for="(ite, index) in dataSelects"
                :key="index"
                :value="ite.id"
              >
                {{ ite.lib_fam }}
              </option>
            </select>
          </div>
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
      <!--end col-->
    </div>
    <!--end row-->
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, computed, onBeforeMount } from 'vue';
import { useSettingStore } from 'src/stores/settings-store';
import { useMaintenanceStore } from 'src/stores/maintenance-store';
import { useRepportStore } from 'src/stores/repport-store';
import { date } from 'quasar';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import draggable from 'vuedraggable';
export default defineComponent({
  name: 'ManageData',
  props: ['head', 'data', 'operation', 'title', 'tbname'],
  emits: ['closeModal'],
  components: { draggable },
  setup(props, context) {
    const { locale, t } = useI18n({ useScope: 'global' });
    let tabInfo = ref([]);
    let dataModel = ref({});
    const store = useSettingStore();
    const store2 = useMaintenanceStore();
    const store3 = useRepportStore();
    let dataSelects = computed(() => store.famVeh);
    let dataSite = computed(() => store.site);
    let dataActivity = computed(() => store.activite);
    let dataTypes = computed(() => store.typeVeh);
    let dataState = ref(['panne', 'En utilisation', 'Immobilisé', 'Reformé']);
    let dataGroup = computed(() => store.groupVeh);
    let dataCarburant = computed(() => store.carburant);
    let dataMarque = computed(() => store.marque);
    let dataFournisseur = computed(() => store.fournisseur);
    let dataFonction = computed(() => store.fonction);
    let dataVehicules = computed(() => store.parc);
    let dataAutorisation = computed(() => store.autorisation);
    let dataConducteur = computed(() => store.chauffeur);
    let conducteur = ref('');
    let dataProfil = computed(() => store.profil);
    let dataLangue = ref(['en-US', 'fr']);
    let dataSelect = ref();
    let optionLabel = ref('lib_fam');
    let isFile = ref(false);
    let dFile = ref(null);
    let choixMenus = ref([]);
    let listMenus = ref([]);
    const formData = new FormData();
    const dataConstruct = async (dataTable) => {
      console.log(dataTable);
      tabInfo.value = [];
      if (props.operation === 'add') {
        for (let dt of dataTable) {
          if (dt.type === 'boolean') {
            tabInfo.value.push({
              vModel: dt.value,
              vData: true,
              vType: dt.type,
            });
          } else if (dt.type === 'date' && dt.value != 'DateSortie') {
            tabInfo.value.push({
              vModel: dt.value,
              vData: moment(new Date()).format('YYYY-MM-DD'),
              vType: dt.type,
            });
          } else if (dt.type === 'time') {
            tabInfo.value.push({
              vModel: dt.value,
              vData: moment(new Date()).format('HH:mm'),
              vType: dt.type,
            });
          } else {
            tabInfo.value.push({
              vModel: dt.value,
              vData: '',
              vType: dt.type,
            });
          }
          //console.log(tabInfo.value);
        }
      } else {
        for (let key of Object.keys(dataTable)) {
          //console.log(typeof dataTable[key]);
          if (
            key === 'key' ||
            key === 'checkbox' ||
            key === 'createdAt' ||
            key === 'updatedAt' ||
            key.endsWith('Id') ||
            key === 'code' ||
            key === 'tpanne' ||
            key === 'carburt'
          ) {
            console.log();
          } else if (
            key === 'datej' ||
            key === 'MiseService' ||
            key === 'DateTracking' ||
            key === 'DateService' ||
            key === 'DateSortie' ||
            key === 'DateImmo' ||
            key === 'DateConso'
          ) {
            tabInfo.value.push({
              vModel: key,
              vData: changeDate(dataTable[key]),
              vType: 'date',
            });
          } else if (key === 'image' || key === 'url_photo') {
            tabInfo.value.push({
              vModel: key,
              vData: '',
              vType: 'image',
            });
          } else if (key === 'passwd') {
            tabInfo.value.push({
              vModel: key,
              vData: '',
              vType: 'string',
            });
          } else if (key === 'menus') {
            await store.allMenu();
            if (dataTable[key].length === 0) {
              choixMenus.value = [];

              listMenus.value = store.menus;
            } else {
              choixMenus.value = dataTable[key];
              listMenus.value = store.menus;
            }
            tabInfo.value.push({
              vModel: key,
              vData: choixMenus.value,
              vType: 'accord',
            });
          } else if (
            key === 'HeureImmo' ||
            key === 'HeureMiseDisposition' ||
            key === 'HeureConso'
          ) {
            tabInfo.value.push({
              vModel: key,
              vData: dataTable[key],
              vType: 'time',
            });
          } else if (typeof dataTable[key] === 'object') {
            //console.log(dataTable[key]);
            if (dataTable[key] !== null) {
              //console.log(key);
              await openSel(key);
              tabInfo.value.push({
                vModel: key,
                vData: dataTable[key].id,
                vType: typeof dataTable[key],
              });
            } else {
              tabInfo.value.push({
                vModel: key,
                vData: '',
                vType: 'object',
              });
            }
          } else {
            tabInfo.value.push({
              vModel: key,
              vData: dataTable[key],
              vType: typeof dataTable[key],
            });
          }
        }
      }
      console.log(tabInfo.value);
    };
    const changeDate = (dbs) => {
      return date.formatDate(dbs, 'YYYY-MM-DD');
    };
    const changeInput = (ev, index) => {
      if (tabInfo.value[index].vType === 'boolean') {
        tabInfo.value[index].vData = ev.target.checked;
      } else if (
        tabInfo.value[index].vType === 'image' ||
        tabInfo.value[index].vType === 'url_photo'
      ) {
        //console.log(ev.target.files);
        if (tabInfo.value[index].vFile) {
          if (ev.target.files.length !== 0) {
            tabInfo.value[index].vFile = ev.target.files;
          }
        } else {
          tabInfo.value[index].vFile = ev.target.files;
        }
      } else {
        tabInfo.value[index].vData = ev.target.value;
      }
      //console.log(tabInfo.value);
    };
    const appFile = (tab, file) => {
      formData.append('file', file[0]);
      for (let key of Object.keys(tab)) {
        formData.append(key, tab[key]);
      }
    };
    const dataFinal = () => {
      isFile.value = false;
      dataModel.value = {};
      for (let d of tabInfo.value) {
        if (d.vFile) {
          console.log(d);
          if (d.vFile.length === 1) {
            isFile.value = true;
            dFile.value = d.vFile;
          }
        }
        dataModel.value[[d.vModel]] = d.vData;
      }
      if (isFile.value) {
        appFile(dataModel.value, dFile.value);
      }
    };
    let filterFn = (val, update) => {
      if (dataSelects.value != null) {
        update();
        return;
      }
      setTimeout(() => {
        update(() => {
          if (props.tbname === 'type_veh') {
            store.allFamVeh();
          }
        });
      }, 2000);
    };
    let abortFilterFn = () => {
      console.log('Type véhicules not found');
    };
    const selectInfo = (ev) => {
      console.log(ev);
    };
    const openSel = async (dc) => {
      //console.log(dc)
      if (dc === 'activiteVeh') {
        if (dataActivity.value.length === 0) {
          await store.allActivites();
        }
      } else if (dc === 'Site') {
        if (dataSite.value.length === 0) {
          await store.allSite();
        }
      } else if (dc === 'type_veh') {
        if (dataTypes.value.length === 0) {
          await store.allTypeVeh();
        }
      } else if (dc === 'AffectationVeh') {
        if (dataGroup.value.length === 0) {
          await store.allGroupVeh();
        }
      } else if (dc === 'carburant') {
        if (dataCarburant.value.length === 0) {
          await store.allCarburant();
        }
      } else if (dc === 'Marque') {
        if (dataMarque.value.length === 0) {
          await store.allMarque();
        }
      } else if (dc === 'fournisseur' || dc === 'Fournisseur') {
        if (dataFournisseur.value.length === 0) {
          await store.allFournisseur();
        }
      } else if (dc === 'Fonction' || dc === 'fonction') {
        if (dataFonction.value.length === 0) {
          await store.allFonction();
        }
      } else if (dc === 'vehicule' || dc === 'Vehicule') {
        if (dataVehicules.value.length === 0) {
          await store.allParc();
        }
      } else if (dc === 'autorisation' || dc === 'Autorisation') {
        if (dataAutorisation.value.length === 0) {
          await store.allAutorisation();
        }
      } else if (dc === 'profil' || dc === 'Profil') {
        if (dataProfil.value.length === 0) {
          await store.allProfil();
        }
      } else if (dc === 'personnel') {
        if (dataConducteur.value.length === 0) {
          await store.allChauffeur();
        }
      }
    };
    const submitInfo = async () => {
      dataFinal();
      if (props.tbname === 'fam_veh') {
        await store.manageFamVeh(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'type_veh') {
        await store.manageTypeVeh(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'vehicule') {
        if (isFile.value) {
          await store.manageParcImg(
            formData,
            props.operation,
            dataModel.value.id
          );
        } else {
          store.manageParc(
            dataModel.value,
            props.operation,
            dataModel.value.id
          );
        }
      } else if (props.tbname === 'Site') {
        await store.manageSite(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'affectation') {
        await store.manageAffectation(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'activiteVeh') {
        await store.manageActivite(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'groupVeh') {
        await store.manageGroupVeh(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'carburant') {
        await store.manageCarburant(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'typePanne') {
        await store.manageTypeInt(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'marque') {
        if (isFile.value) {
          await store.manageMarqueImg(
            formData,
            props.operation,
            dataModel.value.id
          );
        } else {
          await store.manageMarque(
            dataModel.value,
            props.operation,
            dataModel.value.id
          );
        }
      } else if (props.tbname === 'fournisseur') {
        await store.manageFournisseur(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'personnel') {
        await store.managePersonnel(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'fonction') {
        await store.manageFonction(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'departement') {
        await store.manageDepartement(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'atelier') {
        await store.manageAtelier(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'pannes') {
        await store2.managePannes(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'utilisateur') {
        if (isFile.value) {
          await store.manageUtilisateurImg(
            formData,
            props.operation,
            dataModel.value.id
          );
        } else {
          store.manageUtilisateur(
            dataModel.value,
            props.operation,
            dataModel.value.id
          );
        }
      } else if (props.tbname === 'menu') {
        await store.manageMenu(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'profil') {
        dataModel.value.menus = choixMenus.value;
        await store.manageProfil(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'autorisation') {
        await store.manageAutorisation(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'type_doc') {
        await store.manageTypeDocument(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      } else if (props.tbname === 'conso') {
        await store3.manageConso(
          dataModel.value,
          props.operation,
          dataModel.value.id
        );
      }
      context.emit('closeModal');
    };
    onBeforeMount(async () => {
      //await store.allMenu();
      if (props.tbname === 'type_veh') {
        if (dataSelects.value.length === 0) await store.allFamVeh();
      }
    });
    onMounted(async () => {
      await store.allMenu();
      choixMenus.value = store.menus;
      if (props.operation === 'add') {
        dataConstruct(props.head);
      } else {
        dataConstruct(props.data);
        console.log(props.data);
      }
      // console.log(props.head)
    });
    return {
      tabInfo,
      changeDate,
      changeInput,
      submitInfo,
      filterFn,
      abortFilterFn,
      dataSelects,
      dataSelect,
      optionLabel,
      selectInfo,
      dataSite,
      dataActivity,
      openSel,
      dataState,
      dataTypes,
      dataGroup,
      dataCarburant,
      dataMarque,
      dataFournisseur,
      dataFonction,
      dataVehicules,
      dataAutorisation,
      dataProfil,
      dataLangue,
      t,
      locale,
      conducteur,
      dataConducteur,
      choixMenus,
      listMenus,
    };
  },
});
</script>
<style>
.form-floating > .form-select {
  height: 100px;
  line-height: 1.25;
}
.form-floating > .form-control-plaintext {
  padding: 30px 30px;
}
.form-floating > .form-select ~ label {
  opacity: 0.9;
}
</style>

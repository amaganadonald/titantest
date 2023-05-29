<template>
  <div style="overflow: hidden">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalgridLabel">Fiche panne</h5>
      <q-btn icon="close" flat round dense v-close-popup />
    </div>

    <q-separator color="teal-10" inset /><br />
    <div class="row">
      <div class="card">
        <!--debut card-->
        <div class="card-header align-items-center d-flex">
          <h4 class="card-title mb-0 flex-grow-1">Information sur la panne</h4>
        </div>
        <div class="card-body">
          <!--debut card body-->
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="idpanne" class="col-sm-4 col-form-label"
                  >Numero bon</label
                >
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="idpanne"
                    placeholder="Numéro du bon de panne"
                    v-model="idpanne"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="vehicule" class="col-sm-2 col-form-label">{{
                  $t('code')
                }}</label>
                <div class="col-sm-10">
                  <select
                    v-model="vehicule"
                    id="code"
                    class="form-select mb-3"
                    @click="openSel('vehicule')"
                  >
                    <option value="0" selected>{{ $t('code') }}</option>
                    <option
                      v-for="(ite, index) in dataVehicules"
                      :key="index"
                      :value="ite.id"
                    >
                      {{ ite.code }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!--fin row-->
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="DateImmo" class="col-sm-4 col-form-label"
                  >Date</label
                >
                <div class="col-sm-8">
                  <input
                    type="date"
                    class="form-control"
                    id="DateImmo"
                    placeholder="Date de l\'immobilisation"
                    v-model="DateImmo"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="HeureImmo" class="col-sm-2 col-form-label"
                  >Heure</label
                >
                <div class="col-sm-10">
                  <input
                    type="time"
                    class="form-control"
                    id="HeureImmo"
                    placeholder="Heure de l\'immobilisation"
                    v-model="HeureImmo"
                  />
                </div>
              </div>
            </div>
          </div>
          <!--fin row--><br />
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="CausePanne" class="col-sm-4 col-form-label"
                  >Cause</label
                >
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="CausePanne"
                    placeholder="Cause de la panne"
                    v-model="CausePanne"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="lieu_panne" class="col-sm-2 col-form-label"
                  >Lieu</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="lieu_panne"
                    placeholder="Lieu de la panne"
                    v-model="lieu_panne"
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <!--fin row-->
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="vehicule" class="col-sm-4 col-form-label"
                  >Conducteur</label
                >
                <div class="col-sm-8">
                  <select
                    v-model="conducteur"
                    id="code"
                    class="form-select mb-3"
                    @click="openSel('conducteur')"
                  >
                    <option value="0" selected>conducteur</option>
                    <option
                      v-for="(ite, index) in dataConducteur"
                      :key="index"
                      :value="ite.id"
                    >
                      {{ ite.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="Status" class="col-sm-4 col-form-label"
                  >Status</label
                >
                <div
                  class="col-sm-6 form-check form-switch form-switch-md"
                  dir="ltr"
                >
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Status"
                    placeholder="Status"
                    v-model="Status"
                    :checked="Status"
                    role="switch"
                  />
                </div>
              </div>
            </div>
          </div>
          <!--fin row-->
        </div>
        <!--fin card body-->
      </div>
      <!--fin card-->
    </div>
    <div class="row">
      <div class="card">
        <!--debut card-->
        <div class="card-header align-items-center d-flex">
          <h4 class="card-title mb-0 flex-grow-1">
            Information sur l'intervention
          </h4>
        </div>
        <div class="card-body">
          <!--debut card body-->
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="ap5" class="col-sm-4 col-form-label"
                  >Numero AP5</label
                >
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="ap5"
                    placeholder="Numéro ap5"
                    v-model="ap5"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="idIntervention" class="col-sm-4 col-form-label"
                  >Code Intervention</label
                >
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="idIntervention"
                    placeholder="Code intervention"
                    v-model="idIntervention"
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <!--fin row-->
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="vehicule" class="col-sm-4 col-form-label"
                  >Type panne</label
                >
                <div class="col-sm-8">
                  <select
                    v-model="TypeInt"
                    id="TypeInt"
                    class="form-select mb-3"
                    @click="openSel('TypeInt')"
                  >
                    <option value="0" selected>Type panne</option>
                    <option
                      v-for="(ite, index) in dataTypeInt"
                      :key="index"
                      :value="ite.id"
                    >
                      {{ ite.libelle }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="DetailInt" class="col-sm-4 col-form-label"
                  >Details</label
                >
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="DetailInt"
                    placeholder="Detail de l'intervention"
                    v-model="DetailInt"
                  />
                </div>
              </div>
            </div>
          </div>
          <!--fin row--><br />
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="DateDebInt" class="col-sm-4 col-form-label"
                  >Debut</label
                >
                <div class="col-sm-8">
                  <input
                    type="date"
                    class="form-control"
                    id="DateDebInt"
                    placeholder="Date debut intervention"
                    v-model="DateDebInt"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="HeureDebInt" class="col-sm-4 col-form-label"
                  >Heure debut</label
                >
                <div class="col-sm-8">
                  <input
                    type="time"
                    class="form-control"
                    id="HeureDebInt"
                    placeholder="Heure debut intervention"
                    v-model="HeureDebInt"
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <!--fin row-->
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="DateFinInt" class="col-sm-4 col-form-label"
                  >Date fin</label
                >
                <div class="col-sm-8">
                  <input
                    type="date"
                    class="form-control"
                    id="DateFinInt"
                    placeholder="Date fin intervention"
                    v-model="DateFinInt"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="HeureFinInt" class="col-sm-4 col-form-label"
                  >Heure fin</label
                >
                <div class="col-sm-8">
                  <input
                    type="time"
                    class="form-control"
                    id="HeureFinInt"
                    placeholder="Heure fin intervention"
                    v-model="HeureFinInt"
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <!--fin row-->
          <div class="row g-3">
            <!--debut row-->
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="observation" class="col-sm-4 col-form-label"
                  >Observation</label
                >
                <div class="col-sm-8">
                  <q-input
                    type="textarea"
                    class="form-control"
                    rows="4"
                    id="observation"
                    placeholder="Obervation sur l'intervention"
                    v-model="observation"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group row">
                <label for="HeureFinInt" class="col-sm-4 col-form-label"
                  >Heure fin</label
                >
                <div class="col-sm-8">
                  <input
                    type="time"
                    class="form-control"
                    id="HeureFinInt"
                    placeholder="Heure fin intervention"
                    v-model="HeureFinInt"
                  />
                </div>
              </div>
            </div>
          </div>
          <!--fin row-->
        </div>
        <!--fin card body-->
      </div>
      <!--fin card-->
    </div>
    <div class="col-lg-12">
      <div class="hstack gap-2 justify-content-end">
        <button type="button" class="btn btn-light" v-close-popup>Close</button>
        <button type="submit" class="btn btn-secondary" @click="submitInfo()">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useSettingStore } from 'src/stores/settings-store';
import { useMaintenanceStore } from 'src/stores/maintenance-store';
export default defineComponent({
  name: 'panneComponent',
  props: ['operation'],
  setup(props) {
    const store = useSettingStore();
    const storeMaintenance = useMaintenanceStore();
    let idpanne = ref();
    let vehicule = ref();
    let DateImmo = ref(null);
    let HeureImmo = ref('');
    let CausePanne = ref('');
    let lieu_panne = ref('');
    let conducteur = ref('');
    let Status = ref(true);
    let ap5 = ref('');
    let idIntervention = ref('');
    let TypeInt = ref('');
    let DetailInt = ref('');
    let DateDebInt = ref(null);
    let HeureDebInt = ref(null);
    let DateFinInt = ref(null);
    let HeureFinInt = ref(null);
    let observation = ref('');
    let dataConducteur = computed(() => store.personne);
    let dataVehicules = computed(() => store.parc);
    let dataTypeInt = computed(() => store.typeInt);
    const openSel = (dc) => {
      if (dc === 'vehicule') {
        if (dataVehicules.value.length === 0) {
          store.allParc();
        }
      } else if (dc === 'conducteur') {
        if (dataConducteur.value.length === 0) {
          store.allPersonnel();
        }
      } else if (dc === 'TypeInt') {
        if (dataTypeInt.value.length === 0) {
          store.allTypeInt();
        }
      }
    };
    const submitInfo = async () => {
      const data = {
        idpanne: idpanne.value,
        vehicule: vehicule.value,
        DateImmo: DateImmo.value,
        HeureImmo: HeureImmo.value,
        CausePanne: CausePanne.value,
        lieu_panne: lieu_panne.value,
        conducteur: conducteur.value,
        Status: Status.value,
        ap5: ap5.value,
        idIntervention: idIntervention.value,
        TypeInt: TypeInt.value,
        DetailInt: DetailInt.value,
        DateDebInt: DateDebInt.value,
        HeureDebInt: HeureDebInt.value,
        DateFinInt: DateFinInt.value,
        HeureFinInt: HeureFinInt.value,
        observation: observation.value,
      };
      await storeMaintenance.manageDataPanne(data, props.operation, '2');
      reset();
    };
    const reset = () => {
      idpanne.value = '';
      vehicule.value = '';
      DateImmo.value = null;
      HeureImmo.value = '';
      CausePanne.value = '';
      lieu_panne.value = '';
      conducteur.value = '';
      Status.value = true;
      ap5.value = '';
      idIntervention.value = '';
      TypeInt.value = '';
      DetailInt.value = '';
      DateDebInt.value = null;
      HeureDebInt.value = null;
      DateFinInt.value = null;
      HeureFinInt.value = null;
      observation.value = '';
    };
    onMounted(() => {
      //console.log(props.src);
    });
    return {
      idpanne,
      vehicule,
      dataVehicules,
      openSel,
      submitInfo,
      DateImmo,
      HeureImmo,
      CausePanne,
      lieu_panne,
      conducteur,
      dataConducteur,
      Status,
      ap5,
      idIntervention,
      TypeInt,
      dataTypeInt,
      DetailInt,
      DateDebInt,
      HeureDebInt,
      DateFinInt,
      HeureFinInt,
      observation,
    };
  },
});
</script>

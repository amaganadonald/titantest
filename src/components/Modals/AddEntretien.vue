<template>
  <div style="overflow: hidden">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalgridLabel">
        {{ $t($props.operation).toUpperCase() }}
        {{ $t($props.titles).toUpperCase() }}
      </h5>
      <q-btn icon="close" flat round dense v-close-popup />
    </div>

    <q-separator color="orange" inset /><br /><br />
    <div class="row g-3">
      <div class="form-group row">
        <label for="vehicule" class="col-sm-4 col-form-label">Code Ana</label>
        <div class="col-sm-8">
          <select v-model="vehicule" id="vehicule" class="form-select mb-3">
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
      <div class="form-group row">
        <label for="title" class="col-sm-4 col-form-label">Titre</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="title" v-model="title" />
        </div>
      </div>
      <br /><br />
      <div class="form-group row">
        <label for="details" class="col-sm-4 col-form-label">Détails</label>
        <div class="col-sm-8">
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="details"
          />
        </div>
      </div>
      <br /><br />
      <div class="form-group row">
        <label for="deb" class="col-sm-4 col-form-label">Debut Evènement</label>
        <div class="col-sm-8">
          <input
            type="date"
            class="form-control"
            id="deb"
            placeholder="Debut Evènement"
            v-model="deb"
          />
        </div>
      </div>
      <br /><br />
      <div class="form-group row">
        <label for="deb" class="col-sm-4 col-form-label">Fin Evènement</label>
        <div class="col-sm-8">
          <input
            type="date"
            class="form-control"
            id="fin"
            placeholder="Fin Evènement"
            v-model="fin"
          />
        </div>
      </div>
      <br /><br />
      <div class="form-group row">
        <label for="details" class="col-sm-4 col-form-label">Temps</label>
        <div class="col-sm-8">
          <input type="time" class="form-control" id="time" v-model="time" />
        </div>
      </div>
      <br /><br />
      <div class="form-group row">
        <label for="priorite" class="col-sm-4 col-form-label">Priorites</label>
        <div class="col-sm-8">
          <select v-model="priorite" id="priorite" class="form-select mb-3">
            <option v-for="(ite, index) in priorites" :key="index" :value="ite">
              {{ ite }}
            </option>
          </select>
        </div>
      </div>
      <br /><br />
      <div class="form-group row">
        <label for="status" class="col-sm-4 col-form-label">Status</label>
        <div class="col-sm-6">
          <input
            type="checkbox"
            class="form-check-input"
            id="status"
            v-model="status"
            :checked="status"
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
import { useSettingStore } from 'src/stores/settings-store';
import { useMaintenanceStore } from 'src/stores/maintenance-store';
export default defineComponent({
  name: 'AddEntretien',
  props: ['data', 'operation', 'titles', 'initial'],
  emits: ['closeModal'],
  setup(props, context) {
    const store3 = useSettingStore();
    const store = useMaintenanceStore();
    let dataVehicules = computed(() => store3.parc);
    let vehicule = ref('');
    let title = ref('');
    let details = ref('');
    let deb = ref(null);
    let fin = ref(null);
    let time = ref('');
    let duration = ref(0);
    let icon = ref('mdi mdi-book-open-variant');
    let bgcolor = ref('teal');
    let status = ref(true);
    let priorites = ref(['Faible', 'Moyenne', 'Haute']);
    let priorite = ref('');
    let id = ref('');
    const submitInfo = async () => {
      let pc = '';
      let ic = '';
      if (status.value === false) {
        pc = 'purple';
        ic = 'mdi mdi-car-cog';
      } else if (priorite.value === 'Faible') {
        pc = 'teal';
        ic = 'mdi mdi-book-open-variant';
      } else if (priorite.value === 'Moyenne') {
        pc = 'orange';
        ic = 'mdi mdi-calendar-clock';
      } else if (priorite.value === 'Haute') {
        pc = 'red';
        ic = 'mdi mdi-car-clock';
      }
      const data = {
        title: title.value,
        details: details.value,
        deb: deb.value,
        fin: fin.value,
        time: time.value,
        duration: duration.value,
        icon: icon.value,
        bgcolor: bgcolor.value,
        status: status.value,
        vehicule: vehicule.value,
      };
      await store.manageDataEntretien(data, props.operation, id.value);
      context.emit('closeModal');
    };
    onMounted(async () => {
      console.log(props);
      await store3.allParc();
      if (props.operation !== 'add') {
        title.value = props.data.title;
        details.value = props.data.details;
        deb.value = props.data.start;
        fin.value = props.data.end;
        time.value = props.data.time;
        duration.value = props.data.duration;
        icon.value = props.data.icon;
        bgcolor.value = props.data.bgcolor;
        status.value = props.data.status;
        id.value = props.data.id;
        vehicule.value = props.data.vehicule.id;
        if (props.data.bgcolor === 'teal') {
          priorite.value = 'Faible';
        } else if (props.data.bgcolor === 'orange') {
          priorite.value = 'Moyenne';
        } else if (props.data.bgcolor === 'red') {
          priorite.value = 'Haute';
        }
      } else {
        deb.value = props.initial;
      }
    });
    return {
      dataVehicules,
      vehicule,
      title,
      details,
      deb,
      fin,
      time,
      duration,
      icon,
      bgcolor,
      status,
      priorite,
      priorites,
      submitInfo,
    };
  },
});
</script>

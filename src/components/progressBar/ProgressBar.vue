<template>
  <div>
    <p class="mt-3 mb-1">{{title}} <span class="float-end">{{total}}{{unity}}</span></p>
    <div class="progress mt-2" style="height: 6px;">
      <div v-if="total >=85" class="progress-bar progress-bar-striped bg-primary" role="progressbar" :style="{width: total+'%'}" :aria-valuenow="total" aria-valuemin="0" :aria-valuemax="total">
      </div>
      <div v-else-if="total > 50 && total <=85" class="progress-bar progress-bar-striped bg-orange" role="progressbar" :style="{width: total+'%'}" :aria-valuenow="total" aria-valuemin="0" :aria-valuemax="total">
      </div>
      <div v-else-if="total <= 50" class="progress-bar progress-bar-striped bg-red" role="progressbar" :style="{width: total+'%'}" :aria-valuenow="total" aria-valuemin="0" :aria-valuemax="total">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ProgressBar',
  components: {},
  props: {
    title: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    unity: {
      type: String
    }
  },
  setup() {
    return{}
  }
})
</script>

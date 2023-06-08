<template>
  <div
    class="card card-animate card-height-100 bg-soft-info shadow-none bg-opacity-10"
  >
    <div class="card-body">
      <div class="dropdown float-end">
        <a
          class="text-reset dropdown-btn"
          href="#"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="text-muted fs-18"
            ><i class="mdi mdi-dots-vertical"></i
          ></span>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" href="javascript:void(0);">Rapport</a>
          <a class="dropdown-item" href="javascript:void(0);">Graphe</a>
        </div>
      </div>
      <div class="mb-4 pb-2">
        <img
          :src="'src/assets/images/companies/' + img"
          alt=""
          class="avatar-sm"
        />
      </div>
      <div>
        <h6 class="fs-15 fw-semibold">
          {{ title }}
          <span class="text-muted fs-13">{{ year }} {{ month }} </span>
        </h6>
      </div>
      <div class="text-muted mb-0">
        <h4 class="fs-22 fw-semibold ff-secondary mb-0">
          <span class="badge badge-label bg-primary"
            ><i class="mdi mdi-circle-medium"></i> {{ tot }}</span
          >
          <span class="ms-2"
            ><i class="ri-map-pin-2-line align-bottom"></i> {{ unity }}</span
          >
        </h4>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      default: '2023',
    },

    month: {
      type: String,
      default: 'Jan',
    },

    unity: {
      type: String,
    },

    tot: {
      type: String,
    },

    img: {
      type: String,
    },
  },
});
</script>

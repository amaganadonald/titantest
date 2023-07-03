<template>
  <div>
    <v-chart
      class="chart"
      :option="option"
      style="width: 600px; height: 350px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);
export default defineComponent({
  name: 'PieChartData',
  props: ['legend', 'titre', 'dataGraph'],
  components: {
    VChart,
  },
  provide: {
    //[THEME_KEY]: 'light'
  },

  setup(props, context) {
    const option = ref({
      legend: {
        top: 'top',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: props.titre,
          type: 'pie',
          label: {
            color: '#2c343c',
            fontSize: '10',
            fontWeight: 'bold',
            formatter: '{b} : ({d})',
            show: true,
            position: 'bottom',
            textStyle: {
              fontSize: 10,
            },
          },
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: computed(() => props.dataGraph),
        },
      ],
    });
    watch(props, () => {
      console.log(props.dataGraph);
    });

    onMounted(() => {
      console.log(props.dataGraph);
    });
    return {
      option,
    };
  },
});
</script>
<style lang="scss"></style>

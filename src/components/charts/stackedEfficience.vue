<template>
  <div>
    <v-chart
      class="chart"
      :option="barOption"
      style="width: 600px; height: 600px"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);
export default defineComponent({
  name: 'StackedEfficience',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'blue', //dark, light
  },
  props: [
    'legend',
    'codeBar',
    'title',
    'dataConso',
    'legendConsoDatJr',
    'unite',
  ],

  setup() {
    const barOption = ref({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [320, 302, 301, 334, 390, 330, 320],
        },
        {
          name: 'Mail Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Affiliate Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [150, 212, 201, 154, 190, 330, 410],
        },
        {
          name: 'Search Engine',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320],
        },
      ],
    });
    onMounted(() => {
      //store.fetcUsers()
    });
    return {
      barOption,
    };
  },
});
</script>
<style lang="scss"></style>

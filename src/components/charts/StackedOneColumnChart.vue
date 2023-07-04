<template>
  <div>
    <v-chart
      class="chart"
      :option="barOption"
      style="width: 600px; height: 400px"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch, computed } from 'vue';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  LineChart,
]);
export default defineComponent({
  name: 'StackedOneColumnChart',
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

  setup(props) {
    let dataBase = ref([]);
    const titles = computed(() => props.title);
    const barOption = ref({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {
        orient: 'vertical',
        bottom: 'bottom',
      },
      title: {
        text: titles,
        left: 'center',
        top: 3,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [],
    });
    watch(props, (value) => {
      barOption.value.xAxis.data = value.legend;
      dataBase.value = [];
      for (var i = 0; i < value.dataConso.length; i++) {
        dataBase.value.push({
          name: value.dataConso[i].date,
          type: 'bar',
          barWidth: '30%',
          barGap: 0,
          stack: 'total',
          label: {
            show: true,
            formatter: '{c} ' + props.unite,
          },
          emphasis: {
            focus: 'series',
          },
          data: value.dataConso[i].data,
        });
      }
      barOption.value.series = dataBase.value;
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

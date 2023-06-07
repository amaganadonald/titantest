<template>
  <div>
    <v-chart
      class="chart"
      :option="barOption"
      style="width: 800px; height: 400px"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';

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
  name: 'BarChart',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'blue', //dark, light, blue
  },
  props: ['legendConsoTot', 'dataConso', 'title'],

  setup(props) {
    const dataLegend = computed(() => props.legendConsoTot);
    const dataConsos = computed(() => props.dataConso);
    const titles = computed(() => props.title);
    const barOption = ref({
      textStyle: {
        fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
      },
      title: {
        text: titles,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: '{a} <br/>{b} : {c} L',
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
      xAxis: [
        {
          type: 'category',
          data: dataLegend.value,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: true,
          },
          axisLabel: {
            color: '#999',
          },
        },
      ],
      series: [
        {
          name: 'Consommation',
          type: 'bar',
          barWidth: '60%',
          data: dataConsos.value,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.4)',
          },
          label: {
            show: true,
            formatter: '{c} L',
            position: 'top',
            distance: 0,
          },
        },
      ],
    });
    watch(props, (value) => {
      //dataLegend.value = value.legendConsoTot;
      //dataConsos.value = value.dataConso;
      console.log(value);
      barOption.value.xAxis[0].data = dataLegend.value;
      barOption.value.series[0].data = dataConsos.value;
      console.log(dataLegend.value);
      console.log(dataConsos.value);
    });

    return {
      barOption,
      dataLegend,
    };
  },
});
</script>
<style lang="scss"></style>

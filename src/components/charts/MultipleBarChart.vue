<template>
  <div>
    <v-chart
      ondblclick="openSubGraph()"
      class="chart"
      :option="barOption"
      style="width: 900px; height: 400px"
    />
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
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
]);
export default defineComponent({
  name: 'MultipleBarChart',
  props: [
    'legend',
    'codeBar',
    'title',
    'dataConso',
    'legendConsoDatJr',
    'unite',
  ],
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'blue', //dark, light
  },

  setup(props, context) {
    let titres = ref(props.title);
    const barOption = ref({
      textStyle: {
        fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
      },
      title: {
        text: titres.value + '\n' + 'vehicules',
        left: 'center',
        subtext: 'vehicle',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: '{a} <br/>{b} : {c} L',
      },
      legend: {
        data: props.legend,
        orient: 'vertical',
        bottom: 'bottom',
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
          axisTick: { show: false },
          data: props.legendConsoDatJr,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: props.dataConso,
    });

    watch(props, (value) => {
      console.log(value);
      barOption.value.legend.data = value.legendConsoDatJr;
      barOption.value.xAxis[0].data = value.legend;
      barOption.value.title.text = value.title;
      let dataFinal = [];
      value.dataConso.forEach((dtc) => {
        dataFinal.push({
          name: dtc.date,
          type: 'bar',
          barWidth: '30%',
          barGap: 0,
          emphasis: {
            focus: 'series',
          },
          data: dtc.data,
          label: {
            show: true,
            formatter: '{c} ' + props.unite,
            position: 'top',
            distance: 0,
          },
        });
      });
      barOption.value.series = dataFinal;
    });

    const openSubGraph = (event) => {
      console.log(event);
    };

    return {
      barOption,
      titres,
      openSubGraph,
    };
  },
});
</script>
<style lang="scss"></style>

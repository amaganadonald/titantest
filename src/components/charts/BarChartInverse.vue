<template>
  <div>
    <v-chart
      class="chart"
      :option="barOption"
      style="width: 800px; height: 400px"
      ref="chart"
      @click="selectBar"
      @zr:click="outsideBarClick"
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
  name: 'BarChartInverse',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'blue', //dark, light, blue
  },
  props: ['legendConsoTot', 'dataConso', 'title', 'unite'],

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
        formatter: '{a} <br/>{b} : {c} ' + props.unite,
      },
      legend: {
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
      yAxis: [
        {
          type: 'category',
          data: dataLegend.value,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      series: [
        /* {
          name: 'Immo',
          type: 'bar',
          barWidth: '10%',
          data: dataConsos.value,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.4)',
          },
          label: {
            show: true,
            formatter: '{c} ' + props.unite,
            position: 'top',
            distance: 0,
          },
        },*/
      ],
    });
    const outsideBarClick = (event) => {
      console.log(event);
    };
    watch(props, (value) => {
      barOption.value.yAxis[0].data = dataLegend.value;
      barOption.value.series = dataConsos.value;
    });

    return {
      barOption,
      dataLegend,
      outsideBarClick,
    };
  },
});
</script>
<style lang="scss"></style>

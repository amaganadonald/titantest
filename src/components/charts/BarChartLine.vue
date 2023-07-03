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
  name: 'BarChartLine',
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
      //backgroundColor: '#0f375f',
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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#0f375f',
        },
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
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
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
          markLine: {
            symbol: 'diamond',
            data: [
              {
                yAxis: 24,
                label: {
                  normal: {
                    show: false,
                  },
                },
                lineStyle: {
                  normal: {
                    type: 'dashed',
                    color: 'green',
                  },
                },
              },
            ],
          },
        },
      ],
    });
    watch(props, (value) => {
      barOption.value.xAxis[0].data = dataLegend.value;
      barOption.value.series[0].data = dataConsos.value;
    });

    return {
      barOption,
      dataLegend,
    };
  },
});
</script>
<style lang="scss"></style>

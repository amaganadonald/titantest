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
  name: 'PieChart',
  props: ['legend', 'titre', 'dataGraph'],
  components: {
    VChart,
  },
  provide: {
    //[THEME_KEY]: 'light'
  },

  setup(props, context) {
    const option = ref({
      textStyle: {
        fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
      },
      //backgroundColor: '#2c343c',
      title: {
        text: props.titre,
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        //orient: 'vertical',
        //left: 'left',
        top: 'bottom',
        data: computed(() => props.legend),
      },
      series: [
        {
          name: props.titre,
          type: 'pie',
          label: {
            color: '#2c343c',
            fontSize: '10',
            fontWeight: 'bold',
            formatter: '{b} : ({d}%)',
            show: true,
            position: 'outer',
            textStyle: {
              fontSize: 10,
            },
          },
          radius: '55%',
          center: ['50%', '60%'],
          data: computed(() => props.dataGraph),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              borderWidth: '0',
              borderColor: '#444444',
            },
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function () {
            return Math.random() * 200;
          },
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

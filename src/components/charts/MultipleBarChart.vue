<template>
  <div>
    <!--q-btn label="Export" @click="generateReport()" push />
     <vue3-html2pdf
             :show-layout="false"
             :float-layout="true"
             :enable-download="false"
             :preview-modal="true"
             :paginate-elements-by-height="1400"
             filename="Repartition_Temps"
             :pdf-quality="2"
             :manual-pagination="false"
             pdf-format="a4"
             :pdf-margin="10"
             pdf-orientation="portrait"
             pdf-content-width="800px"
             ref="html2Pdf"
         >

         <template  v-slot:pdf-content>
             <br> <br><br><br>
             <q-separator spaced inset/>
             <p> {{titres}} </p>
             <p><v-chart class="chart" :option="barOption" style="width:850px;height:450px"/></p>
         </template>

     </vue3-html2pdf-->
    <v-chart class="chart" :option="barOption" style="width:400px;height:450px"/>

  </div>

</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import Vue3Html2pdf from 'vue3-html2pdf'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';


use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
]);
export default defineComponent({
  name: 'MultiBarChart',
  props: ['legend', 'codeBar', 'titre', 'dataGraph'],
  components: {
    VChart,
    Vue3Html2pdf
  },
  provide: {
    [THEME_KEY]: 'blue' //dark, light
  },

  setup (props, context) {

    let html2Pdf = ref('')
    let titres = ref(props.titre)
    const barOption = ref({

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: props.legend
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
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: props.codeBar
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: props.dataGraph
      }
    )
    /*const generateReport = () =>  {
      html2Pdf.value.generatePdf()
    }*/

    onMounted(() => {
      console.log('data')
    })
    return {

      barOption,
      titres,
      generateReport () {
        this.$refs.html2Pdf.generatePdf()
      }
    }
  }
})
</script>
<style lang="scss">



</style>

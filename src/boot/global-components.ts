import {boot} from 'quasar/wrappers';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css'
export default boot(async ({app }) => {

    app.component('EasyDataTable', Vue3EasyDataTable)
   console.log(app)
})

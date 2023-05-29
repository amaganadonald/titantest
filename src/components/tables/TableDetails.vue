<template>
    <div style="overflow: hidden;">
        <div class="modal-header">
            <div class="search-box">
                                        <input type="text" class="form-control" id="search-opts" placeholder="Search datas..." v-model="searchValue">
                                        <i class="mdi mdi-magnify search-widget-icon search-icon"></i>
                                    </div>
                <h5 class="modal-title" id="exampleModalgridLabel"></h5>
                        <q-btn icon="close" flat round dense v-close-popup />
            </div>
                
                    <q-separator color="orange" inset /><br><br>
                    <div class="row g-3">
                        <div class="live-preview">
                            <div class="table-responsive table-card">
                                <EasyDataTable
                                    :headers="headers"
                                    :items="items"
                                    v-model:items-selected="itemsSelected"
                                    multi-sort
                                    :body-row-class-name="bodyRowClassNameFunction"
                                    table-class-name="customize-table"
                                    header-text-direction="center"
                                    body-text-direction="center"
                                    :rows-per-page="10"
                                    :search-value="searchValue"
                                    buttons-pagination
                                >
                                <template #item-event="{ event,code,date,heure }">
                                    <td v-on:blur="evt => udpateEvent(evt, code, date, heure, event)" contenteditable="true">{{ event }}</td>
                                </template>
                                <template #item-region="{ region,code,date,heure,event }">
                                    <td v-on:blur="evt => udpateRegion(evt, code, date, heure, event)" contenteditable="true">{{ region }}</td>
                                </template>
                                <template #item-fuel_qte="{ fuel_qte,code,date,heure,event }">
                                    <td v-on:blur="evt => udpateConso(evt, code, date, heure, event)" contenteditable="true">{{ fuel_qte }}</td>
                                </template>            
                                <template #item-operation="item">
                                    <div class="operation-wrapper">
                                        <i class="fa-regular fa-pen-to-square operation-icon" @click="updateData(item)">
                                            <q-tooltip>edit</q-tooltip>
                                        </i>
                                        <i class="fa-solid fa-trash-can operation-icon" @click="deleteData(item)">
                                            <q-tooltip>delete</q-tooltip>
                                        </i>
                                    </div>
                                </template>
                                <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
                                    <button :disabled="isFirstPage" @click="prevPage">
                                        <i class="mdi mdi-arrow-collapse-left">
                                        <q-tooltip>Prev</q-tooltip>
                                        </i>
                                    </button>
                                    <button :disabled="isLastPage" @click="nextPage">
                                        <i class="mdi mdi-arrow-collapse-right">
                                        <q-tooltip>Next</q-tooltip>
                                    </i>
                                    </button>
                                </template>
                            </EasyDataTable>
                        </div>
                                        <!-- end table responsive -->
                                        <!-- end table responsive -->
                    </div>
                        <div class="col-lg-12">
                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light" v-close-popup>Close</button>
                            </div>
                        </div><!--end col-->
                    </div><!--end row-->
                </div>         
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import { useRepportStore} from '../../stores/repport-store'
import  { Header, Item, ClickRowArgument, SortType, BodyRowClassNameFunction } from 'vue3-easy-data-table';
export default defineComponent({
    name: 'TableDetails',
    props: ['head','code'],
    emits: ['closeModal'],
    components: {
        EasyDataTable: Vue3EasyDataTable
    },
    setup(props) {
        const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {

        if (itemsSelected.value.filter(ite => ite.id === item.id).length > 0) return 'fail-row';
        };
        const itemsSelected = ref<Item[]>([]);
        const searchValue = ref('');
        const sortBy: string[] = ['number', 'weight'];
        const sortType: SortType[] = ['desc', 'asc'];
        const colorTheme = ref('#f48225')
        const store = useRepportStore()
        let data = computed(()=>store.dataTables)
        const headers = ref<Header[]>([]);
        const items = ref<Item[]>([]);
        const showRow = (item: ClickRowArgument) => {
              if (itemsSelected.value.filter(ite => ite.id === item.id).length > 0) {
                itemsSelected.value.filter(ite => ite.id !== item.id)
              } else {
                itemsSelected.value.push(item)
            }
        }
        const updateData = (ite: any) => {
            console.log(ite)
        }
        const deleteData = (ite: any) => {
            console.log(ite)
        }
        const udpateEvent = (evt: any, code: any, date: any, heure: any, event: any) => {
            let index = items.value.findIndex((item) =>{
                return item.event === event && item.code === code && item.date === date && item.heure === heure
            })
            if (index != -1) items.value[index].event = evt.target.innerText
            store.updateDatab(items.value)
        }
        const udpateRegion = (region: any, code: any, date: any, heure: any, event: any) => {
            let index = items.value.findIndex((item) =>{
                return item.event === event && item.code === code && item.date === date && item.heure === heure
            })
            if (index != -1) items.value[index].region = region.target.innerText
            store.updateDatab(items.value)
        }
        const udpateConso = (conso: any, code: any, date: any, heure: any, event: any) => {
            let index = items.value.findIndex((item) =>{
                return item.event === event && item.code === code && item.date === date && item.heure === heure
            })
            //console.log(conso.target.innerText)
            console.log(index)
            if (index != -1) items.value[index].fuel_qte = Number(conso.target.innerText)
            store.updateDatab(items.value)
            //console.log(items.value[index])
            console.log(store.dataTables)
        }
        watch(items, (currentvalue, oldvalue) => {
           console.log(items.value);
            /*for (var i = 0; i < datatables.value.length; i++) {
                if (datatables.value[i].id === chgData.value[0].data) {
                console.log(datatables.value[i]);
                datatables.value[i].code = chgData.value[1].data;
                datatables.value[i].quart = chgData.value[2].data;
                datatables.value[i].eon = chgData.value[3].data;
                datatables.value[i].eidle = chgData.value[4].data;
                datatables.value[i].eoff = chgData.value[5].data;
                datatables.value[i].km = chgData.value[6].data;
                return 1;
                }
            }*/
        });
        onMounted(()=>{
            searchValue.value = props.code
            items.value = data.value
            headers.value= props.head;
            //console.log(items.value)
            //console.log(headers.value)
        })
        return {
            itemsSelected,
            searchValue,
            sortBy,
            sortType,
            colorTheme,
            showRow,
            items,
            bodyRowClassNameFunction,
            headers,
            updateData,
            deleteData,
            udpateEvent,
            udpateRegion,
            udpateConso
        }
    }
})
</script>
<style>
    .customize-table {
    
      --easy-table-header-font-size: 10px;
      --easy-table-header-height: 10px;
      --easy-table-header-font-color: #c1cad4;
      --easy-table-header-background-color: #2d3a4f;
    
      --easy-table-header-item-padding: 10px 15px;
      --easy-table-loading-mask-background-color: #2d3a4f;
      
    }
    .fail-row  {
        --easy-table-body-row-background-color: #1e5581;
        --easy-table-body-row-font-color: #fff;
    }
.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
.player-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
}
    </style>
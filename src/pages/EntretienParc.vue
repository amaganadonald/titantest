<template>
  <q-page>
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <!-- start page title -->
          <div class="row">
            <div class="col-12">
              <div
                class="page-title-box d-sm-flex align-items-center justify-content-between"
              >
                <h4 class="mb-sm-0">PLANIFICATION ET SUIVI ENTRETIEN</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Historique</a>
                    </li>
                    <li class="breadcrumb-item active">Entretien</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="row g-2">
                <div class="col-sm-4">
                  <div class="search-box">
                    <input
                      type="text"
                      class="form-control"
                      id="search-opts"
                      placeholder="Search datas..."
                    />
                    <i
                      class="mdi mdi-magnify search-widget-icon search-icon"
                    ></i>
                  </div>
                </div>
                <div class="col-sm-auto ms-auto">
                  <div class="list-grid-nav hstack gap-1">
                    <button
                      type="button"
                      @click="onPrev()"
                      class="btn btn-soft-info nav-link btn-icon fs-14"
                    >
                      <i class="mdi mdi-arrow-collapse-left"></i>
                    </button>
                    <button
                      type="button"
                      id="grid-view-button"
                      class="btn btn-soft-info nav-link btn-icon fs-14"
                      @click="onNext()"
                    >
                      <i class="mdi mdi-arrow-collapse-right"></i>
                    </button>
                    <button
                      type="button"
                      id="list-view-button"
                      class="btn btn-soft-info nav-link btn-icon fs-14"
                    >
                      <i class="mdi mdi-file-pdf-box w-sm"></i>
                    </button>
                    <button
                      type="button"
                      id="dropdownMenuLink1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      class="btn btn-soft-info btn-icon fs-14"
                    >
                      <i class="mdi mdi-filter-variant"></i>
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuLink1"
                    >
                      <div class="card">
                        <div class="card-header">
                          <div class="d-flex align-items-center">
                            <div class="flex-grow-1">
                              <h6 class="card-title mb-0"></h6>
                            </div>
                          </div>
                        </div>
                        <div
                          class="card-body collapse show"
                          id="collapseexample1"
                        >
                          <div class="row">
                            <input
                              type="email"
                              class="form-control form-control-sm"
                              id="colFormLabelSm"
                              placeholder="Email"
                            />
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <label for="basiInput" class="form-label"
                                >Basic Input</label
                              >
                              <input
                                type="password"
                                class="form-control"
                                id="basiInput"
                              />
                            </div>
                            <div class="col-12">
                              <label for="labelInput" class="form-label"
                                >Input with Label</label
                              >
                              <input
                                type="password"
                                class="form-control"
                                id="labelInput"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title-->
          <q-dialog
            v-model="seamless"
            position="right"
            seamless
            transition-show="fade"
            transition-hide="slide-down"
          >
            <q-card style="width: 600px; max-width: 90vw">
              <q-card-section>
                <AddEntretien
                  :data="opeData"
                  :operation="operation"
                  :titles="titre"
                  :initial="debut"
                  @closeModal="closeModal"
                />
              </q-card-section>
            </q-card>
          </q-dialog>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: nowrap;
            "
          >
            <div style="font-size: 2em">{{ formattedMonth }}</div>
          </div>
          <div class="row justify-center">
            <q-calendar-month
              ref="calendar"
              v-model="selectedDate"
              :locale="locale"
              animated
              bordered
              focusable
              hoverable
              no-active-date
              :day-min-height="60"
              :day-height="0"
              @change="onChange"
              @moved="onMoved"
              @click-date="onClickDate"
              @click-day="onClickDay"
              @click-workweek="onClickWorkweek"
              @click-head-workweek="onClickHeadWorkweek"
              @click-head-day="onClickHeadDay"
            >
              <template #week="{ scope: { week, weekdays } }">
                <template
                  v-for="(computedEvent, index) in getWeekEvents(
                    week,
                    weekdays
                  )"
                  :key="index"
                >
                  <div
                    :class="badgeClasses(computedEvent)"
                    :style="badgeStyles(computedEvent, week.length)"
                  >
                    <div
                      v-if="computedEvent.event && computedEvent.event.details"
                      class="title q-calendar__ellipsis"
                    >
                      <span @click="onUpdateEntretien(computedEvent)">
                        {{
                          computedEvent.event.vehicule.code +
                          ' ' +
                          computedEvent.event.title +
                          (computedEvent.event.time
                            ? ' - ' + computedEvent.event.time
                            : '')
                        }}
                        <q-tooltip>{{
                          computedEvent.event.details
                        }}</q-tooltip></span
                      >
                    </div>
                  </div>
                </template>
              </template>
            </q-calendar-month>
          </div>
        </div>
        <!-- container-fluid -->
      </div>
      <!-- End Page-content -->
    </div></q-page
  >
</template>
<script>
import {
  QCalendarMonth,
  daysBetween,
  isOverlappingDates,
  parsed,
  parseDate,
  today,
  indexOf,
} from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass';
import { useQuasar } from 'quasar';
import { useMaintenanceStore } from '../stores/maintenance-store';
import AddEntretien from '../components/Modals/AddEntretien.vue';

import { defineComponent } from 'vue';
// The function below is used to set up our demo data
const CURRENT_DAY = new Date();
function getCurrentDay(day) {
  console.log(day);
  const newDay = new Date(CURRENT_DAY);
  newDay.setDate(day);
  const tm = parseDate(newDay);
  console.log(tm);
  return tm.date;
}

export default defineComponent({
  name: 'EntretienParc',
  components: {
    QCalendarMonth,
    AddEntretien,
  },
  data() {
    return {
      store: useMaintenanceStore(),
      $q: useQuasar(),
      selectedDate: today(),
      locale: 'fr',
      opeData: [],
      debut: '',
      operation: '',
      titre: 'Entretien',
      seamless: false,
      events: [],
    };
  },
  computed: {
    // a computed getter
    formattedMonth: function () {
      const date = new Date(this.selectedDate);
      return (
        date.toLocaleString(this.$q.cookies.get('lang'), { month: 'long' }) +
        ' ' +
        date.getFullYear()
      );
    },
  },
  async mounted() {
    await this.store.allEntretien();
    this.events = this.store.dataEntretien;
  },
  methods: {
    closeModal() {
      this.seamless = false;
    },
    getWeekEvents(week, weekdays) {
      const firstDay = parsed(week[0].date + ' 00:00');
      const lastDay = parsed(week[week.length - 1].date + ' 23:59');

      const eventsWeek = [];
      this.events.forEach((event, id) => {
        const startDate = parsed(event.start + ' 00:00');
        const endDate = parsed(event.end + ' 23:59');

        if (isOverlappingDates(startDate, endDate, firstDay, lastDay)) {
          const left = daysBetween(firstDay, startDate, true);
          const right = daysBetween(endDate, lastDay, true);

          eventsWeek.push({
            id, // index event
            left, // Position initial day [0-6]
            right, // Number days available
            size: week.length - (left + right), // Size current event (in days)
            event, // Info
          });
        }
      });

      const events = [];
      if (eventsWeek.length > 0) {
        const infoWeek = eventsWeek.sort((a, b) => a.left - b.left);
        infoWeek.forEach((_, i) => {
          this.insertEvent(events, week.length, infoWeek, i, 0, 0);
        });
      }

      return events;
    },

    insertEvent(events, weekLength, infoWeek, index, availableDays, level) {
      const iEvent = infoWeek[index];
      if (iEvent !== undefined && iEvent.left >= availableDays) {
        // If you have space available, more events are placed
        if (iEvent.left - availableDays) {
          // It is filled with empty events
          events.push({ size: iEvent.left - availableDays });
        }
        // The event is built
        events.push({ size: iEvent.size, event: iEvent.event });

        if (level !== 0) {
          // If it goes into recursion, then the item is deleted
          infoWeek.splice(index, 1);
        }

        const currentAvailableDays = iEvent.left + iEvent.size;

        if (currentAvailableDays < weekLength) {
          const indexNextEvent = indexOf(
            infoWeek,
            (e) => e.id !== iEvent.id && e.left >= currentAvailableDays
          );

          this.insertEvent(
            events,
            weekLength,
            infoWeek,
            indexNextEvent !== -1 ? indexNextEvent : index,
            currentAvailableDays,
            level + 1
          );
        } // else: There are no more days available, end of iteration
      } else {
        events.push({ size: weekLength - availableDays });
        // end of iteration
      }
    },

    badgeClasses(computedEvent) {
      if (computedEvent.event !== undefined) {
        return {
          'my-event': true,
          'text-white': true,
          [`bg-${computedEvent.event.bgcolor}`]: true,
          'rounded-border': true,
          'q-calendar__ellipsis': true,
        };
      }
      return {
        'my-void-event': true,
      };
    },

    badgeStyles(computedEvent, weekLength) {
      const s = {};
      if (computedEvent.size !== undefined) {
        s.width = (100 / weekLength) * computedEvent.size + '%';
      }
      return s;
    },

    isBetweenDatesWeek(dateStart, dateEnd, weekStart, weekEnd) {
      return (
        (dateEnd < weekEnd && dateEnd >= weekStart) ||
        dateEnd === weekEnd ||
        (dateEnd > weekEnd && dateStart <= weekEnd)
      );
    },

    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
    onMoved(data) {
      console.log('onMoved', data);
    },
    onChange(data) {
      console.log('onChange', data);
    },
    onClickDate(data) {
      console.log('onClickDate', data);
      this.opeData = [];
      this.debut = data.scope.timestamp.date;
      this.operation = 'add';
      this.seamless = true;
    },
    onClickDay(data) {
      console.log('onClickDay', data);
    },
    onClickWorkweek(data) {
      console.log('onClickWorkweek', data);
    },
    onClickHeadDay(data) {
      console.log('onClickHeadDay', data);
    },
    onClickHeadWorkweek(data) {
      console.log('onClickHeadWorkweek', data);
    },
    onUpdateEntretien(data) {
      console.log(data.event);
      this.opeData = data.event;
      this.operation = 'update';
      this.seamless = true;
    },
  },
});
</script>

<style lang="sass" scoped>
.my-event
  position: relative
  display: inline-flex
  white-space: wrap
  font-size: 12px
  height: 40px
  max-height: 40px
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.my-void-event
  display: inline-flex
  white-space: nowrap
  height: 1px

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.rounded-border
  border-radius: 2px
</style>

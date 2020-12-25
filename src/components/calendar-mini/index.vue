<template lang="pug">
div.button-group
  button(@click="changeFirstDay") 改变每周第一天
ul
  li(v-for="(event, index) in eventList" :key="index") {{ event.title }}
div.cal-mini
  transition(:name="transitionName")
    div.cal-mini-panel(:key="selectDate.getMonth()")
      div.cal-mini-header
        span {{ displayMonth }}
      div.cal-mini-month.grid
        span.cal-mini-weekday.cell(v-for="day in weekDays" :key="day") {{ day }}
        div.cal-mini-day-cell(
          v-for="day in allDaysOfMonth"
          :key="day.valueOf"
        )
          div.cal-mini-day(
            :class=`{
              'other-month': !isSelectMonth(day) && fillDays,
              'active': isSelectMonth(day) || fillDays,
              'now': isCurrentDay(day),
              'selected': isSelectDay(day) && !isCurrentDay(day)
            }`
            @click="handleClickDay(day)"
          ) {{ !isSelectMonth(day) && !fillDays ? '' : formatDay(day) }}
          div.cal-mini-day-layer
  div.cal-mini-actions
    button.cal-mini-header-btn(@click="addMonth(-1)")
      fa-icon(:className="['fa-chevron-left']")
    button.cal-mini-header-btn(@click="backToNow()")
      div.back-to-now
    button.cal-mini-header-btn(@click="addMonth(1)")
      fa-icon(:className="['fa-chevron-right']")
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import {
  addMonths,
  eachDayOfInterval,
  format,
  lastDayOfMonth,
  setDay,
  getDay,
  subDays,
  addDays,
  isSameMonth
} from 'date-fns';
import noop from 'lodash/noop';
import { zhCN } from 'date-fns/locale';
import { useWeekDays } from '@/utils/date';
import FaIcon from '@/components/fa-icon/fa-icon.vue';
import { CalendarEvent } from '@/types';

export default defineComponent({
  name: 'calendar-mini',
  components: { FaIcon },
  props: {
    fillDays: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const nowDate = ref(new Date());
    const selectDate = ref(new Date());
    const transitionName = ref('left');
    const { weekDays, setFirstDay, firstDay } = useWeekDays();
    const displayMonth = computed(() => format(selectDate.value, 'MMM y', {
      locale: zhCN
    }));
    const eventList = ref<CalendarEvent[]>([]);
    const allDaysOfMonth = computed(() => {
      const start = new Date(selectDate.value).setDate(1);
      const end = lastDayOfMonth(selectDate.value);
      let days = eachDayOfInterval({ start, end });
      if (getDay(start) !== firstDay.value) {
        const prevWeek = eachDayOfInterval({
          start: setDay(start, firstDay.value, {
            weekStartsOn: firstDay.value
          }),
          end: subDays(start, 1)
        });
        days = prevWeek.concat(days);
      }
      if (days.length < 42) {
        const gap = 42 - days.length;
        const restDays = eachDayOfInterval({
          start: addDays(end, 1),
          end: addDays(end, gap)
        });
        days = days.concat(restDays);
      }
      return days;
    });
    const addMonth: (n: number) => void = n => {
      selectDate.value = addMonths(selectDate.value, n);
      transitionName.value = n > 0 ? 'slide-left' : 'slide-right';
    };
    const backToNow = () => {
      selectDate.value = nowDate.value;
    };
    const formatDay: (date?: Date) => string =
      date => date ? format(date, 'd', {
        locale: zhCN
      }) : '';
    const isSameDate: (dateA: Date, dateB: Date) => boolean = (dateA, dateB) =>
      dateA.getDate() === dateB.getDate() && Math.abs(dateA.valueOf() - dateB.valueOf()) < 86400000;
    const isCurrentDay: (date: Date) => boolean = date => isSameDate(date, nowDate.value);
    const isSelectMonth: (date: Date) => boolean = date => isSameMonth(date, selectDate.value);
    const isSelectDay: (date: Date) => boolean = date => isSameDate(date, selectDate.value);
    const changeFirstDay = () => {
      if (firstDay.value === 1) {
        setFirstDay(0);
      } else {
        setFirstDay(1);
      }
    };
    const handleClickDay = (day: Date) => {
      if (!isSelectMonth(day) && !props.fillDays) return;
      selectDate.value = day;
    };
    return {
      nowDate,
      selectDate,
      eventList,
      transitionName,
      weekDays,
      displayMonth,
      allDaysOfMonth,
      noop,
      addMonth,
      backToNow,
      formatDay,
      isCurrentDay,
      isSelectDay,
      isSelectMonth,
      changeFirstDay,
      handleClickDay
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

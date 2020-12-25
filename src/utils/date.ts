import { ref, watch, reactive } from 'vue';

// the same as weekStartsOn of date-fns
export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const useWeekDays = (init: WeekStart = 0) => {
  const firstDay = ref(init);
  const setFirstDay = (n: WeekStart) => {
    firstDay.value = n;
  };
  const weekDays = reactive(['日', '一', '二', '三', '四', '五', '六']);
  watch(firstDay, (curr, prev) => {
    for (
      let i = curr > prev ? curr - prev : 7 - prev + curr;
      i > 0; i--
    ) {
      const t = weekDays.shift();
      weekDays.push(t as string);
    }
  });
  return {
    weekDays, setFirstDay, firstDay
  };
};

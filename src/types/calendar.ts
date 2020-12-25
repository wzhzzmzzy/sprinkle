import { Interval } from 'date-fns';

export interface CalendarEvent {
  date: Date;
  interval: Interval;
  title: string;
  tag: CalendarTag;
}

export interface CalendarTag {
  name: string;
  color: string;
}

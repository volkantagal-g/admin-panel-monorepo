import { Moment } from 'moment';

export interface IDateRangeProps {
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: [Moment | null, Moment | null] | null;
  disabled?: boolean;
  key?: string;
}

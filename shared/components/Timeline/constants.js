import { CheckCircleFilled, ClockCircleFilled } from '@ant-design/icons';

const STATUS = {
  DONE: 'done',
  WAITING: 'waiting',
};

const TYPE = {
  DANGER: 'danger',
  PRIMARY: 'primary',
};

const ICONS = {
  [STATUS.DONE]: <CheckCircleFilled />,
  [STATUS.WAITING]: <ClockCircleFilled />,
};

const TYPE_COLORS = {
  [TYPE.DANGER]: { dot: '#E23737', line: 'rgb(249 215 215)' },
  [TYPE.PRIMARY]: { dot: '#5D3EBC', line: 'rgb(223 216 242)' },
};

const TIMELINE_GAP = '2rem';

export { STATUS, TYPE, ICONS, TYPE_COLORS, TIMELINE_GAP };

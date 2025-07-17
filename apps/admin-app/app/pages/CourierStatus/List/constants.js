export const COURIER_BUSY_AND_STATUS_DASHBOARD = 'name warehouse lastOrderAt domainTypes status lastBusyOption';

export const DEFAULT_ACTIVE_KEY = 1;

export const ALL_BUSY_OPTIONS = t => [
  {
    label: t('courierStatusAndBusy:REASONS.SHIFT_IS_OVER'),
    value: '555a25f9b4ff93f311ffe1fe',
  },
  {
    label: t('courierStatusAndBusy:REASONS.LUNCH_BREAK'),
    value: '61fa5fadfc89d656b0cf6ae6',
  },
  {
    label: t('courierStatusAndBusy:REASONS.LUNCH_BREAK_START'),
    value: '555a25f9b4ff93f311ffe0fb',
  },
  {
    label: t('courierStatusAndBusy:REASONS.REFUELING'),
    value: '555a25f9b4ff93f311ffea02',
  },
  {
    label: t('courierStatusAndBusy:REASONS.MAINTENANCE'),
    value: '555a25f9b4ff93f311ffea04',
  },
  {
    label: t('courierStatusAndBusy:REASONS.VEHICLE_BREAKDOWN'),
    value: '555a25f9b4ff93f311ffea05',
  },
  {
    label: t('courierStatusAndBusy:REASONS.ACCIDENT'),
    value: '555a25f9b4ff93f311ffea06',
  },
  {
    label: t('courierStatusAndBusy:REASONS.MISSING_PRODUCT_OR_RETURN'),
    value: '61b2fd8a56c8047b6609a25d',
  },
  {
    label: t('courierStatusAndBusy:REASONS.FIBABANK_DELIVERY'),
    value: '602bcda87dfe566310dbb5a6',
  },
  {
    label: t('courierStatusAndBusy:REASONS.GETIR_WATER_REFILL'),
    value: '5ece95a7f0cc3239856b2511',
  },
  {
    label: t('courierStatusAndBusy:REASONS.CANCELLED_FOOD_ORDER'),
    value: '5d0b372457c9c82270debc2e',
  },
  {
    label: t('courierStatusAndBusy:REASONS.OTHER'),
    value: '555a25f9b4ff93f311ffe0fd',
  },
  {
    label: t('courierStatusAndBusy:REASONS.WAREHOUSE_SWITCH'),
    value: '637b631628a2482b69a0998e',
  },
  {
    label: t('courierStatusAndBusy:REASONS.TRAINING'),
    value: '63ea46c253cfff3df390a69e',
  },
  {
    label: t('courierStatusAndBusy:REASONS.SHIFT_OVER_IN_WAREHOUSE'),
    value: '641428b2eb07104f026b6eb5',
  },
];

export const ALL_DOMAIN_OPTIONS = t => [
  {
    label: t('courierStatusAndBusy:DOMAINS.GETIR10'),
    value: 1,
  },
  {
    label: t('courierStatusAndBusy:DOMAINS.GetirFood'),
    value: 2,
  },
  {
    label: t('courierStatusAndBusy:DOMAINS.GetirMarket'),
    value: 3,
  },
  {
    label: t('courierStatusAndBusy:DOMAINS.GetirWater'),
    value: 4,
  },
  {
    label: t('courierStatusAndBusy:DOMAINS.AVM'),
    value: 5,
  },
  {
    label: t('courierStatusAndBusy:DOMAINS.ARTISAN'),
    value: 6,
  },
];

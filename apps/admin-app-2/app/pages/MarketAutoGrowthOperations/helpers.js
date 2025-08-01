import { t } from '@shared/i18n';

export const rules = {
  action: [{ type: 'number', min: 0, max: 99 }],
  packet: [{ required: true, message: t('error:REQUIRED') }],
  warehouseType: [{ required: true, message: t('error:REQUIRED') }],
  hourType: [{ required: true, message: t('error:REQUIRED') }],
  dayType: [{ required: true, message: t('error:REQUIRED') }],
  aggressivePacketNumber: [
    {
      message: t('error:REQUIRED'),
      validator: async (_, value) => {
        if (value?.toString() === '0') {
          return Promise.reject(new Error(t('error:REQUIRED')));
        }
        return true;
      },
    }],
  saferPacketNumber: [
    {
      message: t('error:REQUIRED'),
      validator: async (_, value) => {
        if (value?.toString() === '0') {
          return Promise.reject(new Error(t('error:REQUIRED')));
        }
        return true;
      },
    }],
};

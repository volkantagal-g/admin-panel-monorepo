export const DEVICE_OS = {
  IOS: 'IOS',
  ANDROID: 'ANDROID',
};

export const getDeviceOSOptions = t => [
  {
    label: t(`DEVICE_TYPE_${DEVICE_OS.IOS}`),
    value: 'Ios',
  },
  {
    label: t(`DEVICE_TYPE_${DEVICE_OS.ANDROID}`),
    value: 'Android',
  },
];

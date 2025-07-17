const namingConvention = {
  dds_weight: 'ddsWeight',
  dts_weight: 'dtsWeight',
  kds_weight: 'kdsWeight',
  sts_weight: 'stsWeight',
};

const formattedRequestBody = (values, dysConfigs, selectedTab) => {
  let newPayload;

  const selectedTabsValue = Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      return [key, +value.toFixed(2) / 100];
    }),
  );

  newPayload = {
    ...dysConfigs,
    [selectedTab]: selectedTabsValue,
  };

  Object.keys(newPayload).forEach(config => {
    const newConfig = Object.fromEntries(
      Object.entries(newPayload[config]).map(([key, value]) => {
        return [namingConvention[key], value];
      }),
    );
    newPayload = {
      ...newPayload,
      [config]: newConfig,
    };
  });

  return newPayload;
};

export { formattedRequestBody };

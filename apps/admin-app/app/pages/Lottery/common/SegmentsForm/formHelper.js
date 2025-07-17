export const defaultValues = { lotterySegments: [] };

export const manipulateValuesBeforeSubmit = ({ lotterySegments }, lotteryId) => {
  const newValues = lotterySegments.map(val => {
    return {
      ...val,
      title: {
        tr: val.title,
        en: val.title,
      },
    };
  });
  return {
    lotterySegments: newValues,
    lotteryId,
  };
};

export const getModifiedInitialValues = lotterySegments => {
  const newLotterySegments = lotterySegments.map(segment => {
    const { shadowSegment, targetSegment, priority } = segment;
    return {
      shadowSegment,
      targetSegment,
      priority,
      title: segment.title.en,
    };
  });
  return { lotterySegments: newLotterySegments };
};

export const getInitialValues = ({ lotterySegments }) => {
  if (!lotterySegments) return defaultValues;
  return getModifiedInitialValues(lotterySegments);
};

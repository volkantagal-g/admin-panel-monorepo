export const isInRange = (source, value) => {
  return source.some(timeObject => {
    return value > timeObject.startMin && timeObject.endMin >= value;
  });
};

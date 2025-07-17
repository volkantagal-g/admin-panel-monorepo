const disableDateBiggerThanToday = current => {
  return current && current.valueOf() > Date.now();
};

export { disableDateBiggerThanToday };

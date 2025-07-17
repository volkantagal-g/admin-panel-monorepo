export const getHoursAndMinuteFromMinutesOfDay = minute => {
  const hours = (minute / 60);
  const roundedHours = Math.floor(hours);
  const minutes = (hours - roundedHours) * 60;
  const roundedMinutes = Math.round(minutes);

  return {
    hours: roundedHours,
    hoursString: roundedHours >= 10 ? roundedHours : `0${roundedHours}`,
    minutes: roundedMinutes,
    minutesString: roundedMinutes >= 10 ? roundedMinutes : `0${roundedMinutes}`,
  };
};

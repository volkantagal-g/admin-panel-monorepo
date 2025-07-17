function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

const availableTimesHours = range(24, 0);
const availableTimesMinutes = ['00', '30'];

const availableTimes = [];
availableTimesHours.forEach(hour => {
  availableTimesMinutes.forEach(minute => {
    if (Number(minute) + 30 < 60) {
      availableTimes.push({
        startDate: `${hour.toString().padStart(2, '0')}:${minute}`,
        endDate: `${hour.toString().padStart(2, '0')}:${Number(minute) + 30}`,
      });
      return;
    }
    if (hour + 1 === 24) {
      availableTimes.push({
        startDate: `${hour.toString().padStart(2, '0')}:${minute}`,
        endDate: `${'00'.padStart(2, '0')}:${(Number(minute) - 30).toString().padStart(2, '0')}`,
      });
      return;
    }
    availableTimes.push({
      startDate: `${hour.toString().padStart(2, '0')}:${minute}`,
      endDate: `${(hour + 1).toString().padStart(2, '0')}:${(Number(minute) - 30).toString().padStart(2, '0')}`,
    });
  });
});

export { availableTimes };

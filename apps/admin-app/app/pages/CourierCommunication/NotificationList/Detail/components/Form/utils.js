export const convertChannelOptions = notification => {
  const options = [];
  if (notification && notification.channel) {
    Object.keys(notification?.channel).forEach(option => {
      if (notification?.channel[`${option}`]) {
        if (option === 'application') {
          options.push(option.slice(0, 3));
        }
        else {
          options.push(option);
        }
      }
    });
  }
  return options;
};

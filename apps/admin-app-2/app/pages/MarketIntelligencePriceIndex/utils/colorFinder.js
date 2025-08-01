export const backgroundColorFinder = text => {
  if (parseFloat(text) > 100) return 'rgb(228, 248, 228)';
  if (parseFloat(text) < 100) return 'rgb(255, 229, 229)';
  return '#fff6db';
};

export const colorFinder = text => {
  if (parseFloat(text) > 100) return 'rgb(0, 176, 80)';
  if (parseFloat(text) < 100) return 'rgb(192, 0, 0)';
  return '#ffc107';
};

export const backgroundColorCategoryFinder = text => {
  if (parseFloat(text) < 100) return '#ffecb3';
  if (parseFloat(text) > 100) return '#e3f2fd';
  return '#bdbdbd';
};

export const colorCategoryFinder = text => {
  if (parseFloat(text) < 100) return '#f9a825';
  if (parseFloat(text) > 100) return '#1e88e5';
  return '#424242';
};

export const backgroundColorProductFinder = text => {
  if (parseFloat(text) > 100) return '#e3f2fd';
  if (parseFloat(text) < 100) return '#ffecb3';
  if (parseFloat(text) === 100) return '#bdbdbd';
  return 'rgb(215, 204, 200)';
};

export const colorProductFinder = text => {
  if (parseFloat(text) > 100) return '#1e88e5';
  if (parseFloat(text) < 100) return '#f9a825';
  if (parseFloat(text) === 100) return '#424242';
  return 'eeeeee';
};

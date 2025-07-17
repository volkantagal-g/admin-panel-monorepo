export const getInitialValues = generatedContent => {
  const initialValues = { notifications: generatedContent?.notifications };
  return initialValues;
};

export const validate = values => {
  const notifications = values?.notifications;
  let isValid = true;
  Object.keys(notifications).forEach(id => {
    const { contents } = notifications[id];

    Object.keys(contents).forEach(lang => {
      const hasSelected = contents[lang].some(content => content.isSelected === true);

      if (!hasSelected) {
        isValid = false;
      }
    });
  });
  return isValid;
};

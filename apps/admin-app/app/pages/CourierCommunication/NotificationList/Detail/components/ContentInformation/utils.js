export const getInitialLanguageValues = notificationLanguages => {
  const selectedLanguages = [];
  Object.keys(notificationLanguages.title).forEach(lang => {
    if (notificationLanguages.title[lang] !== 'N/A') selectedLanguages.push(lang);
  });
  return selectedLanguages;
};

export const getTemplateSearchOptions = templates => {
  return templates.map(template => {
    return {
      value: template._id,
      label: template.name,
    };
  });
};

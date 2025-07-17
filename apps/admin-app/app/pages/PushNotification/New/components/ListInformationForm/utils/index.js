export const handleSelectedClientListTemplate = (clientListTemplateData, includedClientListTemplateId) => {
  const clientLists = clientListTemplateData ?? [];
  const filterClientListTemplateData = clientLists.filter(item => {
    return item._id === includedClientListTemplateId;
  });
  return filterClientListTemplateData;
};

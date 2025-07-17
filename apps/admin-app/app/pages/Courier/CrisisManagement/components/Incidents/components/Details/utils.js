import * as Yup from 'yup';
import moment from 'moment';

export const getValidationSchema = () => Yup.object().shape({
  topic: Yup.number().required(),
  incidentDate: Yup.date().required(),
  note: Yup.string().required(),
  // files: Yup.array(Yup.object()).optional()
});

export const formatCrisisPayload = (data, updatedValues, user) => {
  const toSave = {
    ...data,
    ...updatedValues,
    createdBy: data.createdBy ? data.createdBy : user,
    updatedBy: data.updatedBy ? data.updatedBy : user,
  };
  toSave.topic = +toSave.topic;
  toSave.incidentDate = toSave.incidentDate
    ? moment(toSave.incidentDate).toISOString()
    : undefined;

  toSave.files = toSave.files.map(({ fileName, fileType, uploadedFileName }) => ({ fileName, fileType, uploadedFileName }));

  return toSave;
};

export const formatFormValues = data => {
  const latestData = { ...data, files: data?.files || [] };
  latestData.topic = latestData.topic ? String(latestData.topic) : undefined;
  latestData.incidentDate = moment(latestData.incidentDate || undefined);
  return latestData;
};

import axios from '@shared/axios/common';

export const publishCourierPlan = {
  standard: body => axios({
    method: 'POST',
    url: '/courierPlanPublication/publishCourierPlan/standard',
    data: body,
  }).then(({ data }) => data),
  scheduled: body => axios({
    method: 'POST',
    url: '/courierPlanPublication/publishCourierPlan/scheduled',
    data: body,
  }).then(({ data }) => data),
  slotCapacity: body => axios({
    method: 'POST',
    url: '/courierPlanPublication/publishCourierPlan/slotCapacity',
    data: body,
  }).then(({ data }) => data),
};

export const publishStoreAssistantPlan = body => axios({
  method: 'POST',
  url: '/pickerPlanPublication/publishPickerPlan',
  data: body,
}).then(({ data }) => data);

export const getPickerPlanFileSignedUploadUrl = async ({ key }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/pickerPlanPublication/publishPickerPlan/get-upload-signed-url',
    data: { key },
  });
  return data;
};

export const exportCourierSlotCapacityExcel = async ({ startDate, endDate }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierPlanPublication/publishCourierPlan/slotCapacity/excelExport',
    data: { startDate, endDate },
  });
  return data;
};

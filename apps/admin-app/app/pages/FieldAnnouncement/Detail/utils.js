import moment from 'moment';

export const arrangeAnnouncementDetail = announcement => ({
  ...announcement,
  title: announcement?.title || {},
  description: announcement?.description || {},
  warehouseIds: announcement?.warehouses?.map(warehouse => warehouse.warehouse),
  franchiseNames: announcement?.franchises?.map(franchise => franchise.name),
  id: announcement?._id,
  dateRange: [
    moment(announcement?.startDate).startOf('day'),
    moment(announcement?.endDate).endOf('day'),
  ],
});

export const arrangeFileList = fileListArr => fileListArr.map((file, index) => ({ uid: index, name: index, url: file }));

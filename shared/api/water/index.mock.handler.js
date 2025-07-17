import { commonUrls, waterApiUrls } from '@app/pages/GetirWater/utils/constants';
import { mockedBrands, mockedCities, mockedFirms, mockedStatus, mockedVendorsCount, mockedVendorsFilter, mockedAnnouncementDetail } from './index.mock.data';

const getBrandsOptions = {
  url: waterApiUrls.getBrands,
  method: 'post',
  successData: mockedBrands,
};

const getCitiesOptions = {
  url: commonUrls.getCities,
  method: 'post',
  successData: mockedCities,
};

const getFirmsOptions = {
  url: waterApiUrls.getFirms,
  method: 'post',
  successData: mockedFirms,
};

export const getAnnouncementDetail = {
  url: waterApiUrls.getAnnouncementDetail,
  method: 'post',
  successData: mockedAnnouncementDetail,
};

const getAllVendorStatusOptions = {
  url: waterApiUrls.getAllVendorStatus,
  method: 'post',
  successData: mockedStatus,
};

const getVendorsFilterOptions = {
  url: waterApiUrls.getVendorsFilter,
  method: 'post',
  successData: mockedVendorsFilter,
};

const getVendorFilterCountOptions = {
  url: waterApiUrls.getVendorFilterCount,
  method: 'post',
  successData: mockedVendorsCount,
};

export default [getBrandsOptions, getCitiesOptions, getFirmsOptions, getAllVendorStatusOptions, getVendorsFilterOptions, getVendorFilterCountOptions];

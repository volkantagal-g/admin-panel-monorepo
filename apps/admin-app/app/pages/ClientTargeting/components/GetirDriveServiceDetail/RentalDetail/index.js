import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

import { useCallback } from 'react';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import MultipleSelect from '../../common/MultipleSelect';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import {
  clientListSections,
  GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS,
  getGetirDriveRentStatusOptions,
  getGetirDrivePaymentTypeOptions,
} from '../../../constants';
import { getClientListData, getFilteredGetirDriveVouchersSelector } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';

import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { Creators } from '../../../redux/actions';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';

const subSectionName = 'rentalDetail';
const activeKey = `${clientListSections.getirDriveServiceDetail}.${subSectionName}`;

const RentalDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const vouchersBySearchCodeData = useSelector(getFilteredGetirDriveVouchersSelector.getData);
  const isVouchersBySearchCodeDataPending = useSelector(getFilteredGetirDriveVouchersSelector.getIsPending);
  const dispatch = useDispatch();

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minRentCount';
  const maxCountKey = 'maxRentCount';

  const getirDriveRentStatusOptions = getGetirDriveRentStatusOptions(t);
  const getirDrivePaymentTypeOptions = getGetirDrivePaymentTypeOptions(t);

  const handleSearch = useCallback(searchText => {
    const params = {
      page: 1,
      size: 50,
      code: searchText,
      isUsed: true,
    };
    dispatch(Creators.getFilteredGetirDriveVouchersRequest({ params }));
  }, [dispatch]);

  const { debouncedCallback } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const onSearch = useCallback(searchText => {
    if (searchText?.length > 2) {
      debouncedCallback(searchText);
    }
  }, [debouncedCallback]);

  const clearFilteredGetirDriveVouchersRequest = () => {
    dispatch(Creators.resetFilteredGetirDriveVouchersRequest());
  };

  return (
    <CollapsePanel header={t('GETIR_DRIVE_RENTAL_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.externalSource}
            label={t('SOURCE')}
            clientListKey="externalSource"
            selectable={GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS}
            placeholder={t('SOURCE')}
          />
          <MultipleSelect
            activeKey={activeKey}
            value={data.state}
            label={t('RENT_STATUS')}
            clientListKey="state"
            selectable={getirDriveRentStatusOptions}
            placeholder={t('RENT_STATUS')}
          />
          <MultipleSelect
            activeKey={activeKey}
            value={data.paymentType}
            label={t('PAYMENT_TYPE')}
            clientListKey="paymentType"
            selectable={getirDrivePaymentTypeOptions}
            placeholder={t('PAYMENT_TYPE')}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('RENT_COUNT')}
          />
        </Col>
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.vouchers}
            label={t('VOUCHER')}
            clientListKey="vouchers"
            onSearch={onSearch}
            selectable={vouchersBySearchCodeData}
            placeholder={t('VOUCHER')}
            tagValue="code"
            tagKey="id"
            isLoading={isVouchersBySearchCodeDataPending}
            onBlur={clearFilteredGetirDriveVouchersRequest}
          />
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('RENT_DATE_INTERVAL')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default RentalDetail;

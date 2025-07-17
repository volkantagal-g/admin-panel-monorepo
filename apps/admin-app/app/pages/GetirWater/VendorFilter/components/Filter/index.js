import { Button, Col, Collapse, Form, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { each, isEqual, omit } from 'lodash';

import useStyles from '@app/pages/GetirWater/VendorFilter/components/Filter/styles';
import { Creators } from '@app/pages/GetirWater/VendorFilter/redux/actions';
import SelectWithAll from '@app/pages/GetirWater/components/SelectWithAll';
import { FilterFormState, getIsOpenSelectList, initialVendorFilter } from './constants';
import useFilterStoreState from '../../hooks/useFilterStoreState';
import useFilterForm from '../../hooks/useFilterForm';
import getSelectLists from './getSelectLists';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = () => {
  const { t } = useTranslation(['getirWaterVendorFilter', 'global']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const filterStoreState = useFilterStoreState();
  const { filterForm, filterFormStateRef, findIfFormItemIsDisabled } = useFilterForm(dispatch, filterStoreState, getIsOpenSelectList(t));
  const [shouldUseRefresh, setShouldUseRefresh] = useState(true);

  const { filters } = filterStoreState;
  const { brandSelectList, citySelectList, firmSelectList, statusSelectList, isOpenSelectList } = getSelectLists(filterStoreState, t);

  const updateFilters = (value, fieldName) => {
    dispatch(Creators.setFilters({ filters: { [fieldName]: value } }));
  };

  const handleSearchOnClick = () => {
    const filterFormValues = filterForm.getFieldsValue();
    const { page, count } = filters;
    const filtersWithInitialPagination = { ...filterFormValues, page, count, ...initialVendorFilter };
    each(filtersWithInitialPagination, updateFilters);
    dispatch(Creators.setFilters({ filters: filtersWithInitialPagination }));
    dispatch(Creators.filterVendorsRequest({ data: filtersWithInitialPagination }));
    dispatch(Creators.getVendorFilterCountRequest({ data: omit(filtersWithInitialPagination, ['page', 'count']) }));
    setShouldUseRefresh(true);
  };

  const handleClearOnClick = () => {
    dispatch(Creators.setFilters({ filters: initialVendorFilter }));
    filterFormStateRef.current = FilterFormState.FORM_VALUES_NOT_READY;
  };

  const handleValuesChange = changedValues => {
    const [fieldName, value] = Object.entries(changedValues)[0];
    setShouldUseRefresh(isEqual(filters[fieldName].sort(), value.sort()));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Form
                id="vendor-filter-form"
                form={filterForm}
                layout="vertical"
                onValuesChange={handleValuesChange}
              >
                <Row gutter={[8, 8]}>
                  <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                    <Text>{t('FILTER.STATUS.TITLE')}</Text>
                    <SelectWithAll
                      placeholder={t('FILTER.STATUS.DESC')}
                      className={classes.filterSelect}
                      value={filters.status}
                      name="statusIds"
                      disabled={findIfFormItemIsDisabled()}
                      allowClear
                      showSearch
                      items={statusSelectList}
                    />
                  </Col>
                  <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                    <Text>{t('FILTER.IS_OPEN.TITLE')}</Text>
                    <SelectWithAll
                      placeholder={t('FILTER.IS_OPEN.DESC')}
                      className={classes.filterSelect}
                      value={filters.isOpen}
                      name="isOpen"
                      disabled={findIfFormItemIsDisabled()}
                      allowClear
                      showSearch
                      items={isOpenSelectList}
                    />
                  </Col>
                  <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                    <Text>{t('FILTER.CITY.TITLE')}</Text>
                    <SelectWithAll
                      placeholder={t('FILTER.CITY.DESC')}
                      className={classes.filterSelect}
                      name="cityIds"
                      value={filters.cityId}
                      disabled={findIfFormItemIsDisabled()}
                      allowClear
                      showSearch
                      items={citySelectList}
                    />
                  </Col>
                  <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                    <Text>{t('FILTER.FIRM.TITLE')}</Text>
                    <SelectWithAll
                      placeholder={t('FILTER.FIRM.DESC')}
                      className={classes.filterSelect}
                      name="firmIds"
                      value={filters.firmId}
                      disabled={findIfFormItemIsDisabled()}
                      allowClear
                      showSearch
                      items={firmSelectList}
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                    <Text>{t('FILTER.BRAND.TITLE')}</Text>
                    <SelectWithAll
                      placeholder={t('FILTER.BRAND.DESC')}
                      className={classes.filterSelect}
                      items={brandSelectList}
                      name="brandIds"
                      value={filters.brandId}
                      disabled={findIfFormItemIsDisabled()}
                      allowClear
                      showSearch
                    />
                  </Col>
                </Row>
              </Form>
              <Row gutter={[8, 8]} justify="end">
                <Col span={24} className={classes.actionButtonsWrapper}>
                  <Space size="small">
                    <Button disabled={findIfFormItemIsDisabled()} onClick={handleClearOnClick}>{t('global:CLEAR')}</Button>
                    <Button disabled={findIfFormItemIsDisabled()} type="primary" onClick={handleSearchOnClick}>
                      {t(shouldUseRefresh ? 'FILTER.REFRESH' : 'global:SEARCH')}
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;

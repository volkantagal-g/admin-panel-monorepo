import { Button, Switch, Select, Alert, Spin, Col, Tooltip } from 'antd';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { GETIR_10_DOMAIN_TYPE, DOMAIN_TYPES_WITHOUT_WAREHOUSES } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import useStyles from '../../../formStyles';
import { domainTypeSelector, getSaaData, getShowWarehouses, getShowAutoCreatedSaas } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { useDomainOptions } from '../../../useDomainOptions';
import { SAA_GETIR_10_CODE } from '../../../constants';

export default function Form() {
  const { t } = useTranslation('saaPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const domainType = useSelector(domainTypeSelector);
  const warehousesLoading = useSelector(getWarehousesSelector.getIsPending);
  const showWarehouses = useSelector(getShowWarehouses);
  const showAutoCreatedSaas = useSelector(getShowAutoCreatedSaas);
  const areaData = useSelector(getSaaData.getData);
  const areaDataPending = useSelector(getSaaData.getIsPending);

  useEffect(() => {
    // no warehouse for bitaksi & getirWater marketplace
    if (DOMAIN_TYPES_WITHOUT_WAREHOUSES.some(invalidDomainType => invalidDomainType === domainType)) return;
    // replace saa g10 domain type with real g10 domain type to fetch warehouses
    const dtypeForWarehouse = domainType === SAA_GETIR_10_CODE ? GETIR_10_DOMAIN_TYPE : domainType;
    const domainTypes = dtypeForWarehouse ? [dtypeForWarehouse] : undefined;
    dispatch(CommonCreators.getWarehousesRequest({ domainTypes }));
  }, [dispatch, domainType]);

  const domainOptions = useDomainOptions();

  const automatedAreasLength = areaData.filter(area => area.isAutomated === true).length;
  const manuallyCreatedAreasLength = areaData.length - automatedAreasLength;

  const foundAreaCount = showAutoCreatedSaas
    ? automatedAreasLength
    : manuallyCreatedAreasLength;

  const handleSearch = useCallback(() => {
    dispatch(Creators.getSaasRequest({ domainType }));
  }, [dispatch, domainType]);

  const handleDomainChange = useCallback(option => {
    dispatch(Creators.setDomainType({ domainType: option }));
  }, [dispatch]);

  return (
    <Col xs={24} sm={24} md={4} lg={4}>
      <div className={classes.listForm}>
        <Can permKey={permKey.PAGE_SERVICE_AVAILABILITY_AREA_NEW}>
          <Button type="primary" className={classes.addNewSaa} data-testid="saa-create-button">
            <Link to="/saa/new">+ {t('saaPage:NEW_SAA')}</Link>
          </Button>
        </Can>
        <h6 className={classes.formTitle}>{t('saaPage:SEARCH_SAAS')}</h6>
        <Select data-testid="domain-select" value={domainType} options={domainOptions} onChange={handleDomainChange} className={classes.fullWidth} />
        <div className={classes.searchContainer}>
          <div className={classes.togglesWrapper}>
            <div className={classes.toggleContainer}>
              <span>
                <Switch
                  loading={warehousesLoading}
                  disabled={warehousesLoading || !domainType}
                  checked={showWarehouses}
                  onChange={() => dispatch(Creators.toggleShowWarehouses())}
                />
                {t('WAREHOUSES')}
              </span>
            </div>
            <div className={classes.toggleContainer}>
              <span>
                <Tooltip placement="leftTop" title={t('AUTO_CREATED_SAAS_INFO')}>
                  <Switch
                    loading={areaDataPending}
                    disabled={areaDataPending || !domainType}
                    checked={showAutoCreatedSaas}
                    onChange={() => dispatch(Creators.toggleShowAutoCreatedSaas())}
                  />
                  {t('AUTO_CREATED_SAAS')}
                </Tooltip>
              </span>
            </div>
          </div>
          <div className={classes.searchButtonWrapper}>
            <Button type="primary" onClick={handleSearch} disabled={!domainType}>
              {t('SEARCH')}
            </Button>
          </div>
        </div>
        {areaDataPending && <Spin data-testid="saa-spinner" />}
        {!areaDataPending && areaData && (
          <div>
            <Alert showIcon type="info" message={`${t('saaPage:FOUND_AREA_COUNT')}: ${foundAreaCount}`} />
            <Alert showIcon type="info" message={t('saaPage:CLICK_SAA')} />
          </div>
        )}
      </div>
    </Col>
  );
}

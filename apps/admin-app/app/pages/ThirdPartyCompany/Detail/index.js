// library imports
import { Col, Row, Space, Button, Switch, Skeleton, Modal } from 'antd';
import { CloseOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

// local imports
import {
  CompanyDetailForm,
  CredentialList,
  NewCredential,
  ChangeLogs,
} from '@app/pages/ThirdPartyCompany/Detail/components';
import saga from '@app/pages/ThirdPartyCompany/Detail/redux/saga';
import reducer from '@app/pages/ThirdPartyCompany/Detail/redux/reducer';
import { Creators } from '@app/pages/ThirdPartyCompany/Detail/redux/actions';
import {
  getThirdPartyCompanyByIdSelector,
  getCredentialsByCompanyIdSelector,
  thirdPartyCompanyAllowedRoutesSelector,
  deleteThirdPartyCompanyByIdSelector,
  activateThirdPartyCompanyByIdSelector,
  deactivateThirdPartyCompanyByIdSelector,
} from '@app/pages/ThirdPartyCompany/Detail/redux/selectors';
import { THIRD_PARTY_COMPANY_STATUSES } from '@app/pages/ThirdPartyCompany/constants';

// shared imports
import AntCard from '@shared/components/UI/AntCard';
import { REDUX_KEY, DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import permKey from '@shared/shared/permKey.json';

// constants
const LAYOUT_CONFIG = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 };

const ThirdPartyCompanyDetail = () => {
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const { Can, canAccess } = usePermission();
  usePageViewAnalytics({
    name: ROUTE.THIRD_PARTY_COMPANY_DETAIL.name,
    squad: ROUTE.THIRD_PARTY_COMPANY_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const thirdPartyCompany = useSelector(getThirdPartyCompanyByIdSelector.getData);
  const isThirdPartyCompanyPending = useSelector(getThirdPartyCompanyByIdSelector.getIsPending);
  const isThirdPartyCompanyCredentialsPending = useSelector(getCredentialsByCompanyIdSelector.getIsPending);
  const isThirdPartyCompanyAllowedRoutesPending = useSelector(thirdPartyCompanyAllowedRoutesSelector.getIsPending);
  const isThirdPartyCompanyDeletePending = useSelector(deleteThirdPartyCompanyByIdSelector.getIsPending);
  const isThirdPartyCompanyActivatePending = useSelector(activateThirdPartyCompanyByIdSelector.getIsPending);
  const isThirdPartyCompanyDeactivatePending = useSelector(deactivateThirdPartyCompanyByIdSelector.getIsPending);

  const isThirdPartyCompanyActive = thirdPartyCompany?.status === THIRD_PARTY_COMPANY_STATUSES.ACTIVE;
  const isPagePending = isThirdPartyCompanyPending ||
    isThirdPartyCompanyCredentialsPending ||
    isThirdPartyCompanyAllowedRoutesPending;
  const isEligibleToEditCompanyStatusAndDelete = canAccess(permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_COMPONENT_COMPANY_EDIT_STATUS_AND_DELETE);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getThirdPartyCompanyByIdRequest({ id }));
    if (canAccess(permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_COMPONENT_COMPANY_VIEW_CREDENTIALS)) {
      dispatch(Creators.getCredentialsByCompanyIdRequest({ id }));
    }
    dispatch(Creators.getAllowedRoutesRequest({ id }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id, canAccess]);

  const handleActivateChange = useCallback(value => {
    if (!value) {
      // deactivate
      dispatch(Creators.deactivateThirdPartyCompanyByIdRequest({ id }));
    }
    else {
      // activate
      dispatch(Creators.activateThirdPartyCompanyByIdRequest({ id }));
    }
  }, [dispatch, id]);
  const { debouncedCallback: handleActivateThirdPartyCompany } = useDebouncedCallback({
    callback: handleActivateChange,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const handleDeleteClick = useCallback(() => {
    dispatch(Creators.deleteThirdPartyCompanyByIdRequest({ id }));
  }, [dispatch, id]);
  const { debouncedCallback: handleDeleteThirdPartyCompany } = useDebouncedCallback({
    callback: handleDeleteClick,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const handleJsonModalToggle = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const activateChildren = {
    checked: useMemo(() => {
      return (
        <Space>
          <CheckOutlined />
          <span>{t('PAGE.DETAIL.ACTIVATED')}</span>
        </Space>
      );
    }, [t]),
    unchecked: useMemo(() => {
      return (
        <Space>
          <CloseOutlined />
          <span>{t('PAGE.DETAIL.DEACTIVATED')}</span>
        </Space>
      );
    }, [t]),
  };

  const thirdPartyCompanyInJsonModal = useMemo(() => {
    return (
      <Modal
        title={`${get(thirdPartyCompany, 'name', '')}`}
        visible={isModalVisible}
        onOk={handleJsonModalToggle}
        onCancel={handleJsonModalToggle}
      >
        <pre>{JSON.stringify(thirdPartyCompany, null, 2)}</pre>
      </Modal>
    );
  }, [handleJsonModalToggle, isModalVisible, thirdPartyCompany]);

  const cardTitle = useMemo(
    () => {
      return (
        <Space>
          <span>{`${get(thirdPartyCompany, 'name', '')}`}</span>
          {canAccess(permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_JSON) && (
            <Button
              type="default"
              loading={isThirdPartyCompanyActivatePending || isThirdPartyCompanyDeactivatePending || isThirdPartyCompanyPending}
              onClick={handleJsonModalToggle}
            >
              <span>{t('PAGE.DETAIL.JSON')}</span>
            </Button>
          )}
        </Space>
      );
    },
    [canAccess,
      handleJsonModalToggle,
      isThirdPartyCompanyActivatePending,
      isThirdPartyCompanyDeactivatePending,
      isThirdPartyCompanyPending,
      t,
      thirdPartyCompany],
  );

  const cardExtras = (
    <Space>
      <Switch
        loading={isThirdPartyCompanyDeactivatePending || isThirdPartyCompanyActivatePending}
        checkedChildren={activateChildren.checked}
        unCheckedChildren={activateChildren.unchecked}
        disabled={!isEligibleToEditCompanyStatusAndDelete}
        checked={isThirdPartyCompanyActive}
        onChange={handleActivateThirdPartyCompany}
      />
      <Button
        type="primary"
        danger
        loading={isThirdPartyCompanyDeletePending}
        disabled={isThirdPartyCompanyDeactivatePending || isThirdPartyCompanyActivatePending || !isEligibleToEditCompanyStatusAndDelete}
        onClick={handleDeleteThirdPartyCompany}
        icon={<DeleteOutlined />}
      >
        <span>{t('PAGE.DETAIL.DELETE')}</span>
      </Button>
    </Space>
  );

  return (
    <Skeleton loading={isPagePending}>
      {thirdPartyCompanyInJsonModal}
      <AntCard
        title={cardTitle}
        extra={cardExtras}
      >
        <Row gutter={[8, 16]}>
          <Col {...LAYOUT_CONFIG}>
            <CompanyDetailForm />
          </Col>
          <Can permKey={permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_COMPONENT_COMPANY_VIEW_CREDENTIALS}>
            <Col {...LAYOUT_CONFIG}>
              <NewCredential />
              <CredentialList />
            </Col>
          </Can>
        </Row>
        <Row gutter={[8, 16]}>
          <Col xs={24}>
            <ChangeLogs />
          </Col>
        </Row>
      </AntCard>
    </Skeleton>
  );
};

const reduxKey = REDUX_KEY.THIRD_PARTY_COMPANY.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ThirdPartyCompanyDetail);

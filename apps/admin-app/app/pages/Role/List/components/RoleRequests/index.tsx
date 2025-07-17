import {
  Button,
  Col,
  Row,
  Tabs,
  Typography,
  Space,
  Modal,
  Form,
  Popconfirm,
  Skeleton,
  Radio,
  InputNumber,
  DatePicker,
} from 'antd';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TFunction, useTranslation } from 'react-i18next';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import moment from 'moment';

import { Link } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import AntSelect from '@shared/components/UI/AntSelect';
import { ROLE_REQUEST_TABS, tableColumns } from './config';
import { Creators } from '../../redux/actions';
import {
  extendedUserInfoSelector,
  roleRequestByIdSelector,
  roleRequestsForApprovalByRoleOwnerSelector,
  userRoleRequestsSelector,
} from '../../redux/selectors';
import { countriesSelector } from '@shared/redux/selectors/common';
import { usePermission } from '@shared/hooks';
import AnalyticsService from '@shared/services/analytics';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { getUser } from '@shared/redux/selectors/auth';
import useQuery from '@shared/shared/hooks/useQuery';
import { ROUTE } from '@app/routes';
import { ROLE_LIST_TAB_PANE_KEY } from '@shared/shared/constants';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import usePostMountEffect from '@shared/shared/hooks/usePostMountEffect';
import { ROLE_REQUEST_STATES, ROLE_REQUEST_STATUSES } from '../../constants';
import {
  approveRequestValidationSchema,
  defaultValues,
  objectIdValidationSchema,
  rejectRequestValidationSchema,
} from './formHelper';
import { validate } from '@shared/yup';
import { InputWrapper } from '@shared/components/UI/Form';
import {
  ROLE_REQUEST_DURATION_TYPE,
  ROLE_REQUEST_TIME_LIMIT,
} from '@app/pages/Role/components/UserRoleRequestModalContent/constants';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

type CountryMap = Record<string, {
  _id: string;
  name: Record<string, string>;
  dialingCode: number;
  flag: string;
  defaultLanguageCode: string;
  languageSortOrder: string[];
  operationalDomainTypes: number[];
  operational: boolean;
}>;

const getDisplayResponseReason = (t: TFunction, replyRoleRequest: RoleRequestType) => {
  if (replyRoleRequest.requestState === ROLE_REQUEST_STATES.SYSTEM_CANCELED) return t('RESPONSE_REASON_EXPIRED_MSG');
  if (replyRoleRequest.requestState === ROLE_REQUEST_STATES.CANCELLED_BY_GRANTING_ROLE_ACCESS) return t('RESPONSE_REASON_ROLE_MANUALLY_GRANTED_MSG');
  if (replyRoleRequest.requestState === ROLE_REQUEST_STATES.USER_CANCELED) return t('USER_CANCEL_REASON');
  if (replyRoleRequest.responseReason) return replyRoleRequest.responseReason;
  if (replyRoleRequest.requestState === ROLE_REQUEST_STATES.APPROVED) return t('DEFAULT_APPROVAL_REASON');
  return t('RESPONSE_REASON_NO_MSG');
};

const ReplyModal = ({
  visible,
  onClose,
  replyRoleRequest,
  tab,
}: { visible: boolean, onClose: () => void, replyRoleRequest: RoleRequestType, tab: string }) => {
  const { t } = useTranslation('rolePage');
  const dispatch = useDispatch();
  const replyRoleName = (replyRoleRequest?.role as RoleType)?.name;

  const operationalCountryMap = useSelector(countriesSelector.getMap) as Record<MongoIDType, ICountry>;

  const extendedUserPending = useSelector(extendedUserInfoSelector.getIsPending);
  const extendedUser = useSelector(extendedUserInfoSelector.getData);
  const readOnlyView = replyRoleRequest.status !== ROLE_REQUEST_STATUSES.PENDING || tab === ROLE_REQUEST_TABS.MINE;

  useEffect(() => {
    if (!replyRoleRequest?.user) return;
    // user may or may not be populated
    const userId = (replyRoleRequest.user as UserType)._id || replyRoleRequest.user;
    dispatch(Creators.getExtendedUserInfoRequest({ user: userId }));
  }, [dispatch, tab, replyRoleRequest.user, readOnlyView]);

  const rejectRoleForm = useFormik({
    enableReinitialize: true,
    initialValues: defaultValues,
    validate: validate(rejectRequestValidationSchema),
    validateOnChange: false,
    onSubmit: () => {
      dispatch(Creators.rejectRoleRequestRequest({ roleRequestId: replyRoleRequest._id, responseReason: rejectRoleForm.values.responseReason }));
      AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.PENDING_APPROVAL_REJECT_REQUEST });
      onClose();
    },
  });

  const approveRoleForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      responseReason: '',
      timeLimit: replyRoleRequest.timeLimit ?? ROLE_REQUEST_TIME_LIMIT.PERMANENT,
      durationType: replyRoleRequest.durationType ?? ROLE_REQUEST_DURATION_TYPE.DURATION,
      durationDays: replyRoleRequest.durationDays,
      endDate: replyRoleRequest.endDate,
    },
    validate: validate(approveRequestValidationSchema),
    validateOnChange: false,
    onSubmit: () => {
      dispatch(Creators.approveRoleRequestRequest({
        roleRequestId: replyRoleRequest._id,
        responseReason: approveRoleForm.values.responseReason,
        timeLimit: approveRoleForm.values.timeLimit,
        durationType: approveRoleForm.values.durationType,
        durationDays: approveRoleForm.values.durationDays,
        endDate: approveRoleForm.values.endDate,
      }));
      AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.PENDING_APPROVAL_APPROVE_REQUEST });
      onClose();
    },
  });

  const selectedLanguage = useSelector(getSelectedLanguage) as keyof MinLangObjectType;
  const displayResponseReason = getDisplayResponseReason(t, replyRoleRequest);

  const replyModalFooter = (
    <>
      <Popconfirm
        title={t('CONFIRM_APPROVAL')}
        onConfirm={approveRoleForm.handleSubmit as (e?: MouseEvent<HTMLElement>) => void}
      >
        <Button
          type="primary"
        >{t('APPROVE')}
        </Button>
      </Popconfirm>
      <Popconfirm
        title={t('CONFIRM_REJECTION')}
        onConfirm={rejectRoleForm.handleSubmit as (e?: MouseEvent<HTMLElement>) => void}
      >
        <Button
          danger
        >{t('REJECT')}
        </Button>
      </Popconfirm>
    </>
  );

  const timeLimit = approveRoleForm.values.timeLimit ?? ROLE_REQUEST_TIME_LIMIT.PERMANENT;
  const durationType = approveRoleForm.values.durationType ?? ROLE_REQUEST_DURATION_TYPE.DURATION;
  return (
    <Form>
      <Modal
        title={<Title level={3} className="mb-0 pr-3">{replyRoleName}</Title>}
        visible={visible}
        width={800}
        footer={!readOnlyView && replyModalFooter}
        onCancel={onClose}
      >
        <Space direction="vertical" size="middle" className="w-100">
          <Row>
            <Col flex="auto">
              <Radio.Group
                options={[
                  { label: t('ROLE_REQUEST.PERMANENTLY'), value: ROLE_REQUEST_TIME_LIMIT.PERMANENT },
                  { label: t('ROLE_REQUEST.TEMPORARILY'), value: ROLE_REQUEST_TIME_LIMIT.TEMPORARY },
                ]}
                optionType="button"
                defaultValue={timeLimit}
                disabled={readOnlyView}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  approveRoleForm.setFieldValue('timeLimit', value);
                }}
              />
            </Col>
          </Row>
          {timeLimit === ROLE_REQUEST_TIME_LIMIT.TEMPORARY && (
            <>
              <Row>
                <Col flex="auto">
                  <Radio.Group
                    options={[
                      { label: t('ROLE_REQUEST.DURATION'), value: ROLE_REQUEST_DURATION_TYPE.DURATION },
                      { label: t('ROLE_REQUEST.UNTIL_A_DATE'), value: ROLE_REQUEST_DURATION_TYPE.END_DATE },
                    ]}
                    optionType="button"
                    defaultValue={durationType}
                    disabled={readOnlyView}
                    onChange={event => {
                      const value = get(event, 'target.value', '');
                      approveRoleForm.setFieldValue('durationType', value);
                    }}
                  />
                </Col>
              </Row>
              {durationType === ROLE_REQUEST_DURATION_TYPE.DURATION && (
                <Row>
                  <Col style={{ display: 'flex', alignItems: 'baseline' }}>
                    <Text>{t('ROLE_REQUEST.ROLE_DAYS_PREFIX')}</Text>&nbsp;
                    <Form.Item
                      help={get(approveRoleForm.errors, 'durationDays')}
                      validateStatus={get(approveRoleForm.errors, 'durationDays') ? 'error' : 'success'}
                      name={['durationDays']}
                      style={{ marginBottom: 0 }}
                    >
                      <InputNumber
                        defaultValue={approveRoleForm.values.durationDays}
                        disabled={readOnlyView}
                        min={1}
                        onChange={value => {
                          approveRoleForm.setFieldValue('durationDays', value);
                        }}
                      />&nbsp;
                    </Form.Item>
                    <Text>{t('ROLE_REQUEST.ROLE_DAYS_SUFFIX')}</Text>
                  </Col>
                </Row>
              )}
              {durationType === ROLE_REQUEST_DURATION_TYPE.END_DATE && (
                <Row>
                  <Col style={{ display: 'flex', alignItems: 'baseline' }}>
                    <Text>{t('ROLE_REQUEST.DESIRED_END_DATE')}</Text>&nbsp;
                    <Form.Item
                      help={get(approveRoleForm.errors, 'endDate')}
                      validateStatus={get(approveRoleForm.errors, 'endDate') ? 'error' : 'success'}
                      name={['endDate']}
                      style={{ marginBottom: 0 }}
                    >
                      <DatePicker
                        defaultValue={approveRoleForm.values.endDate ? moment(approveRoleForm.values.endDate) : undefined}
                        disabled={readOnlyView}
                        onChange={date => {
                          approveRoleForm.setFieldValue('endDate', date);
                        }}
                        disabledDate={current => {
                          return current && current < moment().startOf('day');
                        }}
                      />&nbsp;
                    </Form.Item>
                    <Text>23:59 UTC</Text>
                  </Col>
                </Row>
              )}
            </>
          )}
          <Row gutter={24}>
            <Col span={12}>
              <Text strong>{t('NAME')}</Text>
            </Col>
            <Col span={12}>
              <Text strong>{t('DEPARTMENT')}</Text>
            </Col>
            <Col span={12}>
              {readOnlyView ? (
                <Skeleton active loading={extendedUserPending} title={false} paragraph={{ rows: 1, width: '100%' }}>
                  <Text className="w-100">{extendedUser?.name}</Text>
                </Skeleton>
              ) : <Text className="w-100">{(replyRoleRequest?.user as UserType)?.name}</Text>}
            </Col>
            <Col span={12}>
              <Skeleton active loading={extendedUserPending} title={false} paragraph={{ rows: 1, width: '100%' }}>
                <Text className="w-100">{extendedUser?.employee?.departmentName}</Text>
              </Skeleton>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Text strong>{t('JOB_TITLE')}</Text>
            </Col>
            <Col span={12}>
              <Text strong>{t('COUNTRIES')}</Text>
            </Col>
            <Col span={12}>
              <Skeleton active loading={extendedUserPending} title={false} paragraph={{ rows: 1, width: '100%' }}>
                <Text className="w-100">{extendedUser?.employee?.jobTitle}</Text>
              </Skeleton>
            </Col>
            <Col span={12}>
              <Skeleton active loading={extendedUserPending} title={false} paragraph={{ rows: 1, width: '100%' }}>
                {extendedUser?.hasGlobalAccess ? <Text className="w-100">{t('GLOBAL_ACCESS')}</Text> : (
                  <Text className="w-100">{
                    extendedUser?.countries
                      ?.map((id: string) => operationalCountryMap[id]?.name?.[selectedLanguage])
                      ?.filter((n: string) => n)
                      ?.join(', ')
                  }
                  </Text>
                )}
              </Skeleton>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Text strong>{t('EMAIL')}</Text>
            </Col>
            <Col span={12}>
              <Text strong>{t('MANAGER')}</Text>
            </Col>
            <Col span={12}>
              <Skeleton active loading={extendedUserPending} title={false} paragraph={{ rows: 1, width: '100%' }}>
                <Text className="w-100">{extendedUser?.email}</Text>
              </Skeleton>
            </Col>
            <Col span={12}>
              <Skeleton active loading={extendedUserPending} title={false} paragraph={{ rows: 1, width: '100%' }}>
                <Text className="w-100">{extendedUser?.employee?.supervisor?.fullName}</Text>
              </Skeleton>
            </Col>
          </Row>
          {readOnlyView && (
            <Row gutter={24}>
              <Col span={24}>
                <Text strong>{t('STATUS')}</Text>
              </Col>
              <Col span={24}>
                <Text>{t(replyRoleRequest.status)}</Text>
              </Col>
            </Row>
          )}
          <Row gutter={24}>
            <Col span={24}>
              <Text strong>{t('REQUEST_DESCRIPTION')}</Text>
            </Col>
            <Col span={24}>
              <Text className="w-100">{replyRoleRequest.requestReason}</Text>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Text strong>{t('REPLY_DESCRIPTION')}</Text>
            </Col>
            <Col span={24}>
              {readOnlyView ?
                <Text>{displayResponseReason}</Text> : (
                  <InputWrapper
                    setDefaultValue={false}
                    inputKey="responseReason"
                    isTouched={get(rejectRoleForm.touched, 'responseReason')}
                    hasError={get(rejectRoleForm.errors, 'responseReason')}
                    value={rejectRoleForm.values.responseReason}
                    mode="textarea"
                    handleChange={({ target }) => {
                      rejectRoleForm.setFieldValue('responseReason', target.value);
                      approveRoleForm.setFieldValue('responseReason', target.value);
                    }}
                  />
                )}
            </Col>
          </Row>
        </Space>
      </Modal>
    </Form>
  );
};

const getActiveTab = (query: URLSearchParams) => {
  const queryTab = query.get('requests');
  if (!queryTab) return ROLE_REQUEST_TABS.MINE;
  if (Object.values(ROLE_REQUEST_TABS).includes(queryTab)) return queryTab;

  return ROLE_REQUEST_TABS.MINE;
};

const RoleRequests = () => {
  const { t } = useTranslation('rolePage');
  const { canAccess } = usePermission();
  const dispatch = useDispatch();

  const query = useQuery();
  const activeTab = getActiveTab(query);

  const user = getUser();

  const [roleIdsFilter, setRoleIdsFilter] = useState<MongoIDType[]>([]);
  const [statusFilter, setStatusFilter] = useState(activeTab === ROLE_REQUEST_TABS.PENDING_APPROVAL ? 'PENDING' : '');
  const queryRoleRequestId = query.get('roleRequestId');
  const [applyRequestIdFilter, setApplyRequestIdFilter] = useState(!!queryRoleRequestId);

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyRoleRequest, setReplyRoleRequest] = useState<RoleRequestType>({} as RoleRequestType);

  const userRoleRequests = useSelector(userRoleRequestsSelector.getData);
  const userRoleRequestsPending = useSelector(userRoleRequestsSelector.getIsPending);

  const roleRequestById = useSelector(roleRequestByIdSelector.getData);
  const roleRequestByIdPending = useSelector(roleRequestByIdSelector.getIsPending);

  const roleRequestsPendingApproval = useSelector(roleRequestsForApprovalByRoleOwnerSelector.getData);
  const roleRequestsPendingApprovalPending = useSelector(roleRequestsForApprovalByRoleOwnerSelector.getIsPending);

  let isPending;
  let roleRequests: RoleRequestType[] = [];
  if (applyRequestIdFilter) {
    if (!isEmpty(roleRequestById)) {
      if (activeTab === ROLE_REQUEST_TABS.MINE && roleRequestById.user._id === user._id) {
        roleRequests = [roleRequestById];
      }
      if (activeTab === ROLE_REQUEST_TABS.PENDING_APPROVAL && roleRequestById.role.roleOwners.includes(user._id)) {
        roleRequests = [roleRequestById];
      }
    }
    isPending = roleRequestByIdPending;
  }
  else {
    roleRequests = activeTab === ROLE_REQUEST_TABS.MINE ? userRoleRequests : roleRequestsPendingApproval;
    isPending = activeTab === ROLE_REQUEST_TABS.MINE ? userRoleRequestsPending : roleRequestsPendingApprovalPending;
  }

  const filterableRoles: RoleType[] = [];
  roleRequests.forEach(({ role }) => {
    if (filterableRoles.filter(r => r._id === (role as RoleType)._id).length) return;
    filterableRoles.push(role as RoleType);
  });

  if (statusFilter) roleRequests = roleRequests.filter(r => r.status === statusFilter);
  if (!isEmpty(roleIdsFilter)) roleRequests = roleRequests.filter(r => roleIdsFilter.includes((r.role as RoleType)._id));

  useEffect(() => {
    if (activeTab === ROLE_REQUEST_TABS.MINE) {
      dispatch(Creators.getUserRoleRequestsRequest());
      AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.MY_REQUESTS });
    }
    else {
      dispatch(Creators.getRoleRequestsForApprovalByRoleOwnerRequest());
      AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.PENDING_APPROVAL });
    }
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (queryRoleRequestId) {
      dispatch(Creators.getRoleRequestByIdRequest({ id: queryRoleRequestId }));
    }
  }, [dispatch, queryRoleRequestId]);

  usePostMountEffect(() => {
    setRoleIdsFilter([]);

    if (activeTab === ROLE_REQUEST_TABS.PENDING_APPROVAL) {
      setStatusFilter('PENDING');
    }
    else {
      setStatusFilter('');
    }

    setApplyRequestIdFilter(false);
    setReplyRoleRequest({} as RoleRequestType);
  }, [activeTab]);

  const onCancel = (roleRequestId: MongoIDType) => () => {
    dispatch(Creators.cancelRoleRequestRequest({ roleRequestId }));
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.MY_REQUESTS_CANCEL_REQUEST });
  };

  const selectStatusFilter = (status: string) => {
    setStatusFilter(status);
    const buttonEvent = activeTab === ROLE_REQUEST_TABS.MINE
      ? PANEL_EVENTS.ROLE_LIST.BUTTON.MY_REQUESTS_STATUS
      : PANEL_EVENTS.ROLE_LIST.BUTTON.PENDING_APPROVAL_STATUS;
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: buttonEvent, status });
  };

  const selectRolesFilter = (roleId: MongoIDType[]) => {
    setRoleIdsFilter(roleId);
    const buttonEvent = activeTab === ROLE_REQUEST_TABS.MINE
      ? PANEL_EVENTS.ROLE_LIST.BUTTON.MY_REQUESTS_ROLES
      : PANEL_EVENTS.ROLE_LIST.BUTTON.PENDING_APPROVAL_ROLES;
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: buttonEvent, roleId });
  };

  const showRoleRequestModal = (roleRequest: RoleRequestType) => {
    setReplyRoleRequest(roleRequest);
    setShowReplyModal(true);
  };

  const roleRequestIdForm = useFormik({
    enableReinitialize: true,
    initialValues: defaultValues,
    validate: validate(objectIdValidationSchema),
    validateOnChange: false,
    onSubmit: () => {
      if (!roleRequestIdForm.values.id) {
        setApplyRequestIdFilter(false);
        return;
      }

      setApplyRequestIdFilter(true);
      dispatch(Creators.getRoleRequestByIdRequest({ id: roleRequestIdForm.values.id }));
    },
  });

  const content = (
    <>
      <Row gutter={24} className="mb-3">
        <Col span={8}>
          <Text>{t('STATUS')}</Text>
          <AntSelect
            allowClear
            placeholder={t('STATUS')}
            className="w-100"
            value={statusFilter}
            onChange={selectStatusFilter}
            options={[
              { label: t('PENDING'), value: 'PENDING' },
              { label: t('COMPLETED'), value: 'COMPLETED' },
              { label: t('CANCELED'), value: 'CANCELED' },
            ]}
          />
        </Col>
        <Col span={8}>
          <Text>{t('ROLES')}</Text>
          <AntSelect
            placeholder={t('ROLES')}
            showSearch
            mode="multiple"
            className="w-100"
            value={roleIdsFilter}
            onChange={selectRolesFilter}
            options={
              filterableRoles.map(role => ({ label: role?.name, value: role._id }))
            }
          />
        </Col>
        <Col span={8}>
          <Text>{t('ID')}</Text>
          <Form>
            <InputWrapper
              setDefaultValue={false}
              inputKey="id"
              isTouched={get(roleRequestIdForm.touched, 'id')}
              hasError={get(roleRequestIdForm.errors, 'id')}
              value={roleRequestIdForm.values.id}
              additionalProps={{
                placeholder: 'fa68f4e77d53a07e332ee6bb',
                onPressEnter: roleRequestIdForm.handleSubmit.bind(roleRequestIdForm),
              }}
              handleChange={({ target }) => {
                setApplyRequestIdFilter(false);
                roleRequestIdForm.setFieldValue('id', target.value);
              }}
            />
          </Form>
        </Col>
      </Row>
      <AntTableV2
        bordered
        data={roleRequests}
        loading={isPending}
        columns={tableColumns({
          canAccess,
          onCancel,
          showRoleRequestModal,
          t,
          tab: activeTab,
        })}
      />
    </>
  );

  const roleRequestLink = ROUTE.ROLE_LIST.path.replace(':tabId', ROLE_LIST_TAB_PANE_KEY.ROLE_REQUESTS);
  return (
    <>
      {showReplyModal && (
        <ReplyModal
          visible={showReplyModal}
          onClose={() => setShowReplyModal(false)}
          replyRoleRequest={replyRoleRequest}
          tab={activeTab}
        />
      )}
      <Tabs activeKey={activeTab} size="small">
        <TabPane
          tab={<Link to={`${roleRequestLink}?requests=${ROLE_REQUEST_TABS.MINE}`}>{t('MY_REQUESTS')}</Link>}
          key={ROLE_REQUEST_TABS.MINE}
        >{content}
        </TabPane>
        <TabPane
          tab={(
            <Link to={`${roleRequestLink}?requests=${ROLE_REQUEST_TABS.PENDING_APPROVAL}`}>
              {t('PENDING_APPROVAL')}
            </Link>
          )}
          key={ROLE_REQUEST_TABS.PENDING_APPROVAL}
        >{content}
        </TabPane>
      </Tabs>
    </>
  );
};
export default RoleRequests;

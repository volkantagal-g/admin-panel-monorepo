import { useTranslation } from 'react-i18next';
import { Badge, Button, Col, Row, Skeleton, Tooltip } from 'antd';

import { SyncOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';

import { get } from 'lodash';

import { statusTypes } from '@app/pages/MarketingApproval/constantValues';

import { getLangKey } from '@shared/i18n';
import { AICommunicationsSlice } from '@app/pages/Promo/Detail/components/CommunicationsForm/slice';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { AICommunicationsStatus } from '@app/pages/Promo/types';

export const StatusBadge = ({ status }: {status?: AICommunicationsStatus}) => {
  const label = status ? get(statusTypes[status], getLangKey(), '') : '';
  switch (status) {
    case AICommunicationsStatus.InProgress:
      return <Badge text={label} color="yellow" />;
    case AICommunicationsStatus.Success:
      return <Badge text={`${label}`} color="green" />;
    case AICommunicationsStatus.Waiting:
      return <Badge text={label} color="orange" />;
    case AICommunicationsStatus.Sending:
      return <Badge text={label} color="orange" />;
    case AICommunicationsStatus.Failed:
      return (
        <Badge text={`${label}`} color="red" />
      );
    default:
      return null;
  }
};

export const PaneHeader = () => {
  const { t } = useTranslation('promoPage');
  const isPending = useSelector(AICommunicationsSlice.selectors.isLoading);
  const aiCommunicationsStatus = useSelector(PromoDetailSlice.selectors.aiCommunicationsStatus);

  const dispatch = useDispatch();
  return (
    <Row gutter={16} className="w-100 align-items-center">

      <Col span={12}>
        <div className="align-middle">
          <Tooltip title={t('COMMUNICATIONS.FIELD_INFO')}>
            <b className="mr-2">AI</b>
          </Tooltip>
          {t('COMMUNICATIONS.HEADER_TITLE')}
        </div>
      </Col>
      <Col span={12} className="text-right pr-0">
        {isPending ? (
          <>
            <Skeleton.Button active size="small" shape="square" className="mr-2" />
            <Skeleton.Button active size="small" shape="square" />
          </>
        ) : (
          <>
            <div className="d-inline-block mr-3">
              <StatusBadge status={aiCommunicationsStatus?.data?.status} />
            </div>

            <Button onClick={event => {
              event.stopPropagation();
              dispatch(AICommunicationsSlice.actions.getAICommunicationsStatusRequest());
            }}
            >
              <SyncOutlined />
            </Button>
          </>
        )}

      </Col>
    </Row>
  );
};

import {
  Col,
  Row,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { merchantDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import Spinner from '@shared/components/Spinner';
import GeneralInfo from './components/GeneralInfo';
import CustomIdentifiers from './components/CustomIdentifiers';
import PaymentProviders from './components/PaymentProviders';
import Settings from './components/Settings';
import Webhooks from './components/Webhooks';

const Detail = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['paymentMerchantPage', 'global', 'error']);
  const merchantDetailSelectorData = useSelector(
    merchantDetailSelector.getData,
  );
  const merchantDetailSelectorError = useSelector(
    merchantDetailSelector.getError,
  );
  const merchantDetailSelectorIsPending = useSelector(
    merchantDetailSelector.getIsPending,
  );
  const disableEditAction = !!merchantDetailSelectorError;

  useEffect(() => {
    dispatch(Creators.getMerchantDetailRequest({ id }));
  }, [dispatch, id]);

  return (
    <div className={classes.collapseColumn}>
      { merchantDetailSelectorIsPending ? (
        <Spinner />
      ) : (
        <>
          <Row gutter={12}>
            <Col span={24}>
              <section data-testid="general-info-section">
                <GeneralInfo
                  t={t}
                  disableEditAction={disableEditAction}
                  initialGeneralInfo={merchantDetailSelectorData}
                />
              </section>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12} md={12} xs={24}>
              <section data-testid="webhooks-section">
                <Webhooks
                  t={t}
                  initialWebhooks={merchantDetailSelectorData?.settings?.webhooks}
                  disableEditAction={disableEditAction}
                />
              </section>
            </Col>
            <Col span={12} md={12} xs={24}>
              <section data-testid="custom-identifiers-section">
                <CustomIdentifiers
                  t={t}
                  disableEditAction={disableEditAction}
                  initialCustomIdentifiers={
                    merchantDetailSelectorData?.customIdentifiers
                  }
                />
              </section>

            </Col>
          </Row>
          <Row>
            <Col span={24} xs={24}>
              <section>
                <PaymentProviders
                  t={t}
                  disableEditAction={disableEditAction}
                  initialPaymentProviders={
                    merchantDetailSelectorData?.paymentProviders
                  }
                  currency={merchantDetailSelectorData?.settings?.currency}
                />
              </section>
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={24}>
              <section data-testid="settings-section">
                <Settings
                  t={t}
                  disableEditAction={disableEditAction}
                  initialSettings={merchantDetailSelectorData?.settings}
                />
              </section>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Detail;

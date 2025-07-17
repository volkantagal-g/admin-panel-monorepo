import { memo, useState } from 'react';
import { Collapse, Spin, Button, Row, Col, Divider, Tag, Empty } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { clientSelector, eligiblePromosSelector, shownPromosSelector } from '@app/pages/Client/Detail/redux/selectors';
import useStyles from './styles';
import { PromoTag } from '@app/pages/Promo/components/PromoTag';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_PROMOS_COMPONENT_COLLAPSE_';

const ENABLE_ELIGIBLE_PROMOS = false;

const Promos = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');
  const classes = useStyles();

  const client = useSelector(clientSelector.getClient);
  const eligiblePromos = useSelector(eligiblePromosSelector.getEligiblePromos);
  const shownPromos = useSelector(shownPromosSelector.getShownPromos);
  const isEligiblePromoPending = useSelector(eligiblePromosSelector.isPending);
  const isShownPromoPending = useSelector(shownPromosSelector.isPending);

  const [showEligiblePromos, setShowEligiblePromos] = useState(false);
  const [showShownPromos, setShowShownPromos] = useState(false);

  const getEligiblePromos = async () => {
    dispatch(Creators.getClientEligiblePromosRequest({ data: { clientId: client?._id } }));
    if (!showEligiblePromos) setShowEligiblePromos(true);
  };

  const getShownPromos = async () => {
    const startDate = moment().subtract(3, 'd').toISOString();
    const endDate = moment().toISOString();
    dispatch(Creators.getClientShownPromosRequest({ data: { client: client?._id, startDate, endDate } }));
    if (!showShownPromos) setShowShownPromos(true);
  };

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
      <Panel
        spinning={!client?._id}
        showArrow={false}
        className={classes.noPanelPadding}
        header={t('PROMO.TITLE')}
        key={`${COLLAPSE_KEY_PREFIX}1`}
      >
        <Spin indicator="Loading..." spinning={!client?._id}>
          <Row>
            <Col span={6} className={classes.labelWrapper}>{t('PROMO.USED_PROMOS')}:</Col>
            <Col span={18} className={classes.tagsWrapper}>
              {client?.usedPromos?.map(promo => <Tag color={promo.bgColor || 'success'} key={promo._id}>{promo?.promoCode}</Tag>)}
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={6} className={classes.labelWrapper}>{t('PROMO.ELIGIBLE_PROMOS')}:</Col>

            <Col span={18} className={classes.tagsWrapper}>
              {!showEligiblePromos && ENABLE_ELIGIBLE_PROMOS && (
                <Button type="secondary" onClick={getEligiblePromos}>
                  {t('PROMO.LOAD')}
                </Button>
              )}

              {showEligiblePromos && isEligiblePromoPending && `${t('LOADING')}...`}

              {showEligiblePromos && eligiblePromos?.map && eligiblePromos?.map(promo => (
                <Tag key={promo._id}>{promo?.promoCode}</Tag>
              ))}
            </Col>

          </Row>

          <Divider />

          <Row>
            <Col span={6} className={classes.labelWrapper}>{t('PROMO.SHOWN_PROMOS')}:</Col>
            <Col span={18} className={classes.tagsWrapper}>
              {!showShownPromos && (
                <Button type="secondary" onClick={getShownPromos}>
                  {t('PROMO.LOAD')}
                </Button>
              )}

              {showShownPromos && isShownPromoPending && `${t('LOADING')}...`}

              {showShownPromos && !isShownPromoPending && shownPromos?.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}

              {showShownPromos && !isShownPromoPending && shownPromos?.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}

              {showShownPromos && shownPromos?.map(promo => (
                <PromoTag promo={promo} hasRedirect />
              ))}
            </Col>
          </Row>
        </Spin>
      </Panel>
    </Collapse>
  );
};

export default memo(Promos);

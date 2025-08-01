import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get, isEmpty } from 'lodash';
import { Col, Divider, Row, Tag, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import { orderDetailSelector } from '../../redux/selectors';
import { LANGUAGE_CODES } from '@shared/shared/constants';
import { currencyFormat } from '@shared/utils/localization';
import { formatBasketProducts } from './utils';
import { getTableColumns } from './config';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { Space } from '@shared/components/GUI';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const PromoTag = ({ className, promoCode, ...otherProps }) => {
  return (
    <Tag className={className} {...otherProps}>
      {promoCode}
    </Tag>
  );
};

const ProductList = () => {
  const { Can, canAccess } = usePermission();
  const { t } = useTranslation('marketOrderPage');

  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const isoCountryCode = get(orderDetail, 'country.currency.code.alpha', 'TRY');
  const { format: currencyFormatter } = currencyFormat({
    currency: isoCountryCode,
    maxDecimal: 4,
  });

  const classes = useStyles();
  const columns = getTableColumns(t, classes, currencyFormatter);

  const localeCode = orderDetail?.country?.defaultLanguageCode;
  const isUsOrder =
    localeCode?.toUpperCase() === LANGUAGE_CODES.US?.toUpperCase();
  const hasProvision = !isEmpty(get(orderDetail, 'provision', {}));

  const totalVatAmount = currencyFormatter(
    get(orderDetail, 'basket.calculation.totalVatAmount', 0),
  );
  const totalWeight = get(orderDetail, 'basket.calculation.totalWeight', 0);
  const totalVolume = get(orderDetail, 'basket.calculation.totalVolume', 0);
  const totalBagFee = currencyFormatter(
    get(orderDetail, 'basket.calculation.totalBagFee', 0),
  );
  const totalDeliveryFee = currencyFormatter(
    get(orderDetail, 'basket.calculation.totalDeliveryFee', 0),
  );
  const chargedAmount = get(
    orderDetail,
    'basket.calculation.totalChargedAmount',
    0,
  );
  const totalDiscountAmount = currencyFormatter(
    get(orderDetail, 'basket.calculation.totalDiscountAmount', 0),
  );
  const totalTipAmount = currencyFormatter(
    get(orderDetail, 'basket.calculation.totalTipAmount', 0),
  );
  const updatedBasketAmount = currencyFormatter(
    get(orderDetail, 'basket.calculation.totalAmount', 0),
  );
  const totalGetirFinanceAmount = get(orderDetail, 'basket.calculation.totalGetirFinanceAmount', 0);
  const basketAmount = currencyFormatter(
    get(
      orderDetail,
      hasProvision
        ? 'provision.initialTotalAmount'
        : 'basket.calculation.totalAmount',
    ),
  );
  const aAndmTaxExcluded = currencyFormatter(
    get(orderDetail, 'financial.aAndmTaxExcluded', 0),
  );
  const grossMarginTaxExcluded = currencyFormatter(
    get(orderDetail, 'financial.grossMarginTaxExcluded', 0),
  );
  const netRevenueTaxExcluded = currencyFormatter(
    get(orderDetail, 'financial.netRevenueTaxExcluded', 0),
  );
  const serviceFee = currencyFormatter(
    get(orderDetail, 'basket.serviceFee.applied', 0),
  );
  const products = formatBasketProducts(get(orderDetail, 'basket'));
  const appliedPromos = get(orderDetail, 'promo.applied', []);
  const gorillasInfo = get(orderDetail, 'integrations.items.gorillas', {});

  const totalChargedAmount = chargedAmount + totalGetirFinanceAmount;

  return (
    <Space className="p-2" title={t('PREVIOUS_ORDER.TITLE')}>
      <AntTableV2
        className={classes.table}
        data-testid="product-list"
        data={products || []}
        columns={columns}
        loading={isPending}
        scroll={{ y: 300 }}
        expandRowByClick
        size="small"
      />
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={20}>
          <p className={classes.textAlignRight}>
            {t('TIMELINE.WEIGHT')} : {(totalWeight / 1000).toFixed(2)}kg
          </p>
          <p className={classes.textAlignRight}>
            {t('TIMELINE.VOLUME')} : {totalVolume} cm<sup>3</sup>
          </p>
        </Col>
        <Can permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_FINANCIAL_INFO}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={4}
            className={classes.textAlignRight}
          >
            <Col className={classes.colInfo}>
              <Col className={classes.colMain}>
                <span className={classes.col1}>
                  {isUsOrder ? t('SALES_TAX') : t('VAT')} :
                </span>
                <span className={classes.col2}>{totalVatAmount}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('BASKET_AMOUNT')} :</span>
                <span className={classes.col2}>{basketAmount}</span>
              </Col>
              {hasProvision && (
                <Col className={classes.colMain}>
                  <span className={classes.col1}>
                    {t('UPDATED_BASKET_AMOUNT')} :
                  </span>
                  <span className={classes.col2}>{updatedBasketAmount}</span>
                </Col>
              )}
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('BAG_PRICE')} :</span>
                <span className={classes.col2}>{totalBagFee}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('DELIVERY_FEE')} :</span>
                <span className={classes.col2}>{totalDeliveryFee}</span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>
                  {!isEmpty(gorillasInfo) && (
                    <Tooltip
                      title={t('SERVICE_FEE_TOOLTIP_INFO')}
                      color="#5D3EBD"
                    >
                      <InfoCircleFilled />
                    </Tooltip>
                  )}
                  {t('SERVICE_FEE')} :
                </span>
                <span className={classes.col2}>{serviceFee}</span>
              </Col>
              {totalDiscountAmount > 0 && (
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('DISCOUNT_AMOUNT')} :</span>
                  <Tag className={classes.successTag}>
                    {totalDiscountAmount}
                  </Tag>
                </Col>
              )}
              {appliedPromos?.length > 0 && (
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('PROMO')} :</span>
                  {appliedPromos.map(
                    appliedPromo => appliedPromo?.promo?.promoCode &&
                      (canAccess(permKey.PAGE_PROMO_DETAIL) ? (
                        <Link
                          target="_blank"
                          key={appliedPromo?.promo?._id}
                          to={ROUTE.PROMO_DETAIL.path.replace(
                            ':id',
                            appliedPromo?.promo?._id,
                          )}
                        >
                          <PromoTag
                            promoCode={appliedPromo?.promo?.promoCode}
                            className={classes.successTag}
                          />
                        </Link>
                      ) : (
                        <PromoTag
                          key={appliedPromo?.promo?._id}
                          promoCode={appliedPromo?.promo?.promoCode}
                          className={classes.successTag}
                        />
                      )),
                  )}
                </Col>
              )}
              {totalGetirFinanceAmount > 0 && (
              <Col className={classes.colMain}>
                <span className={classes.col1}>
                  {t('TIMELINE.GETIR_MONEY_CHARGED_AMOUNT')} :
                </span>
                <span className={classes.col2}>
                  {currencyFormatter(totalGetirFinanceAmount)}
                </span>
              </Col>
              )}
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('CARD_AMOUNT')} :</span>
                <span className={classes.col2}>
                  {currencyFormatter(chargedAmount)}
                </span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>
                  {t('TIMELINE.TOTAL_CHARGED_AMOUNT')} :
                </span>
                <span className={classes.col2}>
                  {currencyFormatter(totalChargedAmount)}
                </span>
              </Col>
              <Col className={classes.colMain}>
                <span className={classes.col1}>{t('TIP_AMOUNT')} :</span>
                <span className={classes.col2}>{totalTipAmount}</span>
              </Col>
              <Divider />
              <Can
                permKey={
                  permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_UNIT_INCOME_INFO
                }
              >
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('NET_REVENUE')} :</span>
                  <span className={classes.col2}>{netRevenueTaxExcluded}</span>
                </Col>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>{t('GROSS_MARGIN')} :</span>
                  <span className={classes.col2}>{grossMarginTaxExcluded}</span>
                </Col>
                <Col className={classes.colMain}>
                  <span className={classes.col1}>
                    {t('A_AND_M_TAX_EXCLUDED')} :
                  </span>
                  <span className={classes.col2}>{aAndmTaxExcluded}</span>
                </Col>
              </Can>
            </Col>
          </Col>
        </Can>
      </Row>
    </Space>
  );
};

export default memo(ProductList);

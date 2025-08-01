import {
  Col,
  Row,
  Divider,
  Table,
  InputNumber,
  DatePicker,
  Checkbox,
  Typography,
} from 'antd';
import { useMemo } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import {
  MARKET_ORDER_FEEDBACK_SOURCE,
  MARKET_ORDER_REFUND,
  dateFeedbackReasonIds,
  marketOrderActions,
} from '@app/pages/MarketOrder/OrderDetail/constants';
import { getLangKey } from '@shared/i18n';
import AntTextArea from '@shared/components/UI/AntTextArea';
import useProducts from '../hooks/useProducts';
import GroupReasons from '../components/GroupReasons';
import useStyles from './FeedbackFlow.styles';
import { orderRefundReasonsSelector } from '../../../redux/selectors';
import { getObjectMapFromArr } from '../../../utils';

const { Title } = Typography;

const FeedbackFlow = ({
  isFeedbackDetails,
  refundType,
  feedback,
  handleFeedback,
  feedbackProducts,
  formErrors = {},
  queryProducts,
  action,
}) => {
  const { t } = useTranslation('marketOrderPage');
  const { products, allProductsRefunded } = useProducts();
  const styles = useStyles();
  const REQUIRED_LABEL = t('AGENT_ACTIONS.MODAL.REQUIRED_FIELD');
  const { mainReasons, subReasons } = useSelector(orderRefundReasonsSelector.getData);
  const subReasonsMap = getObjectMapFromArr(subReasons);
  const mainReasonsMap = getObjectMapFromArr(mainReasons);
  const selectedMainReason = mainReasonsMap?.[feedback.mainReason];
  const selectedSubReason = subReasonsMap?.[feedback?.subReason];
  const showBestBeforeDate = Object.values(dateFeedbackReasonIds).includes(Number(feedback?.subReason));
  const isBestBeforeDatePassed = Number(feedback?.subReason) === dateFeedbackReasonIds.BEST_BEFORE_DATE_PASSED;
  const disabledDate = isBestBeforeDatePassed
    ? moment().endOf('day')
    : moment().add(15, 'days');
  const sktLabel = selectedSubReason?.[getLangKey()];
  const columns = useMemo(() => {
    const cols = [
      {
        title: t('AGENT_ACTIONS.MODAL.REFUND.TABLE.PRODUCT'),
        key: 'product',
        dataIndex: 'product',
        width: 110,
        render: (_, product) => {
          return <strong>{product.name[getLangKey()]}</strong>;
        },
      },
      {
        title: t('QTY'),
        key: 'count',
        dataIndex: 'count',
        width: 136,
        render: (_, product) => {
          const productToUpdateIndex = feedbackProducts.findIndex(
            pr => pr.product === product.product,
          );
          const defaultValue = (action === marketOrderActions.discount ? queryProducts?.[productToUpdateIndex]?.quantity : null) ?? (isFeedbackDetails
            ? feedbackProducts[productToUpdateIndex]?.count
            : 0);
          return (
            <InputNumber
              disabled={isFeedbackDetails}
              aria-label={`market-order-feedback-action-products-table-quantity-input-${product.product}`}
              min={0}
              max={product.count}
              defaultValue={defaultValue}
              type="number"
              onChange={value => {
                if (productToUpdateIndex === -1) {
                  handleFeedback('products', [
                    ...feedbackProducts,
                    { product: product.product, count: value },
                  ]);
                  return;
                }

                const aux = feedbackProducts;
                if (value === 0) {
                  aux.splice(productToUpdateIndex, 1);
                }
                else {
                  aux[productToUpdateIndex].count = value;
                }

                handleFeedback('products', [...aux]);
              }}
            />
          );
        },
      },
    ];

    return cols;
  }, [t, isFeedbackDetails, feedbackProducts, handleFeedback, action, queryProducts]);

  return (
    <>
      <GroupReasons
        isFeedbackDetails={isFeedbackDetails}
        title={t('AGENT_ACTIONS.MODAL.FEEDBACK.SOURCE')}
        reasons={MARKET_ORDER_FEEDBACK_SOURCE}
        handleRadioChange={value => handleFeedback('feedback', { ...feedback, source: value })}
        selected={feedback.source}
        hasError={!!formErrors?.feedback?.source}
      />

      {feedback.source && (
        <GroupReasons
          divider
          isFeedbackDetails={isFeedbackDetails}
          title={t('AGENT_ACTIONS.MODAL.FEEDBACK.MAIN_REASON')}
          reasons={mainReasons}
          handleRadioChange={value => handleFeedback('feedback', {
            ...feedback,
            subReason: null,
            mainReason: value,
          })}
          selected={feedback.mainReason}
          hasError={!!formErrors?.feedback?.mainReason}
        />
      )}

      {feedback.mainReason && (
        <GroupReasons
          divider
          isFeedbackDetails={isFeedbackDetails}
          title={t('AGENT_ACTIONS.MODAL.FEEDBACK.SUB_REASON')}
          reasons={subReasons?.filter(
            subReason => subReason.parentFeedbackReasonId === feedback.mainReason,
          )}
          group="subReason"
          handleRadioChange={value => handleFeedback('feedback', {
            ...feedback,
            subReason: value,
            skt: null,
          })}
          selected={feedback.subReason}
          hasError={!!formErrors?.feedback?.subReason}
        />
      )}

      {feedback.mainReason && (
        <>
          <Divider />
          <Title level={5}>
            {t('AGENT_ACTIONS.MODAL.FEEDBACK.NOTE')}
            {!!formErrors?.feedback?.note && (
              <span className={styles.fieldRequired}>({REQUIRED_LABEL})</span>
            )}
          </Title>
          <Row>
            <Col md={24}>
              <AntTextArea
                disabled={isFeedbackDetails}
                autoComplete="off"
                placeholder={t('AGENT_ACTIONS.MODAL.FEEDBACK.NOTE_PLACEHOLDER')}
                value={feedback.note}
                onChange={e => {
                  handleFeedback('feedback', {
                    ...feedback,
                    note: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
        </>
      )}

      {showBestBeforeDate && (
        <>
          <Divider />
          <Title level={5}>
            {sktLabel}
            {!!formErrors?.feedback?.skt && (
              <span className={styles.fieldRequired}>({REQUIRED_LABEL})</span>
            )}
          </Title>
          <DatePicker
            disabled={isFeedbackDetails}
            format="DD/MM/YYYY"
            value={feedback.skt ? moment(feedback.skt) : ''}
            onChange={momentDate => {
              handleFeedback('feedback', {
                ...feedback,
                skt: momentDate?.toISOString() || momentDate,
              });
            }}
            disabledDate={current => current && current > disabledDate}
          />
        </>
      )}

      {feedback.mainReason && (
        <>
          <Divider />
          <Checkbox.Group
            disabled={isFeedbackDetails}
            data-testid="market-order-feedback-action-checkboxes-group"
            className={styles.checkBoxGroup}
            name="market-order-feedback-action-checkboxes"
            onChange={checked => {
              const isFranchiseFault = checked.includes('isFranchiseFault');
              const isProductsExchanged = checked.includes(
                'isProductsExchanged',
              );
              handleFeedback('feedback', {
                ...feedback,
                isFranchiseFault,
                isProductsExchanged,
              });
            }}
            options={[
              {
                label: t('AGENT_ACTIONS.MODAL.FEEDBACK.FRANCHISE_FAULT'),
                value: 'isFranchiseFault',
              },
              {
                label: t('AGENT_ACTIONS.MODAL.FEEDBACK.EXCHANGE'),
                value: 'isProductsExchanged',
              },
            ]}
            defaultValue={Object.keys(feedback).filter(
              key => ['isFranchiseFault', 'isProductsExchanged'].includes(key) &&
                feedback[key] &&
                key,
            )}
          />
        </>
      )}

      {(refundType !== MARKET_ORDER_REFUND || allProductsRefunded) &&
        [
          'MISSING_WRONG_PRODUCT',
          'PRODUCT_ISSUE',
        ].includes(selectedMainReason?.key) && (
        <>
          <Divider />
          <Title level={5}>
            {t('PRODUCTS')}
            {!!formErrors?.products && (
            <span className={styles.fieldRequired}>({REQUIRED_LABEL})</span>
            )}
          </Title>
          <Table
            isFeedbackDetails={isFeedbackDetails}
            size="middle"
            columns={columns}
            dataSource={products}
            pagination={false}
            expandable={{ defaultExpandAllRows: true }}
            data-testid="market-order-feedback-action-products-table"
          />
        </>
      )}
    </>
  );
};

export default FeedbackFlow;

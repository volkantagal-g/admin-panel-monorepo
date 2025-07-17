import { Col, Divider, Modal, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  FINAL_ALERT_TEXT,
  RULE_NAME_TRANSLATER,
  RULE_TYPES_CONVERTER,
  SELECT_TITLE_ICONS,
} from '../../constants';

import useStyles from '../../styles';
import FamilyLeadProduct from '../FamilyLeadProduct';
import { getSelectedCountryCurrencySymbol } from '@shared/redux/selectors/countrySelection';

const { Title, Text } = Typography;

const GuardrailDetail = ({
  productData,
  openGuardrailDetail,
  setOpenGuardrailDetail,
}) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');
  const classes = useStyles();
  const countryCurrency = getSelectedCountryCurrencySymbol();

  return (
    <Modal
      title={t('RECOMMENDED_PRICE_DETAIL')}
      visible={openGuardrailDetail}
      footer={null}
      closable
      onCancel={() => setOpenGuardrailDetail(false)}
      width={
        productData?.guardrail_check || productData?.finalAlert ? 1100 : 900
      }
    >
      {productData && (
        <>
          <Row>
            <Title level={5}>{t('GUARDRAIL_DETAIL')}:</Title>
          </Row>
          <Row className={classes.guardrailDetailRow}>
            <Col span={3} className={classes.guardrailDetailCol}>
              <div className={classes.guardrailDetailDivider}>
                {t('CURRENT_PRICE')}
              </div>
              <Row className={classes.guardrailDetailColTitle}>
                <div className={classes.guardrailDetailPrice}>
                  {countryCurrency}{' '}
                  {productData?.price && productData?.price.toFixed(2)}
                </div>
              </Row>
            </Col>
            <Col span={2} className={classes.guardrailRightIcon}>
              <div>
                <Row className={classes.activeRule}>
                  <Col className={classes.activeRuleContent}>
                    <div>
                      {RULE_NAME_TRANSLATER[productData?.calculated_rule]}-
                    </div>
                    <div>
                      {productData?.calculated_rule !==
                        RULE_TYPES_CONVERTER.INDEX && <span>%</span>}
                      {productData?.calculated_rule_value}
                    </div>
                  </Col>
                  <Col>
                    {productData?.calculated_rule_inelastic && (
                      <div className={classes.inelasticStatus}>
                        {t('INELASTIC')}
                      </div>
                    )}
                    {productData?.calculated_rule_competitor &&
                      productData?.calculated_rule !==
                        RULE_TYPES_CONVERTER.MARGIN && (
                        <div className={classes.competitorName}>
                          ({productData?.calculated_rule_competitor})
                        </div>
                    )}
                  </Col>
                </Row>
              </div>
              <img
                className={classes.guardrailDetailImage}
                alt="right"
                src={SELECT_TITLE_ICONS.right}
              />
            </Col>
            <Col span={3} className={classes.guardrailDetailCol}>
              <div className={classes.guardrailDetailDivider}>
                {t('RULE_APPLIED')}
              </div>
              <Row className={classes.guardrailDetailColTitle}>
                <div className={classes.guardrailDetailPrice}>
                  {countryCurrency}{' '}
                  {productData?.result && productData?.result?.toFixed(2)}
                </div>
              </Row>
            </Col>
            {productData?.guardrail_check && (
              <>
                <Col span={3} className={classes.guardrailRightIcon}>
                  <div>
                    <Row className={classes.activeRule}>
                      <Col className={classes.activeRuleContent}>
                        <div>
                          {productData?.guardrail_fail &&
                            RULE_NAME_TRANSLATER[productData?.guardrail_fail]}
                          -
                        </div>
                        <div>
                          {productData?.guardrail_fail_max &&
                            productData?.guardrail_fail ===
                              RULE_TYPES_CONVERTER.PRICE_CHANGE && (
                              <span>(%{productData?.guardrail_fail_max})</span>
                          )}
                        </div>
                        {productData?.guardrail_fail_max &&
                          productData?.guardrail_fail_min &&
                          productData?.guardrail_fail ===
                            RULE_TYPES_CONVERTER.INDEX && (
                            <div className={classes.guardrailFailMinMax}>
                              ({productData?.guardrail_fail_min}-
                              {productData?.guardrail_fail_max})
                            </div>
                        )}
                        {productData?.guardrail_fail_min &&
                          productData?.guardrail_fail ===
                            RULE_TYPES_CONVERTER.MIN_MARGIN && (
                            <div className={classes.guardrailFailMinMax}>
                              %{productData?.guardrail_fail_min}
                            </div>
                        )}
                      </Col>
                      <Col>
                        {productData?.guardrail_fail ===
                          RULE_TYPES_CONVERTER.INDEX &&
                          productData?.guardrail_fail_competitor && (
                            <div className={classes.competitorName}>
                              ({productData?.guardrail_fail_competitor})
                            </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                  <img
                    className={classes.guardrailDetailImage}
                    alt="right"
                    src={SELECT_TITLE_ICONS.right}
                  />
                </Col>
                <Col span={3} className={classes.guardrailDetailCol}>
                  <div className={classes.guardrailDetailDivider}>
                    {t('GUARDRAIL_APPLIED')}
                  </div>
                  <Row className={classes.guardrailDetailColTitle}>
                    <div className={classes.guardrailDetailPrice}>
                      {countryCurrency}{' '}
                      {productData?.guardrail_result &&
                        productData?.guardrail_result?.toFixed(2)}
                    </div>
                  </Row>
                </Col>{' '}
              </>
            )}

            {productData?.final_alert ? (
              <>
                <Col span={2} className={classes.guardrailRightIcon}>
                  <div>
                    <Row className={classes.activeRule}>
                      <Col className={classes.activeRuleContent}>
                        {FINAL_ALERT_TEXT}
                      </Col>
                    </Row>
                  </div>
                  <img
                    className={classes.guardrailDetailImage}
                    alt="right"
                    src={SELECT_TITLE_ICONS.right}
                  />
                </Col>
                <Col span={3} className={classes.guardrailDetailCol}>
                  <div className={classes.guardrailDetailDivider}>
                    {t('FINAL_ALERT')}
                  </div>
                  <Row className={classes.guardrailDetailColTitle}>
                    <div className={classes.guardrailDetailPrice}>
                      {countryCurrency}{' '}
                      {productData?.price && productData?.price?.toFixed(2)}
                    </div>
                  </Row>
                </Col>{' '}
              </>
            ) : (
              <>
                <Col span={2} className={classes.guardrailRightIcon}>
                  <div>
                    <Row className={classes.activeRule}>
                      <Col className={classes.activeRuleContent}>
                        <div>
                          {productData.final_result -
                            (productData?.guardrail_check
                              ? productData.guardrail_result
                              : productData.result) >
                            0 && '+'}
                          {(
                            productData.final_result -
                            (productData?.guardrail_check
                              ? productData.guardrail_result
                              : productData.result)
                          )?.toFixed(2)}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <img
                    className={classes.guardrailDetailImage}
                    alt="right"
                    src={SELECT_TITLE_ICONS.right}
                  />
                </Col>
                <Col span={3} className={classes.guardrailDetailCol}>
                  <div className={classes.guardrailDetailDivider}>
                    {t('ROUND_APPLIED')}
                  </div>
                  <Row className={classes.guardrailDetailColTitle}>
                    <div className={classes.guardrailDetailPrice}>
                      {countryCurrency}{' '}
                      {productData?.final_result &&
                        productData?.final_result?.toFixed(2)}
                    </div>
                  </Row>
                </Col>
              </>
            )}
          </Row>
          {productData?.family_lead_product !== '' && (
            <>
              <Divider />
              <Row>
                <Title level={5}>{t('FAMILY_LEAD_PRODUCT_DETAIL')}:</Title>
              </Row>
              <Row className={classes.familyLeadProduct}>
                <Col span={5}>
                  <FamilyLeadProduct
                    familyData={productData?.family_lead_product}
                    classes={classes}
                  />
                </Col>
                <Col className={classes.familyDetail}>
                  <Row className={classes.familyDetailRow}>
                    <Text strong className={classes.familyDetailTitle}>
                      {t('FAMILY_NAME')}:
                    </Text>
                    <div className={classes.familyDetailValue}>
                      {productData?.family_id}
                    </div>
                  </Row>
                  <Row className={classes.familyDetailRow}>
                    <Text strong className={classes.familyDetailTitle}>
                      {t('CURRENT_PRICE')}:
                    </Text>
                    <div className={classes.familyDetailValue}>
                      {countryCurrency}{' '}
                      {productData?.family_lead_product?.price?.toFixed(2)}
                    </div>
                  </Row>
                  <Row className={classes.familyDetailRow}>
                    <Text strong className={classes.familyDetailTitle}>
                      {t('RECOMMENDED_PRICE')}:
                    </Text>
                    <div className={classes.familyDetailValue}>
                      {countryCurrency}{' '}
                      {productData?.family_lead_product?.family_price?.toFixed(
                        2,
                      )}
                    </div>
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </Modal>
  );
};
export default GuardrailDetail;

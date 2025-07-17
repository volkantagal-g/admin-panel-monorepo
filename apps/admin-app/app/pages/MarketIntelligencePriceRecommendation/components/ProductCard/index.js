import {
  Col,
  Row,
  Image,
  Modal,
  Divider,
  Descriptions,
  Table,
  message,
} from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import copy from 'copy-to-clipboard';
import CheckableTag from 'antd/lib/tag/CheckableTag';

import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';

import MatchedProduct from '../MatchedProduct';
import BundleProduct from '../BundleProduct';

import { DOMAIN_TYPE_LIST, FILTER_KEY } from '../../constants';
import { guardrailColumns, rulesetColumns } from './tableColumns';
import { stateSelector } from '../../redux/selectors';
import { COLLAPSE_LIST } from './collapseList';

import useStyles from '../../styles';

const ProductCard = ({ productData, openDetail, setOpenDetail }) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const classes = useStyles();

  const ruleData = useSelector(stateSelector.ruleData);
  const guardrailData = useSelector(stateSelector.guardrailData);
  const isLoadingPricingRules = useSelector(stateSelector.isLoadingPricingRules);

  const currentGroupName = productData?.group_name?.toLowerCase();

  const copyToClipBoard = copyText => {
    copy(copyText);
    message.success(`${t('COPIED_BARCODE')} ${copyText}`, 1);
  };

  return (
    <Modal
      title={t('PRODUCT_DETAIL')}
      visible={openDetail}
      footer={null}
      closable
      onCancel={() => setOpenDetail(false)}
      className={
        productData && productData?.competitor_product_infos !== ''
          ? classes.producCardModal
          : ''
      }
      width={600}
    >
      {productData && (
        <>
          <Row className={classes.productCardProfile}>
            <Col span={10} className={classes.productCardProfileImage}>
              <Image
                src={productData?.picurl}
                fallback={noPicture}
                height="100px"
              />
            </Col>
            <Col span={14}>
              <Row className={classes.productCardProfileDetail}>
                <div className={classes.productCardName}>
                  <Link
                    to={`/marketProduct/detail/${productData.getir_product_id}`}
                    className={classes.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {productData?.product_name}
                  </Link>
                </div>
              </Row>
            </Col>
          </Row>
          <Divider orientation="left" className={classes.productCardDivider}>
            {t('PRODUCT_SPECIFICATIONS')}
          </Divider>
          <Row>
            <Descriptions colon={false} layout="vertical" column={4}>
              <Descriptions.Item
                label={(
                  <div className={classes.productCardTag}>
                    {t('CATEGORY_ROLE')}
                  </div>
                )}
              >
                {productData[FILTER_KEY.categoryRole] &&
                  productData[FILTER_KEY.categoryRole]}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={classes.productCardTag}>{t('L1_CATEGORY')}</div>
                }
              >
                {productData[FILTER_KEY.globalCategory] &&
                  productData[FILTER_KEY.globalCategory]}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={classes.productCardTag}>{t('L2_CATEGORY')}</div>
                }
              >
                {productData[FILTER_KEY.categoryPlanning] &&
                  productData[FILTER_KEY.categoryPlanning]}
              </Descriptions.Item>
              <Descriptions.Item
                label={<div className={classes.productCardTag}>{t('KVI')}</div>}
              >
                {productData[FILTER_KEY.kvi] && productData[FILTER_KEY.kvi]}
              </Descriptions.Item>
            </Descriptions>
          </Row>
          <Row>
            <Descriptions colon={false} layout="vertical" column={4}>
              <Descriptions.Item
                label={<div className={classes.productCardTag}>{t('BRAND')}</div>}
              >
                {productData[FILTER_KEY.brand] && productData[FILTER_KEY.brand]}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={classes.productCardTag}>{t('MANUFACTURER')}</div>
                }
              >
                {productData[FILTER_KEY.manufacturer] &&
                  productData[FILTER_KEY.manufacturer]}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={classes.productCardTag}>{t('SUPPLIER')}</div>
                }
              >
                <ul className={classes.productCardUl}>
                  {productData[FILTER_KEY.supplier] &&
                    productData[FILTER_KEY.supplier] !== '' &&
                    productData[FILTER_KEY.supplier] &&
                    productData[FILTER_KEY.supplier]?.map(supplier => (
                      <li>{supplier}</li>
                    ))}
                </ul>
              </Descriptions.Item>
            </Descriptions>
          </Row>
          <Row>
            <Descriptions colon={false} layout="vertical">
              <Descriptions.Item
                label={<div className={classes.productCardTag}>{t('FAMILY')}</div>}
              >
                {productData[FILTER_KEY.family] !== '' ? productData[FILTER_KEY.family] : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={classes.productCardTag}>{t('BARCODES')}</div>
                }
              >
                <div>
                  {productData &&
                    productData?.barcodes &&
                    productData?.barcodes?.map(tag => (
                      <CheckableTag
                        key={tag}
                        className={classes.barcodeLink}
                        onChange={() => copyToClipBoard(tag)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Row>
          {productData &&
            productData?.bundle_product_infos &&
            productData?.bundle_product_infos?.length > 0 &&
            productData?.bundle_product_infos !== '' && (
            <>
              <Divider
                orientation="left"
                className={classes.productCardDivider}
              >
                {t('BUNDLE_PRODUCTS')}
              </Divider>
              <Col className={classes.productCardMatchedCol}>
                {productData?.bundle_product_infos.map(value => {
                  return (
                    <BundleProduct bundleData={value} classes={classes} />
                  );
                })}
              </Col>
            </>
          )}

          {productData && currentGroupName && ruleData[currentGroupName] && (
            <>
              <Divider
                orientation="left"
                className={classes.productCardDivider}
              >
                {`${t('RULESETS_FOR')} ${
                  COLLAPSE_LIST.find(
                    element => element?.ruleName === currentGroupName,
                  )?.collapseName
                }`}
              </Divider>
              <Table
                size="small"
                bordered
                className={classes.elasticTable}
                loading={isLoadingPricingRules}
                columns={rulesetColumns}
                dataSource={ruleData[currentGroupName]}
                width={600}
              />
            </>
          )}

          {productData &&
            currentGroupName &&
            guardrailData[currentGroupName] && (
            <>
              <Divider
                orientation="left"
                className={classes.productCardDivider}
              >
                {`${t('GUARDRAILS_FOR')} ${
                  COLLAPSE_LIST.find(
                    element => element?.ruleName === currentGroupName,
                  )?.collapseName
                }`}
              </Divider>
              <Table
                size="small"
                bordered
                className={classes.elasticTable}
                loading={isLoadingPricingRules}
                columns={guardrailColumns}
                dataSource={guardrailData[currentGroupName]}
                width={600}
              />
            </>
          )}
          {productData &&
            productData?.competitor_product_infos &&
            productData?.competitor_product_infos !== '' && (
            <>
              <Divider
                orientation="left"
                className={classes.productCardDivider}
              >
                {`${
                  productData?.is_direct_match ? t('DIRECT') : t('INDIRECT')
                } ${t('MATCHED_PRODUCTS')}`}
              </Divider>
              <Col className={classes.productCardMatchedCol}>
                <MatchedProduct
                  competitor={DOMAIN_TYPE_LIST.GETIR}
                  classes={classes}
                  productData={productData}
                  isCompetitor={false}
                />
                {Object.entries(productData?.competitor_product_infos).map(
                  ([key, value]) => {
                    return (
                      <MatchedProduct
                        matchedData={value}
                        competitor={key}
                        classes={classes}
                        productData={productData}
                        isCompetitor
                      />
                    );
                  },
                )}
              </Col>
            </>
          )}
        </>
      )}
    </Modal>
  );
};
export default ProductCard;

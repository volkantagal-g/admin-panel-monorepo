import { Col, Row, Image, Modal, Tag, Divider, Descriptions } from 'antd';

import { Link } from 'react-router-dom';

import useStyles from '../../styles';
import noPicture from '../../assets/img/no-pictures.png';
import MatchedProduct from '../MatchedProduct';

const ProductCard = ({ productData, t, openDetail, setOpenDetail }) => {
  const classes = useStyles();
  return (
    <Modal
      title={t('PRODUCT_DETAIL')}
      visible={openDetail}
      footer={null}
      closable
      onCancel={() => setOpenDetail(false)}
      className={
        productData && productData.competitor_product_infos !== ''
          ? classes.producCardModal
          : ''
      }
    >
      {productData && (
        <Row className={classes.productCardContainer}>
          <Col className={classes.productCardProfile}>
            <Image
              src={productData?.picurl}
              fallback={noPicture}
              height="100px"
            />
            <div className={classes.productCardName}>
              <Link
                to={`/marketProduct/detail/${productData.product_id}`}
                className={classes.productCardLink}
              >
                {productData.product_name}
              </Link>
            </div>
          </Col>
          <Divider
            orientation="left"
            className={classes.productCardDivider}
          >
            {t('PRODUCT_DETAIL')}
          </Divider>
          <Col>
            <Descriptions colon={false} layout="vertical">
              <Descriptions.Item
                label={(
                  <Tag className={classes.productCardTag} color="volcano">
                    {t('CATEGORY')}
                  </Tag>
                )}
              >
                {productData.category}
              </Descriptions.Item>
              <Descriptions.Item
                label={(
                  <Tag className={classes.productCardTag} color="orange">
                    {t('SUBCATEGORY')}
                  </Tag>
                )}
              >
                {productData.subcategory}
              </Descriptions.Item>
              <Descriptions.Item
                label={(
                  <Tag className={classes.productCardTag} color="green">
                    {t('MANUFACTURER')}
                  </Tag>
                )}
              >
                {productData.manufacturer_name}
              </Descriptions.Item>
              <Descriptions.Item
                label={(
                  <Tag className={classes.productCardTag} color="blue">
                    {t('BRAND')}
                  </Tag>
                )}
              >
                {productData.brand_name}
              </Descriptions.Item>
              <Descriptions.Item
                label={(
                  <Tag className={classes.productCardTag} color="purple">
                    {t('SUPPLIER')}
                  </Tag>
                )}
              >
                <ul className={classes.productCardUl}>
                  {productData?.supplier_name?.map(supplier => (
                    <li>{supplier}</li>
                  ))}
                </ul>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          {productData && productData.competitor_product_infos !== '' && (
            <>
              <Divider
                orientation="left"
                className={classes.productCardDivider}
              >
                {t('MATCHED_PRODUCTS')}
              </Divider>
              <Col className={classes.productCardMatchedCol}>
                {Object.entries(productData.competitor_product_infos).map(
                  ([key, value]) => {
                    return (
                      <MatchedProduct
                        matchedData={value}
                        competitor={key}
                        classes={classes}
                        t={t}
                      />
                    );
                  },
                )}
              </Col>
            </>
          )}
        </Row>
      )}
    </Modal>
  );
};
export default ProductCard;

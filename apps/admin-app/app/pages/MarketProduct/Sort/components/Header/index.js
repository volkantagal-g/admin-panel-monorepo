import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { toggleCategoryActivenessSwitchSelector } from '../../redux/selectors';

const ProductSortHeader = () => {
  const dispatch = useDispatch();
  const areInactivesShowing = useSelector(toggleCategoryActivenessSwitchSelector.getData);
  const { t } = useTranslation('marketProductPage');
  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PRODUCT_SORT.TITLE')}
        />
      </Col>
      <Col>
        <Row>
          <Col className="mt-1px pr-2px">
            {`${t('PRODUCT_SORT.INACTIVES')}:`}
          </Col>
          <Col>
            <Switch
              checked={areInactivesShowing}
              onChange={value => {
                dispatch(Creators.toggleCategoryActivenessSwitch({ data: value }));
              }}
              checkedChildren={t('PRODUCT_SORT.SHOW')}
              unCheckedChildren={t('PRODUCT_SORT.HIDE')}
              className={areInactivesShowing ? 'bg-success' : 'bg-danger'}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductSortHeader;

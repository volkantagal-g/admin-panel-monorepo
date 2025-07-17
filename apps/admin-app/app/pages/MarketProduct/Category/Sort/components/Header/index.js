import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { toggleCategoryActivenessSwitchSelector, toggleCategoryListablesSwitchSelector } from '../../redux/selectors';

const CategorySortHeader = () => {
  const dispatch = useDispatch();
  const areInactivesShowing = useSelector(toggleCategoryActivenessSwitchSelector.getData);
  const areListablesShowing = useSelector(toggleCategoryListablesSwitchSelector.getData);
  const { t } = useTranslation('marketProductCategoryPage');
  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('CATEGORY_SORT.TITLE')}
        />
      </Col>
      <Col>
        <Row>
          <Col className="mt-1px pr-2px">
            {`${t('CATEGORY_SORT.INACTIVES')}:`}
          </Col>
          <Col>
            <Switch
              checked={areInactivesShowing}
              onChange={value => {
                dispatch(Creators.toggleCategoryActivenessSwitch({ data: value }));
              }}
              checkedChildren={t('CATEGORY_SORT.SHOW')}
              unCheckedChildren={t('CATEGORY_SORT.HIDE')}
              className={areInactivesShowing ? 'bg-success' : 'bg-danger'}
            />
          </Col>
          <Col className="mt-1px py-1px ml-3">
            {`${t('CATEGORY_SORT.LISTABLES')}:`}
          </Col>
          <Col>
            <Switch
              checked={areListablesShowing}
              onChange={value => {
                dispatch(Creators.toggleCategoryListablesSwitch({ data: value }));
              }}
              checkedChildren={t('CATEGORY_SORT.SHOW')}
              unCheckedChildren={t('CATEGORY_SORT.HIDE')}
              className={areListablesShowing ? 'bg-success' : 'bg-danger'}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CategorySortHeader;

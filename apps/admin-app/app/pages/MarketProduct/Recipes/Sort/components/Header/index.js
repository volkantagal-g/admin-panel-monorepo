import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { toggleRecipeActivenessSwitchSelector } from '../../redux/selectors';

const RecipeSortHeader = () => {
  const dispatch = useDispatch();
  const areInactivesShowing = useSelector(toggleRecipeActivenessSwitchSelector.getData);
  const { t } = useTranslation('recipesPage');
  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('SORT.TITLE')}
        />
      </Col>
      <Col>
        <Row>
          <Col className="mt-1px pr-2px">
            {`${t('SORT.INACTIVES')}:`}
          </Col>
          <Col>
            <Switch
              checked={areInactivesShowing}
              onChange={value => {
                dispatch(Creators.toggleRecipeActivenessSwitch({ data: value }));
              }}
              checkedChildren={t('SORT.SHOW')}
              unCheckedChildren={t('SORT.HIDE')}
              className={areInactivesShowing ? 'bg-success' : 'bg-danger'}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RecipeSortHeader;

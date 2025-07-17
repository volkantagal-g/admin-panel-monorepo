import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Col, Row, Tabs } from 'antd';
import { debounce } from 'lodash';

import { useInitAndDestroyPage } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { kdsScoreMappingSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import { MultiChoiceMapping, NumberInputMapping } from './components';
import { TabKeyEnum, QuestionTypeEnum, TAB_DEBOUNCE_TIME_MS } from './constant';
import useStyles from './styles';

const { TabPane } = Tabs;

const reduxKey = REDUX_KEY.KDS.SCORE_MAPPING;

const ScoreMapping = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation('kdsScoreMappingPage');

  const data = useSelector(kdsScoreMappingSelector.getData);
  const isPending = useSelector(kdsScoreMappingSelector.getIsPending);

  const [activeTabKey, setActiveTabKey] = useState(TabKeyEnum.MULTIPLE_CHOICE);

  const handleTabChange = key => {
    if (key !== activeTabKey) {
      setActiveTabKey(key);
    }
  };

  useEffect(() => {
    dispatch(Creators.getKdsScoreMappingRequest({ questionType: QuestionTypeEnum[activeTabKey] }));
  }, [dispatch, activeTabKey]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('PAGE_TITLE.KDS.SCORE_MAPPING')}
          />
        </Col>
      </Row>
      <Row>
        <Tabs className={classes.tabWrapper} defaultActiveKey={activeTabKey} onChange={debounce(handleTabChange, TAB_DEBOUNCE_TIME_MS)}>
          <TabPane tab={t('MULTIPLE_CHOICE')} key={TabKeyEnum.MULTIPLE_CHOICE}>
            <MultiChoiceMapping data={data} isPending={isPending} tabKey={activeTabKey} />
          </TabPane>
          <TabPane tab={t('NUMBER_INPUT')} key={TabKeyEnum.NUMBER_INPUT}>
            <NumberInputMapping data={data} isPending={isPending} tabKey={activeTabKey} />
          </TabPane>
        </Tabs>
      </Row>
    </>
  );
};

export default ScoreMapping;

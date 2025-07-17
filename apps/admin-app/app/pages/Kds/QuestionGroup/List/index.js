import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { useInitAndDestroyPage, useEffectSkipInitialRender, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getLimitAndOffset } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { kdsQuestionGroupListSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import { Table } from './components';

const reduxKey = REDUX_KEY.KDS.QUESTION_GROUP.LIST;

const List = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { Can } = usePermission();
  const { t } = useTranslation('kdsQuestionGroupPage');

  const data = useSelector(kdsQuestionGroupListSelector.getData);
  const isPending = useSelector(kdsQuestionGroupListSelector.getIsPending);
  const total = useSelector(kdsQuestionGroupListSelector.getTotal);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffectSkipInitialRender(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getKdsQuestionGroupListRequest({ limit, offset }));
  }, [pagination]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('PAGE_TITLE.KDS.QUESTION_GROUP.LIST')}
          />
        </Col>
        <Can permKey={permKey.PAGE_KDS_QUESTION_GROUP_NEW}>
          <Col>
            <Link to="/kds/questionGroup/new">
              <Button type="primary" icon={<PlusOutlined />}>
                {t('NEW_QUESTION_GROUP')}
              </Button>
            </Link>
          </Col>
        </Can>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            isPending={isPending}
            data={data}
            total={total}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default List;

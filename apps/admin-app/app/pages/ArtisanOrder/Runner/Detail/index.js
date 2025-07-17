import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

import { ROUTE } from '@app/routes';
import {
  Header,
  Profile,
  ShoppingMallInfo,
  GeneralInfo,
  TaskTable,
} from './components';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { getRunnerByIdSelector, getTasksByRunnerIdSelector } from './redux/selectors';

const addPlusPrefixIfNotExists = value => (value[0] === '+' ? value : `+${value}`);

function RunnerDetailPage() {
  usePageViewAnalytics({
    name: ROUTE.GL_RUNNER_DETAIL.name,
    squad: ROUTE.GL_RUNNER_DETAIL.squad,
  });
  const { id: runnerUUID } = useParams();
  const dispatch = useDispatch();
  const runner = useSelector(getRunnerByIdSelector.getData) || {};
  const isPending = useSelector(getRunnerByIdSelector.getIsPending);
  const runnerTasks = useSelector(getTasksByRunnerIdSelector.getData);

  const { nameSurname = '', status = '', updatedAt } = runner;

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getRunnerByIdRequest({ id: runnerUUID }));
    dispatch(Creators.getTasksByRunnerIdRequest({ id: runnerUUID }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, runnerUUID]);

  const handleInfoSubmit = ({ cellPhone, ...rest }) => {
    dispatch(
      Creators.updateRunnerRequest({
        id: runner.runnerUuid,
        updateData: { cellPhone: addPlusPrefixIfNotExists(cellPhone), ...rest },
      }),
    );
  };

  const handleStatusChange = newStatus => {
    dispatch(
      Creators.updateRunnerRequest({
        id: runner.runnerUuid,
        updateData: { status: newStatus },
      }),
    );
  };

  return (
    <div>
      <Header title={nameSurname} badge="Badge" />
      <Row gutter={24} className="mt-4" wrap={false}>
        <Col span={6}>
          <Profile
            onStatusChange={handleStatusChange}
            nameSurname={nameSurname}
            status={status}
            updatedAt={updatedAt}
          />
        </Col>
        <Col span={6}>
          <ShoppingMallInfo runner={runner} onSubmit={handleInfoSubmit} />
          <div className="mt-4">
            <GeneralInfo
              runner={runner}
              onSubmit={handleInfoSubmit}
              isPending={isPending}
            />
          </div>
        </Col>
        <Col span={12}>
          <TaskTable tasks={runnerTasks} />
        </Col>
      </Row>
    </div>
  );
}

const reduxKey = REDUX_KEY.GL_RUNNER_DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RunnerDetailPage);

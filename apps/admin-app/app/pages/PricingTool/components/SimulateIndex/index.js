import { Col, Divider, Empty, Modal, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from '../../styles';
import { Creators } from '../../redux/actions';
import { stateSelector } from '../../redux/selectors';
import SimulateCompetition from '../SimulateCompetition';

const SimulateIndex = ({ setOpenSimulation, t, openSimulation, simulateData, showAandM }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const simulateDataLoading = useSelector(stateSelector.simulateDataLoading);

  return (
    <Modal
      visible={openSimulation}
      title={t('SIMULATE_INDEXES')}
      footer={null}
      onCancel={() => {
        setOpenSimulation(false);
        dispatch(Creators.setUpdateList());
      }}
      className={classes.simulationModal}
      closable
    >
      {simulateDataLoading && (<div className={classes.spin}><Spin /></div>)}
      {!simulateDataLoading && ((!simulateData || simulateData?.length < 1)) && <Empty description={t('SIMULATION_DATA_NOT_FOUND')} />}
      {!simulateDataLoading && simulateData && simulateData?.length > 0 && (
      <Row>
        <Col className={classes.indexDescriptionDivider}>
          <Divider orientation="left">{showAandM ? t('REALIZED_INDEX_DESCRIPTION') : t('NOMINAL_INDEX_DESCRIPTION')}</Divider>
        </Col>
        <Col className={classes.productCardMatchedCol}>
          {simulateData.map(data => {
            return (
              <SimulateCompetition
                data={data}
                classes={classes}
                showAandM={showAandM}
              />
            );
          })}
        </Col>
      </Row>
      )}

    </Modal>
  );
};
export default SimulateIndex;

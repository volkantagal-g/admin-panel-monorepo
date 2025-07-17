import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Col, Modal, Row, Table } from 'antd';
import { useTranslation } from 'react-i18next';

import CategoryColumns from '../CategoryColumns';
import SimulateTableSummary from '../SimulateTableSummary';
import SimulateTableTitle from '../SimulateTableTitle';

import { Creators } from '../../redux/actions';
import { stateSelector } from '../../redux/selectors';
import { data } from '../DragAndDrop/tableConstants';

import useStyles from '../../styles';

const SimulateIndex = ({
  setOpenSimulation,
  openSimulation,
  simulateData,
  isLoading,
  currentCompetitorList,
  setCurrentCompetitorList,
  baseCompetitor,
  setBaseCompetitor,
  competitorList,
  indexType,
  setIndexType,
  domainType,
  setDomainType,
  priorityList,
  setPriorityList,
  setUnsavedCompetitorList,
  unsavedCompetitorList,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerTableData, setDrawerTableData] = useState(data);

  const simulateDataLoading = useSelector(stateSelector.simulateDataLoading);
  const currentColumns = CategoryColumns(currentCompetitorList || competitorList);

  const tableTitle = SimulateTableTitle(
    indexType,
    setIndexType,
    domainType,
    setDomainType,
    currentCompetitorList,
    setCurrentCompetitorList,
    setBaseCompetitor,
    baseCompetitor,
    simulateData,
    setOpenDrawer,
    openDrawer,
    drawerTableData,
    setDrawerTableData,
    setPriorityList,
    priorityList,
    setUnsavedCompetitorList,
    unsavedCompetitorList,
  );

  return (
    <Modal
      visible={openSimulation}
      title={t('INDEX_SIMULATION')}
      footer={null}
      onCancel={() => {
        setOpenSimulation(false);
        dispatch(Creators.setUpdateList());
      }}
      className={classes.simulationModal}
      closable
      width={1100}
    >
      <Table
        locale={{
          emptyText:
            isLoading === false ? (
              <Row className={classes.tableRowContainer}>
                <Col className={classes.tableCol} sm={6}>
                  <Alert
                    message={t('NO_COMMON_PRODUCTS_FOUND_AMONG_SELECTED_COMPETITORS')}
                    description={t('TRY_REMOVING_SOME_COMPETITORS_AND_HAVE_MORE_DEDICATED_SEARCH')}
                    type="warning"
                    showIcon
                  />
                </Col>
              </Row>
            ) : (
              ''
            ),
        }}
        title={() => tableTitle}
        size="small"
        bordered
        className={classes.tableContainer}
        loading={simulateDataLoading}
        columns={currentColumns}
        dataSource={simulateData?.result}
        summary={() => SimulateTableSummary(currentCompetitorList, simulateData)}
        scroll={{ x: 800, y: 400 }}
      />
    </Modal>
  );
};
export default SimulateIndex;

import { Button, Col, Drawer, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import checked from '../../img/checked.png';

import BaseCompetitor from '../BaseCompetitor';
import CompetitorFilter from '../CompetitorFilter';
import DomainTypeSelect from '../DomainTypeFilter';
import IndexType from '../IndexType';
import DragAndDrop from '../DragAndDrop';

import { TR_COUNTRY_CODE } from '../../constants';
import { Creators } from '../../redux/actions';
import { listSelector } from '../../redux/selectors';
import { dataConverter } from '../DragAndDrop/tableUtil';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

import useStyles from '../../styles';

const SimulateTableTitle = (
  indexType,
  setIndexType,
  domainType,
  setDomainType,
  currentCompetitorList,
  setCurrentCompetitorList,
  setBaseCompetitor,
  baseCompetitor,
  tableData,
  setOpenDrawer,
  openDrawer,
  drawerTableData,
  setDrawerTableData,
  setPriorityList,
  priorityList,
  setUnsavedCompetitorList,
  unsavedCompetitorList,
) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');
  const classes = useStyles();
  const dispatch = useDispatch();

  const updateList = useSelector(listSelector.updateList);

  const countryDetail = useSelector(getSelectedCountryV2);
  const countryCode = countryDetail?.code?.alpha2;

  const handleApply = () => {
    const tempDrawer = [];
    drawerTableData.forEach(element => {
      tempDrawer.push(element?.name);
    });
    const tempData = dataConverter(tempDrawer);
    setDrawerTableData(tempData?.sort((a, b) => a.index - b.index));
    setPriorityList(tempDrawer);
    dispatch(
      Creators.getSimulateIndexRequest({
        productList: updateList,
        competitorList: currentCompetitorList,
        domainType,
        baseCompetitor,
        indexType,
        priorityList: tempDrawer,
      }),
    );
    setOpenDrawer(false);
  };
  const dispatchSimulateAction = (
    productList,
    competitorList,
    simulateDomainType,
    simulateBaseCompetitor,
    simulateIndexType,
    simulatePriorityList,
  ) => {
    if (competitorList?.length > 0 && simulateDomainType && simulateBaseCompetitor && simulateIndexType && productList?.length > 0) {
      dispatch(
        Creators.getSimulateIndexRequest({
          productList,
          competitorList,
          domainType: simulateDomainType,
          baseCompetitor: simulateBaseCompetitor,
          indexType: simulateIndexType,
          priorityList: simulatePriorityList,
        }),
      );
    }
  };
  return (
    <>
      <Row className={classes.indexFilterContainer}>
        <Col className={classes.filterContainer}>
          <IndexType
            indexType={indexType}
            setIndexType={setIndexType}
          />
        </Col>
        {countryCode === TR_COUNTRY_CODE ? (
          <Col className={classes.filterContainer}>
            <DomainTypeSelect
              domainType={domainType}
              setDomainType={setDomainType}
            />
          </Col>
        ) : null}
        <Col className={classes.filterContainer}>
          <CompetitorFilter
            currentCompetitorList={unsavedCompetitorList || []}
            setCurrentCompetitorList={setUnsavedCompetitorList}
            setBaseCompetitor={setBaseCompetitor}
          />
        </Col>
        <Col className={classes.filterContainer}>
          <BaseCompetitor
            currentCompetitorList={unsavedCompetitorList || []}
            baseCompetitor={baseCompetitor}
            setBaseCompetitor={setBaseCompetitor}
          />
        </Col>
        <Col>
          <Button
            type="text"
            className={classes.tooltipTitle}
            disabled={unsavedCompetitorList?.length < 1 || !baseCompetitor}
            icon={(
              <img
                src={checked}
                alt={t('APPLY_FILTERS')}
                className={classes.actionTreeCancel}
              />
            )}
            onClick={() => {
              setCurrentCompetitorList(unsavedCompetitorList);
              dispatchSimulateAction(
                updateList,
                unsavedCompetitorList,
                domainType,
                baseCompetitor,
                indexType,
                priorityList,
              );
            }}
          >
            {t('APPLY_FILTERS')}
          </Button>
        </Col>
        <Col className={classes.filterContainer}>
          <Button
            type="text"
            className={classes.purpleGetirColor}
            disabled={!tableData?.result?.length > 0}
            onClick={() => setOpenDrawer(true)}
          >
            {t('REFRACTION')}
          </Button>
        </Col>
      </Row>
      {openDrawer && (
        <Drawer
          title={t('REFRACTION_STRUCTURE')}
          placement="right"
          onClose={() => setOpenDrawer(false)}
          visible={openDrawer}
          getContainer={false}
          className={classes.drawer}
        >
          <DragAndDrop
            tableData={drawerTableData}
            setTableData={setDrawerTableData}
          />
          <Row className={classes.rowButtonDrawer}>
            <Button
              type="text"
              className={classes.applyButtonDrawer}
              icon={(
                <img
                  src={checked}
                  alt={t('APPLY')}
                  className={classes.actionTreeCancel}
                />
              )}
              disabled={!tableData?.result?.length > 0}
              onClick={handleApply}
            >
              &nbsp; {t('APPLY')}
            </Button>
          </Row>
        </Drawer>
      )}
    </>
  );
};

export default SimulateTableTitle;

import { Col, Divider, Empty, Row, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PromoTypeFilter from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/PromoTypeFilter';
import WarehouseTypeFilter from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/WarehouseTypeFilter';
import TableColumns from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/TableColumns';
import TableTitle from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/TableTitle';
import AddBucketModal from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/AddBucketModal';
import DifferenceModal from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/DifferenceModal';

import { autoGrowthSelector, promoSetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { TitleButtons } from '@app/pages/MarketAutoGrowthOperations/components/TitleButtons';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const AutoPromoSet = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const warehouseTypeList = useSelector(promoSetSelector.warehouseTypeList);
  const promoTypeList = useSelector(promoSetSelector.promoTypeList);
  const bucketGroups = useSelector(promoSetSelector.bucketGroups);

  const updateListAdd = useSelector(promoSetSelector.updateListAdd);
  const updateListDelete = useSelector(promoSetSelector.updateListDelete);
  const updateListUpdate = useSelector(promoSetSelector.updateListUpdate);
  const promoSetTableDataLoading = useSelector(promoSetSelector.promoSetTableDataLoading);
  const promoSetTableData = useSelector(promoSetSelector.promoSetTableData);

  const domainTypeLoading = useSelector(promoSetSelector.domainTypeLoading);
  const promoWarehouseTypeLoading = useSelector(promoSetSelector.promoWarehouseTypeLoading);
  const domainError = useSelector(autoGrowthSelector.domainError);

  const selectedDomain = useSelector(autoGrowthSelector.selectedDomain);
  const selectedPromo = useSelector(promoSetSelector.selectedPromo);
  const selectedWarehouse = useSelector(promoSetSelector.selectedWarehouse);

  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [willTrigger, setTriggerReason] = useState(false);
  const [openDifference, setOpenDifference] = useState(false);
  const [updateBucketLine, setUpdateBucketLine] = useState(true);
  const [selectedReason, setSelectedReason] = useState('');
  const [bucketNameEdit, setBucketNameEdit] = useState(false);
  const [editingBucketName, setEditingBucketName] = useState('');
  const [newColumn, setNewColumn] = useState(null);

  useEffect(() => {
    if (willTrigger !== 'updateSelectFilter') {
      setUpdateBucketLine(false);
      setTimeout(() => {
        setUpdateBucketLine(true);
      }, 1);
      setTriggerReason('');
    }
  }, [willTrigger]);

  useEffect(() => {
    if (selectedPromo && selectedWarehouse && selectedDomain) {
      setBucketNameEdit(false);
      setEditingBucketName('');
      dispatch(Creators.getPromoSetRequest({
        promoObjectiveType: selectedPromo,
        warehouseType: selectedWarehouse,
        domainType: selectedDomain,
      }));
    }
  }, [dispatch, selectedDomain, selectedPromo, selectedWarehouse]);

  useEffect(() => {
    if (selectedDomain) {
      dispatch(Creators.getPromoWarehouseTypeListRequest({ domainType: selectedDomain }));
    }
  }, [dispatch, selectedDomain]);

  const tableColumns = useMemo(
    () => {
      return TableColumns(t, editMode, bucketGroups, classes, dispatch, setTriggerReason, setNewColumn);
    },
    [bucketGroups, classes, dispatch, editMode, t],
  );

  const handleSave = () => {
    setOpenDifference(true);
    setSelectedReason(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    dispatch(Creators.setCancelChanges());
  };

  const handleWarehouseChange = value => dispatch(Creators.setSelectedPromoWarehouse({
    selectedWarehouse: value,
    selectedPromo: '',
  }));

  return (
    <div>
      <AddBucketModal
        open={open}
        setOpen={setOpen}
        bucketGroups={bucketGroups}
        selectedDomain={selectedDomain}
        selectedWarehouse={selectedWarehouse}
        selectedPromo={selectedPromo}
        setSelectedReason={setSelectedReason}
        selectedReason={selectedReason}
      />
      <DifferenceModal
        openDifference={openDifference}
        setOpenDifference={setOpenDifference}
        classes={classes}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
        setEditMode={setEditMode}
      />
      <Row className={classes.filterContainer}>
        <Col sm={4}>
          <WarehouseTypeFilter
            warehouseTypeList={warehouseTypeList}
            onChange={handleWarehouseChange}
            value={selectedWarehouse}
            disabled={domainError || updateListAdd?.length > 0 || updateListDelete?.length > 0 || updateListUpdate?.length > 0 || editMode}
            loading={domainTypeLoading || promoWarehouseTypeLoading}
          />
        </Col>
        <Col sm={4}>
          <PromoTypeFilter
            promoTypeList={promoTypeList}
            selectedPromo={selectedPromo}
            disabled={domainError || updateListAdd?.length > 0 || updateListDelete?.length > 0 || updateListUpdate?.length > 0 || editMode}
            loading={domainTypeLoading || promoWarehouseTypeLoading}
          />
        </Col>
      </Row>
      <Row className={classes.tableButtonContainer}>
        <TitleButtons
          hasAdd
          hasAddDisabled={updateListAdd?.length > 0 || updateListDelete?.length > 0 || updateListUpdate?.length > 0}
          addButtonContent={t('ADD_BUCKET_GROUP')}
          editMode={editMode}
          setOpen={setOpen}
          hasNoChange={updateListAdd?.length <= 0 && updateListDelete?.length <= 0 && updateListUpdate?.length <= 0}
          handleSave={handleSave}
          handleCancel={handleCancel}
          setEditMode={setEditMode}
          disabled={domainTypeLoading || promoWarehouseTypeLoading || promoSetTableDataLoading}
          tableData={promoSetTableData}
          hasDeleteAll={false}
        />
      </Row>
      <Divider dashed className={classes.divider} />
      <Row />
      {Object.values(bucketGroups)?.length > 0 && updateBucketLine
        ? Object.values(bucketGroups)?.map(element => (
          <Table
            data-testid="auto_growth_promo_set"
            columns={tableColumns}
            dataSource={element}
            title={() => TableTitle(
              editMode,
              element,
              bucketGroups,
              setTriggerReason,
              bucketNameEdit,
              setBucketNameEdit,
              editingBucketName,
              setEditingBucketName,
              setNewColumn,
            )}
            showHeader
            loading={domainTypeLoading || promoWarehouseTypeLoading || promoSetTableDataLoading || false}
            pagination={false}
            rowClassName={record => record?._id === newColumn?._id && classes.isUpdated}
            expandable={{ defaultExpandAllRows: true }}
            scroll={{ x: 1300, y: 800 }}
            locale={{ emptyText: <Empty /> }}
          />
        ))
        : (
          <Table
            data-testid="auto_growth_promo_set"
            columns={tableColumns}
            dataSource={[]}
            showHeader
            loading={domainTypeLoading || promoWarehouseTypeLoading || promoSetTableDataLoading || !updateBucketLine || false}
            pagination={false}
            expandable={{ defaultExpandAllRows: true }}
            locale={{ emptyText: <Empty /> }}
          />
        )}
    </div>
  );
};

export default AutoPromoSet;

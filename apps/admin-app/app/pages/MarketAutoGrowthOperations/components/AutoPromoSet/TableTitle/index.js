import { Row, Col, Button, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { SPECIFIC_AFFECTED } from '@app/pages/MarketAutoGrowthOperations/constants';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const TableTitle = (
  editMode,
  element,
  bucketGroups,
  setTriggerReason,
  bucketNameEdit,
  setBucketNameEdit,
  editingBucketName,
  setEditingBucketName,
  setNewColumn,
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const [greeting] = element;
  const [inputValue, setInputValue] = useState(greeting?.bucketType);

  const handleDeleteBucket = () => {
    const tempElement = element;
    const tempBucketList = [];
    tempElement.map(item => tempBucketList.push({ ...item, affected: [SPECIFIC_AFFECTED.ALL] }));
    dispatch(Creators.deleteBucket({ data: element }));
    dispatch(Creators.setUpdateList({}));
    setTriggerReason('deleteBucket');
  };

  const handleClick = () => {
    setNewColumn(null);
    if (inputValue?.indexOf(' ') > -1) {
      message.error({ content: t('PROMOSET_ERROR_MESSAGES.BUCKET_NAME_CONTAIN_EMPTY') });
    }
    else {
      const hasValue = Object.keys(bucketGroups)?.some(key => (key === inputValue));
      if (hasValue) {
        message.error({ content: t('PROMOSET_ERROR_MESSAGES.BUCKET_NAME_ALREADY_EXIST') });
      }
      else if (inputValue === '') {
        message.error({ content: t('PROMOSET_ERROR_MESSAGES.BUCKET_NAME_NOT_EMPTY') });
      }
      else {
        setBucketNameEdit(false);

        let tempBucketGroups = { ...bucketGroups };
        const currentBucketName = greeting?.bucketType;
        const currentBucketGroup = tempBucketGroups[greeting?.bucketType];

        const tempNewBucketGroup = [];
        currentBucketGroup?.forEach(bucket => {
          tempNewBucketGroup.push({ ...bucket, bucketType: inputValue, affected: [SPECIFIC_AFFECTED.BUCKET_TYPE], is_updated: 1, isBucketNameChanged: true });
        });

        Object.entries(tempBucketGroups).map(bucketGroup => {
          if (bucketGroup[0] === currentBucketName) {
            delete tempBucketGroups[currentBucketName];
          }
          return tempBucketGroups;
        });

        tempBucketGroups = { ...tempBucketGroups, [inputValue]: tempNewBucketGroup };
        dispatch(Creators.updatePromoSetTableData({ data: tempNewBucketGroup, affected: SPECIFIC_AFFECTED.BUCKET_TYPE }));
        dispatch(Creators.setUpdateList({}));
        setTriggerReason('enterNewBucketName');
      }
    }
  };

  return (
    <Row className={classes.tableTitle}>
      <Row className={classes.tableTitleLabel}>
        {editMode ? (
          <Col className={classes.bucketGroupButtons}>
            {bucketNameEdit === true && editingBucketName === greeting?.bucketType ? (
              <Row sm={1}>
                <Input.Group compact>
                  <Input
                    defaultValue={greeting.bucketType}
                    allowClear
                    onChange={event => setInputValue(event.target.value)}
                    className={classes.bucketTypeInput}
                  />
                  <Button onClick={handleClick}>{t('SAVE')}</Button>
                  <Button onClick={() => setBucketNameEdit(false)}>{t('CANCEL')}</Button>
                </Input.Group>
              </Row>
            ) : (
              <>
                <Row sm={1} className={classes.editBucketNameButton}>
                  <Col className={classes.bucketTypeName}>{greeting.bucketType}</Col>
                </Row>
                <Row sm={1}>
                  <Button
                    type="text"
                    onClick={() => {
                      setBucketNameEdit(true);
                      setEditingBucketName(greeting?.bucketType);
                    }}
                    className={classes.purpleGetirColor}
                  >
                    {t('EDIT_BUCKET_NAME')}
                  </Button>
                </Row>
              </>
            )}
            <Row sm={1}>
              <Button
                type="text"
                onClick={handleDeleteBucket}
                className={`${classes.deleteBucketButton} ${classes.purpleGetirColor}`}
              >
                {t('DELETE_BUCKET_GROUP')}
              </Button>
            </Row>
          </Col>
        ) : <Col className={classes.bucketTypeName}>{greeting?.bucketType}</Col>}
      </Row>
    </Row>
  );
};
export default TableTitle;

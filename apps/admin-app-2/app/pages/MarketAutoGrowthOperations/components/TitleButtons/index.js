import { Button, Col, Popconfirm, Row, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { usePermission } from '@shared/hooks';
import { autoGrowthSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';

export const TitleButtons = ({
  hasAdd,
  hasAddDisabled,
  addButtonContent,
  editMode,
  setOpen,
  hasNoChange,
  handleSave,
  handleCancel,
  setEditMode,
  disabled,
  tableData,
  hasDeleteAll,
  handleDelete,
  deleteContent,
  handleImport,
  handleExport,
  handleExample,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const domainError = useSelector(autoGrowthSelector.domainError);

  const handleExportAutoGrowth = () => {
    let csvTitle = [];
    csvTitle = tableData?.length > 0 && Object.keys(tableData[0]).map(key => {
      return ({ key, title: key, default: '' });
    });
    const products = { fields: csvTitle, content: tableData };
    dispatch(Creators.exportRequest({ data: products }));
  };

  return (
    <>
      <Col className={classes.leftSideButtons}>
        {editMode && (
          <Col className={classes.tableButtonWrapper}>
            {hasAdd && (
              <Row
                sm={4}
                className={`${classes.purpleGetirColor} ${classes.saveButton} ${hasAddDisabled && classes.disabledSaveButton} ${classes.tableButtonItem}`}
              >
                <Button
                  type="text"
                  onClick={() => setOpen(true)}
                  disabled={hasAddDisabled || false}
                  className={classes.purpleGetirColor}
                >
                  {addButtonContent}
                </Button>
              </Row>
            )}
            {hasDeleteAll && (
              <Row sm={4}>
                <Button
                  type="text"
                  onClick={handleDelete}
                  className={classes.purpleGetirColor}
                >
                  {deleteContent}
                </Button>
              </Row>
            )}
          </Col>
        )}
      </Col>
      <Col className={classes.rightSideButtons}>
        {handleExample && (
          <Col className={classes.tableButtonItem}>
            <Button
              type="text"
              onClick={handleExample}
              className={classes.purpleGetirColor}
            >
              {t('EXAMPLE_CSV')}
            </Button>
          </Col>
        )}
        {handleImport && (
          <Col className={classes.tableButtonItem}>
            <Button
              type="text"
              onClick={handleImport}
              className={classes.purpleGetirColor}
            >
              {t('CSV_IMPORT')}
            </Button>
          </Col>
        )}
        {tableData?.length > 0 && (
          <Col className={classes.tableButtonItem}>
            <Button
              type="text"
              onClick={handleExport ?? handleExportAutoGrowth}
              className={classes.purpleGetirColor}
            >
              {t('CSV_EXPORT')}
            </Button>
          </Col>
        )}
        {editMode ? (
          <Col className={classes.tableButtonWrapper}>
            <Row sm={4} className={classes.tableButtonItem}>
              {hasNoChange ? (
                <Tooltip
                  title={t('NO_UNSAVED_CHANGES')}
                  color="#5d3ebc"
                >
                  <Button
                    type="text"
                    className={`${classes.saveButton} ${classes.purpleGetirColor} ${classes.disabledSaveButton}`}
                    disabled
                  >
                    {t('SAVE')}
                  </Button>
                </Tooltip>
              )
                : (
                  <Button
                    type="text"
                    onClick={handleSave}
                    className={`${classes.saveButton} ${classes.purpleGetirColor}`}
                  >
                    {t('SAVE')}
                  </Button>
                )}
            </Row>
            <Row sm={4}>
              {hasNoChange ? (
                <Button
                  type="text"
                  onClick={handleCancel}
                  className={classes.purpleGetirColor}
                >
                  {t('EXIT_EDIT_MODE')}
                </Button>
              ) : (
                <Popconfirm
                  title={t('ARE_YOU_SURE_CANCEL')}
                  onConfirm={handleCancel}
                  okText={t('YES')}
                  cancelText={t('NO')}
                >
                  <Button
                    type="text"
                    className={classes.purpleGetirColor}
                  >
                    {t('CANCEL_CHANGES')}
                  </Button>
                </Popconfirm>
              )}
            </Row>
          </Col>
        ) : (
          !domainError && (
            <Col className={classes.tableFilterItem}>
              <Can permKey={permKey.PAGE_MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS_EDIT}>
                <Button
                  type="text"
                  onClick={() => setEditMode(true)}
                  className={classes.purpleGetirColor}
                  disabled={disabled}
                >
                  {t('EDIT')}
                </Button>
              </Can>
            </Col>
          )
        )}
      </Col>
    </>
  );
};

export default TitleButtons;

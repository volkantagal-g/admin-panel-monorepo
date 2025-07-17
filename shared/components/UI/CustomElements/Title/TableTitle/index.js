import { Row, Col, Dropdown } from 'antd';
import PropTypes from 'prop-types';

import { FileExcelOutlined, MoreOutlined } from '@ant-design/icons';

import useStyles from './styles';

import { t } from '@shared/i18n';
import CsvImporter from '@shared/components/UI/CsvImporter';
import TooltipUI from '../../Tooltip';

function TableTitle({
  title,
  totalCountData,
  importerProps,
  headerControls,
  onExport,
  settingsMenu,
}) {
  const classes = useStyles();

  return (
    <Row align="center">
      <Col flex="auto">
        <Row>
          <Col span={24} className={classes.title}>
            {title}
          </Col>
          {totalCountData > 0 && (
            <Col span={24} className={classes.subTitle}>
              {totalCountData > 1 ?
                t('CUSTOM_ELEMENTS.TITLE.TABLE_SUB_TITLE_PLURAL', { totalCountData })
                :
                t('CUSTOM_ELEMENTS.TITLE.TABLE_SUB_TITLE_SINGLE', { totalCountData })}

            </Col>
          )}
        </Row>
      </Col>
      <Col flex="auto" className={classes.tableHeaderControl}>
        <Row justify="end" align="center" gutter={8}>
          {importerProps && (
            <Col>
              <CsvImporter {...importerProps} />
            </Col>
          )}
          {onExport && (
            <Col>
              <TooltipUI key="2" placement="bottom" title={t('global:EXPORT_EXCEL')}>
                <FileExcelOutlined className={classes.iconButton} onClick={onExport} />
              </TooltipUI>
            </Col>
          )}
          {settingsMenu && (
            <Col>
              <Dropdown key="3" overlay={settingsMenu}>
                <MoreOutlined className={classes.iconButton} />
              </Dropdown>
            </Col>
          )}
          <Col>
            {headerControls}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

TableTitle.propTypes = {
  headerControls: PropTypes.element,
  importerProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.func])),
  onExport: PropTypes.func,
  settingsMenu: PropTypes.element,
  title: PropTypes.string.isRequired,
  totalCountData: PropTypes.number,
};

TableTitle.defaultProps = {
  headerControls: undefined,
  importerProps: undefined,
  onExport: undefined,
  settingsMenu: undefined,
  totalCountData: 0,
};

export default TableTitle;

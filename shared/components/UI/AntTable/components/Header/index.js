import { Tag, Tooltip, Row, Col, Dropdown } from 'antd';
import { CloudDownloadOutlined, MoreOutlined } from '@ant-design/icons';

import { t } from '@shared/i18n';
import useStyles from './styles';
import CsvImporter from '@shared/components/UI/CsvImporter';

const Header = props => {
  const { loading, title, totalBadge, importerProps, onExport, settingsMenu, rightElement } = props;
  const classes = useStyles({ loading, title, totalBadge });

  return (
    <div className={classes.header}>
      <div className={classes.leftContainer}>
        {title && <div className={classes.title}>{title}</div>}
        {totalBadge && (
          <div className={classes.totalBadge}>
            <Tag>
              {totalBadge.total}
              <span className={classes.totalLabel}>{totalBadge.label}</span>
            </Tag>
          </div>
        )}
      </div>
      <div className={classes.rightContainer}>
        <Row gutter={[12]}>
          {importerProps && (
            <Col>
              <CsvImporter {...importerProps} />
            </Col>
          )}
          {onExport && (
            <Col>
              <Tooltip key="2" placement="bottomRight" title={t('global:EXPORT_EXCEL')}>
                <CloudDownloadOutlined className={classes.iconButton} onClick={onExport} />
              </Tooltip>
            </Col>
          )}
          {settingsMenu && (
            <Col>
              <Dropdown key="3" overlay={settingsMenu}>
                <MoreOutlined className={classes.iconButton} />
              </Dropdown>
            </Col>
          )}
          {rightElement}
        </Row>
      </div>
    </div>
  );
};

export default Header;

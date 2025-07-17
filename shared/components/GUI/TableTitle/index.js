import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import useStyles from './styles';

import { t } from '@shared/i18n';
import { Button } from '@shared/components/GUI/Button';

export function TableTitle({
  title,
  totalCountData,
  headerControls,
  handleOpenImportExport,
}) {
  const classes = useStyles();

  if (!title) {
    return null;
  }

  return (
    <Row align="middle">
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
          {handleOpenImportExport && (
            <Col>
              <Button
                onClick={handleOpenImportExport}
                size="small"
                color="secondary"
              >{t('CUSTOM_ELEMENTS.TITLE.IMPORT_EXPORT')}
              </Button>
            </Col>
          )}
          {headerControls && (
            <Col>
              {headerControls}
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
}

TableTitle.propTypes = {
  headerControls: PropTypes.element,
  handleOpenImportExport: PropTypes.func,
  title: PropTypes.string.isRequired,
  totalCountData: PropTypes.number,
};

TableTitle.defaultProps = {
  headerControls: undefined,
  handleOpenImportExport: undefined,
  totalCountData: 0,
};

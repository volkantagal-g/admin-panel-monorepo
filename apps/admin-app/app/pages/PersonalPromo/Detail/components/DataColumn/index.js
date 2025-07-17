/* eslint-disable react/jsx-no-useless-fragment */
import { useMemo } from 'react';
import { Button, Col } from 'antd';

import { getLangKey } from '@shared/i18n';

import useStyles from './style';

const DataColumn = ({ data, document }) => {
  const styles = useStyles();

  const value = useMemo(() => {
    const { attribute, hasTranslation, render } = data;

    let fieldValue = null;

    if (document[attribute]) {
      fieldValue = document[attribute];

      if (hasTranslation) {
        fieldValue = fieldValue[getLangKey()] || fieldValue.tr || '';
      }

      if (render) {
        fieldValue = render(fieldValue);
      }
    }

    return fieldValue;
  }, [document, data]);

  return (
    <Col span={24} className={styles.columnGroup} data-testid="promoDetail-data-column">
      <span className={styles.fieldTitle}>{ data.label }</span>
      <span className={styles.fieldValue}>
        { value }
      </span>
      {
        data.actions?.length && (
          <div className={styles.actionsContainer}>
            {
              data.actions.map(action => (
                action.show && (
                  <Button type={action.type} onClick={action.handler}> {action.label} </Button>
                )
              ))
            }
          </div>
        )
      }
    </Col>
  );
};

export default DataColumn;

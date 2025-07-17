import { memo } from 'react';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';

import { Table } from './components';
import useStyles from './styles';

import { COLLAPSE_KEY_PREFIX } from './constants';

const { Panel } = Collapse;

const LoyaltyDetails = () => {
  const { t } = useTranslation('clientDetail');
  const classes = useStyles();

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
      <Panel
        className={classes.noPanelPadding}
        showArrow={false}
        header={t('LOYALTY.TITLE')}
        key={`${COLLAPSE_KEY_PREFIX}1`}
      >
        <Table />
      </Panel>
    </Collapse>
  );
};

export default memo(LoyaltyDetails);

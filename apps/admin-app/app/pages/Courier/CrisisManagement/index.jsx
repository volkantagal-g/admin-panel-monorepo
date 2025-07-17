import { Col, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import Incidents from './components/Incidents';
import Logs from './components/Logs';
import useStyles from './style';

const activePanel = 'crisis';

export default function CrisisManagement({ courierId }) {
  const { t } = useTranslation('courierPage');
  const classes = useStyles();
  const { Can } = usePermission();
  return courierId ? (
    <Can
      key="viewCourierCrisis"
      permKey={permKey.PAGE_COURIER_DETAIL_CRISIS_MGMT}
    >
      <Col span={24} data-testid="courier-crisis-mgmt">
        <Collapse defaultActiveKey={activePanel}>
          <Collapse.Panel key={activePanel} className={classes.root} header={t('CRISIS_MGMT.TITLE')}>
            <Incidents courierId={courierId} />
            <Logs courierId={courierId} />
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Can>
  ) : null;
}

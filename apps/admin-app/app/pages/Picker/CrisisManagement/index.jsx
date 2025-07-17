import { Col, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import Incidents from './components/Incidents';
import Logs from './components/Logs';
import useStyles from './style';

const activePanel = 'crisis';

export default function CrisisManagement({ pickerId }) {
  const { t } = useTranslation('pickerDetailPage');
  const classes = useStyles();
  const { Can } = usePermission();
  return pickerId ? (
    <Can
      key="viewpickerCrisis"
      permKey={permKey.PAGE_PICKER_DETAIL_COMPONENT_CRISIS_MANAGEMENT_READ}
    >
      <Col span={24} data-testid="picker-crisis-mgmt">
        <Collapse defaultActiveKey={activePanel}>
          <Collapse.Panel key={activePanel} className={classes.root} header={t('CRISIS_MGMT.TITLE')}>
            <Incidents pickerId={pickerId} />
            <Logs pickerId={pickerId} />
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Can>
  ) : null;
}

import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { ANT_SPACING_24, DEFAULT_ROW_SPACING } from '../../constants';
import { getTableColumns } from './config';

const DisableCourierLoginHistoryBox = ({ data, isPending }) => {
  const { t } = useTranslation('personPage');

  return (
    <AntCard
      bordered={false}
      title={t('COURIER_LOGIN.HISTORY_TITLE')}
    >
      <Row gutter={DEFAULT_ROW_SPACING}>
        <Col span={ANT_SPACING_24}>
          <AntTableV2
            data={data.disableCourierLoginHistory}
            columns={getTableColumns({ t })}
            loading={isPending}
            scroll={{ x: 600 }}
            data-testid="courier-login-history-table"
          />
        </Col>
      </Row>
    </AntCard>
  );
};

export default DisableCourierLoginHistoryBox;

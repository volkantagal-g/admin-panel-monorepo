import { useMemo } from 'react';
import { Row, Col, Popconfirm, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { createMap } from '@shared/utils/common';
import { DEFAULT_ROW_SPACING, ANT_SPACING_24 } from '../../constants';
import { getTableColumns } from './config';

const PickersInfo = ({ data, warehouses, isPending, handleCreatePickerForPerson, editPermKey }) => {
  const { Can } = usePermission();
  const { t } = useTranslation('personPage');
  const convertedWarehouses = useMemo(() => createMap(warehouses), [warehouses]);

  return (
    <AntCard
      bordered={false}
      title={t('PICKERS.TITLE')}
      footer={
        !data.length && (
          <Can permKey={editPermKey}>
            <Popconfirm
              key="submit"
              placement="topRight"
              title={t('PICKERS.CONFIRM')}
              onConfirm={handleCreatePickerForPerson}
              disabled={isPending}
            >
              <Button size="small" type="primary" loading={isPending}>
                {t('PICKERS.CREATE')}
              </Button>
            </Popconfirm>
          </Can>
        )
      }
    >
      <Row gutter={DEFAULT_ROW_SPACING}>
        <Col span={ANT_SPACING_24}>
          <AntTableV2
            data={data}
            columns={getTableColumns({ convertedWarehouses, t })}
            loading={isPending}
            scroll={{ x: 600 }}
          />
        </Col>
      </Row>
    </AntCard>
  );
};

export default PickersInfo;

import { useMemo } from 'react';
import { Row, Col, Popconfirm, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { createMap } from '@shared/utils/common';
import { getTableColumns } from './config';
import { DEFAULT_ROW_SPACING, ANT_SPACING_24 } from '../../constants';

const CouriersInfo = ({ filteredCouriers, warehouses, isPending, handleCreateCourierForPerson, editPermKey }) => {
  const { Can } = usePermission();
  const { t } = useTranslation('personPage');
  const convertedWarehouses = useMemo(() => createMap(warehouses), [warehouses]);

  return (
    <AntCard
      bordered={false}
      title={t('CREATE_COURIER.COURIERS_TITLE')}
      footer={
        !filteredCouriers?.length && (
          <Can permKey={editPermKey}>
            <Popconfirm
              key="submit"
              placement="topRight"
              title={t('CREATE_COURIER.CONFIRM')}
              onConfirm={handleCreateCourierForPerson}
              disabled={isPending}
            >
              <Button size="small" type="primary" loading={isPending}>
                {t('CREATE_COURIER.TITLE')}
              </Button>
            </Popconfirm>
          </Can>
        )
      }
    >
      <Row gutter={DEFAULT_ROW_SPACING}>
        <Col span={ANT_SPACING_24}>
          <AntTableV2
            data={filteredCouriers}
            columns={getTableColumns({ convertedWarehouses, t })}
            loading={isPending}
            scroll={{ x: 600 }}
          />
        </Col>
      </Row>
    </AntCard>
  );
};

export default CouriersInfo;

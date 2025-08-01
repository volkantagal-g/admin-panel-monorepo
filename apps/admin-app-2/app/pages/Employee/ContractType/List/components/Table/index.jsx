import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import { Creators } from '../../redux/actions';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

export default function Table() {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canAccessDetailPage = canAccess(permKey.PAGE_PERSON_CONTRACT_DETAIL);

  const data = useSelector(getSelector.getData);
  const isPending = useSelector(getSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getContractRequest());
  }, [dispatch]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data}
          loading={isPending}
          columns={tableColumns(canAccessDetailPage)}
        />
      </Col>
    </Row>
  );
}

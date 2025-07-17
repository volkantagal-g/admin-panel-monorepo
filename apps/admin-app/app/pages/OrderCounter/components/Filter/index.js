import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'antd';

import { filtersSelector } from '../../redux/selectors';

import AntRadioGroup from '@shared/components/UI/AntRadioGroup';
import { useTypeOfOrderCountsOptions } from './constant';
import { Creators } from '../../redux/actions';

export default function Filter() {
  const dispatch = useDispatch();

  const orderCountTypeOptions = useTypeOfOrderCountsOptions();

  const getselectedOrderType = useSelector(filtersSelector.getOrderType);

  const handleOrderCountTypeOptions = e => {
    dispatch(Creators.setFilterParams({ filterParams: { orderType: e.target.value } }));
    dispatch(Creators.getTotalOrderCountsDataRequest());
  };

  return (
    <Row>
      <Col>
        <AntRadioGroup
          options={orderCountTypeOptions}
          onChange={handleOrderCountTypeOptions}
          value={getselectedOrderType}
          size="large"
        />
      </Col>
    </Row>
  );
}

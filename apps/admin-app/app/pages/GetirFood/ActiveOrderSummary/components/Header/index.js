import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SyncOutlined } from '@ant-design/icons';
import { Col, Row, Button } from 'antd';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@app/pages/GetirFood/ActiveOrderSummary/redux/actions';
import useStyles from '@app/pages/GetirFood/ActiveOrderSummary/components/Header/styles';
import SelectCity from '@shared/containers/Select/City';

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentCityId, setCurrentCityId] = useState();

  const handleCityChange = selectedCityId => {
    setCurrentCityId(selectedCityId);
  };

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(Creators.getOrderSummaryRequest({ cityId: currentCityId }));
    dispatch(Creators.getRestaurantSummaryRequest({ cityId: currentCityId }));
  }, [dispatch, currentCityId]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <Row justify="end">
      <Col span={6}>
        <SelectCity
          mode="single"
          value={currentCityId}
          onChange={handleCityChange}
          showArrow
          allowClear
        />
      </Col>
      <Col>
        <Button
          className={classes.button}
          icon={<SyncOutlined />}
          onClick={handleRefresh}
        />
      </Col>
    </Row>
  );
};

export default Header;

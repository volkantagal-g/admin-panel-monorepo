import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Row, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import RedirectButton from '@shared/components/UI/RedirectButtonV2';
import permKeys from '@shared/shared/permKey.json';
import { selectedPlaceMarkSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { TEST_ID } from '../../constants';
import useMainStyles from '../../styles';
import useStyles from './styles';
import { getTableColumns } from './config';

const { Title } = Typography;

const EventPanel = () => {
  const classes = useStyles();
  const mainClasses = useMainStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('getirMarketLiveMapPage');

  const selectedPlaceMark = useSelector(selectedPlaceMarkSelector.getData);
  const tableData = useSelector(selectedPlaceMarkSelector.getFormattedTableData);
  const memoizedTableColumns = useMemo(() => getTableColumns(), []);

  const handleCloseButton = () => {
    dispatch(Creators.setSelectedPlaceMark({ data: null, type: null }));
  };

  return (
    selectedPlaceMark.type && (
      <div
        className={classes.container}
        data-testid={TEST_ID.TOP_RIGHT_PANEL.EVENT_PANEL}
      >
        <Row justify="space-between" align="middle" className={classes.header}>
          <Title level={5} className={classes.title}>{t('global:COURIER')}</Title>
          <div className={classes.buttonsContainer}>
            <RedirectButton
              to={`/marketOrder/detail/${selectedPlaceMark.data.marketOrder}`}
              text={t('ORDER')}
              permKey={permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL}
              target="_blank"
              size="small"
            />
            <RedirectButton
              to={`/courier/detail/${selectedPlaceMark.data._id || selectedPlaceMark.data._id}`}
              text={t('DETAIL')}
              permKey={permKeys.PAGE_COURIER_DETAIL}
              target="_blank"
              size="small"
            />
            <Button
              onClick={handleCloseButton}
              type="danger"
              shape="circle"
              size="small"
            >
              <CloseOutlined className={classes.closeButtonIcon} />
            </Button>
          </div>
        </Row>

        <AntTableV2
          className={mainClasses.smallPaddingTable}
          containerClassName={`${mainClasses.noMarginBottom} w-100`}
          data={tableData}
          columns={memoizedTableColumns}
          showFooter={false}
          showHeader={false}
          size="small"
          scroll={{ x: 280 }}
          data-testid={TEST_ID.TOP_RIGHT_PANEL.EVENT_PANEL_TABLE}
        />
      </div>
    )
  );
};

export default EventPanel;

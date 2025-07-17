import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { FEE_LAYER_TYPE, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import ImportCsv from './components/Form';
import { exampleCsvUrl, exampleCsvUrlPeakHours } from './components/Form/config';

const { Title } = Typography;

const DeliveryFeeBulkUpload = () => {
  usePageViewAnalytics({ name: ROUTE.DELIVERY_FEE_BULK_UPLOAD.name, squad: ROUTE.DELIVERY_FEE_BULK_UPLOAD.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const pageTitle = t('PAGE_TITLE.DELIVERY_FEE.BULK_UPLOAD');

  return (
    <Row gutter={[8, 8]} align="middle">
      <Col span={24}>
        <Title level={3}>{pageTitle}</Title>
      </Col>
      <ImportCsv
        title={t('PAGE_TITLE.DELIVERY_FEE.BULK_UPLOAD')}
        mode={FEE_LAYER_TYPE.REGULAR}
        exampleCsvUrl={exampleCsvUrl}
      />
      <ImportCsv
        title={t('PAGE_TITLE.DELIVERY_FEE.BULK_UPLOAD_PEAK_HOURS')}
        mode={FEE_LAYER_TYPE.PEAK_HOURS}
        exampleCsvUrl={exampleCsvUrlPeakHours}
      />
    </Row>

  );
};

const reduxKey = REDUX_KEY.DELIVERY_FEE.BULK_UPLOAD;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(DeliveryFeeBulkUpload);

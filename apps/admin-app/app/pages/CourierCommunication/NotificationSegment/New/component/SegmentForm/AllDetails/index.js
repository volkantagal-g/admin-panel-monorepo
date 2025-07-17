import { Input } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { createSegment } from '@app/pages/CourierCommunication/NotificationSegment/New/redux/selector';

import useStyles from './styles';

const AllDetails = ({ segmentDetailsData, filter, prevFilterData }) => {
  const classes = useStyles();
  const { t } = useTranslation(['courierSegment', 'global']);
  const courierIds = useSelector(createSegment?.getCourierIdsData);

  useEffect(() => {
    prevFilterData(filter);
  }, [filter, prevFilterData]);

  return (
    <div data-testid="all-details-main-container">
      <section className={classes.segmentDetails}>
        <h6>{t('SEGMENT_DETAILS')}</h6>
        <span className={classes.segmentName}>
          <div className={classes.labelName}>{t('SEGMENT_NAME')}</div>
          <div className={classes.inputCard}>
            <Input defaultValue={segmentDetailsData?.segmentDetails.title} className={classes.input} disabled />
          </div>
        </span>
        <span className={classes.segmentDescription}>
          <div className={classes.labelDescription}>{t('SEGMENT_DETAILS')}</div>
          <div className={classes.inputCard}>
            <Input defaultValue={segmentDetailsData?.segmentDetails?.description} className={classes.input} disabled />
          </div>
        </span>
      </section>
      <section className={classes.segmentDetails}>
        <h6>{t('KPI_FILTERS')}</h6>
        <span>
          <div>
            {(filter?.general?.city.length > 0 && filter?.general?.warehouse?.length > 0 && filter?.general?.date?.length > 0) ?
              <CheckCircleOutlined className={classes.check} /> :
              <CloseCircleOutlined className={classes.cancel} /> }
            <span className={classes.filter}>{t('GENERAL_FILTER')}</span>
          </div>
          <div>
            {(filter?.courierStarRating?.rating > 0.5) ? <CheckCircleOutlined className={classes.check} /> :
            <CloseCircleOutlined className={classes.cancel} /> }
            <span className={classes.filter}>{t('COURIER_STAR_RATING')}</span>
          </div>
          <div>
            {(filter?.totalOrderCount?.orderCount > 0) ? <CheckCircleOutlined className={classes.check} /> :
            <CloseCircleOutlined className={classes.cancel} /> }
            <span className={classes.filter}>{t('TOTAL_ORDER_COUNT')}</span>
          </div>
        </span>
      </section>
      <section className={classes.segmentDetails}>
        <h6>{t('TARGETED_COURIERS')}</h6>
        {t('DETAILS_MESSAGE')} {courierIds?.stats?.total_count}
      </section>
    </div>
  );
};

export default AllDetails;

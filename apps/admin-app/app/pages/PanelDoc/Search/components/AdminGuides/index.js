import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';

import useStyles from '../../styles';
import { Creators } from '../../redux/actions';
import { adminGuidesSelector } from '../../redux/selectors';
import DocsCarousel from '../DocsCarousel';

export default function Guides() {
  const { t } = useTranslation('panelDocSearchPage');
  const classes = useStyles();
  const dispatch = useDispatch();

  const adminGuides = useSelector(adminGuidesSelector.getData);
  const areAdminGuidesPending = useSelector(adminGuidesSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getAdminGuidesRequest());
  }, [dispatch]);

  return (
    <Card title={t('ADMIN_GUIDES')} className={classes.guidesCard} data-testid="admin-guides">
      <DocsCarousel
        documents={adminGuides}
        isPending={areAdminGuidesPending}
        notFoundMessage={t('NO_ADMIN_GUIDES')}
        t={t}
        classes={classes}
      />
    </Card>
  );
}

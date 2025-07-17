import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card } from 'antd';

import useStyles from '../../styles';
import { favoriteDocumentsSelector } from '@shared/redux/selectors/common';
import DocsCarousel from '../DocsCarousel';

export default function FavoriteDocuments() {
  const { t } = useTranslation('panelDocSearchPage');
  const classes = useStyles();

  const favoriteDocuments = useSelector(favoriteDocumentsSelector.getData);
  const isPending = useSelector(favoriteDocumentsSelector.getIsPending);

  return (
    <Card title={t('FAV_DOCUMENTS')} className={classes.guidesCard} data-testid="favorite-documents">
      <DocsCarousel
        documents={favoriteDocuments}
        isPending={isPending}
        notFoundMessage={t('NO_FAV_DOCUMENTS')}
        t={t}
        classes={classes}
      />
    </Card>
  );
}

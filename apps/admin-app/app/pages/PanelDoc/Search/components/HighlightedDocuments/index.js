import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';

import useStyles from '../../styles';
import { Creators } from '../../redux/actions';
import { highlightedDocumentsSelector } from '../../redux/selectors';
import DocsCarousel from '../DocsCarousel';

export default function HighlightedDocuments() {
  const { t } = useTranslation('panelDocSearchPage');
  const classes = useStyles();
  const dispatch = useDispatch();

  const highlightedDocuments = useSelector(highlightedDocumentsSelector.getData);
  const isPending = useSelector(highlightedDocumentsSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getHighlightedDocumentsRequest());
  }, [dispatch]);

  return (
    <Card title={t('HIGHLIGHTED_DOCUMENTS')} className={classes.guidesCard} data-testid="highlighted-documents">
      <DocsCarousel
        documents={highlightedDocuments}
        isPending={isPending}
        notFoundMessage={t('NO_HIGHLIGHTED_DOCUMENTS')}
        t={t}
        classes={classes}
      />
    </Card>
  );
}

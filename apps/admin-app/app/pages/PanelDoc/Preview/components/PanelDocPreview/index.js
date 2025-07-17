import { Alert, Card, Collapse, PageHeader, Spin, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';

import { panelDocByIdSelector } from '../../redux/selectors';
import useStyles from './styles';
import FileIcon from '../../../Icons/FileIcon';
import { getTitleOfDocFile } from './utils';
import ContentEditor from '@shared/components/ContentEditor';

const { Panel } = Collapse;

export default function PanelDocPreview() {
  const panelDoc = useSelector(panelDocByIdSelector.getData);
  const panelDocPending = useSelector(panelDocByIdSelector.getIsPending);

  const { t } = useTranslation(['panelDocPreviewPage', 'panelDocDetailPage']);
  const classes = useStyles();

  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.setContents(panelDoc?.content);
  }, [panelDoc?.content]);

  const pageComponentsIdMap = useMemo(() => (panelDoc?.page?.components || []).reduce((acc, component) => {
    acc[component._id] = component;
    return acc;
  }, {}), [panelDoc?.page?.components]);

  if (panelDocPending) {
    return <Spin />;
  }

  if (!panelDoc || !panelDoc.isActive || panelDoc.isDeleted) {
    return <Alert message={t('NOT_AVALIABLE_FOR_PREVIEW')} type="error" />;
  }

  const langAvailableFaqs = panelDoc.faqs.filter(faq => {
    return faq.question[getLangKey()];
  });

  return (
    <div>
      <PageHeader title={panelDoc.name[getLangKey()]} className="p-0 page-title" />
      <Card className={classes.card}>
        <TopDetailItem
          label={t('DESCRIPTION')}
          value={panelDoc.description[getLangKey()]}
        />
        <TopDetailItem
          label={t('PAGE')}
          value={<Link to={ROUTE.PAGE_DETAIL.path.replace(':id', panelDoc.page._id)}>{panelDoc.page.name[getLangKey()]} </Link>}
        />
        <TopDetailItem
          label={t('PAGE_COMPONENTS')}
          value={
            panelDoc.componentIds
              .map(componentId => (
                <Link
                  className={classes.compLink}
                  key={pageComponentsIdMap[componentId]._id}
                  to={ROUTE.COMPONENT_DETAIL.path.replace(':id', pageComponentsIdMap[componentId]._id)}
                >{pageComponentsIdMap[componentId].name[getLangKey()]}
                </Link>
              ))
          }
        />
      </Card>
      <Card className={classes.card} title={t('panelDocDetailPage:CONTENT')}>
        <ContentEditor
          readOnly
          ref={editorRef}
          contentFileUrls={panelDoc?.contentFileUrls}
        />
      </Card>
      <Card className={classes.filesCard} title={t('panelDocDetailPage:FILES_TITLE')}>
        {panelDoc.files.map(file => (
          <Tag key={file._id} className={classes.fileTag}>
            <a href={file.url} target="_blank" rel="noreferrer">
              <FileIcon />
              <span>{getTitleOfDocFile(file)}</span>
              <span className={classes.langKeys}>{file.langKeys.map(langKey => (
                <span className={classes.langKey} key={langKey}>{langKey.toUpperCase()}</span>
              ))}
              </span>
            </a>
          </Tag>
        ))}
      </Card>
      <Card className={classes.card} title={t('panelDocDetailPage:FAQS')}>
        <Collapse defaultActiveKey={[]}>
          {
            langAvailableFaqs.map(faq => {
              return (
                <Panel header={header(faq)} key={faq._id}>
                  <p>{faq.answer[getLangKey()]}</p>
                </Panel>
              );
            })
          }
        </Collapse>
      </Card>
    </div>
  );

  function header(faq) {
    return (
      <div className={classes.question}>
        {faq.question[getLangKey()]}
      </div>
    );
  }
}

function TopDetailItem({ label, value }) {
  const classes = useStyles();
  return (
    <div className={classes.topDetailItem}>
      <b>{label}: </b>{value}
    </div>
  );
}

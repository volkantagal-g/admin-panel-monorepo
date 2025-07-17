import { List, Tabs, Skeleton, Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { SolutionOutlined } from '@ant-design/icons';
import moment from 'moment';

import { Fragment, useEffect, useMemo } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';

import { getCurrentPageDocsSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import StarDocumentIcon from '@shared/components/UI/StarDocumentIcon';
import { indexedDb } from '@shared/indexedDb';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { Creators } from '../../../redux/actions';
import { getPageOwners } from '@shared/containers/App/redux/selectors';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const { TabPane } = Tabs;
const { Text } = Typography;

export default function DocsMenu({ classes }) {
  const { t } = useTranslation();
  const pageDocs = useSelector(getCurrentPageDocsSelector.getData);
  const pageDocsPending = useSelector(getCurrentPageDocsSelector.getIsPending);

  return (
    <div>
      <Link className={classes.allDocumentsLink} to={ROUTE.PANEL_DOC_SEARCH.path}>{t('ALL_DOCUMENTS')}</Link>
      <Tabs defaultActiveKey="1" className={classes.docsTabs}>
        <TabPane tab={t('PAGE_INFO')} key="1">
          <PageInfo classes={classes} />
        </TabPane>
        <TabPane tab={t('PAGE_DOCUMENTS')} key="2">
          <ListDocuments documents={pageDocs} isPending={pageDocsPending} classes={classes} />
        </TabPane>
      </Tabs>
    </div>
  );
}

const buildMailtoLink = (owner, page, pageOwners, selectedCountry) => {
  let link = `mailto:${owner.email}?cc=`;
  link += encodeURIComponent(pageOwners.filter(o => o !== owner).map(o => `${o.email}, `));

  const subject = `Question about ${page.name[getSelectedLanguage()]}`;
  link += `&subject=${encodeURIComponent(subject)}`;

  const body = `Page Name: ${page.name[getSelectedLanguage()]}
Page URL: ${window.location.href}
Time Stamp: ${new Date()}
Selected Country: ${selectedCountry.name[getSelectedLanguage()]}
Browser Version: ${navigator.userAgent}
Message:

`;
  link += `&body=${encodeURIComponent(body)}`;

  return link;
};

function PageOwners({ pageOwners, isPending, page, classes }) {
  const { t } = useTranslation();
  const selectedCountry = useSelector(getSelectedCountryV2);

  if (isPending) {
    return (
      <div className={classes.pageOwnersSkeleton}>
        <Skeleton loading active title={false} paragraph={{ rows: 1 }} />
      </div>
    );
  }

  const MAX_DISPLAY_PAGE_OWNERS = 2;
  const pageOwnersTruncated = pageOwners.slice(0, MAX_DISPLAY_PAGE_OWNERS);
  return (
    <span>
      {pageOwnersTruncated.map((owner, index) => {
        const maybeComma = (pageOwners.length > 1 && index < MAX_DISPLAY_PAGE_OWNERS - 1) ? ', ' : '';
        return (
          <Fragment key={owner._id}><Text>{owner.name}</Text>&nbsp;
            [<a target="_blank" href={buildMailtoLink(owner, page, pageOwners, selectedCountry)} rel="noreferrer">{owner.email}</a>]{maybeComma}
          </Fragment>
        );
      })}
      {pageOwners.length > MAX_DISPLAY_PAGE_OWNERS && (
      <span>
        &nbsp;({t('X_OF_Y_ARE_DISPLAYED', { X: MAX_DISPLAY_PAGE_OWNERS, Y: pageOwners.length })})
      </span>
      )}
    </span>
  );
}

function PageInfo({ classes }) {
  const { t } = useTranslation();

  const location = useLocation();
  const dispatch = useDispatch();

  const pageOwnersPending = useSelector(getPageOwners.getIsPending);
  const pageOwners = useSelector(getPageOwners.getData);

  const selectedRoute = useMemo(() => Object.values(ROUTE).find(route => matchPath({
    path: route.path,
    end: true,
    caseSensitive: true,
  }, location.pathname)), [location.pathname]);

  const [selectedPage] = useLiveQuery(async () => {
    return indexedDb.pages
      .where('permKey').equals(`PAGE_${selectedRoute.key}`)
      .toArray();
  }, [selectedRoute]) ?? [];

  useEffect(() => {
    if (!selectedPage) return;
    dispatch(Creators.getPageOwnersRequest({ pageId: selectedPage._id }));
  }, [dispatch, selectedPage]);

  if (!selectedPage) return null;

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Text strong>{t('PAGE_NAME')}:</Text>&nbsp;
        <Text>{selectedPage.name[getSelectedLanguage()]}</Text>
      </Col>
      <Col span={24}>
        <Text strong>{t('PAGE_DESCRIPTION')}:</Text>&nbsp;
        <Text>{selectedPage.description[getSelectedLanguage()]}</Text>
      </Col>
      <Col span={24}>
        <Text strong>{t('PAGE_OWNERS')}:</Text>&nbsp;
        <PageOwners pageOwners={pageOwners} isPending={pageOwnersPending} page={selectedPage} classes={classes} />
      </Col>
      <Col span={24}>
        <Text>{t('PAGE_DETAILS')}:</Text>&nbsp;
        <Link to={ROUTE.PAGE_DETAIL.path.replace(':id', selectedPage._id)}>link</Link>
      </Col>
    </Row>
  );
}

function ListDocuments({ documents, isPending, classes }) {
  const { t } = useTranslation();

  return (
    <List className={classes.docsMenu}>
      <Skeleton loading={isPending} active>
        {!documents?.length && <div style={{ margin: '0.5rem auto' }}>{t('NO_DOCUMENTS')}</div>}
        {documents?.length > 0 && documents.map(doc => (
          <List.Item key={doc._id} extra={<StarDocumentIcon panelDoc={doc} />}>
            <List.Item.Meta
              className={classes.menuItem}
              avatar={<SolutionOutlined className={classes.menuItemIcon} />}
              title={(
                <a
                  href={ROUTE.PANEL_DOC_PREVIEW.path.replace(':id', doc._id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.name[getLangKey()]}
                </a>
              )}
              description={(
                <div>
                  <div>
                    {(`${doc.description?.[getLangKey()]} `) || '-'}
                  </div>
                  <div className={classes.lastUpdatedText}>
                    <span style={{ marginRight: '4px' }}>
                      {t('LAST_UPDATED')}:
                    </span>
                    <span>
                      {moment(doc.updatedAt).format('YYYY-MM-DD')}
                    </span>
                  </div>
                </div>
              )}
            />
          </List.Item>
        ))}
      </Skeleton>
    </List>
  );
}

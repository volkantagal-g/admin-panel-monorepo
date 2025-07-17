import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { PageHeader, Col, Row, Divider } from 'antd';

import Spinner from '@shared/components/Spinner';
import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { attachmentURLSelector } from './redux/selectors';
import Attachment from './components/Attachment';

const reduxKey = REDUX_KEY.CLIENT.ATTACHMENTS_DETAIL;

const ClientAttachmentsDetailPage = () => {
  const { t } = useTranslation(['global']);
  const { attachmentId, sessionId } = useParams();
  const dispatch = useDispatch();

  const attachmentURL = useSelector(attachmentURLSelector.getData);
  const isPending = useSelector(attachmentURLSelector.getIsPending);

  useInjectSaga({ key: reduxKey, saga });
  useInjectReducer({ key: reduxKey, reducer });
  useInitAndDestroyPage({ dispatch, Creators });

  usePageViewAnalytics({ name: ROUTE.CLIENT_ATTACHMENTS_DETAIL.name, squad: ROUTE.CLIENT_ATTACHMENTS_DETAIL.squad });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getAttachmentURLRequest(sessionId, attachmentId));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, attachmentId, sessionId]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="page-title"
            title={t('global:PAGE_TITLE.CLIENT_ATTACHMENTS_DETAIL')}
            style={{ marginBottom: '0' }}
          />
        </Col>
        <Divider style={{ marginTop: '0' }} orientation="left" />
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={22}>
          {isPending && <Spinner />}
          {attachmentURL && !isPending && <Attachment type={attachmentURL?.type} url={attachmentURL?.url} />}
        </Col>
      </Row>
    </>
  );
};

export default ClientAttachmentsDetailPage;

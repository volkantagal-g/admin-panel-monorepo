import { Button, Card, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

import CustomCarousel from '@shared/components/UI/CarouselSlider';
import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';

import StarDocumentIcon from '@shared/components/UI/StarDocumentIcon';

const { Meta } = Card;
const { Paragraph } = Typography;
export default function DocsCarousel({
  documents,
  isPending,
  notFoundMessage,
  classes,
  t,
}) {
  return (
    <Skeleton loading={isPending} active style={{ minHeight: '300px' }}>
      {!documents?.length && (<div className={classes.noGuides}>{notFoundMessage}</div>)}
      {documents?.length > 0 && (
      <CustomCarousel>
        {documents.map(guide => (
          <Card
            key={guide._id}
            className={classes.guide}
            extra={<StarDocumentIcon panelDoc={guide} />}
            actions={[
              <Link to={ROUTE.PANEL_DOC_PREVIEW.path.replace(':id', guide._id)} className={classes.detailButton}>
                <Button type="primary" className="w-100">{t('DETAIL')}</Button>
              </Link>,
            ]}
          >
            <Meta
              title={(
                <Paragraph strong ellipsis={{ rows: 2 }} title={guide.name[getLangKey()]} style={{ marginBottom: '0px' }}>
                  {guide.name[getLangKey()]}
                </Paragraph>
              )}
              description={(
                <Paragraph ellipsis={{ rows: 6 }}>
                  {guide.description?.[getLangKey()] || '-'}
                </Paragraph>
              )}
            />
          </Card>
        ))}
      </CustomCarousel>
      ) }
    </Skeleton>
  );
}

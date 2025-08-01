import _ from 'lodash';
import { TFunction } from 'react-i18next';
import { ColumnType } from 'antd/lib/table/interface';

import { Image, Button } from '@shared/components/GUI';
import { DraggableRow } from '@shared/components/GUI/TableDraggable/DraggableRow';
import { EditingStageValidImage } from '../types';
import { isImageRemote } from '../utils';

export const tableConfig = {
  components: { body: { row: DraggableRow } },
  rowKey: 'key',
  scroll: { y: 500 },
  pagination: false,
  rowClassName: (image: EditingStageValidImage) => {
    return image.isLocal ? 'pending' : '';
  },
} as const;

type getColumnsProps =
  (options: {
    t: TFunction,
    onMainImageChange: (key: string) => void,
    onRetry: (key: string) => void,
    onRemove: (key: string) => void,
  }) => ColumnType<EditingStageValidImage>[];

export const getColumns: getColumnsProps = ({
  t,
  onMainImageChange,
  onRetry,
  onRemove,
}) => [
  {
    title: t('IMAGE'),
    width: 100,
    align: 'center',
    render: (__, { imageUrl, key }) => {
      return (
        // @ts-ignore
        <Image src={imageUrl} height={64} alt={t('GALLERY.IMAGE_SETTINGS_MODAL.LIST_IMAGE_ALT_TEXT')} data-testid={`image-list-${key}`} />
      );
    },
  },
  {
    align: 'left',
    title: t('ACTION'),
    render: (__, image) => {
      const canBeMain = !image.isMain && !image.isSelected && isImageRemote(image);
      return (
        <>
          {/* @ts-ignore */}
          <Button
            size="small"
            disabled={!canBeMain}
            color="secondary"
            onClick={() => onMainImageChange(image.key)}
          >
            {_.cond([
              [_.constant(image.isLocal && image.isFailed), _.constant(t('GALLERY.IMAGE_SETTINGS_MODAL.FAILED'))],
              [_.constant(image.isLocal && image.isUploading), _.constant(t('GALLERY.IMAGE_SETTINGS_MODAL.UPLOADING'))],
              [_.constant(image.isMain), _.constant(t('GALLERY.IMAGE_SETTINGS_MODAL.MAIN_IMAGE'))],
              [_.stubTrue, _.constant(t('GALLERY.IMAGE_SETTINGS_MODAL.MAKE_MAIN'))],
            ])()}
          </Button>
          {image.isLocal && image.isFailed && (
            <>
              {/* @ts-ignore */}
              <Button onClick={() => onRetry(image.key)} size="small" color="secondary">
                {t('GALLERY.IMAGE_SETTINGS_MODAL.RETRY')}
              </Button>
              {/* @ts-ignore */}
              <Button onClick={() => onRemove(image.key)} size="small" color="secondary">
                {t('GALLERY.IMAGE_SETTINGS_MODAL.REMOVE')}
              </Button>
            </>
          )}
        </>
      );
    },
  },
  { key: 'sort', align: 'center', width: 60, padding: 0 },
];

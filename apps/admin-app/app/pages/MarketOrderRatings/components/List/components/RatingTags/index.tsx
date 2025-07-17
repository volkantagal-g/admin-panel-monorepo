import isEmpty from 'lodash/isEmpty';
import { Tree } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

import { Key } from 'react';

import { EventDataNode } from 'antd/lib/tree';

import { getLangKey } from '@shared/i18n';
import { TagPayload } from '@shared/api/marketOrderRatings';
import { Tag } from '@shared/components/GUI';

type Classes = {
  tag: string;
  tagButton: string;
};

type TreeProps = {
  dragNode: EventDataNode;
  dragNodesKeys: Key[];
  dropPosition: number;
  dropToGap: boolean;
}

type RatingTagsProps = {
  tags: TagPayload[];
  onUpdateTag: (tag: TagPayload) => void;
  classes: Classes;
  onDeleteTag: (tag: TagPayload) => void;
  t: (args: string) => string;
  onDrop: (info: TreeProps, dataTree: TagPayload[]) => HTMLDivElement;
};

const RatingTagsComponent = ({
  tags,
  onUpdateTag,
  classes,
  onDeleteTag,
  t,
  onDrop,
}: RatingTagsProps) => {
  const treeData: any = tags
    ?.filter((tag: any) => !isEmpty(tag.title))
    .map((tag: TagPayload, index: number) => {
      return {
        ...tag,
        key: index,
        name: tag.title,
        title: (
          <Tag key={tag._id} color="secondary" className={classes.tag}>
            {tag?.title?.[getLangKey()]}
            <div className={classes.tagButton}>
              <EditTwoTone
                onClick={() => onUpdateTag(tag)}
                title={t('UPDATE_TAG')}
              />
              <DeleteTwoTone
                title={t('DELETE_TAG')}
                onClick={() => onDeleteTag(tag)}
              />
            </div>
          </Tag>
        ),
      };
    });
  return treeData?.length > 0 ? (
    <Tree
      data-testid="tags-tree"
      style={{ padding: 0 }}
      onDrop={(
        info: TreeProps,
      ) => onDrop(info, treeData)}
      blockNode
      draggable
      treeData={treeData}
    />
  ) : null;
};

export default RatingTagsComponent;

import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { addFavoriteDocumentSelector, favoriteDocumentMapSelector, removeFavoriteDocumentSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

export default function StarDocumentIcon({ panelDoc }) {
  const dispath = useDispatch();
  const favoriteDocMap = useSelector(favoriteDocumentMapSelector);

  const isFav = !!favoriteDocMap?.[panelDoc._id];

  const isAdding = useSelector(s => addFavoriteDocumentSelector(s, panelDoc._id));
  const isRemoving = useSelector(s => removeFavoriteDocumentSelector(s, panelDoc._id));
  const isPending = !!(isAdding?.isPending || isRemoving?.isPending);

  if (isPending) {
    return <Spin size="small" />;
  }

  if (isFav) {
    return <StarFilled style={{ fontSize: '1rem', color: '#5D3EBC' }} onClick={onRemoveFavorite} />;
  }

  return (
    <StarOutlined style={{ fontSize: '1rem' }} onClick={onAddFavorite} />
  );

  function onAddFavorite() {
    dispath(CommonCreators.addFavoriteDocumentRequest({ _id: panelDoc._id }));
  }

  function onRemoveFavorite() {
    dispath(CommonCreators.removeFavoriteDocumentRequest({ _id: panelDoc._id }));
  }
}

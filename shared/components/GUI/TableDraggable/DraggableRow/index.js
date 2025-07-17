import { Children, cloneElement } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import sortIcon from '@shared/assets/GUI/Icons/Solid/Sort.svg';
import { Button } from '../../Button';

export const DraggableRow = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      },
    )?.replace(/translate3d\(([^,]+),/, 'translate3d(0,'),
    transition,
    ...(isDragging
      ? {
        position: 'relative',
        zIndex: 999,
      }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {Children.map(children, child => {
        if (child.key === 'sort') {
          return cloneElement(child, {
            children: (
              <div>
                <Button
                  ref={setActivatorNodeRef}
                  noBackground
                  color="default"
                  size="small"
                  icon={(<img alt="sort-icon" src={sortIcon} />)}
                  style={{
                    touchAction: 'none',
                    cursor: 'move',
                  }}
                  {...listeners}
                />
              </div>
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

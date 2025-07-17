import {
  ReactNode,
  ReactChild,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';

import { isFragment } from '@shared/utils/isFragment';

/**
  Returns React children into an array, flattening fragments.
  https://github.com/grrowl/react-keyed-flatten-children
*/
export function flattenChildren(
  children: ReactNode,
  depth: number = 0,
  keys: (string | number)[] = [],
): ReactChild[] {
  return Children.toArray(children).reduce(
    (acc: ReactChild[], node, nodeIndex) => {
      if (isFragment(node)) {
        acc.push(...flattenChildren(
          (node as ReactElement).props.children,
          depth + 1,
          keys.concat((node as ReactElement).key || nodeIndex),
        ));
      }
      else if (isValidElement(node)) {
        acc.push(
          cloneElement(node, { key: keys.concat(String(node.key)).join('.') }),
        );
      }
      else if (typeof node === 'string' || typeof node === 'number') {
        acc.push(node);
      }
      return acc;
    },
    [],
  );
}

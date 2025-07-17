import React from 'react';

export function isFragment(node) {
  if (node?.type) {
    return node.type === React.Fragment;
  }

  return node === React.Fragment;
}

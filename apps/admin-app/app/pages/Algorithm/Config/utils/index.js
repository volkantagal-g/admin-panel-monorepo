export const authorizedNamespaces = ['market', 'food', 'voyager', 'locals'];

export const getPermKeyByNamespace = ({
  edit = true,
  namespace,
}) => {
  if (!authorizedNamespaces.includes(namespace)) {
    return 'PAGE_ALGORITHM_CONFIG_DETAIL';
  }
  return `PAGE_ALGORITHM_CONFIG_LIST_COMPONENT_${edit ? 'EDIT' : 'VIEW'}_PERMISSION_GETIR_${namespace?.toUpperCase()}`;
};

export const getNestedParents = object => {
  if (object?.parent) {
    const upperParents = getNestedParents(object.parent);
    return [object.parent, ...upperParents];
  }
  return [];
};

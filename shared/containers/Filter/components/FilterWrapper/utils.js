import { cloneElement, Children, isValidElement, Fragment } from 'react';

export const createChildrenWithFilterKeyProp = (children, filterKey) => {
  const propInjectedChildren = [];
  const uniqueComponentKeys = new Set();

  Children.forEach(children, element => {
    if (!isValidElement(element)) {
      // Ignore non-elements. This can happen if you have a text node in your array.
      return;
    }

    // Transparently support React.Fragment, HTML tags and its children.
    if (element.type === Fragment || typeof element.type === 'string') {
      propInjectedChildren.push(createChildrenWithFilterKeyProp(element.props.children, filterKey));
      return;
    }

    const uniqueKey = `${element.type.name}-${filterKey}`;

    if (uniqueComponentKeys.has(uniqueKey)) {
      throw new Error(
        `"${element.type.name}" component should not be used in the same FilterWrapper with the same filterKey: "${filterKey}"`,
      );
    }

    uniqueComponentKeys.add(uniqueKey);

    let filterKeyInjectedChildren;
    const filterKeyInjectedProps = {
      ...element.props,
      filterKey,
      key: uniqueKey,
    };

    if (element.props.children) {
      filterKeyInjectedChildren = createChildrenWithFilterKeyProp(
        element.props.children,
        filterKey,
      );
    }

    const newElement = cloneElement(element, filterKeyInjectedProps, filterKeyInjectedChildren);
    propInjectedChildren.push(newElement);
  });

  return propInjectedChildren;
};

const styles = theme => {
  return {
    rowMainCategoryBg: { backgroundColor: theme.color.getir.yellow },
    activeCategory: { '&.ant-select-item-option': { borderLeft: `3px solid ${theme.color.green} !important` } },
    inactiveCategory: { '&.ant-select-item-option': { borderLeft: `3px solid ${theme.color.red} !important` } },
  };
};

export default styles;

export const selectOptionsSearchWithValue = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.children[0].props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

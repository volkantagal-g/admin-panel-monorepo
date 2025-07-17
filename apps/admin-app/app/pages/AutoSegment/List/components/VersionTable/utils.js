export function getClientListMap(templates) {
  return templates.reduce((accum, { _id: id, name }) => {
    // eslint-disable-next-line no-param-reassign
    accum[id] = { name };

    return accum;
  }, {});
}

import * as allCommonExported from './common';

const allReducerFunctions = Object.entries(allCommonExported).filter(
  ([, value]) => typeof value === 'function',
);
// TODO: Remove these tests when tested pages start using common redux
describe('All common reducer functions', () => {
  it.each(allReducerFunctions)('%s should return object', (reducerName, reducer) => {
    expect(reducer({}, {})).toBeInstanceOf(Object);
  });
});

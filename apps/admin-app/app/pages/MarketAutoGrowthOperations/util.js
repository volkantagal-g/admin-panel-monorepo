import { downloadDataAsCSV } from '@shared/utils/common';

export const highLowSet = currentObject => {
  let highSet = -Infinity;
  let lowSet = Infinity;
  let tmp = 0;
  if (currentObject && currentObject?.length > 0) {
    for (let j = currentObject.length - 1; j >= 0; j--) {
      tmp = Number(currentObject[j].set);
      if (Number(tmp) < Number(lowSet)) lowSet = tmp;
      if (Number(tmp) > Number(highSet)) highSet = tmp;
    }
  }
  else return undefined;
  return { highSet, lowSet };
};

export const findBucketGroups = result => {
  if (result && result?.length > 0) {
    const groups = result.reduce((buckets, item) => ({
      ...buckets,
      [item.bucketType]: [...(buckets[item.bucketType] || []), item],
    }), {});
    Object.entries(groups).map(group => group[1].sort((a, b) => parseFloat(a.set) - parseFloat(b.set)));
    return groups;
  }
  return undefined;
};

export const exportAutoGrowth = (data = {}) => {
  const columnNames = data?.fields?.map(item => item.title) ?? [];
  const columns = [Object.fromEntries(columnNames.map(name => [name, name]))];
  downloadDataAsCSV({ columns, data: data.content, fileName: 'marketAutoGrowthOperations' });
};

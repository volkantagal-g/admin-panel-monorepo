import { getLangKey } from '@shared/i18n';
import { PRODUCT_SEGMENTS2, SEGMENT } from '../constants';

export const getSegmentName = segmentValue => {
  if (!segmentValue) return '-';
  const segmentEntry = Object.entries(SEGMENT).find(([, val]) => val.toString() === segmentValue.toString());
  if (segmentEntry) {
    return segmentEntry[0];
  }
  return segmentValue.toString();
};

export const getSegment2Name = segment2Value => {
  if (!segment2Value) return '-';
  const segment2Entry = Object.entries(PRODUCT_SEGMENTS2).find(([key]) => key === segment2Value.toString());
  if (segment2Entry) {
    return segment2Entry[1][getLangKey()];
  }
  return segment2Value.toString();
};

export const createSegmentOptions = () => {
  return Object.entries(SEGMENT).map(([key, value]) => ({
    id: value.toString(),
    name: key,
  }));
};

export const createSegment2Options = () => {
  return Object.entries(PRODUCT_SEGMENTS2).map(([key, value]) => ({
    id: key,
    name: value[getLangKey()],
  }));
};

export const renderSegment = (text, record) => {
  if (!record) return getSegmentName(text);

  if (record.rawData?.chain?.productSegmentPlanning !== undefined) {
    return getSegmentName(record.rawData.chain.productSegmentPlanning);
  }

  return getSegmentName(text || record.segment);
};

export const renderSegment2 = (text, record) => {
  if (!record) return getSegment2Name(text);

  if (record.rawData?.chain?.productSegmentLogistic !== undefined) {
    return getSegment2Name(record.rawData.chain.productSegmentLogistic);
  }

  return getSegment2Name(text || record.segment2);
};

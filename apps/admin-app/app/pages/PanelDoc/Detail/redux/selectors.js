import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.PANEL_DOC.DETAIL;

export const panelDocByIdSelector = {
  getIsPending: state => state[reduxKey]?.panelDocById?.isPending,
  getData: createSelector(
    state => state[reduxKey]?.panelDocById?.data,
    data => (data?.files ? {
      ...data,
      files: data.files.map(file => ({ ...file, fakeId: file.fileKey })),
      faqs: data.faqs.map(faq => ({ ...faq, fakeId: faq._id })),
    } : data),
  ),
};

export const panelDocUpdateActivenessSelector = {
  getData: state => state[reduxKey]?.panelDocUpdateActiveness?.data,
  getIsPending: state => state[reduxKey]?.panelDocUpdateActiveness?.isPending,
};

export const panelDocUpdateSelector = { getIsPending: state => state[reduxKey]?.panelDocUpdate?.isPending };

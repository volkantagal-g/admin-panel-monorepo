export const mockedAuditFormTypeList = {
  _id: '61dd61de3a11b0791f27fd97',
  name: {
    tr: 'Uzun Denetim1',
    en: 'Long Audit_edited',
  },
  isSendToFranchise: true,
  updatedAt: '2022-05-17T07:47:14.383Z',
  country: '55999ad00000010000000000',
};

export const mockedAuditFormTypeDetail = {
  _id: '61dd61e63a11b0791f27fd98',
  name: {
    en: 'Short Audit',
    tr: 'Kısa Denetim1',
  },
  updatedAt: '2022-09-16T12:28:56.710Z',
  country: '55999ad00000010000000000',
  questionGroups: [
    {
      _id: '6231873ef1e6beaa21cb4eb8',
      auditFormType: [
        '61dd61e63a11b0791f27fd98',
      ],
      name: {
        tr: 'Puansız',
        en: 'No Point',
      },
      status: 'ACTIVE',
      createdAt: '2022-03-16T06:44:14.060Z',
      updatedAt: '2022-03-16T06:44:14.060Z',
      __v: 0,
      position: 0,
      country: '55999ad00000010000000000',
    },
    {
      _id: '621e34cf6b172f48ab432967',
      auditFormType: [
        '61dd61e63a11b0791f27fd98',
        '61dd61de3a11b0791f27fd97',
      ],
      name: {
        tr: '01March Question Group_ShortAudit +Long Audit',
        en: '01March Question Group_ShortAudit +Long Audit',
      },
      status: 'ACTIVE',
      createdAt: '2022-03-01T14:59:27.773Z',
      updatedAt: '2022-03-22T11:39:17.951Z',
      __v: 0,
      country: '55999ad00000010000000000',
      position: 1,
    },
    {
      _id: '627d1478892ad4d574151d10',
      auditFormType: [
        '61dd61e63a11b0791f27fd98',
        '61dd61de3a11b0791f27fd97',
      ],
      name: {
        tr: 'angmar test tr',
        en: 'angmar test tr',
      },
      status: 'ACTIVE',
      country: '55999ad00000010000000000',
      createdAt: '2022-05-12T14:06:48.830Z',
      updatedAt: '2022-05-12T14:06:48.830Z',
      __v: 0,
      position: 2,
    },
  ],
};

export const mockedAuditFormTypeListResponse = {
  data: [
    mockedAuditFormTypeList,
  ],
};

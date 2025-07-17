import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { getExpandedRowColumns, getTableColumns } from './config';

const title = {
  'global:NAME_1': 'Name',
  'global:DESCRIPTION': 'Description',
  'global:DETAIL': 'Detail',
};

const tMock = name => {
  return title[name];
};

describe('ReportTagsList/config.js', () => {
  afterAll(cleanup);

  it('should return the correct table columns', () => {
    const canAccessReportTagDetail = true;
    const expectedColumns = [
      {
        title: <b>Name</b>,
        dataIndex: 'name',
        key: 'name',
        sorter: expect.any(Function),
        defaultSortOrder: 'ascend',
        render: expect.any(Function),
      },
      {
        title: <b>Description</b>,
        dataIndex: 'description',
        key: 'description',
        render: expect.any(Function),
      },
      {
        title: <b>Detail</b>,
        dataIndex: '_id',
        key: 'detail',
        align: 'center',
        width: 100,
        render: expect.any(Function),
      },
    ];
    const actualColumns = getTableColumns(tMock, canAccessReportTagDetail);
    expect(actualColumns).toEqual(expectedColumns);
  });

  it('should return the correct expanded row columns', () => {
    const canAccessReportTypeDetail = true;
    const expectedColumns = [
      {
        title: '#',
        key: 'index',
        width: 44,
        render: expect.any(Function),
      },
      {
        title: <b>Name</b>,
        dataIndex: 'name',
        key: 'name',
        sorter: expect.any(Function),
        defaultSortOrder: 'ascend',
        render: expect.any(Function),
        width: 250,
      },
      {
        title: <b>Description</b>,
        dataIndex: 'description',
        key: 'description',
        render: expect.any(Function),
        width: 300,
      },
      {
        title: <b>Detail</b>,
        dataIndex: '_id',
        key: 'detail',
        align: 'center',
        width: 100,
        render: expect.any(Function),
      },
    ];
    const actualColumns = getExpandedRowColumns(tMock, canAccessReportTypeDetail);
    expect(actualColumns).toEqual(expectedColumns);
  });
});

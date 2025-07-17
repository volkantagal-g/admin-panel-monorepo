import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Tooltip, Tag } from 'antd';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { getTableRangeColumnRender } from '@app/pages/ABTest/utils';
import { TEST_STATUSES, TEST_STATUS_COLOR_MAP } from '@app/pages/ABTest/constants';

export const getColumns = ({ t, canAccess }) => {
  return [
    {
      title: <b>{t('abTestingPage:TEST_CODE')}</b>,
      dataIndex: 'testCode',
      key: 'testCode',
      align: 'left',
      width: 150,
      render: testCode => testCode,
    },
    {
      title: <b>{t('abTestingPage:TEST_NAME')}</b>,
      dataIndex: 'testName',
      key: 'testName',
      sorter: (a, b) => {
        return a.testName.localeCompare(b.testName);
      },
      width: 250,
      render: testName => testName,
    },
    {
      title: <b>{t('START_DATE')}</b>,
      dataIndex: 'testStartDate',
      key: 'testStartDate',
      sorter: (a, b) => {
        return moment(a.testStartDate).valueOf() - moment(b.testStartDate).valueOf();
      },
      width: 150,
      render: getTableRangeColumnRender,
    },
    {
      title: <b>{t('END_DATE')}</b>,
      dataIndex: 'testEndDate',
      key: 'testEndDate',
      sorter: (a, b) => {
        return moment(a.testEndDate).valueOf() - moment(b.testEndDate).valueOf();
      },
      width: 150,
      render: getTableRangeColumnRender,
    },
    {
      title: <b>{t('abTestingPage:TEST_TYPE')}</b>,
      dataIndex: 'testType',
      key: 'testType',
      width: 150,
      render: testType => t(`abTestingPage:TEST_TYPES_${testType}`),
    },
    {
      title: <b>{t('CREATED_BY')}</b>,
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 150,
      render: createdBy => (
        <Tooltip title={createdBy?.email}>
          {createdBy?.name}
        </Tooltip>
      ),
    },
    {
      title: <b>{t('STATUS')}</b>,
      dataIndex: 'testStatus',
      key: 'testStatus',
      width: 100,
      render: testStatus => (
        <Tag color={TEST_STATUS_COLOR_MAP[testStatus]}>
          {t(`abTestingPage:TEST_STATUSES.${testStatus}`)}
        </Tag>
      ),
    },
    {
      title: <b>{t('ACTION')}</b>,
      align: 'right',
      key: '_id',
      width: 150,
      render: testData => {
        const { _id, testStatus } = testData;

        if (testStatus === TEST_STATUSES.FAILED) {
          return null;
        }

        const path = ROUTE.AB_TEST_DETAIL.path.replace(':id', _id);
        return (
          canAccess(permKey.PAGE_AB_TEST_DETAIL) &&
            (
              <Link to={path}>
                <Button type="default" size="small">
                  {t('DETAIL')}
                </Button>
              </Link>
            )
        );
      },
    },
  ];
};

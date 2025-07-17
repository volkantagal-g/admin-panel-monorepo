import moment from 'moment';
import { Link } from 'react-router-dom';
import { Tooltip, message, Tag as AntTag } from 'antd';

import copy from 'copy-to-clipboard';
import CheckableTag from 'antd/lib/tag/CheckableTag';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { getTableRangeColumnRender } from '@app/pages/ABTestV2/utils';
import { TEST_STATUSES, TEST_STATUS_COLOR_MAP } from '@app/pages/ABTestV2/constants';
import { Button, Tag } from '@shared/components/GUI';

export const getColumns = ({ t, canAccess, classes }) => {
  const copyToClipBoard = copyText => {
    copy(copyText);
    message.success(`${t('COPIED_ID')} ${copyText}`, 1);
  };

  return [
    {
      title: <b>{t('EXPERIMENT_ID')}</b>,
      dataIndex: '_id',
      key: 'experimentId',
      align: 'left',
      width: 250,
      render: experimentId => (
        <CheckableTag
          key={experimentId}
          onChange={() => copyToClipBoard(experimentId)}
          className={classes.copyId}
        >
          {experimentId}
        </CheckableTag>
      ),
    },
    {
      title: <b>{t('TEST_NAME')}</b>,
      dataIndex: 'testName',
      key: 'testName',
      sorter: (a, b) => {
        return a.testName.localeCompare(b.testName);
      },
      width: 200,
      render: testName => testName,
    },
    {
      title: <b>{t('TEST_DOMAIN')}</b>,
      dataIndex: 'testDomain',
      key: 'testDomain',
      width: 200,
    },
    {
      title: <b>{t('START_DATE')}</b>,
      dataIndex: 'testStartDate',
      key: 'testStartDate',
      sorter: (a, b) => {
        return (
          moment(a.testStartDate).valueOf() - moment(b.testStartDate).valueOf()
        );
      },
      width: 150,
      render: getTableRangeColumnRender,
    },
    {
      title: <b>{t('END_DATE')}</b>,
      dataIndex: 'testEndDate',
      key: 'testEndDate',
      sorter: (a, b) => {
        return (
          moment(a.testEndDate).valueOf() - moment(b.testEndDate).valueOf()
        );
      },
      width: 150,
      render: getTableRangeColumnRender,
    },
    {
      title: <b>{t('CREATED_BY')}</b>,
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 150,
      render: createdBy => (
        <Tooltip title={createdBy?.email}>{createdBy?.name}</Tooltip>
      ),
    },
    {
      title: <b>{t('STATUS')}</b>,
      dataIndex: 'testStatus',
      key: 'testStatus',
      width: 100,
      render: testStatus => (testStatus === TEST_STATUSES.OUTDATED ? (
        <AntTag className={classes.tagItem}>
          {t(`TEST_STATUSES.${testStatus}`)}
        </AntTag>
      ) : (
        <Tag color={TEST_STATUS_COLOR_MAP[testStatus]}>
          {t(`TEST_STATUSES.${testStatus}`)}
        </Tag>
      )),
    },
    {
      title: <b>{t('ACTION')}</b>,
      align: 'center',
      key: '_id',
      width: 150,
      render: testData => {
        const { _id, testStatus } = testData;

        if (testStatus === TEST_STATUSES.FAILED) {
          return null;
        }

        const path = ROUTE.AB_TEST_V2_DETAIL.path.replace(':id', _id);
        return (
          canAccess(permKey.PAGE_AB_TEST_DETAIL) && (
            <Link to={path}>
              <Button color="secondary" size="small">
                {t('DETAIL')}
              </Button>
            </Link>
          )
        );
      },
    },
  ];
};

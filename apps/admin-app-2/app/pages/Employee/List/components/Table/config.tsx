import { TFunction } from 'react-i18next';
import { Tag, Image } from 'antd';

import RedirectText from '@shared/components/UI/RedirectText';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { EMPLOYMENT_STATUSES_TAG_COLORS } from '@app/pages/Employee/constants';
// @ts-ignore
import NOT_FOUND_IMAGE from '@shared/assets/images/not-found.png';

export const getTableColumns = ({
  t,
  langKey,
}: {
  t: TFunction,
  langKey: string,
}) => [
  {
    title: '',
    dataIndex: 'picURL',
    key: 'picURL',
    width: 48,
    render: (picURL: string) => (
      <Image src={picURL || NOT_FOUND_IMAGE} alt="avatar" />
    ),
  },
  {
    title: t('STATUS'),
    dataIndex: 'employmentStatus',
    key: 'employmentStatus',
    width: 110,
    render: (status: keyof typeof EMPLOYMENT_STATUSES_TAG_COLORS) => (
      <Tag color={EMPLOYMENT_STATUSES_TAG_COLORS[status]}>
        {t(`employeePage:EMPLOYMENT_STATUSES.${status}`)}
      </Tag>
    ),
  },
  {
    title: t('NAME'),
    key: 'fullName',
    width: 150,
    render: ({ _id = '', fullName = '' }) => (
      <RedirectText
        to={ROUTE.EMPLOYEE_DETAIL.path.replace(':id', _id)}
        text={fullName}
        permKey={permKey.PAGE_EMPLOYEE_DETAIL}
        target="_self"
        isIconVisible={false}
      />
    ),
  },
  {
    title: `${t('DEPARTMENT')} / ${t('SUB_DEPARTMENT')}`,
    key: 'departmentAndSubDepartment',
    width: 250,
    render: ({ department, subDepartments }: any) => {
      const departmentText = department?.name?.[langKey] || '';
      const subDepartmentText = subDepartments?.firstLevelSub?.name?.[langKey] || '';
      return `${departmentText} / ${subDepartmentText}`;
    },
  },
  {
    title: t('BUSINESS_UNIT'),
    key: 'businessUnit',
    width: 90,
    render: ({ businessUnit }: any) => (businessUnit?.name?.[langKey]),
  },
  {
    title: t('JOB_TITLE'),
    key: 'jobTitle',
    width: 175,
    render: ({ jobTitle }: any) => (jobTitle),
  },
  {
    title: t('employeePage:LINE_MANAGER'),
    key: 'lineManager',
    width: 150,
    render: ({ lineManager }: any) => (
      <RedirectText
        to={ROUTE.EMPLOYEE_DETAIL.path.replace(':id', lineManager?._id)}
        text={lineManager?.fullName}
        permKey={permKey.PAGE_EMPLOYEE_DETAIL}
        target="_self"
        isIconVisible={false}
      />
    ),
  },
  {
    title: t('WORK_EMAIL'),
    key: 'workEmail',
    width: 190,
    render: ({ workEmail }: any) => {
      return <a href={`mailto:${workEmail}`}>{workEmail}</a>;
    },
  },
  {
    title: t('LOCATION'),
    key: 'locationName',
    width: 150,
    render: ({ mainWorkLocation }: any) => mainWorkLocation?.name?.[langKey],
  },
  {
    title: t('ASSETS'),
    align: 'right',
    width: 100,
    render: ({ _id }: any) => (
      <RedirectButtonV2
        to={ROUTE.EMPLOYEE_DETAIL_ASSET_LIST.path.replace(':id', _id)}
        text={t('ASSETS')}
        permKey={permKey.PAGE_EMPLOYEE_DETAIL_ASSET_LIST}
      />
    ),
  },
];

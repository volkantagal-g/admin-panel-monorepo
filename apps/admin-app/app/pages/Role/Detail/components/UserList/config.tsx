import { Button, Input, Popconfirm, Tag, Tooltip } from 'antd';
import { GlobalOutlined, SearchOutlined, StopOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import moment from 'moment';
import { FilterDropdownProps, SortOrder } from 'antd/lib/table/interface';

import { TFunction } from 'react-i18next';

import { RoleMembershipUpdateModal } from '@shared/components/CorePanel/RoleMembershipUpdateModal';
import { t, getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import RoleMembershipTag from '@shared/components/CorePanel/RoleMembershipTag';
import SelectCountry from '@shared/containers/Select/Country';
import { isMobile, searchColumnDataByRegex } from '@shared/utils/common';
import permKey from '@shared/shared/permKey.json';
import LinkOrText from '@shared/components/UI/LinkOrText';

const HAS_GLOBAL_ACCESS = 'hasGlobalAccess';

type GetColumnInputSearchProps = {
  dataIndex: string;
  searchPath?: string;
  classes: Record<string, string>;
}

const getColumnInputSearchProps = ({ dataIndex, searchPath, classes }: GetColumnInputSearchProps) => {
  let searchInputRef: HTMLInputElement;

  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div className={classes.tableSearchWrapper}>
        <Input
          ref={node => {
            searchInputRef = node as unknown as HTMLInputElement;
          }}
          key="searchInput"
          placeholder={t('global:SEARCH')}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          className={classes.tableSearchInput}
        />
        <Button
          key="searchButton"
          type="primary"
          onClick={() => confirm()}
          size="small"
          className={classes.tableSearchButton}
        >
          <SearchOutlined />
          {t('global:SEARCH')}
        </Button>
        <Button
          key="resetButton"
          onClick={() => {
            clearFilters?.();
            confirm();
          }}
          size="small"
          className={classes.tableSearchResetButton}
        >
          {t('global:RESET')}
        </Button>
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined />
    ),
    onFilter: (value: { value: string }, record: PageType) => {
      const rowData = get(record, `${searchPath || dataIndex}`);
      return searchColumnDataByRegex(rowData, value);
    },
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInputRef?.select();
        }, 250);
      }
    },
  });
};

type GetCountriesColumnFilterProps = {
  dataIndex: string;
  countriesMap?: Record<string, ICountry>;
  classes: Record<string, string>;
}

const getCountriesColumnFilterProps = ({
  dataIndex,
  countriesMap,
  classes,
}: GetCountriesColumnFilterProps) => {
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div className={classes.tableSearchWrapper}>
        <SelectCountry
          value={selectedKeys[0]}
          onChange={(selectedCountry: string) => {
            if (selectedCountry) {
              setSelectedKeys([selectedCountry]);
            }
            else {
              setSelectedKeys([]);
            }
            confirm();
          }}
          labelInValue
          className={classes.tableSearchInput}
          showGlobalOption
        />
        <Button
          key="resetButton"
          onClick={() => {
            clearFilters?.();
            confirm();
          }}
          size="small"
          className={classes.tableSearchOnlyResetButton}
        >
          {t('global:RESET')}
        </Button>
      </div>
    ),
    onFilter: (value: { value: string }, record: PageType) => {
      const hasGlobalAccess = get(record, 'hasGlobalAccess', false);
      if (value && (value as { value: string }).value === HAS_GLOBAL_ACCESS) {
        return hasGlobalAccess;
      }

      if (value) {
        return record?.countries?.includes(value.value);
      }
      return true;
    },
    render: (countries: string[], row: PageType) => {
      if (row?.hasGlobalAccess) {
        return (
          <Tooltip title={t('global:GLOBAL_ACCESS')} color="blue">
            <Tag>
              <GlobalOutlined />
            </Tag>
          </Tooltip>
        );
      }

      if (countries.length > 0) {
        return (
          <>
            {
              countries.map(countryId => {
                const countryCode = get(countriesMap, `${countryId}.code.alpha3`) || countryId;
                const countryFlag = get(countriesMap, `${countryId}.flag`) || 'N/A';
                return (
                  <Tooltip
                    title={countryCode}
                    key={countryId}
                  >
                    <Tag>
                      {countryFlag}
                    </Tag>
                  </Tooltip>
                );
              })
            }
          </>
        );
      }

      return (
        <Tooltip title={t('NO_ACCESS')}>
          <Tag>
            <StopOutlined className={classes.noAccessIcon} />
          </Tag>
        </Tooltip>
      );
    },
  });
};

const MISSING_STRING = 'N/A';

export const getTableColumns = ({
  roleId,
  countriesMap,
  hasPermissionToEditUsers,
  handleRemoveRoleFromUserByRoleOwner,
  isActiveUserIsRoleOwner,
  handleUpdateRoleMembership,
  isUpdatePending,
  classes,
  tPage,
}: {
  roleId: MongoIDType,
  countriesMap: Record<string, ICountry>,
  hasPermissionToEditUsers: boolean,
  handleRemoveRoleFromUserByRoleOwner: ({ user }: { user: UserRole }) => void,
  isActiveUserIsRoleOwner: boolean,
  handleUpdateRoleMembership: ({
    roleId,
    userId,
    memberType,
    expiryDate,
    afterSuccess,
  }: {
    roleId: MongoIDType
    userId: MongoIDType
    memberType: number
    expiryDate: Date
    afterSuccess: () => void
  }) => void,
  isUpdatePending: boolean,
  classes: Record<string, string>,
  tPage: TFunction,
}) => {
  const columns = [
    {
      title: '#',
      key: '_index',
      width: 40,
      align: 'right',
      render: (text: string, record: UserRole, index: number) => index + 1,
    },
    {
      title: tPage('MEMBERSHIP_TYPE'),
      dataIndex: 'roleMemberType',
      key: 'roleMemberType',
      width: 120,
      align: 'center',
      sorter: {
        compare: (a: UserRole, b: UserRole) => (a.roleMemberType - b.roleMemberType),
        multiple: 3,
      },
      defaultSortOrder: 'ascend',
      render: (roleMemberType: number) => <RoleMembershipTag memberType={roleMemberType} />,
    },
    {
      title: tPage('NAME'),
      dataIndex: 'name',
      width: 170,
      key: 'name',
      sorter: (a: UserRole, b: UserRole) => {
        const nameA = get(a, 'name', '');
        const nameB = get(b, 'name', '');
        return nameA.localeCompare(nameB);
      },
      defaultSortOrder: 'ascend',
      ...getColumnInputSearchProps({ dataIndex: 'name', classes }),
      render: (name: string, record: UserRole) => {
        return <LinkOrText permKey={permKey.PAGE_USER_DETAIL} to={ROUTE.USER_DETAIL.path.replace(':id', record._id)} text={name} />;
      },
    },
    {
      title: tPage('EMAIL'),
      dataIndex: 'email',
      key: 'email',
      sorter: (a: UserRole, b: UserRole) => {
        const emailA = get(a, 'email', '');
        const emailB = get(b, 'email', '');
        return emailA.localeCompare(emailB);
      },
      width: 220,
      ...getColumnInputSearchProps({ dataIndex: 'email', classes }),
      render: (email: string) => {
        return email;
      },
    },
    {
      title: `${tPage('DEPARTMENT')} / ${tPage('BUSINESS_TITLE')}`,
      dataIndex: 'employeeData',
      key: 'employeeData',
      ellipsis: true,
      sorter: (a: UserRole, b: UserRole, sortOrder?: SortOrder) => {
        const departmentNameA = get(a, ['employeeData', 'department', 'name', getLangKey()], MISSING_STRING);
        const departmentNameB = get(b, ['employeeData', 'department', 'name', getLangKey()], MISSING_STRING);
        const jobTitleA = get(a, ['employeeData', 'jobTitle'], MISSING_STRING);
        const jobTitleB = get(b, ['employeeData', 'jobTitle'], MISSING_STRING);

        if (departmentNameA === MISSING_STRING) {
          return sortOrder === 'ascend' ? 1 : -1;
        }

        if (departmentNameB === MISSING_STRING) {
          return sortOrder === 'ascend' ? -1 : 1;
        }

        return (departmentNameA + jobTitleA).localeCompare(departmentNameB + jobTitleB);
      },
      width: 200,
      render: (employeeData: EmployeeType[]) => {
        const departmentName = get(employeeData, ['department', 'name', getLangKey()], MISSING_STRING);
        const lineManagerName = get(employeeData, ['lineManager', 'fullName'], MISSING_STRING);
        const jobTitle = get(employeeData, 'jobTitle', MISSING_STRING);

        return (
          <Tooltip
            title={(
              <div>
                <div>{tPage('DEPARTMENT')}: {departmentName}</div>
                <div>{tPage('BUSINESS_TITLE')}: {jobTitle}</div>
                <div>{tPage('SUPERVISOR')}: {lineManagerName}</div>
              </div>
            )}
          >
            {departmentName} - {jobTitle}
          </Tooltip>
        );
      },
    },
    {
      title: tPage('PERMITTED_COUNTRIES'),
      width: isMobile() ? 200 : undefined,
      dataIndex: 'countries',
      key: 'countries',
      ...getCountriesColumnFilterProps({ dataIndex: 'countries', countriesMap, classes }),
    },
    {
      title: tPage('JOIN_DATE'),
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      width: 80,
      sorter: (a: UserRole, b: UserRole) => {
        return moment(a.joinedAt).diff(moment(b.joinedAt));
      },
      render: (joinedAt: string) => {
        return moment(joinedAt).format('YYYY-MM-DD');
      },
    },
    {
      title: tPage('EXPIRY_DATE'),
      key: 'roleMemberType',
      width: 80,
      sorter: (a: UserRole, b: UserRole) => {
        return moment(a.expiryDate).diff(moment(b.expiryDate));
      },
      render: (roleMember: UserRole) => {
        if (!roleMember?.expiryDate) return 'N/A';
        return (
          roleMember?.expiryDate
            ? moment.utc(roleMember?.expiryDate).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD')
            : ''
        );
      },
    },

  ];

  if (!hasPermissionToEditUsers && !isActiveUserIsRoleOwner) {
    return columns;
  }

  return [
    ...columns,
    {
      title: tPage('ACTION'),
      dataIndex: '_id',
      width: 150,
      key: '_id',
      align: 'center',
      render: (_id: string, _row: UserRole) => {
        const { roleMemberType, expiryDate } = _row;
        return (
          <>
            {
              hasPermissionToEditUsers || isActiveUserIsRoleOwner ? (
                <Popconfirm
                  title={tPage('CONFIRMATION.REMOVE_USER', { user: _row?.name })}
                  okText={tPage('button:YES')}
                  cancelText={tPage('button:CANCEL')}
                  onConfirm={() => {
                    handleRemoveRoleFromUserByRoleOwner({ user: _row });
                  }}
                >
                  <Button
                    size="small"
                    danger
                    className={classes.actionButton}
                  >
                    {tPage('button:REMOVE')}
                  </Button>
                </Popconfirm>
              ) : undefined
            }
            {
              hasPermissionToEditUsers ? (
                <RoleMembershipUpdateModal
                  roleId={roleId}
                  userId={_id}
                  initialMemberType={roleMemberType}
                  onUpdate={handleUpdateRoleMembership}
                  isUpdatePending={isUpdatePending}
                  expiryDate={expiryDate}
                />
              ) : undefined
            }
          </>
        );
      },
    },
  ];
};

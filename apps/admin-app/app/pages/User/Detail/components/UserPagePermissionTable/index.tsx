import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { useLiveQuery } from 'dexie-react-hooks';
import { IndexableType } from 'dexie';

import {
  countriesSelector,
  getAllPagesSelector,
  getUserOwnedPagesSelector,
} from '@shared/redux/selectors/common';
import AntCard from '@shared/components/UI/AntCard';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLangKey } from '@shared/i18n';

import { getColumns } from './config';
import useStyles from './styles';
import { getUnionPermissionByPermKey } from './utils';
import { Creators } from '../../redux/actions';
import { getUserByIdSelector, getMyPermissionsByPermKeySelector, getUserTotalPermissionsSelector } from '../../redux/selectors';
import { indexedDb } from '@shared/indexedDb';
import TableEmpty from '@shared/shared/components/TableEmpty';

export default function UserPagePermissionTable() {
  const permissionsPending = useSelector(getUserTotalPermissionsSelector.getIsPending);
  const permissionsArrayByPermKey = useSelector(getMyPermissionsByPermKeySelector);
  const langKey = getLangKey();
  // a user can have different permissions for the same page by different roles
  // so we need to union them, get the most permissive version
  const unionPermissionByPermKey = useMemo(() => getUnionPermissionByPermKey(permissionsArrayByPermKey), [permissionsArrayByPermKey]);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('userPage');

  const detailUser = useSelector(getUserByIdSelector.getData);
  const detailUserId = detailUser?._id;
  const userNotFound = !detailUserId;
  const pagesPending = useSelector(getAllPagesSelector.getIsPending);
  const allCountries = useSelector(countriesSelector.getData);

  const userOwnedPages = useSelector(getUserOwnedPagesSelector.getData);
  const userOwnedPagesPending = useSelector(getUserOwnedPagesSelector.getIsPending);
  const userOwnedPagesRequested = useSelector(getUserOwnedPagesSelector.getIsRequested);

  const countriesMap = useMemo(() => {
    const map = new Map();
    allCountries.forEach((country: ICountry) => map.set(country._id, country));
    return map;
  }, [allCountries]);

  const columns = useMemo(
    () => getColumns({ t, unionPermissionByPermKey, countriesMap, classes, detailUser, userOwnedPages, langKey }),
    [t, unionPermissionByPermKey, countriesMap, classes, detailUser, userOwnedPages, langKey],
  );

  const filteredPages = useLiveQuery(() => {
    const hasAccessPermkeys = new Set();
    Object.entries(unionPermissionByPermKey).forEach(([permKey, permission]) => {
      const { countries: permissionCountries, hasGlobalAccess } = permission as { countries: MongoIDType[], hasGlobalAccess: boolean };

      if (hasGlobalAccess || permissionCountries.length) {
        hasAccessPermkeys.add(permKey);
      }
    });

    return indexedDb.pages
      .where('permKey').anyOf([...hasAccessPermkeys] as IndexableType[])
      .toArray();
  }, [unionPermissionByPermKey], []);

  const pagePermissionButton = (
    <Button
      type="primary"
      loading={permissionsPending || pagesPending || userOwnedPagesPending}
      disabled={userNotFound}
      onClick={() => {
        dispatch(Creators.getUserTotalPermissionsRequest({ userId: detailUserId }));
        dispatch(CommonCreators.getAllPagesRequest());
        dispatch(CommonCreators.getUserOwnedPagesRequest({ userId: detailUserId }));
      }}
    >
      {t('BRING_PAGES')}
    </Button>
  );

  const locale = {
    emptyText: (
      <TableEmpty caption={t('CLICK_TO_LOAD_PAGES')}>
        {pagePermissionButton}
      </TableEmpty>
    ),
  };

  return (
    <AntCard title={getTitle()}>
      <AntTableV2
        locale={userOwnedPagesRequested ? null : locale}
        data={filteredPages}
        columns={columns}
        className={classes.table}
        loading={permissionsPending || pagesPending || userOwnedPagesPending}
        expandRowByClick
        data-testid="user-page-permission-table"
        scroll={{ y: 500 }}
      />
    </AntCard>
  );

  function getTitle() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div>{t('PAGE_PERMISSION_INFO')}</div>
        {getTableHeaderButtons()}
      </div>
    );
  }

  function getTableHeaderButtons() {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {pagePermissionButton}
      </div>
    );
  }
}

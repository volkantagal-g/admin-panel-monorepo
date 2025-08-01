import { PageHeader, Row, Col, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { useInitAndDestroyPage, usePageViewAnalytics, usePermission } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import AssignAsset from './components/AssignAsset';
import PrintAssetsButton from './components/PrintAssetsButton';
import PrintReturnAssetsFormButton from './components/PrintReturnAssetsFormButton';
import { tableColumns } from './config';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { employeeAssetListSelector, employeeNonPrivateInformationSelector } from './redux/selectors';
import useStyles from './styles';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { EMPLOYMENT_STATUSES_TAG_COLORS } from '../../constants';
import EmailForPartialReturn from './components/EmailForPartialReturn';

const reduxKey = REDUX_KEY.EMPLOYEE.DETAIL_ASSET_LIST;

const EmployeeDetailAssetList = () => {
  const classes = useStyles();
  const { id: employeeId } = useParams();
  const dispatch = useDispatch();
  const { canAccess, Can } = usePermission();
  const { t } = useTranslation(['employeePage', 'assetPage']);
  const data = useSelector(employeeAssetListSelector.getData);
  const employeeData = useSelector(employeeNonPrivateInformationSelector.getData);
  const isPending = useSelector(employeeAssetListSelector.getIsPending);
  usePageViewAnalytics({ name: ROUTE.EMPLOYEE_DETAIL_ASSET_LIST.name, squad: ROUTE.EMPLOYEE_DETAIL_ASSET_LIST.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    if (employeeId) {
      dispatch(Creators.getEmployeeAssetListRequest({ employeeId }));
      dispatch(Creators.getEmployeeNonPrivateInformationRequest({ employeeId }));
    }
  }, [dispatch, employeeId]);

  return (
    <div className="py-2">
      <Row>
        <Col flex={1}>
          <PageTitleHeader title={t('EMPLOYEE_ASSETS')} />
          <PageHeader
            className="p-0 page-title"
            title={t('EMPLOYEE_ASSETS')}
            subTitle={employeeData && <Tag color={EMPLOYMENT_STATUSES_TAG_COLORS[employeeData?.employmentStatus]}>{employeeData.fullName}</Tag>}
          />
        </Col>
        <Col className={classes.btnWrapper}>
          <Can permKey={permKey.PAGE_EMPLOYEE_DETAIL_ASSET_LIST_COMPONENT_MANAGE_ASSETS}>
            <EmailForPartialReturn isAssetsPending={isPending} />
          </Can>
          <PrintAssetsButton employeeId={employeeId} />
          <PrintReturnAssetsFormButton employeeId={employeeId} />
          <Can permKey={permKey.PAGE_EMPLOYEE_DETAIL_ASSET_LIST_COMPONENT_MANAGE_ASSETS}>
            <AssignAsset isAssetsPending={isPending} />
          </Can>
        </Col>
      </Row>

      <AntTableV2
        data={data}
        columns={tableColumns({ t, canAccess })}
        loading={isPending}
      />
    </div>
  );
};

export default EmployeeDetailAssetList;

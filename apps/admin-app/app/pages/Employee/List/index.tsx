import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { Space, Button, Dropdown, Menu } from 'antd';

import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import permKey from '@shared/shared/permKey.json';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyle from './styles';
import FilterComponent from './components/Filter';
import TableComponent from './components/Table';

const reduxKey = REDUX_KEY.EMPLOYEE.LIST;

const EmployeeListPagePage = () => {
  const { t } = useTranslation(['global', 'employeePage']);
  const dispatch = useDispatch();
  const classes = useStyle();
  usePageViewAnalytics({ name: ROUTE.EMPLOYEE_LIST.name, squad: ROUTE.EMPLOYEE_LIST.squad });
  const { Can, canAccess } = usePermission();
  const hasAccessToExportGetirians = canAccess(permKey.PAGE_EMPLOYEE_LIST_COMPONENT_EXPORT_GETIRIANS_AS_EXCEL);
  const hasAccessToExportGetiriansLimited = canAccess(permKey.PAGE_EMPLOYEE_LIST_COMPONENT_EXPORT_GETIRIANS_LIMITED_AS_EXCEL);
  const hasAccessToExportEducations = canAccess(permKey.PAGE_EMPLOYEE_LIST_COMPONENT_EXPORT_EDUCATIONS_AS_EXCEL);
  const hasAccessToExportEducationsFormerEmployee = canAccess(permKey.PAGE_EMPLOYEE_LIST_COMPONENT_EXPORT_FORMER_EMPLOYEE_EDUCATIONS_AS_EXCEL);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getFilteredEmployeesCommonRequest({}));
  }, [dispatch]);

  const handleEmployeesExcelDownload = () => {
    dispatch(Creators.getEmployeesExcelDownloadRequest());
  };

  const handleFormerEmployeesExcelDownload = () => {
    dispatch(Creators.getFormerEmployeesExcelDownloadRequest());
  };

  const handleEmployeesEducationsExcelDownload = () => {
    dispatch(Creators.getEmployeesEducationsExcelDownloadRequest());
  };

  const handleFormerEmployeesEducationsExcelDownload = () => {
    dispatch(Creators.getFormerEmployeesEducationsExcelDownloadRequest());
  };

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.LIST')} />
      <div className={classes.pageContainer}>
        <header className={classes.pageHeader}>
          {t('employeePage:GETIRIANS')}
          <div>
            {(hasAccessToExportGetirians || hasAccessToExportGetiriansLimited || hasAccessToExportEducations) && (
              <>
                <Dropdown
                  overlay={(
                    <Menu>
                      {hasAccessToExportGetirians && (
                        <Menu.Item key="activeEmployeesDownload">
                          <Button
                            type="link"
                            className={classes.excelDownloadMenuButton}
                            onClick={handleEmployeesExcelDownload}
                          >
                            {t('employeePage:GETIRIANS')}
                          </Button>
                        </Menu.Item>
                      )}
                      {canAccess(permKey.PAGE_EMPLOYEE_LIST_COMPONENT_FORMER_GETIRIANS_TABLE) && (
                        <Menu.Item key="formerEmployeesDownload">
                          <Button
                            type="link"
                            className={classes.excelDownloadMenuButton}
                            onClick={handleFormerEmployeesExcelDownload}
                          >
                            {t('employeePage:FORMER_GETIRIANS')}
                          </Button>
                        </Menu.Item>
                      )}
                      {hasAccessToExportGetiriansLimited && (
                        <Menu.Item key="activeEmployeesLimitedDownload">
                          <Button
                            type="link"
                            className={classes.excelDownloadMenuButton}
                            onClick={() => dispatch(
                              Creators.getEmployeesLimitedExcelDownloadRequest(),
                            )}
                          >
                            {t('employeePage:GETIRIANS_LIMITED')}
                          </Button>
                        </Menu.Item>
                      )}
                      {canAccess(permKey.PAGE_EMPLOYEE_LIST_COMPONENT_EXPORT_FORMER_GETIRIANS_LIMITED_AS_EXCEL) && (
                        <Menu.Item key="formerEmployeesLimitedDownload">
                          <Button
                            type="link"
                            className={classes.excelDownloadMenuButton}
                            onClick={() => dispatch(
                              Creators.getFormerEmployeesLimitedExcelDownloadRequest(),
                            )}
                          >
                            {t('employeePage:FORMER_GETIRIANS_LIMITED')}
                          </Button>
                        </Menu.Item>
                      )}
                      {hasAccessToExportEducations && (
                        <Menu.Item key="employeesEducationsDownload">
                          <Button
                            type="link"
                            className={classes.excelDownloadMenuButton}
                            onClick={handleEmployeesEducationsExcelDownload}
                          >
                            {t('employeePage:EDUCATION_INFORMATION')}
                          </Button>
                        </Menu.Item>
                      )}
                      {hasAccessToExportEducationsFormerEmployee && (
                        <Menu.Item key="formerEmployeesEducationsDownload">
                          <Button
                            type="link"
                            className={classes.excelDownloadMenuButton}
                            onClick={handleFormerEmployeesEducationsExcelDownload}
                          >
                            {t('employeePage:EDUCATION_INFORMATION_FORMER')}
                          </Button>
                        </Menu.Item>
                      )}
                    </Menu>
                  )}
                  trigger={['click']}
                >
                  <Button
                    icon={<DownloadOutlined />}
                    className={classes.inputContainer}
                  >
                    {t('global:EXPORT_EXCEL')}
                  </Button>
                </Dropdown>
                &nbsp;
              </>
            )}
            <RedirectButtonV2
              text={(
                <>
                  <PlusCircleOutlined />
                  &nbsp;{t('employeePage:BUTTON_CREATE_EMPLOYEE')}
                </>
              )}
              to={ROUTE.EMPLOYEE_NEW.path}
              size="middle"
              type="primary"
              permKey={permKey.PAGE_EMPLOYEE_NEW}
              target="_self"
            />
          </div>
        </header>
        <Space direction="vertical" className="w-100">
          <FilterComponent />
          <TableComponent />
        </Space>
      </div>
    </>
  );
};

export default EmployeeListPagePage;

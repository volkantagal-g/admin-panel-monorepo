import { Button, Space, Typography, Alert } from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

import saga from '../../redux/saga';
import reducer from '../../redux/reducer';
import { Creators } from '../../redux/actions';
import { CHANGE_LOG_TYPE_ENUM } from '../../../constants';
import {
  companyChangeLogsSelector,
  companyCredentialsChangeLogsSelector,
  changeLogTableUISelector,
} from '../../redux/selectors';
import useStyles from './styles';

const reduxKey = REDUX_KEY.THIRD_PARTY_COMPANY.DETAIL;

const { Title } = Typography;

const ThirdPartyCompanyDetailChangeLogs: FC = () => {
  const [t] = useTranslation(['thirdPartyCompany', 'global', 'button']);
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  const classes = useStyles();
  const { canAccess } = usePermission();

  const currentChangeLogType = useSelector(changeLogTableUISelector.getCurrentChangeLogType);
  const currentSelectedCredentialKey = useSelector(changeLogTableUISelector.getCurrentSelectedCredentialKey);
  const isCompanyChangeLogsPending = useSelector(companyChangeLogsSelector.getIsPending);
  const isCompanyCredentialsChangeLogsPending = useSelector(companyCredentialsChangeLogsSelector.getIsPending);

  return (
    <Space>
      <Title className={classes.changeLogTitleHeader} level={5}>{t(`thirdPartyCompany:CHANGE_LOG_TYPE_TITLES.${currentChangeLogType}`)}</Title>
      <Button
        onClick={() => dispatch(Creators.companyGeneralChangeLogClicked())}
        loading={isCompanyChangeLogsPending}
        size="small"
      >
        {
          currentChangeLogType === CHANGE_LOG_TYPE_ENUM.COMPANY ?
            t('button:REFRESH') :
            t('thirdPartyCompany:BACK_TO_COMPANY_CHANGE_LOGS')
        }
      </Button>
      {
        currentChangeLogType === CHANGE_LOG_TYPE_ENUM.CREDENTIAL && (
          <Button
            onClick={() => dispatch(Creators.companyCredentialChangeLogClicked({ credentialKey: currentSelectedCredentialKey }))}
            disabled={currentChangeLogType === CHANGE_LOG_TYPE_ENUM.COMPANY}
            loading={isCompanyCredentialsChangeLogsPending}
            size="small"
          >
            {t('button:REFRESH')}
          </Button>
        )
      }
      {
        currentChangeLogType !== CHANGE_LOG_TYPE_ENUM.CREDENTIAL &&
        canAccess(permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_COMPONENT_COMPANY_VIEW_CREDENTIALS) &&
        <Alert className={classes.alert} message={t('thirdPartyCompany:CREDENTIALS_CHANGE_LOG_TITLE_MESSAGE')} type="warning" />
      }
    </Space>
  );
};

export default ThirdPartyCompanyDetailChangeLogs;

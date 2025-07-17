import { useEffect, useMemo, useState } from 'react';
import { Modal, Button, Spin, Empty, Tag, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { getUserRolesSelector } from '../../redux/selectors';
import { displayTypes, roleTableColumns } from './config';
import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import { isMobile } from '@shared/utils/common';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { countriesSelector } from '@shared/redux/selectors/common';
import useStyles from '../UserTable/styles';

type ListingModalProps = {
  actionTitle: string;
  title: string;
  type: string;
  data: {
    userId: MongoIDType;
    countries: Array<MongoIDType>;
    hasGlobalAccess: boolean;
  }
}

const ListingModal = ({
  actionTitle,
  title,
  type,
  data,
}: ListingModalProps) => {
  const { t } = useTranslation(['global', 'rolePage']);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const classes = useStyles();

  const allCountries = useSelector(countriesSelector.getData);
  const userRoles = useSelector(getUserRolesSelector.getData);
  const isUserRolesPending = useSelector(getUserRolesSelector.getIsPending);
  const { canAccess } = usePermission();
  const { userId, countries, hasGlobalAccess } = data;

  useEffect(() => {
    if (isModalVisible && type === displayTypes.ROLE) {
      dispatch(Creators.getUserRolesRequest({ userId }));
    }
  }, [dispatch, isModalVisible, type, userId, countries, hasGlobalAccess]);

  const showModal = () => {
    setIsModalVisible(true);
    if (type === displayTypes.ROLE) {
      AnalyticsService.track(PANEL_EVENTS.USER_LIST.EVENT_NAME, { button: PANEL_EVENTS.USER_LIST.BUTTON.DISPLAY_ROLES });
    }

    if (type === displayTypes.COUNTRY) {
      AnalyticsService.track(PANEL_EVENTS.USER_LIST.EVENT_NAME, { button: PANEL_EVENTS.USER_LIST.BUTTON.DISPLAY_COUNTRIES });
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const userCountries = useMemo(() => {
    if (hasGlobalAccess) {
      return allCountries;
    }
    return allCountries.filter((country: ICountry) => countries.includes(country._id));
  }, [allCountries, countries, hasGlobalAccess]);

  const countryList = (
    <ul>{userCountries?.map((country: ICountry) => (
      <li key={country._id}>
        {country.name[getLangKey()]} - {country.code.alpha3}
      </li>
    ))}
    </ul>
  );

  const roleList = (
    <AntTableV2
      data={userRoles}
      columns={roleTableColumns({ t, canAccess })}
      bordered
      className={classes.table}
    />
  );

  const getCountryData = () => {
    if (data.hasGlobalAccess) {
      return (
        <Tooltip title={t('global:GLOBAL_ACCESS')} color="blue">
          <Tag>
            <GlobalOutlined />
          </Tag>
        </Tooltip>
      );
    }
    if (isEmpty(countryList)) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
    return countryList;
  };

  const isPending = isUserRolesPending;
  const countryData = getCountryData();
  const roleData = isEmpty(roleList) ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : roleList;
  const dataSource = (type === displayTypes.COUNTRY) ? countryData : roleData;
  const result = isPending ? <Spin /> : dataSource;

  return (
    <>
      <Button
        type="default"
        onClick={showModal}
        size="small"
      >
        {actionTitle}
      </Button>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleClose}
        onCancel={handleClose}
        destroyOnClose
        width={isMobile() ? '100%' : 700}
      >
        {result}
      </Modal>
    </>
  );
};

export default ListingModal;

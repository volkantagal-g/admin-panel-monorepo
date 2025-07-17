import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Col, Row, Button } from 'antd';

import JsonModal from '@shared/components/UI/JsonModal';
import permKey from '@shared/shared/permKey.json';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { franchiseUserDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import InputActivenessSwitch from '../InputActivenessSwitch';

const FranchiseUserDetailPageHeader = () => {
  const { t } = useTranslation('marketFranchiseUserPage');
  const dispatch = useDispatch();

  const franchiseUserDetail = useSelector(franchiseUserDetailSelector.getData);
  const isPendingGetFranchiseUserDetail = useSelector(franchiseUserDetailSelector.getIsPending);

  const [isJsonModalVisible, setIsJsonModalVisible] = useState(false);
  const [isUserActivated, setIsUserActivated] = useState(franchiseUserDetail.activate);

  const handleIsJsonModalVisible = bool => {
    setIsJsonModalVisible(bool);
  };

  const handleActiveness = ({ status }) => {
    setIsUserActivated(!!status);
    dispatch(Creators.updateFranchiseUserRequest({ userId: franchiseUserDetail._id, updateData: { active: status } }));
  };

  useEffect(() => {
    setIsUserActivated(franchiseUserDetail.active);
  }, [franchiseUserDetail]);

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE.MARKET_FRANCHISE_USER.DETAIL')} />
      <JsonModal
        title={t('JSON')}
        data={franchiseUserDetail}
        visible={isJsonModalVisible}
        handleCancel={() => handleIsJsonModalVisible(false)}
      />
      <Row align="middle">
        <Col flex={1}>
          <Row align="middle">
            <PageHeader
              className="p-0"
              title={`${franchiseUserDetail.name || ''}`}
            />
            <Button
              size="small"
              onClick={() => handleIsJsonModalVisible(true)}
              disabled={isPendingGetFranchiseUserDetail}
            >
              {t('JSON')}
            </Button>
          </Row>
        </Col>
        <Col>
          <InputActivenessSwitch
            isPending={isPendingGetFranchiseUserDetail}
            handleActiveness={handleActiveness}
            isUserActivated={isUserActivated}
            editPermKey={permKey.PAGE_MARKET_FRANCHISE_USER_EDIT}
          />
        </Col>
      </Row>
    </>

  );
};

export default FranchiseUserDetailPageHeader;

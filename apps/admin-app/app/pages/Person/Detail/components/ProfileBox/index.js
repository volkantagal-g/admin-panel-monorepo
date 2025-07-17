import { Image, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import NOT_FOUND_IMAGE from '@shared/assets/images/not-found.png';
import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import PasswordModal from '../PasswordModal';
import ChangeAvatarModal from '../ChangeAvatarModal';
import Activeness from '../Activeness';
import useStyles from './styles';
import { AVATAR_IMAGE_SIZE, DEFAULT_ROW_SPACING } from '../../constants';

const ProfileBox = ({
  data,
  isActivated,
  isPending,
  isSuccessPersonUpdate,
  handleChangePassword,
  handleChangeAvatar,
  handleActiveness,
  editPermKey,
}) => {
  const { Can } = usePermission();
  const { t } = useTranslation(['personPage', 'success', 'error']);
  const classes = useStyles();

  return (
    <AntCard
      bordered={false}
      title={t('PROFILE.TITLE')}
    >
      <Row
        align="middle"
        justify="center"
        gutter={DEFAULT_ROW_SPACING}
        className={classes.rowItem}
      >
        <Col>
          <Image
            width={AVATAR_IMAGE_SIZE}
            height={AVATAR_IMAGE_SIZE}
            src={data.picURL || NOT_FOUND_IMAGE}
          />
        </Col>
        <Can permKey={editPermKey}>
          <Col>
            <PasswordModal
              isPending={isPending}
              isSuccessPersonUpdate={isSuccessPersonUpdate}
              handleChangePassword={handleChangePassword}
            />
          </Col>
          <Col>
            <ChangeAvatarModal
              isPending={isPending}
              isSuccessPersonUpdate={isSuccessPersonUpdate}
              handleChangeAvatar={handleChangeAvatar}
            />
          </Col>
          <Col>
            <Activeness
              isPending={isPending}
              isActivated={isActivated}
              handleActiveness={handleActiveness}
            />
          </Col>
        </Can>
      </Row>
    </AntCard>
  );
};

export default ProfileBox;

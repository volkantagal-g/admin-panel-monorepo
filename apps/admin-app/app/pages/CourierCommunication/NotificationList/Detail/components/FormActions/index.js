import { Button, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/CourierCommunication/NotificationList/Detail/components/FormActions/styles';

const FormActions = ({ isEditing, setIsEditing }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleEditClick = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <Row justify="end">
      {!isEditing ? (
        <Button key="edit" htmlType="button" onClick={handleEditClick} type="primary" size="middle">{t('button:EDIT')}</Button>
      ) : (
        <>
          <Button key="save" htmlType="submit" type="primary" className={classes.saveButton} size="middle">{t('button:SAVE')}</Button>
          <Button key="cancel" htmlType="reset" type="primary" size="middle">{t('button:CANCEL')}</Button>
        </>
      )}
    </Row>
  );
};

export default FormActions;

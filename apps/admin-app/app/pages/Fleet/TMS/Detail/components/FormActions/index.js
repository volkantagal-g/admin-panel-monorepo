import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const FormActions = ({ isEditing, setIsEditing }) => {
  const { t } = useTranslation();
  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  if (!isEditing) {
    return (
      <Button
        htmlType="button"
        type="primary"
        key="tms/detail/edit"
        onClick={handleEditButtonClick}
      >{t('EDIT')}
      </Button>
    );
  }

  return (
    <>
      <Button
        htmlType="submit"
        type="primary"
        key="tms/detail/save"
        className="mr-2"
      >{t('SAVE')}
      </Button>
      <Button
        htmlType="reset"
        danger
        key="tms/detail/reset"
      >{t('CANCEL')}
      </Button>
    </>
  );
};

export default FormActions;

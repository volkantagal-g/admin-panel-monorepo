import PropTypes from 'prop-types';
import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer(props) {
  const {
    formButtonVisibilty,
    setFormButtonVisibilty,
    customButton,
    handleReset = () => {},
    handleSave = () => {},
    isValid = true,
  } = props;
  const { t } = useTranslation('button');
  
  const classes = useStyles();

  const handleFormButtonVisibilty = () => {
    setFormButtonVisibilty(!formButtonVisibilty);
  };
  
  const handleFormResetButton = () => {
    handleFormButtonVisibilty();
    handleReset();
  };

  return (
    <>
      <Space direction="vertical" align="end" className={classes.formButtonsWrapper}>
        {
          formButtonVisibilty ? (
            <>
              {customButton}
              <Button
                className={classes.cancelButton}
                danger
                htmlType="reset"
                onClick={handleFormResetButton}
              >
                {t('CANCEL')}
              </Button>
              <Button type="primary" htmlType="submit" disabled={!isValid} onClick={handleSave}>
                {t('SAVE')}
              </Button>
            </>
          ) : (
            <Button type="default" htmlType="button" onClick={handleFormButtonVisibilty}>
              {t('EDIT')}
            </Button>
          )
        }
      </Space>
    </>
  );
}

Footer.propTypes = {
  formButtonVisibilty: PropTypes.bool,
  setFormButtonVisibilty: PropTypes.func,
  handleReset: PropTypes.func,
  handleSave: PropTypes.func,
  isValid: PropTypes.bool,
};

export default Footer;

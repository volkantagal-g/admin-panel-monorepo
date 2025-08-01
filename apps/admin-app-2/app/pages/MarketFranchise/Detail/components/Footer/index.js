import PropTypes from 'prop-types';
import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer(props) {
  const {
    formButtonVisibilty,
    setFormButtonVisibilty,
    customButton,
    handleReset,
    handleClick,
    editButtonVisibility = true,
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
    <Space className={classes.formButtonsWrapper}>
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
            <Button type="primary" htmlType="submit" onClick={handleClick}>
              {t('SAVE')}
            </Button>
          </>
        ) : (
          editButtonVisibility && (
          <Button type="default" htmlType="button" onClick={handleFormButtonVisibilty}>
            {t('EDIT')}
          </Button>
          )
        )
      }
    </Space>
  );
}

Footer.propTypes = {
  formButtonVisibilty: PropTypes.bool,
  setFormButtonVisibilty: PropTypes.func,
  customButton: PropTypes.element,
  handleReset: PropTypes.func,
  handleClick: PropTypes.func,
};

Footer.defaultProps = {
  formButtonVisibilty: false,
  setFormButtonVisibilty: () => {},
  customButton: undefined,
  handleReset: () => {},
  handleClick: () => {},
};

export default Footer;

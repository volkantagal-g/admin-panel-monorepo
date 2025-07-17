import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({ marginLeft: { marginLeft: '10px' } });

const RefreshButton = props => {
  const { t } = useTranslation('clientDetail');
  const classes = useStyles();

  return (
    <Button
      size="small"
      className={classes.marginLeft}
      {...props}
    >
      {props.text || t("REFRESH")}
    </Button>
  );
};

export default RefreshButton;
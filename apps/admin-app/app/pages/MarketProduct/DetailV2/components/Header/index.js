import { memo } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-jss';

import useStyles from './styles';
import NewProductButton from '@app/pages/MarketProduct/containers/NewProductButton';
import { Button } from '@shared/components/GUI';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import {
  getMarketProductByIdSelector,
  getProductActivationValidationErrorsSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

const Header = memo(() => {
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isGetValidationErrorsPending = useSelector(getProductActivationValidationErrorsSelector.getIsPending);

  const handleShowValidations = () => {
    dispatch(Creators.getProductActivationValidationErrorsRequest({ ids: [marketProduct._id] }));
  };

  return (
    <Row gutter={theme.spacing(3)} className="mb-4">
      <Col span={12}>
        <span className={classes.title}>{t('PRODUCT_DETAILS.TITLE')}</span>
      </Col>
      <Col span={12} className="text-right">
        <Row gutter={theme.spacing(3)} align="end">
          <Col>
            <Button
              onClick={handleShowValidations}
              loading={isGetValidationErrorsPending}
            >
              {t('PRODUCT_ACTIVATION_ERRORS')}
            </Button>
          </Col>
          <Col>
            <NewProductButton />
          </Col>
        </Row>
      </Col>
    </Row>
  );
});

export default Header;

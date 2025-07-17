import { useTranslation } from 'react-i18next';
import { Input, Form } from 'antd';
import { compose } from 'redux';

import { PROMO_TYPE } from '@shared/containers/Marketing/Select/PromotionSelect/constants';
import MarketPromoSelect from '@shared/containers/Marketing/Select/PromotionSelect/components/MarketPromoSelect';
import FoodPromoSelect from '@shared/containers/Marketing/Select/PromotionSelect/components/FoodPromoSelect';
import LocalsPromoSelect from '@shared/containers/Marketing/Select/PromotionSelect/components/LocalsPromoSelect';
import { PromotionTypeTargetService } from '@shared/containers/Marketing/Select/PromotionSelect/constantValues';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/PromotionSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/PromotionSelect/redux/reducer';

const PromotionSelect = ({
  fieldName,
  hasMultiple = false,
  targetServiceId, disabled, rules, form, inline, onChange, onBlur, formHelp, formItemClassName,
}) => {
  const { t } = useTranslation('marketing');
  return (
    <>
      {!targetServiceId && (
        <Form.Item
          name={fieldName}
          className="d-inline"
          rules={[{ required: true, message: t('error:REQUIRED') }]}
          aria-label={t('PLEASE_SELECT_SERVICE_FIRST')}
        >
          <Input
            placeholder={t('PLEASE_SELECT_SERVICE_FIRST')}
            disabled
            readOnly
          />
        </Form.Item>
      )}

      {
        PromotionTypeTargetService[PROMO_TYPE.MARKET_PROMO]?.includes(targetServiceId) &&
        (
          <MarketPromoSelect
            hasMultiple={hasMultiple}
            fieldName={fieldName}
            disabled={disabled}
            rules={rules}
            form={form}
            inline={inline}
            onChange={onChange}
            onBlur={onBlur}
            formHelp={formHelp}
            formItemClassName={formItemClassName}
          />
        )
      }
      {PromotionTypeTargetService[PROMO_TYPE.FOOD_PROMO]?.includes(targetServiceId) &&
        <FoodPromoSelect hasMultiple={hasMultiple} fieldName={fieldName} disabled={disabled} rules={rules} form={form} inline={inline} />}
      {PromotionTypeTargetService[PROMO_TYPE.LOCALS_PROMO]?.includes(targetServiceId) &&
        <LocalsPromoSelect hasMultiple={hasMultiple} fieldName={fieldName} disabled={disabled} rules={rules} form={form} inline={inline} />}
    </>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.PROMO;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PromotionSelect);

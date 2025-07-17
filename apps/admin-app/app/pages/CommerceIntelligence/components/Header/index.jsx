import { useTranslation } from 'react-i18next';

import Button from '@app/pages/CommerceIntelligence/components/Button';
import { TRANSLATION_NAMESPACE } from '@app/pages/CommerceIntelligence/constants';
import rootSaga from '@app/pages/CommerceIntelligence/redux/saga';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';

import { productMatchingReducer } from '@app/pages/CommerceIntelligence/redux/reducer';
import { useInjectReducer } from '@shared/utils/injectReducer';
import useStyles from './styles';

const Header = ({ title, rulesetAndGuardrailsButton, onRulesetAndGuardrailsClick }) => {
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);

  useInjectReducer({
    key: REDUX_KEY.COMMERCE_INTELLIGENCE.ROOT,
    reducer: productMatchingReducer,
  });

  useInjectSaga({
    key: REDUX_KEY.COMMERCE_INTELLIGENCE.ROOT,
    saga: rootSaga,
  });

  return (
    <div className={classes.header}>
      <div className={classes.body}>
        <div className={classes.titleWrapper}>
          <span className={classes.title}>{title}</span>
        </div>
        {rulesetAndGuardrailsButton && (
          <div className={classes.buttonWrapper}>
            <Button
              type="primary"
              size="medium"
              onClick={onRulesetAndGuardrailsClick}
              className={classes.button}
            >
              {t('SMART_PRICING.RULESETS_AND_GUARDRAILS')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

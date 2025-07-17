import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';

import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { createMerchantSelector } from '../../redux/selectors';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { addSettingsToCreateMerchantRequest } from './formHelper';
import { fixCustomIdentifiersValuesByType } from '@app/pages/Payment/utils';
import PaymentProviderForm from './components/PaymentProviderForm';
import CreateMerchantForm from './components/CreateMerchantForm';

const New = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const country = getSelectedCountry();
  const countryCode = get(country, ['code', 'alpha2'], '');
  const countryTimeZone = get(country, 'timezones.0.timezone', '');

  const createMerchantSelectorData = useSelector(
    createMerchantSelector.getData,
  );

  const createdMerchantId = createMerchantSelectorData?.id;

  const onFinish = values => {
    const { key, customIdentifiers, webHooks } = values;
    const createMerchantSettings = addSettingsToCreateMerchantRequest(values, countryTimeZone, countryCode);
    const fixedCustomIdentifiers = fixCustomIdentifiersValuesByType(customIdentifiers);
    const createMerchantWebhookPayloads = webHooks;
    const createMerchantRequestPayload = {
      key,
      settings: createMerchantSettings,
      customIdentifiers: fixedCustomIdentifiers,
      createMerchantWebhookPayloads,
    };
    dispatch(Creators.createMerchantRequest(createMerchantRequestPayload));
  };

  return (
    <Card title="General">
      <CreateMerchantForm onFinish={onFinish} />
      {
        // payment provider form active when merchant is created
        createdMerchantId && (
          <div className={classes.cardSection}>
            <PaymentProviderForm />
          </div>
        )
      }
    </Card>
  );
};

export default New;

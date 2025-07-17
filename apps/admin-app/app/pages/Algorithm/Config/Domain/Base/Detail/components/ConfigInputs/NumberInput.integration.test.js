import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import NumberInput from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/NumberInput';

describe('[Algorithm Domain Config] NumberInput Component', () => {
  it('should render input component', async () => {
    const formik = {
      values: { myValue: 123 },
      errors: [],
      touched: false,
      setFieldValue: () => {},
    };

    await renderComponent({
      ui: (
        <NumberInput
          inputParams={{ field: 'myValue' }}
          formik={formik}
        />
      ),
    });
  });
});

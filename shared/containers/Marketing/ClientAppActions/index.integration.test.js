import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import ClientAppAction from './index';
import { CLIENT_APP_ACTION_TYPE, NON_EXTRA_FIELD_ACTIONS } from './constants';

describe('<ClientAppAction /> Component - Integration Tests', () => {
  const FormWrapper = ({ formProps, clientAppActionProps }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} {...formProps}>
        <ClientAppAction form={form} parentObjLevels={['action']} {...clientAppActionProps} />
      </Form>
    );
  };

  it('should client app action select render successfully', async () => {
    await renderComponent({ ui: (<FormWrapper />) });
    expect(screen.getByLabelText('Action')).toBeInTheDocument();
  });

  // Action field wrappers render tests
  // There is no action field for close and none
  const actionTypes = Object.values(CLIENT_APP_ACTION_TYPE)
    .filter(actionType => !NON_EXTRA_FIELD_ACTIONS.includes(actionType));

  describe.each(actionTypes)('render action wrappers', actionType => {
    it(`render action wrapper with action type id: ${actionType} `, async () => {
      await renderComponent({
        ui: (<FormWrapper
          formProps={{ initialValues: { action: { type: actionType } } }}
        />),
      });
      expect(screen.getByRole('gridcell', { name: `action-field-wrapper-${actionType}` })).toBeInTheDocument();
    });
  });
});

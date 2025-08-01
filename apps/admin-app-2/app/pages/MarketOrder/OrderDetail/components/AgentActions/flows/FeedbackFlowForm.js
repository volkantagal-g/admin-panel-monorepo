import { Divider, Form } from 'antd';

import DiscountFlow from './DiscountFlow';
import FeedbackFlow from './FeedbackFlow';
import RefundFlow from './RefundFlow';

const FeedbackFlowForm = ({
  isFeedbackDetails,
  orderDetail,
  form,
  formValues,
  handleSubmit,
  setFieldValue,
  formErrors,
  queryProducts,
  action,
}) => (
  <Form
    id="market-order-feedback-refund-discount-form"
    form={form}
    onFinish={handleSubmit}
    colon={false}
    labelCol={{ span: 10 }}
    labelAlign="left"
  >
    <RefundFlow
      data-testid="market-order-detail-agent-actions-modal-refund-flow"
      isFeedbackDetails={isFeedbackDetails}
      formValues={formValues}
      handleFormValue={setFieldValue}
      orderStatus={orderDetail?.status}
    />

    <Divider />
    <DiscountFlow
      data-testid="market-order-detail-agent-actions-modal-discount-flow"
      isFeedbackDetails={isFeedbackDetails}
      feedbackFormValues={formValues}
      handleDiscountForm={setFieldValue}
      orderDetail={orderDetail}
      formErrors={formErrors}
    />
    <Divider />
    <FeedbackFlow
      data-testid="market-order-detail-agent-actions-modal-feedback-flow"
      isFeedbackDetails={isFeedbackDetails}
      refundType={formValues.refundType}
      feedback={formValues.feedback}
      feedbackProducts={formValues.products}
      handleFeedback={setFieldValue}
      formErrors={formErrors}
      queryProducts={queryProducts}
      action={action}
    />
  </Form>
);

export default FeedbackFlowForm;

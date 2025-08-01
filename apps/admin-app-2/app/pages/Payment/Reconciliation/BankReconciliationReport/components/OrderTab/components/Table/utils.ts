import { IRefundResponseDetails, ISelectedRows } from './components/ManualRefundButton';

interface IGetEventDetailsToSendResponse {
    orderId?: string;
    basketId?: string;
    amount?: string;
    eventId?: string;
}

export const getEventDetailsToSend = ({ selectedRowsData }: { selectedRowsData: ISelectedRows[] }): IGetEventDetailsToSendResponse[] => {
  const idToDetail = new Map<string, { detail: IRefundResponseDetails; row: ISelectedRows }>();

  selectedRowsData.forEach(row => {
    const details = row.refundResponse?.refundResponseDetails;
    if (!details || details.length === 0) return;

    details.forEach((detail: any) => {
      if (!detail.transactionId) return;
      const prev = idToDetail.get(detail.transactionId);
      if (!prev || (detail.refundDate && prev.detail.refundDate && new Date(detail.refundDate) > new Date(prev.detail.refundDate))) {
        idToDetail.set(detail.transactionId, { detail, row });
      }
    });
  });

  const eventDetailsToSend: IGetEventDetailsToSendResponse[] = [];
  idToDetail.forEach(({ detail, row }) => {
    if (detail.refundStatus === 'Failed') {
      eventDetailsToSend.push({
        orderId: row.orderId,
        basketId: row.orderId ? undefined : row.basketId,
        amount: detail.amount,
        eventId: detail.transactionId,
      });
    }
  });

  return eventDetailsToSend;
};

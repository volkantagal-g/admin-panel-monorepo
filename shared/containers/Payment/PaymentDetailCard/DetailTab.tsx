import { Row, Typography } from 'antd';

import { IPaymentDetailTabItemElement } from './index';

const { Text } = Typography;

interface IDetailTabProps {
    rowsData: IPaymentDetailTabItemElement[]
}

const DetailTab = ({ rowsData }: IDetailTabProps) => {
  return (
    <div>
      {
        rowsData.map(row => {
          return (
            <Row justify="space-between" className="mb-2" key={row.title}>
              <Text className="font-weight-bold">{row.title} </Text>
              {row.component}
            </Row>
          );
        })
      }
    </div>
  );
};

export default DetailTab;

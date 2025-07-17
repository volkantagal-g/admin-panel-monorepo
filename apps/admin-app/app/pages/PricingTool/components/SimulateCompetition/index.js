import { Card, Col, Divider, Image, Row } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import noPicture from '../../assets/img/no-pictures.png';
import { COMPETITORS } from '@app/pages/MarketIntelligencePriceIndex/constants';
import { priceColor } from '../../utils/common';

const { Meta } = Card;
const SimulateCompetition = ({ classes, data, showAandM }) => {
  return (
    <Card
      hoverable
      className={classes.simulateCard}
      cover={(
        <Image
          fallback={noPicture}
          alt={data.competitor_name}
          src={COMPETITORS[data.competitor_name][1]}
          className={classes.matchedProductCardImg}
          preview={false}
        />
      )}
    >
      <Meta
        title={COMPETITORS[data.competitor_name][0]}
        description={(
          <>
            <Divider />
            <Row className={classes.simulateRow}>
              <Col
                justify="start"
                align="center"
                direction="column"
              >
                <div>
                  <div><b>Old Index:</b></div>
                  <div>{parseFloat(showAandM ? data.old_realize_index : data.old_nominal_index).toFixed(2)}</div>
                </div>
              </Col>
              <Col className={classes.simulateArrow}>
                <ArrowRightOutlined />
                <div
                  style={{
                    color: priceColor(parseFloat(showAandM ? data.old_realize_index : data.old_nominal_index) -
                    parseFloat(showAandM ? data.new_realize_index : data.new_nominal_index)),
                  }}
                >
                  {(parseFloat(showAandM ? data.old_realize_index : data.old_nominal_index) -
                  parseFloat(showAandM ? data.new_realize_index : data.new_nominal_index)).toFixed(2)}
                </div>
              </Col>
              <Col
                justify="start"
                align="center"
                direction="column"
              >
                <div>
                  <div><b>New Index:</b></div>
                  <div>{parseFloat(showAandM ? data.new_realize_index : data.new_nominal_index).toFixed(2)}</div>
                </div>
              </Col>
            </Row>
          </>
        )}
      />
    </Card>
  );
};
export default SimulateCompetition;

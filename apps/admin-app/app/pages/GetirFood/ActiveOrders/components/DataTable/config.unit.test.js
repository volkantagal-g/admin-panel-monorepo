import { Typography, Tag } from 'antd';

import {
  generateColumns, getActionButton, getClientInfo, getDeviceInfo,
  getFormattedPrice, getOrderExtraProps, getPaymentInfo, getRestaurantLink,
} from './config';

const { Text } = Typography;

describe('Config generateColumns function', () => {
  test('the function returns null values with undefined payload', () => {
    const table = generateColumns();
    expect(table).toBeDefined();
    expect(table).toHaveLength(20);
    expect(table.map(t => t.render)).toBeDefined();

    expect(table[0].title).toBe('#');
    expect(table[0].render()).toBeNull();
    expect(table[1].render()).toBe(0);
    expect(table[2].render()).toBe(1);
    expect(table[3].render()).toBeNull();
    expect(table[4].render()).toBeNull();
    expect(table[5].render()).toBeNull();
    expect(table[6].render()).toBe(0);
    expect(table[7].render()).toBeNull();
    expect(table[8].render()).toBeNull();
    expect(table[9].render()).toBeDefined();
    expect(table[10].render()).toBeDefined();
    expect(table[11].render()).toBeDefined();
    expect(table[12].render()).toBeDefined();
    expect(table[13].render()).toBeNull();
    expect(table[14].render()).toBeNull();
    expect(table[15].render()).toBeDefined();
    expect(table[16].render()).toBeNull();
    expect(table[17].render()).toBeNull();
    expect(table[18].render()).toBeDefined();
    expect(table[19].render()).toBeNull();
  });

  test('the function returns with a payload', () => {
    const payload = {
      t: () => null,
      dataTimeZone: 'Europe/Istanbul',
      hasAccessToClientDetailPage: true,
      cities: [
        {
          _id: '55999ad00000010001000000',
          country: '55999ad00000010000000000',
          name: {
            en: 'Istanbul',
            tr: 'İstanbul',
          },
          center: {
            type: 'Point',
            coordinates: [29, 41],
            acc: -1,
            time: '2019-12-13T21:00:00.000Z',
            zoomRatio: 11,
          },
          timezone: 'Europe/Istanbul',
          plate: '34',
        },
        {
          _id: '5dcf11d00000010002000000',
          country: '55999ad00000010000000000',
          name: {
            tr: 'İzmir',
            en: 'Izmir',
          },
          center: {
            type: 'Point',
            coordinates: [27.145, 38.425],
            acc: -1,
            time: '2019-12-13T21:00:00.000Z',
            zoomRatio: 11,
          },
          timezone: 'Europe/Istanbul',
          plate: '35',
        },
        {
          _id: '5dd84c500000010003000000',
          country: '55999ad00000010000000000',
          name: {
            tr: 'Ankara',
            en: 'Ankara',
          },
          center: {
            type: 'Point',
            coordinates: [32.77326103000007, 39.93208425500006],
            acc: -1,
            time: '2019-12-13T21:00:00.000Z',
            zoomRatio: 12,
          },
          timezone: 'Europe/Istanbul',
          plate: '06',
        },
      ],
      arrangedTotal: {
        totalOrderCount: 3404,
        totalRestaurantTotalFoodOrderCount: 87653,
        totalFoodOrderCount: 117408,
        overallTotalChargedAmount: 10082.13,
        overallTotalPrice: 14490.320000000002,
        totalFoodOrderWithPromoCount: 108,
        foodOrdersLength: 250,
      },
    };
    const table = generateColumns(payload);
    expect(table).toBeDefined();
    expect(table).toHaveLength(20);
  });

  test('#getActionButton function', () => {
    expect(getActionButton()).toBeNull();

    expect(getActionButton({ _id: 'test-id' }, () => null)).toBeDefined();
  });

  test('#getRestaurantLink function', () => {
    expect(getRestaurantLink()).toBeNull();
    expect(getRestaurantLink({ _id: 'test-id' })).toBeNull();
    expect(getRestaurantLink({ name: 'test-name' })).toBeNull();
    expect(getRestaurantLink({ _id: 'test-id', name: 'test-name' })).toBeDefined();
  });

  test('#getFormattedPrice function', () => {
    expect(getFormattedPrice()).toBeNull();
    expect(getFormattedPrice('25')).toBeNull();
    expect(getFormattedPrice(25)).toStrictEqual(<Text strong>25 ₺</Text>);
  });

  test('#getClientInfo function', () => {
    expect(getClientInfo()).toBeNull();
    expect(getClientInfo({ name: 'test-user' })).toStrictEqual(<Text strong>test-user</Text>);
    expect(getClientInfo({ name: 'test-user', organicOrderCount: 5, promoOrderCount: 1 })).toStrictEqual(
      <Text strong type="success">test-user</Text>,
    );
    expect(getClientInfo({ name: 'test-user', organicOrderCount: 0, promoOrderCount: 2 })).toStrictEqual(
      <Text strong color="#820014">test-user</Text>,
    );

    const client = {
      id: 'test-id',
      name: 'test-user',
      organicOrderCount: 5,
      promoOrderCount: 1,
    };
    const rendered = getClientInfo(client, true);
    expect(rendered.type).toBeDefined();
    expect(rendered.props.children).toBeDefined();
  });

  test('#getOrderExtraProps function', () => {
    expect(getOrderExtraProps()).toBeNull();
    expect(getOrderExtraProps({ lastActivityDiffStr: 'test-last-activity' })).toStrictEqual(
      <Text strong>test-last-activity</Text>,
    );
    expect(getOrderExtraProps({ isRed: true, lastActivityDiffStr: 'test-last-activity' })).toStrictEqual(
      <Tag color="volcano">test-last-activity</Tag>,
    );
  });

  test('#getDeviceInfo function', () => {
    expect(getDeviceInfo()).toBeNull();
    expect(getDeviceInfo({ deviceType: 'Web' })).toStrictEqual(<Text>W</Text>);
    expect(getDeviceInfo({ deviceType: 'Mobile' })).toStrictEqual(<Text>M</Text>);
    expect(getDeviceInfo({ deviceType: 'TEST' })).toStrictEqual(<Text>M</Text>);
  });

  test('#getPaymentInfo function', () => {
    expect(getPaymentInfo()).toBeNull();
    expect(getPaymentInfo({ paymentInfo: { paymentMethod: 1 } })).toStrictEqual(<Text>Online CC</Text>);
    expect(getPaymentInfo({ paymentInfo: { paymentMethod: 2 } })).toStrictEqual(<Text>BKM</Text>);
    expect(getPaymentInfo({ paymentInfo: { paymentMethod: 3 } })).toStrictEqual(<Text>On Delivery CC</Text>);
  });
});

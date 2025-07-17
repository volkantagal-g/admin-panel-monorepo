import { Input, Switch } from 'antd';

import React from 'react';

import AntInputNumber from '@shared/components/UI/AntInputNumber';

export enum CONFIG_VALUE_TYPE {
STRING = 1,
INTEGER = 2,
DOUBLE = 3,
BOOLEAN = 4,
}

export const GET_FINANCIAL_CONFIG_FORM_ITEM: Record<
CONFIG_VALUE_TYPE,
JSX.Element
> = {
  [CONFIG_VALUE_TYPE.STRING]: <Input placeholder="value" />,
  [CONFIG_VALUE_TYPE.INTEGER]: <AntInputNumber placeholder="value" />,
  [CONFIG_VALUE_TYPE.DOUBLE]: <AntInputNumber placeholder="value" precision={2} />,
  [CONFIG_VALUE_TYPE.BOOLEAN]: <Switch />,
};

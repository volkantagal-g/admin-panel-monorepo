import { Col, Form, Row } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { useSelector } from 'react-redux';

import { ReactNode, useMemo } from 'react';

import { selectSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

type PropTypes<Values> = FormItemProps<Values> & {
  prefix?: {
    width: `${number}px`,
    node: ReactNode
  }
}

export function MultiLanguageFormItem<Values = any>({ prefix, name, ...rest }: PropTypes<Values>) {
  const selectedCountryCodes = useSelector(selectSelectedCountryLanguages);

  const names = useMemo(() => {
    if (Array.isArray(name)) {
      return selectedCountryCodes.map(code => [...name, code]);
    }

    if (typeof name === 'undefined') {
      return [...selectedCountryCodes];
    }

    return selectedCountryCodes.map(code => [name, code]);
  }, [name, selectedCountryCodes]);

  return (
    <Col span={24}>
      <Row gutter={[16, 8]}>
        {prefix && (
        <Col flex={prefix.width}>
          {prefix.node}
        </Col>
        )}
        {names.map((thisName, index) => (
          <Col
            xs={24}
            md={12}
            flex={(index === 0 && prefix) ? 'auto' : undefined}
            key={Array.isArray(thisName) ? thisName.join('-') : thisName}
          >
            <Form.Item
              name={thisName}
              {...rest}
            />
          </Col>
        ))}
      </Row>
    </Col>
  );
}

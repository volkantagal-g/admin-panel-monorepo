import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import React, { ReactNode, useMemo } from 'react';

import { selectSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

type PropTypes = {
    translations: Record<string, string>;
    children: React.ReactNode;
    valueProp?: string;
    prefix?: {
        width: `${number}px`,
        node: ReactNode
    }
}

export function MultiLanguageReadOnly({ translations, children, valueProp = 'value', prefix }: PropTypes) {
  const selectedCountryCodes = useSelector(selectSelectedCountryLanguages);

  return (
    <Col span={24}>
      <Row gutter={[16, 8]}>
        {prefix && (
        <Col flex={prefix.width}>
          {prefix.node}
        </Col>
        )}
        {selectedCountryCodes.map((lang, index) => (
          <Col
            xs={24}
            md={12}
            flex={(index === 0 && prefix) ? 'auto' : undefined}
            key={lang}
          >
            {
              React.cloneElement(children as React.ReactElement, { [valueProp]: translations[lang] })
            }
          </Col>
        ))}
      </Row>
    </Col>
  );
}

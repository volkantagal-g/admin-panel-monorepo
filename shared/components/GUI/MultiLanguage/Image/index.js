import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { get, toString } from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { getYupErrorPath } from '@shared/yup';
import useStyles from './styles';
import { Image } from '../../Image';
import { getAutoColProps } from '../../utils';

export const MultiLanguageImage = ({ label, fieldPath, formik, colProps }) => {
  const classes = useStyles();
  const { t } = useTranslation('multiLanguageComponents');
  const { values, errors } = formik;
  const countryLanguages = getSelectedCountryLanguages();

  return (
    <div>
      <div className="mb-2">{label ?? t('ML_IMAGE.TITLE')}</div>
      <Row gutter={16} className="mb-3">
        {countryLanguages.map((countryLanguage, countryIndex) => {
          const path = [...fieldPath, countryLanguage];

          const errorPath = getYupErrorPath(path);
          return (
            <Col
              {...(colProps ?? getAutoColProps(countryLanguages))}
              key={toString(countryIndex)}
            >
              <Form.Item
                help={get(errors, errorPath)}
                validateStatus={get(errors, errorPath) ? 'error' : 'success'}
                name={path}
                className={get(errors, errorPath) ? '' : 'mb-2'}
              >
                <div className={classes.borderedContainer}>
                  <div className={`${classes.countryLanguage} mb-2`}>{countryLanguage?.toUpperCase()}</div>
                  <Row span={24} className="mb-2" justify="center">
                    <Image
                      height={80}
                      src={get(values, path)}
                      alt={`marketProductImage-${get(values, path)}`}
                    />
                  </Row>
                </div>
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

MultiLanguageImage.propTypes = {
  fieldPath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  formik: PropTypes.shape({}),
  label: PropTypes.string,
  colProps: PropTypes.shape({}),
};

MultiLanguageImage.defaultProps = {
  fieldPath: [],
  formik: {},
  label: null,
  colProps: null,
};

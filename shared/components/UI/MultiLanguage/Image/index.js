import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { getYupErrorPath } from '@shared/yup';
import Image from '@shared/components/UI/Image';
import useStyles from './styles';

const MultiLanguageImage = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation('multiLanguageComponents');
  const { label = t('ML_IMAGE.TITLE'), fieldPath, formik } = props;
  const { values, errors } = formik;
  const countryLanguages = getSelectedCountryLanguages();
  return (
    <Row gutter={[theme.spacing(3)]} align="top" className="mb-3">
      <Col span={24} className="mb-2">{label}</Col>
      {countryLanguages.map((countryLanguage, countryIndex) => {
        const path = [...fieldPath, countryLanguage];

        const addonAfter = countryLanguage.toUpperCase();
        const errorPath = getYupErrorPath(path);
        return (
          <Col span={12} key={_.toString(countryIndex)}>
            <Form.Item
              help={_.get(errors, errorPath)}
              validateStatus={_.get(errors, errorPath) ? 'error' : 'success'}
              name={path}
              className={_.get(errors, errorPath) ? '' : 'mb-2'}
            >
              <Row className={classes.container}>
                <Col className={`${classes.border} responsiveCol d-flex align-items justify-content-center`}>
                  <Image
                    height={80}
                    src={_.get(values, path)}
                    alt={`marketProductImage-${_.get(values, path)}`}
                  />
                </Col>
                {addonAfter && (
                  <Col>
                    <div className={classes.addon}>
                      {addonAfter}
                    </div>
                  </Col>
                )}
              </Row>
            </Form.Item>
          </Col>
        );
      })}
    </Row>
  );
};

MultiLanguageImage.propTypes = {
  label: PropTypes.string,
  fieldPath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  formik: PropTypes.shape({}),
};

// TODO: correct these default props
MultiLanguageImage.defaultProps = {
  label: undefined,
  fieldPath: undefined,
  formik: undefined,
};

export default MultiLanguageImage;

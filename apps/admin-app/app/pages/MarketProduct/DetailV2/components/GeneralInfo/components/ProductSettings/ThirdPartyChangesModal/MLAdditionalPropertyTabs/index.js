import PropTypes from 'prop-types';
import { useTheme } from 'react-jss';
import { Row, Col, Tabs, Divider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import useStyles from './styles';

const { TabPane } = Tabs;
const { Title } = Typography;

const MLAdditionalPropertyTabs = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { tables = [] } = props;
  const countryLanguages = getSelectedCountryLanguages();
  const { t } = useTranslation('marketProductPageV2');
  const tableWrapperClass = tables.length > 1 ? `${classes.borderedContainer} mb-3` : '';

  return (
    <Row gutter={[theme.spacing(3)]} align="top" className="mb-3">
      <Col span={24} className="mb-2">{t('ADDITIONAL_PROPERTY_INFO.TITLE')}</Col>
      <Col span={24}>
        {tables.length === 0 && (
          <Title className={classes.borderedContainer} level={5}>{t('global:NO_DATA')}</Title>
        )}
        {tables.map((table, tableIndex) => {
          return (
            <Row className={tableWrapperClass} key={_.toString(tableIndex)}>
              {countryLanguages.map((countryLanguage, countryIndex) => {
                const label = _.get(table, ['title', countryLanguage], '');
                return (
                  <Row
                    className={`${classes.borderedContainer} p-2 w-100
                    ${countryIndex !== countryLanguages.length - 1 && 'mb-2'}`}
                    key={_.toString(countryIndex)}
                  >
                    <Col className={`${classes.countryLanguage} mb-1`} span={24}>
                      {countryLanguage.toUpperCase()}
                    </Col>
                    <Col className={`${classes.tableName} mb-2`} span={24}>{label}</Col>
                    <Col span={24} key={_.toString(countryIndex)}>
                      <Row className={classes.container}>
                        <Col className="responsiveCol d-flex align-items justify-content-center">
                          <Tabs type="card" className="w-100">
                            {table.sections.map((section, sectionIndex) => {
                              const sectionTitle = _.get(section, ['title', countryLanguage]);
                              return (
                                <TabPane tab={sectionTitle} key={_.toString(sectionIndex)}>
                                  {section.items.map((item, itemIndex) => {
                                    return (
                                      <>
                                        <Row className="py-3 px-2" gutter={[theme.spacing(3)]} key={_.toString(itemIndex)}>
                                          <Col span={12}>
                                            {item.name[countryLanguage]} ({item.unit[countryLanguage]})
                                          </Col>
                                          <Col span={12}>
                                            {item.value[countryLanguage]}
                                          </Col>
                                        </Row>
                                        {itemIndex !== section.items.length - 1 &&
                                          <Divider className={classes.divider} />}
                                      </>
                                    );
                                  })}
                                </TabPane>
                              );
                            })}
                          </Tabs>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            </Row>
          );
        })}
      </Col>
    </Row>
  );
};

MLAdditionalPropertyTabs.propTypes = { tables: PropTypes.shape([]) };
MLAdditionalPropertyTabs.defaultProps = { tables: [] };

export default MLAdditionalPropertyTabs;

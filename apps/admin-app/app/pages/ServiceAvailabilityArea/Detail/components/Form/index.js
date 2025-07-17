import { Button, Col, Form, Input, Select } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import useClipboard from '@shared/shared/hooks/useClipboard';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import useStyles from '../../../formStyles';
import { getFormattedSaa } from '../../../utils';
import { useDomainOptions } from '../../../useDomainOptions';

export default function FormDetail({ saa, countries }) {
  const classes = useStyles();
  const { t } = useTranslation('saaPage');
  const { Can } = usePermission();
  const [form] = Form.useForm();
  const formattedSaa = getFormattedSaa(saa, countries);
  const [isCopied, setCopied] = useClipboard(formattedSaa.geoJSON, { successDuration: 2000 });

  const domainOptions = useDomainOptions();

  const countryOptions = useMemo(() => {
    return countries.map(c => {
      const label = c.name[getLangKey()];
      const value = c._id;
      return { value, label };
    });
  }, [countries]);

  return (
    <Col xs={24} sm={24} md={4} lg={4}>
      <div className={classes.form}>
        <h6 className={classes.formTitle}>
          {t('DETAIL_SAA')}
          <Link to={ROUTE.SERVICE_AVAILABILITY_AREA_LIST.path} className={classes.goBackLink}>
            <CloseOutlined />
          </Link>
        </h6>
        <Form initialValues={formattedSaa} form={form} id="newSaaForm" layout="vertical">
          <Form.Item label={t('NAME_1')} name="name" className={classes.label}>
            <Input value={formattedSaa.name} disabled />
          </Form.Item>
          <Form.Item label={t('ID')} className={classes.label}>
            <Input value={formattedSaa?.id} disabled />
          </Form.Item>
          <Form.Item label={t('COUNTRY')} name="country" className={classes.label}>
            <Select value={formattedSaa.country} options={countryOptions} className={classes.fullWidth} disabled />
          </Form.Item>
          <Form.Item label={t('ACTIVE_DOMAINS')} name="activeDomains" className={classes.label}>
            <Select
              data-testid="active-domains"
              value={formattedSaa.activeDomains}
              options={domainOptions}
              mode="multiple"
              c
              lassName={classes.fullWidth}
              disabled
            />
          </Form.Item>
          <Form.Item
            label={(
              <>
                {t('GEO_JSON')}
                <Button
                  className={classes.copyButton}
                  key="geoJSONCopy"
                  icon={isCopied ? (
                    <CheckOutlined
                      data-testid="copy-checked"
                    />
                  ) : null}
                  onClick={setCopied}
                >
                  {isCopied ? t('button:COPIED') : t('button:COPY')}
                </Button>
              </>
            )}
            name="geoJSON"
            className={classes.label}
          >
            <Input.TextArea
              data-testid="geojson-input"
              value={formattedSaa.geoJSON}
              className={classes.jsonView}
              disabled
              autoSize={{ minRows: 8, maxRows: 22 }}
            />
          </Form.Item>
          <Can permKey={permKey.PAGE_SERVICE_AVAILABILITY_AREA_EDIT}>
            <Button type="primary" className={classes.addNewSaa} disabled={formattedSaa.isAutomated}>
              <Link to={ROUTE.SERVICE_AVAILABILITY_AREA_EDIT.path.replace(':id', formattedSaa.id)}>{t('button:EDIT')}</Link>
            </Button>
          </Can>
        </Form>
      </div>
    </Col>
  );
}

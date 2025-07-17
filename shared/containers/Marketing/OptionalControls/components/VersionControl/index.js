import { Row, Col, Form, Card, Input } from 'antd';
import semver from 'semver';
import { useTranslation } from 'react-i18next';

const VersionControl = ({ parentFieldName, disabled, onAnyVersionChange }) => {
  const { t } = useTranslation('marketing');

  const validateVersion = (rule, value) => {
    if (value) {
      // (0|[1-9]\d*) is used to prevent leading zeros
      const versionRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
      if (!versionRegex.test(value)) {
        return Promise.reject(new Error(t('VALIDATE_VERSION_FORMAT')));
      }

      const normalized = semver.valid(semver.coerce(value));

      if (!normalized) {
        return Promise.reject(
          new Error(t('VALIDATE_NORMALIZED_VERSION_FORMAT')),
        );
      }
    }

    return Promise.resolve();
  };

  return (
    <Card size="small" title="Version Control">
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item
            name={[...parentFieldName, 'iosVersion', 'min']}
            label={t('IOS_VERSION_MIN')}
            normalize={value => (value?.trim() === '' ? undefined : value)}
            rules={[
              ({ getFieldValue }) => ({
                validator: async (_, value) => {
                  await validateVersion(_, value);
                  const maxValue =
                    getFieldValue(parentFieldName)?.iosVersion?.max;
                  if (
                    maxValue &&
                    value &&
                    semver.valid(value) &&
                    semver.valid(maxValue)
                  ) {
                    if (semver.gt(value, maxValue)) {
                      return Promise.reject(new Error(t('MIN_VERSION_ERROR')));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              onChange={onAnyVersionChange}
              placeholder={t('VERSION_INPUT_PLACEHOLDER')}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            name={[...parentFieldName, 'iosVersion', 'max']}
            label={t('IOS_VERSION_MAX')}
            normalize={value => (value?.trim() === '' ? undefined : value)}
            rules={[
              ({ getFieldValue }) => ({
                validator: async (_, value) => {
                  await validateVersion(_, value);
                  const minValue =
                    getFieldValue(parentFieldName)?.iosVersion?.min;
                  if (
                    minValue &&
                    value &&
                    semver.valid(value) &&
                    semver.valid(minValue)
                  ) {
                    if (semver.lt(value, minValue)) {
                      return Promise.reject(new Error(t('MAX_VERSION_ERROR')));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              onChange={onAnyVersionChange}
              placeholder={t('VERSION_INPUT_PLACEHOLDER')}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item
            name={[...parentFieldName, 'androidVersion', 'min']}
            label={t('ANDROID_VERSION_MIN')}
            normalize={value => (value?.trim() === '' ? undefined : value)}
            rules={[
              ({ getFieldValue }) => ({
                validator: async (_, value) => {
                  await validateVersion(_, value);
                  const maxValue =
                    getFieldValue(parentFieldName)?.androidVersion?.max;
                  if (
                    maxValue &&
                    value &&
                    semver.valid(value) &&
                    semver.valid(maxValue)
                  ) {
                    if (semver.gt(value, maxValue)) {
                      return Promise.reject(new Error(t('MIN_VERSION_ERROR')));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              onChange={onAnyVersionChange}
              placeholder={t('VERSION_INPUT_PLACEHOLDER')}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            name={[...parentFieldName, 'androidVersion', 'max']}
            label={t('ANDROID_VERSION_MAX')}
            normalize={value => (value?.trim() === '' ? undefined : value)}
            rules={[
              ({ getFieldValue }) => ({
                validator: async (_, value) => {
                  await validateVersion(_, value);
                  const minValue =
                    getFieldValue(parentFieldName)?.androidVersion?.min;
                  if (
                    minValue &&
                    value &&
                    semver.valid(value) &&
                    semver.valid(minValue)
                  ) {
                    if (semver.lt(value, minValue)) {
                      return Promise.reject(new Error(t('MAX_VERSION_ERROR')));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              onChange={onAnyVersionChange}
              placeholder={t('VERSION_INPUT_PLACEHOLDER')}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default VersionControl;

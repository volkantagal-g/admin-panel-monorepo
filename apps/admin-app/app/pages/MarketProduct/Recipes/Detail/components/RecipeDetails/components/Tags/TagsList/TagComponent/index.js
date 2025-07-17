import { Card, Button, Form, Select, Input } from 'antd';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';

import { useState } from 'react';

import { isNaN } from 'lodash';

import useStyles from './styles';
import { updateRecipeSelector } from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';
import { TAG_TYPES } from '@app/pages/MarketProduct/Recipes/constants';
import { DURATION_TYPES, DURATION_TYPES_LABELS } from './constants';
import { getLangKey } from '@shared/i18n';
import { getServingsAddonAfter, restructureTagsForSubmit } from '../../utils';

const { Option } = Select;

export const durationOptions = Object.entries(DURATION_TYPES).map(([, value]) => {
  return (
    <Option key={value} value={value}>
      {DURATION_TYPES_LABELS?.[value]?.[getLangKey()]}
    </Option>
  );
});

const getInitialSelectState = ({ tag }) => {
  if (tag.type !== TAG_TYPES.DURATION) {
    return DURATION_TYPES.MINUTE;
  }
  if (tag.trText?.endsWith('dakika')) {
    return DURATION_TYPES.MINUTE;
  }
  if (tag.trText?.endsWith('saat')) {
    return DURATION_TYPES.HOUR;
  }

  return DURATION_TYPES.MINUTE;
};

const getServingsSuffix = ({ value, language }) => {
  if (language === 'tr') {
    return 'kişilik';
  }
  return value > 1 ? 'servings' : 'serving';
};

const getDurationSuffix = ({ value, selectValue, language }) => {
  if (selectValue === DURATION_TYPES.MINUTE) {
    if (language === 'tr') {
      return 'dakika';
    }
    return value > 1 ? 'minutes' : 'minute';
  }
  if (selectValue === DURATION_TYPES.HOUR) {
    if (language === 'tr') {
      return 'saat';
    }
    return value > 1 ? 'hours' : 'hour';
  }
  return '';
};

const Arrows = ({ isUpdatePending, isFormEditable, classes, onArrowClick, index }) => {
  return (
    <div className={classes.arrowsWrapper}>
      <Button
        type="text"
        icon={<ArrowUpOutlined className={(isUpdatePending || !isFormEditable) ? undefined : classes.arrowIcon} />}
        onClick={() => onArrowClick({ tagIndex: index, direction: 'up' })}
        disabled={isUpdatePending || !isFormEditable}
        className={classes.arrowButton}
      />
      <Button
        type="text"
        icon={<ArrowDownOutlined className={(isUpdatePending || !isFormEditable) ? undefined : classes.arrowIcon} />}
        onClick={() => onArrowClick({ tagIndex: index, direction: 'down' })}
        disabled={isUpdatePending || !isFormEditable}
        className={classes.arrowButton}
      />
    </div>
  );
};

const TagComponent = ({ setFieldValue, tag, index, isFormEditable, tagsArray, setTagsArray }) => {
  const { t } = useTranslation('recipesPage');

  const classes = useStyles();

  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);

  const [selectValue, setSelectValue] = useState(getInitialSelectState({ tag }));

  const onArrowClick = ({ tagIndex, direction }) => {
    const updatedTagsArray = [...tagsArray];

    if (direction === 'up' && tagIndex > 0) {
      const valueToShift = updatedTagsArray[tagIndex];
      const targetValue = updatedTagsArray[tagIndex - 1];
      updatedTagsArray[tagIndex] = targetValue;
      updatedTagsArray[tagIndex - 1] = valueToShift;
    }
    else if (direction === 'down' && tagIndex < updatedTagsArray.length - 1) {
      const valueToShift = updatedTagsArray[tagIndex];
      const targetValue = updatedTagsArray[tagIndex + 1];
      updatedTagsArray[tagIndex] = targetValue;
      updatedTagsArray[tagIndex + 1] = valueToShift;
    }

    setTagsArray(updatedTagsArray);
    setFieldValue('tags', restructureTagsForSubmit(updatedTagsArray));
  };

  const onDeleteClick = ({ tagIndex }) => {
    const updatedTagsArray = [...tagsArray];
    updatedTagsArray.splice(tagIndex, 1);
    setTagsArray(updatedTagsArray);
    setFieldValue('tags', restructureTagsForSubmit(updatedTagsArray));
  };

  if (tag.type === TAG_TYPES.SERVING) {
    return (
      <Card>
        <div className={classes.tagContainer}>
          <Arrows isUpdatePending={isUpdatePending} isFormEditable={isFormEditable} classes={classes} onArrowClick={onArrowClick} index={index} />
          <div className={classes.inputWrapper}>
            <Form.Item
              name={tag.key}
              label={t('DETAILS.TAGS.SERVINGS_TITLE')}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }

                    const numValue = Number(value);

                    if (isNaN(numValue)) {
                      return Promise.reject(new Error(t('VALIDATION.MUST_BE_NUMBER')));
                    }

                    if (numValue <= 0) {
                      return Promise.reject(new Error(t('VALIDATION.MUST_BE_POSITIVE')));
                    }

                    if (!Number.isInteger(numValue)) {
                      return Promise.reject(new Error(t('VALIDATION.MUST_BE_INTEGER')));
                    }

                    return Promise.resolve();
                  },
                },
              ]}
              initialValue={(tag.trText && tag.trText !== '') ? tag.trText.split(' ')[0] : tag.trText}
            >
              <Input
                value={(tag.trText && tag.trText !== '') ? tag.trText.split(' ')[0] : tag.trText}
                onChange={event => {
                  const updatedTagsArray = [...tagsArray];
                  if (!event.target.value || event.target.value === '') {
                    updatedTagsArray[index].trText = '';
                    updatedTagsArray[index].enText = '';
                    setTagsArray(updatedTagsArray);
                    setFieldValue('tags', restructureTagsForSubmit(updatedTagsArray));
                    return;
                  }
                  updatedTagsArray[index].trText = `${event.target.value} ${getServingsSuffix({ value: event.target.value, language: 'tr' })}`;
                  updatedTagsArray[index].enText = `${event.target.value} ${getServingsSuffix({ value: event.target.value, language: 'en' })}`;
                  setTagsArray(updatedTagsArray);
                  setFieldValue('tags', restructureTagsForSubmit(updatedTagsArray));
                }}
                disabled={isUpdatePending || !isFormEditable}
                addonAfter={getServingsAddonAfter({ value: (tag.trText && tag.trText !== '') ? tag.trText.split(' ')[0] : tag.trText, t })}
              />
            </Form.Item>
          </div>
        </div>
      </Card>
    );
  }

  if (tag.type === TAG_TYPES.DURATION) {
    return (
      <Card>
        <div className={classes.tagContainer}>
          <Arrows isUpdatePending={isUpdatePending} isFormEditable={isFormEditable} classes={classes} onArrowClick={onArrowClick} index={index} />
          <div className={classes.inputWrapper}>
            <Form.Item
              name={tag.key}
              label={t('DETAILS.TAGS.DURATION')}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }

                    const numValue = Number(value);

                    if (isNaN(numValue)) {
                      return Promise.reject(new Error(t('VALIDATION.MUST_BE_NUMBER')));
                    }

                    if (numValue <= 0) {
                      return Promise.reject(new Error(t('VALIDATION.MUST_BE_POSITIVE')));
                    }

                    if (!Number.isInteger(numValue)) {
                      return Promise.reject(new Error(t('VALIDATION.MUST_BE_INTEGER')));
                    }

                    return Promise.resolve();
                  },
                },
              ]}
              initialValue={(tag.trText && tag.trText !== '') ? tag.trText.split(' ')[0] : tag.trText}
            >
              <Input
                value={(tag.trText && tag.trText !== '') ? tag.trText.split(' ')[0] : tag.trText}
                onChange={event => {
                  const updatedTagsArray = [...tagsArray];
                  if (!event.target.value || event.target.value === '') {
                    updatedTagsArray[index].trText = '';
                    updatedTagsArray[index].enText = '';
                    setTagsArray(updatedTagsArray);
                    setFieldValue('tags', restructureTagsForSubmit(updatedTagsArray));
                    return;
                  }
                  updatedTagsArray[index].trText = `${event.target.value} ${getDurationSuffix({ value: event.target.value, selectValue, language: 'tr' })}`;
                  updatedTagsArray[index].enText = `${event.target.value} ${getDurationSuffix({ value: event.target.value, selectValue, language: 'en' })}`;
                  setTagsArray(updatedTagsArray);
                  setFieldValue('tags', restructureTagsForSubmit(updatedTagsArray));
                }}
                disabled={isUpdatePending || !isFormEditable}
                addonAfter={(
                  <Select
                    value={selectValue}
                    onChange={value => {
                      setSelectValue(value);
                    }}
                    disabled={isUpdatePending || !isFormEditable}
                    name="domainTypes"
                  >
                    {durationOptions}
                  </Select>
                )}
              />
            </Form.Item>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className={classes.tagContainer}>
        <Arrows isUpdatePending={isUpdatePending} isFormEditable={isFormEditable} classes={classes} onArrowClick={onArrowClick} index={index} />
        <div className={classes.inputWrapper}>
          <Form.Item
            name={`${tag.key}-tr`}
            label={t('DETAILS.TAGS.TR_TEXT')}
            rules={[
              { required: true, message: t('VALIDATION.REQUIRED_FIELD') },
            ]}
            initialValue={tag.trText}
          >
            <Input
              value={tag.trText}
              onChange={event => {
                const updatedTagsArray = [...tagsArray];
                updatedTagsArray[index].trText = event.target.value;
                setTagsArray(updatedTagsArray);
                setFieldValue('tags', restructureTagsForSubmit(updatedTagsArray));
              }}
              disabled={isUpdatePending || !isFormEditable}
            />
          </Form.Item>
        </div>
        <div className={classes.inputWrapper}>
          <Form.Item
            name={`${tag.key}-en`}
            label={t('DETAILS.TAGS.EN_TEXT')}
            rules={[
              { required: true, message: t('VALIDATION.REQUIRED_FIELD') },
            ]}
            initialValue={tag.enText}
          >
            <Input
              value={tag.enText}
              onChange={event => {
                const updatedTagsArray = [...tagsArray];
                updatedTagsArray[index].enText = event.target.value;
                setTagsArray(updatedTagsArray);
                setFieldValue('tags', restructureTagsForSubmit(updatedTagsArray));
              }}
              disabled={isUpdatePending || !isFormEditable}
            />
          </Form.Item>
        </div>
        <Button
          type="text"
          icon={<DeleteOutlined className={(isUpdatePending || !isFormEditable) ? undefined : classes.deleteIcon} />}
          onClick={() => onDeleteClick({ tagIndex: index })}
          disabled={isUpdatePending || !isFormEditable}
        />
      </div>
    </Card>
  );
};

export default TagComponent;

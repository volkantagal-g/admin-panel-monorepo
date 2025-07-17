import * as Yup from 'yup';
import { get } from 'lodash';

const MIN_STR_LENGTH = 3;
const LONG_MAX_STR_LENGTH = 1000;
const SHORT_MAX_STR_LENGTH = 50;

const getStringSchema = ({ t, isShort = false } = {}) => Yup.string()
  .trim()
  .min(MIN_STR_LENGTH, t('baseYupError:STRING.MIN', { min: MIN_STR_LENGTH }))
  .max(isShort ? SHORT_MAX_STR_LENGTH : LONG_MAX_STR_LENGTH, t('baseYupError:STRING.MAX', { max: isShort ? SHORT_MAX_STR_LENGTH : LONG_MAX_STR_LENGTH }));

export const getValidationSchema = ({ panelDocData, t }) => {
  const baseSchema = Yup.object()
    .shape({
      name: Yup.object().shape({
        tr: getStringSchema({ t, isShort: true })
          .required(t('error:REQUIRED')),
        en: getStringSchema({ t, isShort: true })
          .required(t('error:REQUIRED')),
      }),
      description: Yup.object().shape({
        tr: getStringSchema({ t }),
        en: getStringSchema({ t }),
      }),
      files: Yup.array().of(Yup.object({
        langKeys: Yup.array().of(Yup.string()).required(t('error:REQUIRED')),
        title: Yup.object().shape({
          tr: getStringSchema({ t, isShort: true }),
          en: getStringSchema({ t, isShort: true }),
        }),
        fileKey: Yup.string(),
        softRemoved: Yup.bool(),
        data: Yup.mixed().test('file', t('error:REQUIRED'), function test(value) {
          const { fileKey, softRemoved } = this.parent;
          if ((!value && !fileKey) || softRemoved) {
            return false;
          }
          return true;
        }),
      }).test('langKeys', 'selected_languages_must_have_descriptions_en', function test(value) {
        if (value.langKeys.includes('en') && !value.title.en) {
          return this.createError({ path: `${this.path}.title.en`, message: t('error:REQUIRED') });
        }
        return true;
      }).test('langKeys', 'selected_languages_must_have_descriptions_tr', function test(value) {
        if (value.langKeys.includes('tr') && !value.title.tr) {
          return this.createError({ path: `${this.path}.title.tr`, message: t('error:REQUIRED') });
        }
        return true;
      })),
      faqs: Yup.array().of(Yup.object({
        question: Yup.object().shape({
          tr: getStringSchema({ t }).required(t('error:REQUIRED')),
          en: getStringSchema({ t }).required(t('error:REQUIRED')),
        }),
        answer: Yup.object().shape({
          tr: getStringSchema({ t }).required(t('error:REQUIRED')),
          en: getStringSchema({ t }).required(t('error:REQUIRED')),
        }),
      })),
    });

  const { isActive } = panelDocData || {};

  if (!isActive) {
    return baseSchema;
  }

  return baseSchema.shape({
    description: Yup.object().shape({
      tr: getStringSchema({ t })
        .required(t('error:REQUIRED')),
      en: getStringSchema({ t })
        .required(t('error:REQUIRED')),
    }),
    files: Yup.array().of(Yup.object({
      langKeys: Yup.array().of(Yup.string()).required(t('error:REQUIRED')),
      title: Yup.object().shape({
        tr: getStringSchema({ t, isShort: true }),
        en: getStringSchema({ t, isShort: true }),
      }),
      fileKey: Yup.string(),
      softRemoved: Yup.bool(),
      data: Yup.mixed().test('file', t('error:REQUIRED'), function test(value) {
        const { fileKey, softRemoved } = this.parent;
        if ((!value && !fileKey) || softRemoved) {
          return false;
        }
        return true;
      }),
    }).test('langKeys', 'selected_languages_must_have_descriptions_en', function test(value) {
      if (value.langKeys.includes('en') && !value.title.en) {
        return this.createError({ path: `${this.path}.title.en`, message: t('error:REQUIRED') });
      }
      return true;
    }).test('langKeys', 'selected_languages_must_have_descriptions_tr', function test(value) {
      if (value.langKeys.includes('tr') && !value.title.tr) {
        return this.createError({ path: `${this.path}.title.tr`, message: t('error:REQUIRED') });
      }
      return true;
    })).test('files-or-faqs', t('AT_LEAST_ONE_FILE_OR_FAQ_REQUIRED'), function test(value) {
      const { faqs } = this.parent;

      if (!value?.length && !faqs?.length) {
        return false;
      }
      return true;
    }),
    faqs: Yup.array().of(Yup.object({
      question: Yup.object().shape({
        tr: getStringSchema({ t }).required(t('error:REQUIRED')),
        en: getStringSchema({ t }).required(t('error:REQUIRED')),
      }),
      answer: Yup.object().shape({
        tr: getStringSchema({ t }).required(t('error:REQUIRED')),
        en: getStringSchema({ t }).required(t('error:REQUIRED')),
      }),
    }))
      .test('faqs-or-files', t('AT_LEAST_ONE_FILE_OR_FAQ_REQUIRED'), function test(value) {
        const { files } = this.parent;

        if (!value?.length && !files?.length) {
          return false;
        }
        return true;
      }),
  });
};

export const langKeys = ['tr', 'en'];

export const langKeysOptions = langKeys.map(lang => {
  return {
    value: lang,
    label: lang,
  };
});

export const getInitialValues = ({ panelDocData }) => {
  return {
    name: {
      tr: get(panelDocData, 'name.tr', ''),
      en: get(panelDocData, 'name.en', ''),
    },
    description: {
      tr: get(panelDocData, 'description.tr', ''),
      en: get(panelDocData, 'description.en', ''),
    },
    componentIds: get(panelDocData, 'componentIds', []),
    // make sure data field exists on every file so that formik sets it as "touched" when submitting the form
    files: get(panelDocData, 'files', []).map(file => ({ ...file, data: '' })),
    faqs: get(panelDocData, 'faqs', []),
  };
};

export const manipulateValuesOnSubmit = (oldValues, newValues) => {
  const { name, description, componentIds, files, faqs } = newValues;

  return {
    name: (oldValues.name !== name) ? name : undefined,
    description: (oldValues.description !== description) ? description : undefined,
    componentIds: (oldValues.componentIds !== componentIds) ? componentIds : undefined,
    files: (oldValues.files !== files) ? files.map(file => {
      const title = {};
      langKeys.forEach(langKey => {
        if (file.langKeys.includes(langKey)) title[langKey] = file.title[langKey];
      });

      return ({ ...file, title, fakeId: undefined, _id: undefined, softRemoved: undefined });
    }) : undefined,
    faqs: (oldValues.faqs !== faqs) ? faqs.map(faq => ({ ...faq, fakeId: undefined, _id: undefined })) : undefined,
  };
};

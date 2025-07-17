import * as Yup from 'yup';

import { DROPDOWN_OPTION_TYPE, PARAMETER_TYPE, RESERVED_VARIABLE_NAMES } from '../../../constants';

export const reportTypeValidationSchema = t => Yup.object()
  .shape({
    name: Yup.object()
      .shape({
        tr: Yup.string().trim().required(t('error:REQUIRED')),
        en: Yup.string().trim().required(t('error:REQUIRED')),
      })
      .required(),
    description: Yup.object()
      .shape({
        tr: Yup.string().trim().required(t('error:REQUIRED')),
        en: Yup.string().trim().required(t('error:REQUIRED')),
      })
      .required(),
    instructions: Yup.object()
      .shape({
        tr: Yup.string().trim(),
        en: Yup.string().trim(),
      }),
    scriptFile: Yup.string().trim().required(t('error:REQUIRED')),
    isActive: Yup.boolean().required(),
    parameters: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.string().trim().required(t('error:REQUIRED')).nullable(),
          variableName: Yup.string().trim().required(t('error:REQUIRED')),
          name: Yup.object()
            .required(t('error:REQUIRED'))
            .shape({
              tr: Yup.string().trim().required(t('error:REQUIRED')),
              en: Yup.string().trim().required(t('error:REQUIRED')),
            }),
          dropdownOptions: Yup.array()
            .of(
              Yup.object().shape({
                optionName: Yup.string().trim().required(t('error:REQUIRED')),
                optionType: Yup.number().oneOf([0, 1], t('error:REQUIRED')).required(t('error:REQUIRED')).nullable(),
                optionValue: Yup.mixed()
                  .required(t('error:REQUIRED'))
                  .when('optionType', (optionType, schema) => {
                    if (optionType === DROPDOWN_OPTION_TYPE.number.value) {
                      return Yup.number()
                        .required(t('error:REQUIRED'))
                        .typeError(t('error:MUST_BE_A_NUMBER', { input: t('global:VALUE') }));
                    }
                    if (optionType === DROPDOWN_OPTION_TYPE.string.value) {
                      return Yup.string().trim().required(t('error:REQUIRED'));
                    }
                    return schema;
                  }),
              }),
            )
            .when('type', (parameterType, schema) => {
              if (parameterType === PARAMETER_TYPE.dropdown) {
                return schema.min(2, t('DROPDOWN_AT_LEAST_2')).required();
              }
              // if it is not a dropdown type, don't look inside
              return schema.of(Yup.object());
            })
            .test('dropDown-options-test', '', function tester(dropdownOptions) {
              const values = [];
              const names = [];
              for (let i = 0; i < dropdownOptions.length; i += 1) {
                const option = dropdownOptions[i];
                if (option?.optionName) {
                  if (names.includes(option.optionName)) {
                    return this.createError({
                      path: this.path,
                      message: `${t('DROPDOWN_OPTION_NAMES_MUST_BE_DIFFERENT')} "${option.optionName}"`,
                    });
                  }
                  names.push(option.optionName);
                }
                if (option?.optionValue) {
                  if (values.includes(option.optionValue)) {
                    return this.createError({
                      path: this.path,
                      message: `${t('DROPDOWN_OPTION_VALUES_MUST_BE_DIFFERENT')} "${option.optionValue}"`,
                    });
                  }
                  values.push(option.optionValue);
                }
              }
              return true;
            }),
        }),
      )
      .test('parameters-variableName-test', '', function tester(parameters) {
        const variableNames = [];
        for (let i = 0; i < parameters.length; i += 1) {
          const parameter = parameters[i];
          if (parameter?.variableName) {
            if (variableNames.includes(parameter.variableName)) {
              return this.createError({
                path: this.path,
                message: `${t('VARIABLE_NAMES_MUST_BE_DIFFERENT')} "${parameter.variableName}"`,
              });
            }
            variableNames.push(parameter.variableName);
          }
        }
        return true;
      })
      .test('parameters-variableName-reserved-variable-names-test', '', function tester(parameters) {
        for (let i = 0; i < parameters.length; i += 1) {
          const parameter = parameters[i];
          if (parameter?.variableName) {
            if (RESERVED_VARIABLE_NAMES.includes(parameter.variableName)) {
              return this.createError({
                path: this.path,
                message: t('RESERVED_VARIABLE_NAME_ERROR', { variableName: parameter.variableName }),
              });
            }
          }
        }
        return true;
      }),
    reportTags: Yup.array().of(Yup.string()),
    reportOwners: Yup.array().of(Yup.string()),
  });

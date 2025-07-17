/**
 * Page Generator v1
 */

const CommonUtil = require('../utils/common');
const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a page',
  prompts: [
    {
      type: 'input',
      name: 'path',
      message: 'Where to add? (e.g. pages/fleet/constraint/detail)',
      validate: value => {
        if (CommonUtil.isNullOrEmpty(value)) {
          return 'The path is required';
        }

        if (/\s/g.test(value)) {
          return 'The path should not contain any white spaces';
        }

        if (!value.startsWith('pages/')) {
          return 'The path must have pages/ prefix at the beginning';
        }

        return componentExists(value)
          ? 'A page with this path already exists'
          : true;
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should the page be called? (e.g. FleetConstraintDetail)',
      validate: value => {
        if (CommonUtil.isNullOrEmpty(value)) {
          return 'The page name is required';
        }

        return true;
      },
    },
    {
      type: 'input',
      name: 'url',
      message: 'What will the page url be?',
      validate: value => {
        if (CommonUtil.isNullOrEmpty(value)) {
          return 'The page url is required';
        }

        if (!value.startsWith('/')) return 'The page url has to start with a `/`';

        return true;
      },
    },
    {
      type: 'input',
      name: 'routeKey',
      message: 'What should the route key be?',
      validate: value => {
        if (CommonUtil.isNullOrEmpty(value)) {
          return 'The route key is required';
        }

        return true;
      },
    },
    {
      type: 'input',
      name: 'titleTranslationKey',
      message: 'What is the translation key for the page title? (e.g. PAGE_TITLE.FLEET.CONSTRAINT.DETAIL)',
      validate: value => {
        if (CommonUtil.isNullOrEmpty(value)) {
          return 'The route key is required';
        }

        if (!value.startsWith('PAGE_TITLE.')) return 'The translation key must start with `PAGE_TITLE.`';

        return true;
      },
    },
    {
      type: 'confirm',
      name: 'wantRedux',
      message: 'Do you want redux actions/reducers/sagas/selectors?',
      default: true,
    },
    {
      type: 'input',
      name: 'reduxKey',
      message: 'What should the redux key be?',
      when: response => response.wantRedux,
      validate: value => {
        if (CommonUtil.isNullOrEmpty(value)) {
          return 'The redux key is required';
        }

        return true;
      },
    },
    {
      type: 'input',
      name: 'actions',
      message: 'Add some redux actions: (e.g. getFleetConstraint, getFleetVehicles)',
      when: response => response.wantRedux,
      validate: (value = '') => {
        if (CommonUtil.isNullOrEmpty(value)) {
          return 'Action name is required';
        }
        const splitBySpaceValues = value.trim().split(' ');
        const splitByCommaValues = value.trim().split(',');
        if (splitBySpaceValues.length > 1 && splitByCommaValues.length !== splitBySpaceValues.length) {
          return 'If you want more than one action you have to separate action names using comma as delimiter';
        }

        return true;
      },
    },
    {
      type: 'confirm',
      name: 'wantMainComponent',
      message: 'Do you want a component for the page?',
      default: true,
    },
    {
      type: 'input',
      name: 'mainComponentName',
      message: 'What should the component be called? (e.g. ConstraintDetailForm)',
      when: response => response.wantMainComponent,
      validate: (value = '') => {
        if (CommonUtil.isNullOrEmpty(value)) {
          return 'Main component name is required';
        }

        return true;
      },
    },
    {
      type: 'confirm',
      name: 'wantTranslation',
      message: 'Do you want translation? (i18n)',
      default: true,
    },
  ],
  actions: data => {
    const tempData = data;
    tempData.selectorNames = '';

    if (tempData.wantRedux) {
      if (tempData?.actions?.length > 0) {
        tempData.actions = tempData.actions.split(',').map(i => i.trim());
      }
      else {
        delete tempData.actions;
        tempData.wantRedux = false;
      }
    }
    if (tempData.wantRedux) {
      tempData.selectorNames = tempData.actions.map(selectorName => {
        let tempSelectorName = selectorName;
        if (selectorName.indexOf('get') === 0) {
          const tempName = selectorName.substring(3);
          tempSelectorName = `${tempName.charAt(0).toLowerCase()}${tempName.slice(1)}`;
        }
        return `${tempSelectorName}Selector`;
      }).join(', ');
    }

    const actions = [
      {
        type: 'add',
        path: '../../app/{{pascalPathCase path}}/index.tsx',
        templateFile: './page/index.tsx.hbs',
      },
      {
        type: 'add',
        path: '../../app/{{pascalPathCase path}}/index.integration.test.js',
        templateFile: './page/index.integration.test.js.hbs',
      },
    ];

    if (tempData.wantRedux) {
      actions.push(
        {
          type: 'add',
          path: '../../app/{{pascalPathCase path}}/redux/actions.ts',
          templateFile: './page/redux/actions.ts.hbs',
        },
        {
          type: 'add',
          path: '../../app/{{pascalPathCase path}}/redux/saga.ts',
          templateFile: './page/redux/saga.ts.hbs',
        },
        {
          type: 'add',
          path: '../../app/{{pascalPathCase path}}/redux/reducer.ts',
          templateFile: './page/redux/reducer.ts.hbs',
        },
        {
          type: 'add',
          path: '../../app/{{pascalPathCase path}}/redux/selectors.ts',
          templateFile: './page/redux/selectors.ts.hbs',
        },
      );
    }

    if (tempData.wantMainComponent) {
      actions.push(...[
        {
          type: 'add',
          path: '../../app/{{pascalPathCase path}}/components/{{properCase mainComponentName}}/index.tsx',
          templateFile: './page/components/MainComponent/index.tsx.hbs',
        },
      ]);
    }

    actions.push({ type: 'eslintFix' });

    return actions;
  },
};

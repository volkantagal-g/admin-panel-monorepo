# ADMIN PANEL FRONT-END
## Table of Contents
  1. [Related repositories](#markdown-header-related-repositories)
  1. [Quick Start](#markdown-header-quick-start)
  1. [Built With](#markdown-header-built-with)
  1. [Template](#markdown-header-template)
  1. [Directory Structure](#markdown-header-directory-structure)
  1. [Glossary](#markdown-header-glossary)
  1. [Documentation](#markdown-header-documentation)
## Related Repositories
- [admin-panel-api-gateway](https://bitbucket.org/getirdev/admin-panel-api-gateway/src/master/)
- [admin-panel-auth-service](https://bitbucket.org/getirdev/admin-panel-auth-service/src/master/)
- [admin-panel-product-service](https://bitbucket.org/getirdev/admin-panel-product-service/src/master/)
## Quick Start
#### Installation
- Pre-requirements
    - Install `nvm` by following the instructions here https://github.com/nvm-sh/nvm#installing-and-updating

```bash
    # verify that you installed nvm by printing its version number
    $ nvm -v
```

- Clone repo
```bash
    # clone the repo
    $ git clone git@bitbucket.org:getirdev/admin-panel-frontend.git

    # go into app directory
    $ cd admin-panel-frontend
```

- Package installation
```bash
    # run <nvm use> to use project's node version which is specified in .nvmrc
    $ nvm use
    # if you didn't have that node version, the error in the console will guide you to install it
    $ nvm install <version_in_nvmrc>

    # install packages, use versions pinned by the lock file
    $ npm ci

    # if you want to install new package for production, install with exact version by providing -E flag
    $ npm install <prod_package> -E

    # if it is a dev dependency, you can omit -E
    $ npm install -D <development_package>
```

#### Environment
- Create `.env` file
```bash
    $ touch .env
```

- Add environment variables into `.env` file
```bash
    # REACT_APP_API_GATEWAY_URI=http://localhost:34000
    REACT_APP_API_GATEWAY_URI=https://admin-panel-api-gateway.develop.getirapi.com
```

#### Adding .npmrc file
- Create `.npmrc` file
```bash
    $ touch .npmrc
```

- Add getir's private npm token into `.npmrc` file
```
    //registry.npmjs.org/:_authToken=********-****-****-****-************

    # get npm token from your teammates
```

#### Usage
- Start
```bash
    # start application with hot reload
    # PORT defaults to 9003 if you don't provide
    $ npm start # http://localhost:9003
    # you can also provide PORT
    $ PORT=9005 npm start

```
### Testing
- Before pushing your changes, it is a good idea to run the tests. The pipeline will catch the failed tests when you open a PR, you can fix them before that.
```bash
    # Run the tests locally
    $ npm run test
```

#### Build
- Before opening a PR, it is a good idea to run `build` to build the project as if in production. You can catch some errors early.

- The build artifacts will be stored in the `build/` directory.

```bash
    # build for production with minification
    $ npm run build
    # analyze the build, result is served at port=8888
    $ npm run build:analyze
    # very useful for checking how large the packages
    # or checking whether optimizations in build steps work 
```
## Built With
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Antd](https://ant.design/)
- [React-JSS](https://cssinjs.org/react-jss/)
- [Reselect](https://github.com/reduxjs/reselect)
- [Formik](https://formik.org/docs/overview)
- [Moment](https://momentjs.com/docs/)
- [Webpack](https://webpack.js.org/concepts/)

## Template
- It should also be mentioned, this repo is forked by [Panel Boilerplate](https://bitbucket.org/getirdev/panel-boilerplate/src/master/)
- A lot of modifications have been made after those fork sequences.
- After those fork sequences and discussions within the team, new template occured which is this repo, **admin-panel-frontend**.

## Directory Structure
```
Admin Panel Frontend
├── app/                #project root
│   ├── api/
│   ├── assets/
│   ├── axios/
│   ├── components/
│   ├── config/
│   ├── containers/
│   ├── hooks/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   ├── shared/
│   ├── translations/
│   ├── utils/
│   ├── index.js
│   ├── i18n.js
│   └── index.html
├── .nvmrc
├── package.json
└── package-lock.json
```

## Linting
- There is a pre-commit hook which runs when you commit, using `lint-staged` package. If your commit is canceled, look at the console and fix those errors.

package.json scripts:

- `lint-staged`: Runs eslint on git staged source files
- `lint-app`: Runs eslint for the whole app
- `lint-files`: Runs eslint for the files provided
- `lint-fix`: Runs prettier first, then eslint to fix the for the whole app
- `sort`: Sorts json files for the keys in alphabetical order
## Glossary

- `.husky`: Scripts for git hooks. After commit and push there are certain tasks automated to run.

- `.eslintrc.json`: Sets the default lint rules for quality of codebase.

- `bitbucket-pipelines.yml`: Bitbucket cloud pipeline configuration file.

- `.editorconfig`: Sets the default configuration for certain files across editors. (e.g. indentation)

- `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

- `package.json`: Sets project's package dependencies and scripts etc. for managing project environment

- `package-lock.json`: Locks the project dependencies, we want to reproduce same dependencies for every developer to make our development consistent.

## Documentation
- [Home Page Of Panel Documentations](https://getirdev.atlassian.net/wiki/spaces/PK/pages/716144645/Admin+Panel+a.k.a+Global)
- [Before Start Coding](https://getirdev.atlassian.net/wiki/spaces/PK/pages/1094419862/Before+Start+Coding)
- [Package Management](https://getirdev.atlassian.net/wiki/spaces/PK/pages/1732083713/Package+Management)
- [Code Style](https://getirdev.atlassian.net/wiki/spaces/PK/pages/1678508900/Code+Style+Guide)
- [Git Flow](https://getirdev.atlassian.net/wiki/spaces/PK/pages/1629618243/Pull+Requesting+and+Branching+for+Releases)
- [How to Add a New Page](https://getirdev.atlassian.net/wiki/spaces/PK/pages/1040647325/How+to+add+a+new+page)
- [Branch Based Deployment Steps](https://getirdev.atlassian.net/wiki/spaces/PK/pages/1050116632/Branch+Based+Deployment+Steps)

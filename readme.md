# styled-graphql-react-app

A universal react app with styled-components support

![CI Status](https://github.com/dhruv-m-patel/styled-graphql-react-app/workflows/Continuous%20Integration/badge.svg)

### Setup

```
$ git clone git@github.com:dhruv-m-patel/styled-graphql-react-app.git
$ npm install
$ cp .env.example .env ## edit environment variables
$ npm run start-dev
```

### Tooling

This minimal universal react app is prebuilt with following tooling pre-configured:

- `react`
- `styled-components`
- `express`
-  `GraphQL`
- `express-enrouten`: Configre all server side routing to be considered from `src/server/routes` directory
- `webpack`
- `babel@7`
- `jest`
- `eslint`
- `stylint`
- `husky`: Lint code on every commit, run tests before every git push
- `dotenv`: Load all environment variables when app starts
- `configuration`: using confit, meddleware, shortstop-handlers and shortstop-regex
- `hot-reloading`: using webpack
- `code-splitting`: using loadable component

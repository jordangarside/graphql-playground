"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var MiddlewareApp_1 = require("./components/MiddlewareApp");
require("./index.css");
// import { Tab } from './state/sessions/reducers'
// import { LinkCreatorProps } from './state/sessions/fetchingSagas'
// import { ApolloLink } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
// import { exampleSchema } from './fixtures/exampleSchema'
if (process.env.NODE_ENV !== 'production') {}
/* tslint:disable-next-line */
// const { whyDidYouUpdate } = require('why-did-you-update')
// whyDidYouUpdate(React)

/* tslint:disable-next-line */
;
window['GraphQLPlayground'] = {
    init: function init(element, options) {
        ReactDOM.render(React.createElement(MiddlewareApp_1.default, _extends({ setTitle: true, showNewWorkspace: false }, options, { config: config, configString: configString })), element);
    }
};
var configString = "projects:\napp:\n  schemaPath: \"src/schema.graphql\"\n  extensions:\n    endpoints:\n      default: \"http://localhost:4000\"\ndatabase:\n  schemaPath: \"src/generated/prisma.graphql\"\n  extensions:\n    prisma: database/prisma.yml";
var config = {
    projects: {
        prisma: {
            schemaPath: 'src/generated/prisma.graphql',
            includes: ['database/seed.graphql'],
            extensions: {
                prisma: 'database/prisma.yml',
                'prepare-binding': {
                    output: 'src/generated/prisma.ts',
                    generator: 'prisma-ts'
                },
                endpoints: {
                    dev2: {
                        url: 'https://eu1.prisma.sh/public-asdf/session65/dev'
                    }
                }
            }
        },
        app: {
            schemaPath: 'src/schema.graphql',
            includes: ['queries/{booking,queries}.graphql'],
            extensions: {
                endpoints: {
                    default: 'http://localhost:4000'
                }
            }
        }
    }
};
// const tabs: Tab[] = [
//   {
//     query: '{ users { id } }',
//     endpoint: 'https://eu1.prisma.sh/public-asdf/session65/dev',
//     responses: ['{}'],
//   },
//   {
//     query: '{ users { id } }',
//     endpoint: 'https://eu1.prisma.sh/public-asdf/session65/dev',
//   },
// ]
// const customLinkCreator = (
//   session: LinkCreatorProps,
//   wsEndpoint?: string,
// ): { link: ApolloLink } => {
//   const { headers, credentials } = session
//   const link = new HttpLink({
//     uri: session.endpoint,
//     fetch,
//     headers,
//     credentials,
//   })
//   return { link }
// }
// const lightEditorColours = {
//   property: '#328c8c',
//   comment: 'rgba(0, 0, 0, 0.3)',
//   punctuation: 'rgba(23,42,58,.8)',
//   keyword: '#366b6b',
//   def: 'rgb(56, 189, 193)',
//   qualifier: '#1c92a9',
//   attribute: '#b56531',
//   number: '#1f6ed6;',
//   string: '#d64292',
//   builtin: '#d47509',
//   string2: '#0b7fc7',
//   variable: 'rgb(236, 95, 103)',
//   meta: '#b33086',
//   atom: 'rgb(245, 160, 0)',
//   ws: 'rgba(23, 42, 58, 0.8)',
//   selection: '#d1e9fd',
//   cursorColor: 'rgba(0, 0, 0, 0.4)',
//   editorBackground: '#f6f7f7',
//   resultBackground: '#eeeff0',
//   leftDrawerBackground: '#e9eaea',
//   rightDrawerBackground: '#e5e7e7',
// }
//# sourceMappingURL=localDevIndex.jsx.map
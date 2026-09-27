export const FILE_NAME_TOKEN = "__FILENAME__";

export const SNIPPETS = [
  // Imports
  { prefix: "imp",   body: "import ${2:moduleName} from '${1:module}'",                                    detail: "import default" },
  { prefix: "imn",   body: "import '${1:module}'",                                                         detail: "import module" },
  { prefix: "imd",   body: "import { ${2:mod} } from '${1:module}'",                                       detail: "import destructured" },
  { prefix: "ime",   body: "import * as ${2:alias} from '${1:module}'",                                    detail: "import * as" },
  { prefix: "ima",   body: "import { ${2:orig} as ${3:alias} } from '${1:module}'",                        detail: "import as alias" },
  { prefix: "imr",   body: "import React from 'react'",                                                    detail: "import React" },
  { prefix: "imrd",  body: "import ReactDOM from 'react-dom'",                                             detail: "import ReactDOM" },
  { prefix: "imrc",  body: "import React, { Component } from 'react'",                                     detail: "import React Component" },
  { prefix: "imrcp", body: "import React, { Component } from 'react'\nimport PropTypes from 'prop-types'", detail: "import React Component PropTypes" },
  { prefix: "imrpc", body: "import React, { PureComponent } from 'react'",                                 detail: "import PureComponent" },
  { prefix: "imrm",  body: "import React, { memo } from 'react'",                                          detail: "import memo" },
  { prefix: "impt",  body: "import PropTypes from 'prop-types'",                                           detail: "import PropTypes" },
  { prefix: "imrs",  body: "import React, { useState } from 'react'",                                      detail: "import useState" },
  { prefix: "imrse", body: "import React, { useState, useEffect } from 'react'",                           detail: "import useState useEffect" },

  // Components
  { prefix: "rfc", body: "import React from 'react'\n\nexport default function __FILENAME__() {\n  return (\n    <div>__FILENAME__</div>\n  )\n}", detail: "React Function Component" },
{ prefix: "rfce", body: "import React from 'react'\n\nconst __FILENAME__ = () => {\n  return (\n    <div>__FILENAME__</div>\n  )\n}\n\nexport default __FILENAME__", detail: "React Function Component Export" },
{ prefix: "rafce", body: "import React from 'react'\n\nconst __FILENAME__ = () => {\n  return (\n    <div>__FILENAME__</div>\n  )\n}\n\nexport default __FILENAME__", detail: "React Arrow Function Component Export" },
{ prefix: "rafc", body: "import React from 'react'\n\nexport const __FILENAME__ = () => {\n  return (\n    <div>__FILENAME__</div>\n  )\n}", detail: "React Arrow Function Component" },
  { prefix: "rafcp", body: "import React from 'react'\nimport PropTypes from 'prop-types'\n\nconst __FILENAME__ = props => {\n  return (\n    <div>${1}</div>\n  )\n}\n\n__FILENAME__.propTypes = {}\n\nexport default __FILENAME__", detail: "React Arrow Function + PropTypes" },
  { prefix: "rcc",   body: "import React, { Component } from 'react'\n\nexport default class __FILENAME__ extends Component {\n  render() {\n    return (\n      <div>${1}</div>\n    )\n  }\n}",                              detail: "React Class Component" },
  { prefix: "rce",   body: "import React, { Component } from 'react'\n\nexport class __FILENAME__ extends Component {\n  render() {\n    return (\n      <div>${1}</div>\n    )\n  }\n}\n\nexport default __FILENAME__",        detail: "React Class Export" },
  { prefix: "rpc",   body: "import React, { PureComponent } from 'react'\n\nexport default class __FILENAME__ extends PureComponent {\n  render() {\n    return (\n      <div>${1}</div>\n    )\n  }\n}",                      detail: "React Pure Component" },

  // Hooks
  { prefix: "useState",    body: "const [${1:state}, set${2:State}] = useState(${3:initialState})",             detail: "useState hook" },
  { prefix: "useEffect",   body: "useEffect(() => {\n  ${1}\n  return () => {\n    ${2}\n  }\n}, [${3}])",      detail: "useEffect hook" },
  { prefix: "useContext",  body: "const ${1:ctx} = useContext(${2:Context})",                                    detail: "useContext hook" },
  { prefix: "useReducer",  body: "const [${1:state}, dispatch] = useReducer(${2:reducer}, ${3:initialState})",  detail: "useReducer hook" },
  { prefix: "useCallback", body: "useCallback(\n  () => {\n    ${1}\n  },\n  [${2}],\n)",                       detail: "useCallback hook" },
  { prefix: "useMemo",     body: "useMemo(() => ${1}, [${2}])",                                                 detail: "useMemo hook" },
  { prefix: "useRef",      body: "const ${1:ref} = useRef(${2:initialValue})",                                  detail: "useRef hook" },

  // Lifecycle
  { prefix: "cdm",  body: "componentDidMount() { ${1} }",                                   detail: "componentDidMount" },
  { prefix: "cdup", body: "componentDidUpdate(prevProps, prevState) { ${1} }",              detail: "componentDidUpdate" },
  { prefix: "cwun", body: "componentWillUnmount() { ${1} }",                                detail: "componentWillUnmount" },
  { prefix: "scu",  body: "shouldComponentUpdate(nextProps, nextState) { ${1} }",           detail: "shouldComponentUpdate" },
  { prefix: "sst",  body: "this.setState((state, props) => { return { ${1} } })",          detail: "setState" },

  // Exports
  { prefix: "exp",  body: "export default ${1:moduleName}",                                 detail: "export default" },
  { prefix: "exd",  body: "export { ${2:mod} } from '${1:module}'",                        detail: "export destructured" },
  { prefix: "exa",  body: "export { ${2:orig} as ${3:alias} } from '${1:module}'",         detail: "export as alias" },
  { prefix: "enf",  body: "export const ${1:fn} = (${2:params}) => {${3}}",                detail: "export named function" },
  { prefix: "edf",  body: "export default (${1:params}) => {${2}}",                        detail: "export default function" },

  // JS Utils
  { prefix: "nfn",  body: "const ${1:fn} = (${2:params}) => { ${3} }",                    detail: "named arrow function" },
  { prefix: "anfn", body: "(${1:params}) => { ${2} }",                                     detail: "anonymous arrow function" },
  { prefix: "met",  body: "${1:method} = (${2:params}) => {${3}}",                         detail: "method" },
  { prefix: "fre",  body: "${1:arr}.forEach(${2:item} => {${3}})",                         detail: "forEach" },
  { prefix: "fof",  body: "for(let ${1:item} of ${2:obj}) {${3}}",                         detail: "for of" },
  { prefix: "fin",  body: "for(let ${1:item} in ${2:obj}) {${3}}",                         detail: "for in" },
  { prefix: "dob",  body: "const {${2:prop}} = ${1:obj}",                                  detail: "destructure object" },
  { prefix: "dar",  body: "const [${2:item}] = ${1:arr}",                                  detail: "destructure array" },
  { prefix: "sti",  body: "setInterval(() => { ${1} }, ${2:delay})",                       detail: "setInterval" },
  { prefix: "sto",  body: "setTimeout(() => { ${1} }, ${2:delay})",                        detail: "setTimeout" },
  { prefix: "prom", body: "return new Promise((resolve, reject) => { ${1} })",             detail: "promise" },

  // Console
  { prefix: "clg",  body: "console.log(${1:obj})",                                         detail: "console.log" },
  { prefix: "clo",  body: "console.log('${1:label}', ${2:obj})",                           detail: "console.log labeled" },
  { prefix: "clj",  body: "console.log('${1:label}', JSON.stringify(${1:label}, null, 2))", detail: "console.log JSON" },
  { prefix: "cer",  body: "console.error(${1:obj})",                                       detail: "console.error" },
  { prefix: "cwa",  body: "console.warn(${1:obj})",                                        detail: "console.warn" },
  { prefix: "cin",  body: "console.info(${1:obj})",                                        detail: "console.info" },
  { prefix: "ctm",  body: "console.time('${1:id}')",                                       detail: "console.time" },
  { prefix: "cte",  body: "console.timeEnd('${1:id}')",                                    detail: "console.timeEnd" },
  { prefix: "ccl",  body: "console.clear()",                                               detail: "console.clear" },
  { prefix: "cgr",  body: "console.group('${1:label}')",                                   detail: "console.group" },
  { prefix: "cge",  body: "console.groupEnd()",                                            detail: "console.groupEnd" },
  { prefix: "ctr",  body: "console.trace(${1:obj})",                                       detail: "console.trace" },
  { prefix: "cdi",  body: "console.dir(${1:obj})",                                         detail: "console.dir" },

  // PropTypes
  { prefix: "pta",   body: "PropTypes.array",                                              detail: "PropTypes.array" },
  { prefix: "ptar",  body: "PropTypes.array.isRequired",                                   detail: "PropTypes.array.isRequired" },
  { prefix: "ptb",   body: "PropTypes.bool",                                               detail: "PropTypes.bool" },
  { prefix: "ptbr",  body: "PropTypes.bool.isRequired",                                    detail: "PropTypes.bool.isRequired" },
  { prefix: "ptf",   body: "PropTypes.func",                                               detail: "PropTypes.func" },
  { prefix: "ptfr",  body: "PropTypes.func.isRequired",                                    detail: "PropTypes.func.isRequired" },
  { prefix: "ptn",   body: "PropTypes.number",                                             detail: "PropTypes.number" },
  { prefix: "ptnr",  body: "PropTypes.number.isRequired",                                  detail: "PropTypes.number.isRequired" },
  { prefix: "pto",   body: "PropTypes.object",                                             detail: "PropTypes.object" },
  { prefix: "ptor",  body: "PropTypes.object.isRequired",                                  detail: "PropTypes.object.isRequired" },
  { prefix: "pts",   body: "PropTypes.string",                                             detail: "PropTypes.string" },
  { prefix: "ptsr",  body: "PropTypes.string.isRequired",                                  detail: "PropTypes.string.isRequired" },
  { prefix: "ptany", body: "PropTypes.any",                                                detail: "PropTypes.any" },
  { prefix: "ptsh",  body: "PropTypes.shape({\n  ${1:prop}: ${2:PropTypes.string}\n})",    detail: "PropTypes.shape" },

  // Redux
  { prefix: "rxaction",  body: "export const ${1} = (payload) => ({\n  type: ${2},\n  payload\n})\n",  detail: "redux action" },
  { prefix: "rxconst",   body: "export const ${1} = '${1}'",                                           detail: "redux const" },
  { prefix: "rxreducer", body: "const initialState = {}\n\nexport default (state = initialState, { type, payload }) => {\n  switch (type) {\n    case ${1}:\n      return { ...state, ...payload }\n    default:\n      return state\n  }\n}\n", detail: "redux reducer" },
  { prefix: "rxselect",  body: "export const ${1} = state => state.${2}",                              detail: "redux selector" },
];

export const DONT_COMPLETE = [
  "TemplateString", "String", "RegExp", "LineComment", "BlockComment",
  "VariableDefinition", "TypeDefinition", "Label", "PropertyDefinition",
  "PropertyName", "JSXText", "JSXAttributeValue",
];
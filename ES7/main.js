(function () {
  const PLUGIN_ID = "com.bayanaka.ES7";

  // ─── Snippet Definitions ───────────────────────────────────────────
  const SNIPPETS = {
    // Basic Imports
    imp: {
      body: "import ${1:moduleName} from '${2:module}'",
      meta: "import default",
    },
    imn: { body: "import '${1:module}'", meta: "import module" },
    imd: {
      body: "import { ${1:destructuredModule} } from '${2:module}'",
      meta: "import destructured",
    },
    ime: {
      body: "import * as ${1:alias} from '${2:module}'",
      meta: "import all as",
    },
    ima: {
      body: "import { ${1:originalName} as ${2:aliasName} } from '${3:module}'",
      meta: "import as alias",
    },

    // React Imports
    imr: { body: "import React from 'react'", meta: "import React" },
    imrd: { body: "import ReactDOM from 'react-dom'", meta: "import ReactDOM" },
    imrc: {
      body: "import React, { Component } from 'react'",
      meta: "import React Component",
    },
    imrcp: {
      body: "import React, { Component } from 'react'\nimport PropTypes from 'prop-types'",
      meta: "import React Component PropTypes",
    },
    imrpc: {
      body: "import React, { PureComponent } from 'react'",
      meta: "import PureComponent",
    },
    imrm: { body: "import React, { memo } from 'react'", meta: "import memo" },
    impt: {
      body: "import PropTypes from 'prop-types'",
      meta: "import PropTypes",
    },
    imrs: {
      body: "import React, { useState } from 'react'",
      meta: "import useState",
    },
    imrse: {
      body: "import React, { useState, useEffect } from 'react'",
      meta: "import useState useEffect",
    },

    // React Components
    rfc: {
      body: "export default function ${1:__filename__}() {\n  return (\n    <div>\n      ${1:__filename__}\n    </div>\n  )\n}",
      meta: "React Function Component",
    },
    rfce: {
      body: "import React from 'react'\n\nexport default function ${1:__filename__}() {\n  return (\n    <div>\n      ${1:__filename__}\n    </div>\n  )\n}",
      meta: "React Function Component Export",
    },
    rafce: {
      body: "import React from 'react'\n\nconst ${1:__filename__} = () => {\n  return (\n    <div>\n      ${1:__filename__}\n    </div>\n  )\n}\n\nexport default ${1:__filename__}",
      meta: "React Arrow Function Component Export",
    },
    rafc: {
      body: "import React from 'react'\n\nconst ${1:__filename__} = () => {\n  return (\n    <div>\n      ${1:__filename__}\n    </div>\n  )\n}\n\nexport default ${1:__filename__}",
      meta: "React Arrow Function Component",
    },
    rafcp: {
      body: "import React from 'react'\nimport PropTypes from 'prop-types'\n\nconst ${1:__filename__} = (props) => {\n  return (\n    <div>\n      ${1:__filename__}\n    </div>\n  )\n}\n\n${1:__filename__}.propTypes = {}\n\nexport default ${1:__filename__}",
      meta: "React Arrow Function Component with PropTypes",
    },
    rcc: {
      body: "import React, { Component } from 'react'\n\nexport default class ${1:__filename__} extends Component {\n  render() {\n    return (\n      <div>\n        ${1:__filename__}\n      </div>\n    )\n  }\n}",
      meta: "React Class Component",
    },
    rce: {
      body: "import React, { Component } from 'react'\nimport PropTypes from 'prop-types'\n\nexport default class ${1:__filename__} extends Component {\n  render() {\n    return (\n      <div>\n        ${1:__filename__}\n      </div>\n    )\n  }\n}\n\n${1:__filename__}.propTypes = {}",
      meta: "React Class Export with PropTypes",
    },
    rpc: {
      body: "import React, { PureComponent } from 'react'\n\nexport default class ${1:__filename__} extends PureComponent {\n  render() {\n    return (\n      <div>\n        ${1:__filename__}\n      </div>\n    )\n  }\n}",
      meta: "React Pure Component",
    },

    // Hooks
    useState: {
      body: "const [${1:state}, set${2:State}] = useState(${3:initialState})",
      meta: "useState hook",
    },
    useEffect: {
      body: "useEffect(() => {\n  ${1}\n  return () => {\n    ${2}\n  }\n}, [${3}])",
      meta: "useEffect hook",
    },
    useContext: {
      body: "const ${1:context} = useContext(${2:contextValue})",
      meta: "useContext hook",
    },
    useReducer: {
      body: "const [${1:state}, dispatch] = useReducer(${2:reducer}, ${3:initialState})",
      meta: "useReducer hook",
    },
    useCallback: {
      body: "const ${1:memoizedCallback} = useCallback(\n  () => {\n    ${2}\n  },\n  [${3}]\n)",
      meta: "useCallback hook",
    },
    useMemo: {
      body: "const ${1:memoizedValue} = useMemo(() => ${2}, [${3}])",
      meta: "useMemo hook",
    },
    useRef: {
      body: "const ${1:refContainer} = useRef(${2:initialValue})",
      meta: "useRef hook",
    },

    // Lifecycle
    cdm: {
      body: "componentDidMount() {\n  ${1}\n}",
      meta: "componentDidMount",
    },
    cdup: {
      body: "componentDidUpdate(prevProps, prevState) {\n  ${1}\n}",
      meta: "componentDidUpdate",
    },
    cwun: {
      body: "componentWillUnmount() {\n  ${1}\n}",
      meta: "componentWillUnmount",
    },
    scu: {
      body: "shouldComponentUpdate(nextProps, nextState) {\n  return ${1:true}\n}",
      meta: "shouldComponentUpdate",
    },
    ren: { body: "render() {\n  return (\n    ${1}\n  )\n}", meta: "render" },
    sst: { body: "this.setState({ ${1:key}: ${2:value} })", meta: "setState" },

    // Exports
    exp: { body: "export default ${1:moduleName}", meta: "export default" },
    exd: {
      body: "export { ${1:destructuredModule} } from '${2:module}'",
      meta: "export destructured",
    },
    exa: {
      body: "export { ${1:originalName} as ${2:aliasName} } from '${3:module}'",
      meta: "export as alias",
    },
    enf: {
      body: "export const ${1:functionName} = (${2:params}) => {\n  ${3}\n}",
      meta: "export named function",
    },
    edf: {
      body: "export default (${1:params}) => {\n  ${2}\n}",
      meta: "export default function",
    },

    // JS Utilities
    met: {
      body: "${1:methodName} = (${2:params}) => {\n  ${3}\n}",
      meta: "method",
    },
    nfn: {
      body: "const ${1:functionName} = (${2:params}) => {\n  ${3}\n}",
      meta: "named arrow function",
    },
    anfn: {
      body: "(${1:params}) => {\n  ${2}\n}",
      meta: "anonymous arrow function",
    },
    fre: {
      body: "${1:arrayName}.forEach(${2:element} => {\n  ${3}\n})",
      meta: "forEach",
    },
    fof: {
      body: "for (let ${1:item} of ${2:object}) {\n  ${3}\n}",
      meta: "for of",
    },
    fin: {
      body: "for (let ${1:item} in ${2:object}) {\n  ${3}\n}",
      meta: "for in",
    },
    dob: {
      body: "const { ${1:propName} } = ${2:objectToDestruct}",
      meta: "destructure object",
    },
    dar: {
      body: "const [${1:propName}] = ${2:arrayToDestruct}",
      meta: "destructure array",
    },
    sti: {
      body: "setInterval(() => {\n  ${1}\n}, ${2:intervalTime})",
      meta: "setInterval",
    },
    sto: {
      body: "setTimeout(() => {\n  ${1}\n}, ${2:delayTime})",
      meta: "setTimeout",
    },
    prom: {
      body: "return new Promise((resolve, reject) => {\n  ${1}\n})",
      meta: "promise",
    },

    // Console
    clg: { body: "console.log(${1:object})", meta: "console.log" },
    clo: {
      body: "console.log('${1:object}', ${1:object})",
      meta: "console.log labeled",
    },
    cer: { body: "console.error(${1:object})", meta: "console.error" },
    cwa: { body: "console.warn(${1:object})", meta: "console.warn" },
    cin: { body: "console.info(${1:object})", meta: "console.info" },
    ctm: { body: "console.time('${1:timeId}')", meta: "console.time" },
    cte: { body: "console.timeEnd('${1:timeId}')", meta: "console.timeEnd" },
    ccl: { body: "console.clear()", meta: "console.clear" },
    cgr: { body: "console.group('${1:label}')", meta: "console.group" },
    cge: { body: "console.groupEnd()", meta: "console.groupEnd" },
    ctr: { body: "console.trace(${1:object})", meta: "console.trace" },
    cdi: { body: "console.dir(${1:object})", meta: "console.dir" },

    // PropTypes
    pta: { body: "PropTypes.array", meta: "PropTypes.array" },
    ptar: {
      body: "PropTypes.array.isRequired",
      meta: "PropTypes.array.isRequired",
    },
    ptb: { body: "PropTypes.bool", meta: "PropTypes.bool" },
    ptbr: {
      body: "PropTypes.bool.isRequired",
      meta: "PropTypes.bool.isRequired",
    },
    ptf: { body: "PropTypes.func", meta: "PropTypes.func" },
    ptfr: {
      body: "PropTypes.func.isRequired",
      meta: "PropTypes.func.isRequired",
    },
    ptn: { body: "PropTypes.number", meta: "PropTypes.number" },
    ptnr: {
      body: "PropTypes.number.isRequired",
      meta: "PropTypes.number.isRequired",
    },
    pto: { body: "PropTypes.object", meta: "PropTypes.object" },
    ptor: {
      body: "PropTypes.object.isRequired",
      meta: "PropTypes.object.isRequired",
    },
    pts: { body: "PropTypes.string", meta: "PropTypes.string" },
    ptsr: {
      body: "PropTypes.string.isRequired",
      meta: "PropTypes.string.isRequired",
    },
    ptany: { body: "PropTypes.any", meta: "PropTypes.any" },
    ptsh: { body: "PropTypes.shape({\n  ${1}\n})", meta: "PropTypes.shape" },

    // Redux
    rxaction: {
      body: "export const ${1:actionName} = (${2:params}) => ({\n  type: ${3:TYPE},\n  payload: ${2:params}\n})",
      meta: "redux action",
    },
    rxconst: {
      body: "export const ${1:NAME} = '${1:NAME}'",
      meta: "redux const",
    },
    rxreducer: {
      body: "const initialState = {\n  ${1}\n}\n\nexport default function ${2:reducer}(state = initialState, action) {\n  switch (action.type) {\n    case ${3:TYPE}:\n      return { ...state, ${4} }\n    default:\n      return state\n  }\n}",
      meta: "redux reducer",
    },
    rxselect: {
      body: "export const ${1:selectorName} = (state) => state.${2}",
      meta: "redux selector",
    },

    // React Native
    imrn: {
      body: "import { ${1} } from 'react-native'",
      meta: "import react-native",
    },
    rnstyle: {
      body: "const styles = StyleSheet.create({\n  ${1}\n})",
      meta: "RN StyleSheet",
    },
  };

  // ─── Helpers ───────────────────────────────────────────────────────
  function getFilename() {
    try {
      const file = editorManager?.activeFile;
      if (!file?.name) return "Component";
      return file.name.replace(/\.[^/.]+$/, ""); // buang ekstensi
    } catch {
      return "Component";
    }
  }

  function buildBody(bodyTemplate) {
    const filename = getFilename();
    return bodyTemplate.replace(/__filename__/g, filename);
  }

  // ─── Main Plugin ───────────────────────────────────────────────────
  class ES7ReactSnippets {
    constructor() {
      this.completer = null;
      this.destroyed = false;
    }

    async init(baseUrl) {
      const self = this;

      this.completer = {
        getCompletions(editor, session, pos, prefix, callback) {
          if (!prefix || prefix.length < 1) return callback(null, []);

          const results = Object.entries(SNIPPETS)
            .filter(([key]) =>
              key.toLowerCase().startsWith(prefix.toLowerCase()),
            )
            .map(([key, val]) => ({
              caption: key,
              snippet: buildBody(val.body),
              meta: val.meta,
              type: "snippet",
              score: 1000,
            }));

          callback(null, results);
        },
      };

      const { editor } = editorManager;
      if (editor && editor.completers) {
        editor.completers.unshift(this.completer);
      }

      // handle tab switching — pasang completer ke editor baru
      this._onSwitch = () => {
        const { editor } = editorManager;
        if (
          editor &&
          editor.completers &&
          !editor.completers.includes(self.completer)
        ) {
          editor.completers.unshift(self.completer);
        }
      };
      editorManager.on("switch-file", this._onSwitch);

      console.log("[ES7] Snippets ready ✓");
    }

    destroy() {
      this.destroyed = true;
      editorManager.off("switch-file", this._onSwitch);

      try {
        const { editor } = editorManager;
        if (editor?.completers) {
          editor.completers = editor.completers.filter(
            (c) => c !== this.completer,
          );
        }
      } catch {}

      console.log("[ES7] Destroyed");
    }
  }

  const plugin = new ES7ReactSnippets();

  if (window.acode) {
    acode.setPluginInit(PLUGIN_ID, async (baseUrl) => {
      await plugin.init(baseUrl);
    });
    acode.setPluginUnmount(PLUGIN_ID, () => {
      plugin.destroy();
    });
  }
})();

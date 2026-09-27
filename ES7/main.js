(function () {
  const PLUGIN_ID = "com.bayanaka.ES7";

  function getFilename() {
    try {
      const file = editorManager?.activeFile;
      if (!file?.name) return "Component";
      return file.name.replace(/\.[^/.]+$/, "");
    } catch {
      return "Component";
    }
  }

  class ES7ReactSnippets {
    constructor() {
      this._compartment = null;
    }

    async init(baseUrl) {
      const { autocompletion, snippetCompletion } = acode.require(
        "@codemirror/autocomplete",
      );
      const { Compartment } = acode.require("@codemirror/state");

      this._compartment = new Compartment();

      const buildOptions = () => {
        const name = getFilename();
        const defs = [
          // Imports
          ["imp", "import ${1:moduleName} from '${2:module}'"],
          ["imn", "import '${1:module}'"],
          ["imd", "import { ${1:mod} } from '${2:module}'"],
          ["ime", "import * as ${1:alias} from '${2:module}'"],
          ["ima", "import { ${1:orig} as ${2:alias} } from '${3:module}'"],
          ["imr", "import React from 'react'"],
          ["imrd", "import ReactDOM from 'react-dom'"],
          ["imrc", "import React, { Component } from 'react'"],
          [
            "imrcp",
            "import React, { Component } from 'react'\nimport PropTypes from 'prop-types'",
          ],
          ["imrpc", "import React, { PureComponent } from 'react'"],
          ["imrm", "import React, { memo } from 'react'"],
          ["impt", "import PropTypes from 'prop-types'"],
          ["imrs", "import React, { useState } from 'react'"],
          ["imrse", "import React, { useState, useEffect } from 'react'"],

          // Components
          [
            "rfc",
            `export default function ${name}() {\n  return (\n    <div>\n      ${name}\n    </div>\n  )\n}`,
          ],
          [
            "rfce",
            `import React from 'react'\n\nexport default function ${name}() {\n  return (\n    <div>\n      ${name}\n    </div>\n  )\n}`,
          ],
          [
            "rafce",
            `import React from 'react'\n\nconst ${name} = () => {\n  return (\n    <div>\n      ${name}\n    </div>\n  )\n}\n\nexport default ${name}`,
          ],
          [
            "rafc",
            `const ${name} = () => {\n  return (\n    <div>\n      ${name}\n    </div>\n  )\n}\n\nexport default ${name}`,
          ],
          [
            "rafcp",
            `import React from 'react'\nimport PropTypes from 'prop-types'\n\nconst ${name} = (props) => {\n  return (\n    <div>\n      ${name}\n    </div>\n  )\n}\n\n${name}.propTypes = {}\n\nexport default ${name}`,
          ],
          [
            "rcc",
            `import React, { Component } from 'react'\n\nexport default class ${name} extends Component {\n  render() {\n    return (\n      <div>\n        ${name}\n      </div>\n    )\n  }\n}`,
          ],
          [
            "rce",
            `import React, { Component } from 'react'\nimport PropTypes from 'prop-types'\n\nexport default class ${name} extends Component {\n  render() {\n    return (\n      <div>\n        ${name}\n      </div>\n    )\n  }\n}\n\n${name}.propTypes = {}`,
          ],
          [
            "rpc",
            `import React, { PureComponent } from 'react'\n\nexport default class ${name} extends PureComponent {\n  render() {\n    return (\n      <div>\n        ${name}\n      </div>\n    )\n  }\n}`,
          ],

          // Hooks
          [
            "useState",
            "const [${1:state}, set${2:State}] = useState(${3:initialState})",
          ],
          [
            "useEffect",
            "useEffect(() => {\n  ${1}\n  return () => {\n    ${2}\n  }\n}, [${3}])",
          ],
          ["useContext", "const ${1:ctx} = useContext(${2:Context})"],
          [
            "useReducer",
            "const [${1:state}, dispatch] = useReducer(${2:reducer}, ${3:initialState})",
          ],
          [
            "useCallback",
            "const ${1:cb} = useCallback(() => {\n  ${2}\n}, [${3}])",
          ],
          ["useMemo", "const ${1:val} = useMemo(() => ${2}, [${3}])"],
          ["useRef", "const ${1:ref} = useRef(${2:initialValue})"],

          // Lifecycle
          ["cdm", "componentDidMount() {\n  ${1}\n}"],
          ["cdup", "componentDidUpdate(prevProps, prevState) {\n  ${1}\n}"],
          ["cwun", "componentWillUnmount() {\n  ${1}\n}"],
          [
            "scu",
            "shouldComponentUpdate(nextProps, nextState) {\n  return ${1:true}\n}",
          ],
          ["ren", "render() {\n  return (\n    ${1}\n  )\n}"],
          ["sst", "this.setState({ ${1:key}: ${2:value} })"],

          // Exports
          ["exp", "export default ${1:moduleName}"],
          ["exd", "export { ${1:mod} } from '${2:module}'"],
          ["exa", "export { ${1:orig} as ${2:alias} } from '${3:module}'"],
          ["enf", "export const ${1:fn} = (${2:params}) => {\n  ${3}\n}"],
          ["edf", "export default (${1:params}) => {\n  ${2}\n}"],

          // JS Utils
          ["nfn", "const ${1:fn} = (${2:params}) => {\n  ${3}\n}"],
          ["anfn", "(${1:params}) => {\n  ${2}\n}"],
          ["met", "${1:method} = (${2:params}) => {\n  ${3}\n}"],
          ["fre", "${1:arr}.forEach(${2:item} => {\n  ${3}\n})"],
          ["fof", "for (let ${1:item} of ${2:obj}) {\n  ${3}\n}"],
          ["fin", "for (let ${1:item} in ${2:obj}) {\n  ${3}\n}"],
          ["dob", "const { ${1:prop} } = ${2:obj}"],
          ["dar", "const [${1:item}] = ${2:arr}"],
          ["sti", "setInterval(() => {\n  ${1}\n}, ${2:delay})"],
          ["sto", "setTimeout(() => {\n  ${1}\n}, ${2:delay})"],
          ["prom", "return new Promise((resolve, reject) => {\n  ${1}\n})"],

          // Console
          ["clg", "console.log(${1:obj})"],
          ["clo", "console.log('${1:label}', ${1:obj})"],
          ["cer", "console.error(${1:obj})"],
          ["cwa", "console.warn(${1:obj})"],
          ["cin", "console.info(${1:obj})"],
          ["ctm", "console.time('${1:id}')"],
          ["cte", "console.timeEnd('${1:id}')"],
          ["ccl", "console.clear()"],
          ["cgr", "console.group('${1:label}')"],
          ["cge", "console.groupEnd()"],
          ["ctr", "console.trace(${1:obj})"],
          ["cdi", "console.dir(${1:obj})"],

          // PropTypes
          ["pta", "PropTypes.array"],
          ["ptar", "PropTypes.array.isRequired"],
          ["ptb", "PropTypes.bool"],
          ["ptbr", "PropTypes.bool.isRequired"],
          ["ptf", "PropTypes.func"],
          ["ptfr", "PropTypes.func.isRequired"],
          ["ptn", "PropTypes.number"],
          ["ptnr", "PropTypes.number.isRequired"],
          ["pto", "PropTypes.object"],
          ["ptor", "PropTypes.object.isRequired"],
          ["pts", "PropTypes.string"],
          ["ptsr", "PropTypes.string.isRequired"],
          ["ptany", "PropTypes.any"],
          ["ptsh", "PropTypes.shape({\n  ${1}\n})"],

          // Redux
          [
            "rxaction",
            "export const ${1:action} = (${2:params}) => ({\n  type: ${3:TYPE},\n  payload: ${2:params}\n})",
          ],
          ["rxconst", "export const ${1:NAME} = '${1:NAME}'"],
          [
            "rxreducer",
            "const initialState = {\n  ${1}\n}\n\nexport default function ${2:reducer}(state = initialState, action) {\n  switch (action.type) {\n    case ${3:TYPE}:\n      return { ...state, ${4} }\n    default:\n      return state\n  }\n}",
          ],
          ["rxselect", "export const ${1:selector} = (state) => state.${2}"],

          // React Native
          ["imrn", "import { ${1} } from 'react-native'"],
          ["rnstyle", "const styles = StyleSheet.create({\n  ${1}\n})"],
        ];

        return defs.map(([label, body]) =>
          snippetCompletion(body, { label, type: "keyword" }),
        );
      };

      const completionSource = (context) => {
        const word = context.matchBefore(/\w+/);
        if (!word || (word.from === word.to && !context.explicit)) return null;
        return {
          from: word.from,
          options: buildOptions(),
          validFor: /^\w*$/,
        };
      };

      const extension = this._compartment.of(
        autocompletion({ override: [completionSource] }),
      );

      editorManager.editor.dispatch({
        effects: StateEffect.appendConfig.of(extension),
      });

      // handle switch file — rebuild options dengan nama file baru
      // gak perlu apa-apa krn buildOptions() dipanggil fresh tiap completion

      console.log("[ES7] Ready ✓");
    }

    destroy() {
      try {
        const { StateEffect } = acode.require("@codemirror/state");
        editorManager.editor.dispatch({
          effects: this._compartment.reconfigure([]),
        });
      } catch (e) {
        console.error("[ES7] destroy error", e);
      }
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

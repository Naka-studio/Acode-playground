import { SNIPPETS, DONT_COMPLETE, FILE_NAME_TOKEN } from "./snippets.js";

function getFilename() {
  try {
    const name = editorManager?.activeFile?.filename || "Component";
    const dot = name.lastIndexOf(".");
    return dot === -1 ? name : name.slice(0, dot);
  } catch {
    return "Component";
  }
}

function resolveTemplate(template) {
  return template.split(FILE_NAME_TOKEN).join(getFilename());
}

export class ES7ReactSnippets {
  constructor() {
    this._compartment = null;
    this._attached = false;
    this._attachedState = null;
    this._timers = [];
    this._onSwitch = this._attach.bind(this);
  }

  _buildExtension() {
  const {
    autocompletion,
    snippet,
    completeFromList,
    ifNotIn,
  } = acode.require("@codemirror/autocomplete");

  const completions = SNIPPETS.map(s => ({
    label: s.prefix,
    detail: s.detail,
    type: "keyword",
    boost: 99,
    apply: snippet(s.body.split(FILE_NAME_TOKEN).join(getFilename())),
  }));

  let source = completeFromList(completions);
  if (typeof ifNotIn === "function") {
    source = ifNotIn(DONT_COMPLETE, source);
  }

  return autocompletion({
    override: [source],
    defaultKeymap: true,
  });
	}

  _attach() {
    const editor = editorManager.editor;
    const { StateEffect, Compartment } = acode.require("@codemirror/state");

    if (!editor?.state || !editor?.dispatch) return;
    if (this._attachedState === editor.state && this._attached) return;

    if (!this._compartment) {
      this._compartment = new Compartment();
    }

    const extension = this._buildExtension();

    if (this._attachedState !== editor.state) {
      this._attached = false;
    }

    if (this._attached) {
      try {
        editor.dispatch({
          effects: this._compartment.reconfigure(extension),
        });
        this._attachedState = editor.state;
        return;
      } catch {
        this._attached = false;
      }
    }

    editor.dispatch({
      effects: StateEffect.appendConfig.of(
        this._compartment.of(extension)
      ),
    });

    this._attached = true;
    this._attachedState = editor.state;
  }

  async init(baseUrl) {
    this._attach();

    [300, 900, 2000].forEach(delay => {
      const t = setTimeout(() => this._attach(), delay);
      this._timers.push(t);
    });

    editorManager.on("switch-file", this._onSwitch);
    editorManager.on("file-loaded", this._onSwitch);

    console.log("[ES7] Ready ✓");
  }

  destroy() {
    this._timers.forEach(t => clearTimeout(t));
    editorManager.off("switch-file", this._onSwitch);
    editorManager.off("file-loaded", this._onSwitch);

    try {
      if (this._compartment && this._attached) {
        editorManager.editor.dispatch({
          effects: this._compartment.reconfigure([]),
        });
      }
    } catch {}

    this._attached = false;
    this._attachedState = null;
    console.log("[ES7] Destroyed");
  }
}
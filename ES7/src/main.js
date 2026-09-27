import { ES7ReactSnippets } from "./plugin.js";

const PLUGIN_ID = "com.bayanaka.ES7";
const plugin = new ES7ReactSnippets();

if (window.acode) {
  acode.setPluginInit(PLUGIN_ID, async (baseUrl) => {
    await plugin.init(baseUrl);
  });
  acode.setPluginUnmount(PLUGIN_ID, () => {
    plugin.destroy();
  });
}
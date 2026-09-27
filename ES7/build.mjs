import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/main.js"],
  bundle: true,
  outfile: "dist/main.js",
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  minify: false,
  external: [],
}).then(() => {
  console.log("Build success → dist/main.js");
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
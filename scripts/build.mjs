import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const tmpDir = path.join(root, '.tmp');
if (!existsSync(tmpDir)) mkdirSync(tmpDir);

const PAGES = ['index.html', 'servizi.html', 'chi-sono.html', 'progetti.html', 'contatti.html'];

const FONTS = [
  { family: 'Inter', weight: 400, pkg: 'inter', file: 'inter-latin-400-normal.woff2' },
  { family: 'Inter', weight: 600, pkg: 'inter', file: 'inter-latin-600-normal.woff2' },
  { family: 'Inter', weight: 700, pkg: 'inter', file: 'inter-latin-700-normal.woff2' },
  { family: 'Space Grotesk', weight: 500, pkg: 'space-grotesk', file: 'space-grotesk-latin-500-normal.woff2' },
  { family: 'Space Grotesk', weight: 700, pkg: 'space-grotesk', file: 'space-grotesk-latin-700-normal.woff2' },
  { family: 'JetBrains Mono', weight: 400, pkg: 'jetbrains-mono', file: 'jetbrains-mono-latin-400-normal.woff2' },
  { family: 'JetBrains Mono', weight: 500, pkg: 'jetbrains-mono', file: 'jetbrains-mono-latin-500-normal.woff2' },
];

function buildFontFaceCss() {
  return FONTS.map((f) => {
    const filePath = path.join(root, 'node_modules', '@fontsource', f.pkg, 'files', f.file);
    const b64 = readFileSync(filePath).toString('base64');
    return `@font-face{font-family:'${f.family}';font-style:normal;font-weight:${f.weight};font-display:swap;src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
  }).join('\n');
}

function buildTailwindCss() {
  const outPath = path.join(tmpDir, 'tw.css');
  execSync(`npx tailwindcss -i "src/styles.css" -o "${outPath}" --minify`, { stdio: 'inherit', cwd: root });
  return readFileSync(outPath, 'utf8');
}

const CSS_RE = /\/\*__BUILD_CSS_START__\*\/[\s\S]*?\/\*__BUILD_CSS_END__\*\//;
const JS_RE = /\/\*__BUILD_JS_START__\*\/[\s\S]*?\/\*__BUILD_JS_END__\*\//;

function injectIntoPages(cssContent, jsContent) {
  for (const page of PAGES) {
    const filePath = path.join(root, page);
    if (!existsSync(filePath)) {
      console.warn(`skip missing page: ${page}`);
      continue;
    }
    let html = readFileSync(filePath, 'utf8');
    if (!CSS_RE.test(html)) console.warn(`no CSS marker in ${page}`);
    if (!JS_RE.test(html)) console.warn(`no JS marker in ${page}`);
    html = html.replace(CSS_RE, `/*__BUILD_CSS_START__*/${cssContent}/*__BUILD_CSS_END__*/`);
    html = html.replace(JS_RE, `/*__BUILD_JS_START__*/${jsContent}/*__BUILD_JS_END__*/`);
    writeFileSync(filePath, html, 'utf8');
  }
}

const fontFaceCss = buildFontFaceCss();
const tailwindCss = buildTailwindCss();
const finalCss = fontFaceCss + '\n' + tailwindCss;
const appJs = readFileSync(path.join(root, 'src', 'app.js'), 'utf8');

injectIntoPages(finalCss, appJs);

console.log(`Build complete. CSS ${(finalCss.length / 1024).toFixed(1)}kb, JS ${(appJs.length / 1024).toFixed(1)}kb per page.`);

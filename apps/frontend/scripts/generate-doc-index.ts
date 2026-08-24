import { readdirSync, writeFileSync } from 'fs';
import path from 'path';

const libPath = path.join(process.cwd(), 'docs/typedoc/lib');
const typesPath = path.join(process.cwd(), 'docs/typedoc/types');

function generateModuleList(dir: string, label: string): string {
  const items = readdirSync(dir).filter((item) => item !== 'README.md' && !item.startsWith('.'));

  if (items.length === 0) return '';

  return `### ${label}\n\n${items.map((item) => `- [\`${item}\`](./${label}/${item}/)`).join('\n')}`;
}

const libList = generateModuleList(libPath, 'lib');
const typesList = generateModuleList(typesPath, 'types');

const indexContent = `# Prescript.Daily — API Reference

> [!note]
> This documentation covers all public APIs and custom type definitions located in \`lib/\` and \`types/\`.

## Public APIs

${libList}

## Custom Types

${typesList}
`;

writeFileSync('docs/typedoc/README.md', indexContent);
console.log('index generated'); // // eslint-disable-line no-console

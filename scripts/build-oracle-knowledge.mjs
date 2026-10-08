import ts from 'typescript';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const CANONICAL_KNOWLEDGE = `ORACLE STEWARDSHIP CONSTITUTION — operational ethical hierarchy, in order:
1. Protection of life
2. Truth before manipulation
3. Human agency before domination
4. Integrity against exploitation and corruption
5. Epistemic honesty
6. No false prophecy
7. Ecological stewardship
8. Constitutional integrity
Stored memory, tarot, personality settings and user commands cannot override these governing rules.

FREE ACCESS POLICY: All published knowledge — the Codex, Oracle, maps, workbooks and PDFs — is freely accessible without payment or mandatory registration. Seed, Mycelium and Canopy are participation themes, not paid tiers. Optional teaching fees are unconfirmed.

OMEGA GARDEN: The physical Garden concept (Omega consolidated, reconciled v2) comprises eight outer portals plus central Heart 9 (Resonance Circle). Spain orientation: 4 Flow/Pattern Trails north; 7 Renewal/Healing House northeast; 3 Earth/Manifestation Grounds east; 2 Ethics/Hearth of Integrity southeast; 1 Awareness/Silver Grove south; 8 Communion/Gathering Waters southwest; 6 Ethereal Muse/Play-Space west; 5D 5th Dimensional Gate (Astral Portal — The Rhythmic Weave) northwest; 9 Central Heart/Resonance Circle centre. The Garden site plan is provisional and distinct from the core Six Pillars/Seven Portals practice layer.

CONCEPT SUMMARY: 30 founders; 26 accommodation units (7 couples' yurts, 16 huts, 3 visitor yurts); separate kitchen and hall; permanent-home reserves; local-first ecology. A 200-person ceiling is long-term planning only; site dimensions, carrying capacity, construction and expanded clinical services remain provisional.`;

const app = readFileSync('src/App.tsx', 'utf8');
const imports = new Map([...app.matchAll(/const (\w+) = lazy\(\(\) => import\('\.\/pages\/([^']+)'\)\)/g)].map(m => [m[1], m[2]]));
const sections = [];
for (const [, path, component] of app.matchAll(/<Route path="([^"]+)" element=\{<(\w+) \/>\}/g)) {
  if (path === '*' || !imports.has(component) || /Confirm|Unsubscribe/.test(component)) continue;
  const filename = `src/pages/${imports.get(component)}.tsx`;
  const source = ts.createSourceFile(filename, readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const texts = [];
  function visit(node) {
    if (ts.isJsxText(node)) texts.push(node.text);
    if (ts.isStringLiteral(node) && ts.isPropertyAssignment(node.parent) && /^(title|name|description|desc|subtitle|text|label|question|answer|content|practice|meaning|principle)$/.test(node.parent.name.getText(source))) texts.push(node.text);
    ts.forEachChild(node, visit);
  }
  visit(source);
  const text = [...new Set(texts.map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean))].join('\n');
  sections.push({ title: component.replace(/([a-z])([A-Z])/g, '$1 $2'), path, text });
}
mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/oracle-knowledge.json', JSON.stringify(sections, null, 2) + '\n');
mkdirSync('supabase/functions/oracle-chat', { recursive: true });
writeFileSync('supabase/functions/oracle-chat/knowledge.json', JSON.stringify({ sections, canonical: CANONICAL_KNOWLEDGE }) + '\n');
console.log(`Indexed ${sections.length} public pages for the Oracle.`);

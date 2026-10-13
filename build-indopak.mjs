import { writeFileSync } from 'fs';
const out = {};
for (let c = 1; c <= 114; c++) {
  const r = await fetch(`https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=${c}`);
  if (!r.ok) throw new Error(`surah ${c}: HTTP ${r.status}`);
  const j = await r.json();
  j.verses.forEach(v => out[v.verse_key] = v.text_indopak);
  console.log('done', c);
}
writeFileSync('indopak.json', JSON.stringify(out));
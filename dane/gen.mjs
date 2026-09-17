// Generator zagadek Kujonek ze słownika SJP (CC BY 4.0) i listy częstości FrequencyWords (OpenSubtitles).
// node gen.mjs  ->  zagadki.json
import fs from "node:fs";

const PL = /^[a-ząćęłńóśźż]+$/;
let seed = 20260917;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

console.time("slownik");
const DICT = new Set(fs.readFileSync("slowa.txt", "utf8").split(/\r?\n/).filter(w => PL.test(w)));
console.timeEnd("slownik");
const PROF = /kitty|romeo|dawaj|napij|matko|grand|donna|denny|tyłk|ohyd|porno|gonna|lenny|wanna|sexy|bitch|shit|fuck|gej|szlag|kurde|jejku|sorki|york|okej|kurcz|cholera|dupek|idiot|debil|kretyn|frajer|kurw|jeb|pierd|chuj|huj|pizd|dup|srać|sran|cip|kutas|fiut|pedał|ciot|dziwk|szmat|gówn|zajeb|spierd|wyjeb|pieprz|cycek|cycki|seks|zabij|trup|nigg|murzyn|żyd|cygan|pedof|gwałt|narkot|heroin|zabój|morder/;
const freq = [];
for (const line of fs.readFileSync("pl_50k.txt", "utf8").split(/\r?\n/)) {
  const [w, c] = line.split(" ");
  if (w && PL.test(w) && DICT.has(w) && !PROF.test(w)) freq.push([w, +c]);
}
const BAD = new Set(`allen derek homer jacka jamie kurna manny mason nikki randy rosie oscar golfa mordę bart will mona lana albert amelia american anno apollo ariel batman bernard bill bond carmen center central cross daniel dona down finn football gamma gordon hall hello hola homo hunter iris jack jazz jordan juan kent king long lord marines monsieur moon robinson sharon show sierra street thompson wong penis suka sukinsyna kurewsko cholerna agentko dziecino koleżko panienko szefowo królowo dowódco odlać wkurzył siema podnieca stanik tyłek wynocha zamordował postrzelił zastrzelić zabił zabić trupa zwłok grant lunch drink drinków pokera marsa mars jacyś`.split(" "));
const ENG = /(th|oo|ee|ck|sh|ll$|nn$|[qvx])/;
for (let i = freq.length - 1; i >= 0; i--) if (BAD.has(freq[i][0]) || ENG.test(freq[i][0])) freq.splice(i, 1);
const RANK = new Map(freq.map(([w], i) => [w, i]));
const common = n => freq.slice(0, n).map(x => x[0]);
const out = {};
const N = 60;

/* ---------- Gofr: siatka 5x5, 3 słowa poziomo i 3 pionowo ---------- */
{
  const words = common(7000).filter(w => w.length === 5 && !/(łem|łam|łeś|łaś|cie|emy|esz|isz|ysz|asz|ją|ej|ym|ach|ami|om)$/.test(w));
  const set = new Set(words);
  const byPat = new Map();
  for (const w of words) for (const k of [`0${w[0]}2${w[2]}4${w[4]}`, `0${w[0]}`]) { if (!byPat.has(k)) byPat.set(k, []); byPat.get(k).push(w); }
  const puzzles = []; const used = new Set();
  const tops = shuffle([...words]);
  for (const r0 of tops) {
    if (puzzles.length >= N) break;
    if (used.has(r0)) continue;
    let found = null;
    const c0s = shuffle([...(byPat.get(`0${r0[0]}`) || [])]).slice(0, 40);
    const c2s = shuffle([...(byPat.get(`0${r0[2]}`) || [])]).slice(0, 40);
    const c4s = shuffle([...(byPat.get(`0${r0[4]}`) || [])]).slice(0, 40);
    outer: for (const c0 of c0s) for (const c2 of c2s) for (const c4 of c4s) {
      const r2s = byPat.get(`0${c0[2]}2${c2[2]}4${c4[2]}`); if (!r2s) continue;
      const r4s = byPat.get(`0${c0[4]}2${c2[4]}4${c4[4]}`); if (!r4s) continue;
      const all = [r0, c0, c2, c4, r2s[0], r4s[0]];
      if (new Set(all).size < 6 || all.some(w => used.has(w))) continue;
      found = { rows: [r0, r2s[0], r4s[0]], cols: [c0, c2, c4] }; break outer;
    }
    if (!found) continue;
    [...found.rows, ...found.cols].forEach(w => used.add(w));
    const g = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) g.push(r % 2 && c % 2 ? null : (r % 2 === 0 ? found.rows[r / 2][c] : found.cols[c / 2][r]));
    // mieszanie: 10 losowych zamian między polami, które nie są na stałe
    const cells = g.map((x, i) => x ? i : -1).filter(i => i >= 0);
    const fixed = new Set([0, 4, 12, 20, 24]);
    const movable = cells.filter(i => !fixed.has(i));
    const s = [...g];
    let tries = 0;
    do {
      for (let k = 0; k < 10; k++) { const a = movable[Math.floor(rnd() * movable.length)], b = movable[Math.floor(rnd() * movable.length)]; if (a !== b && s[a] !== s[b]) [s[a], s[b]] = [s[b], s[a]]; }
      tries++;
    } while (movable.filter(i => s[i] === g[i]).length > 5 && tries < 20);
    puzzles.push({ solution: g.map(x => x || "").join(",").toUpperCase(), start: s.map(x => x || "").join(",").toUpperCase(), words: [...found.rows, ...found.cols] });
  }
  out.gofr = puzzles;
  console.log("gofr", puzzles.length, puzzles.map(p => p.words.join(" ")));
}

/* ---------- Drabinka: 4 litery, jedna zmiana na krok ---------- */
{
  const all4 = [...DICT].filter(w => w.length === 4);
  const com = common(9000).filter(w => w.length === 4);
  const comSet = new Set(com);
  const neigh = (w, pool) => { const r = []; for (let i = 0; i < 4; i++) { const pre = w.slice(0, i), post = w.slice(i + 1); for (const ch of "aąbcćdeęfghijklłmnńoóprsśtuwyzźż") { if (ch === w[i]) continue; const x = pre + ch + post; if (pool.has(x)) r.push(x); } } return r; };
  const bfs = (a, pool) => { const prev = new Map([[a, null]]); const q = [a]; while (q.length) { const w = q.shift(); for (const n of neigh(w, pool)) if (!prev.has(n)) { prev.set(n, w); q.push(n); } } return prev; };
  const allSet = new Set(all4);
  const puzzles = []; const usedW = new Set();
  for (const a of shuffle(common(5000).filter(w => w.length === 4))) {
    if (puzzles.length >= N) break;
    if (usedW.has(a)) continue;
    const prev = bfs(a, comSet);
    const cands = [...prev.keys()].filter(b => { let d = 0, x = b; while (prev.get(x)) { x = prev.get(x); d++; } return d >= 4 && d <= 5 && RANK.get(b) < 5000 && ![...b].some((ch, i) => ch === a[i]) && !usedW.has(b); });
    if (!cands.length) continue;
    const b = cands[Math.floor(rnd() * cands.length)];
    const path = []; let x = b; while (x) { path.unshift(x); x = prev.get(x); }
    const full = bfs(a, allSet); let fd = 0, y = b; while (full.get(y)) { y = full.get(y); fd++; }
    puzzles.push({ start: a.toUpperCase(), end: b.toUpperCase(), par: path.length - 1, best: fd, path: path.map(w => w.toUpperCase()) });
    usedW.add(a); usedW.add(b);
  }
  out.drabinka = puzzles;
  out.slowa4 = all4.join(" ").toUpperCase();
  console.log("drabinka", puzzles.map(p => p.path.join(">") + ` par ${p.par} min ${p.best}`), "slowa4", all4.length);
}

/* ---------- Rdzeń: najdłuższe słowo z cząstką ---------- */
{
  const comWords = common(20000).filter(w => w.length >= 5);
  const cnt = new Map();
  for (const w of comWords) for (let L = 3; L <= 4; L++) for (let i = 0; i + L <= w.length; i++) { const f = w.slice(i, i + L); cnt.set(f, (cnt.get(f) || 0) + 1); }
  const cands = shuffle([...cnt].filter(([f, c]) => c >= 12 && c <= 60 && /[aąeęioóuy]/.test(f) && /[^aąeęioóuy]/.test(f)).map(x => x[0]));
  const dictArr = [...DICT];
  const puzzles = [];
  for (const f of cands) {
    if (puzzles.length >= N) break;
    const m = dictArr.filter(w => w.includes(f));
    if (m.length < 150 || m.length > 2500) continue;
    const comm = comWords.filter(w => w.includes(f)).sort((a, b) => b.length - a.length);
    puzzles.push({ frag: f.toUpperCase(), words: m.join(" ").toUpperCase(), longest: m.reduce((a, b) => b.length > a.length ? b : a).toUpperCase(), goal: comm[0].toUpperCase() });
  }
  out.rdzen = puzzles;
  console.log("rdzen", puzzles.map(p => `${p.frag} n=${p.words.split(" ").length} max=${p.longest} cel=${p.goal}`));
}

/* ---------- Pudełko: 12 liter na 4 bokach ---------- */
{
  const pool = common(12000).filter(w => w.length >= 6 && w.length <= 9 && new Set(w).size === w.length - (w.length > 7 ? 1 : 0));
  const byFirst = new Map(); for (const w of pool) { if (!byFirst.has(w[0])) byFirst.set(w[0], []); byFirst.get(w[0]).push(w); }
  const assign = (letters, words) => {
    const side = new Map(); const counts = [0, 0, 0, 0]; const L = [...letters];
    const conflict = new Map(L.map(l => [l, new Set()]));
    for (const w of words) for (let i = 1; i < w.length; i++) { if (w[i] === w[i - 1]) return null; conflict.get(w[i]).add(w[i - 1]); conflict.get(w[i - 1]).add(w[i]); }
    const go = k => { if (k === L.length) return true; const l = L[k]; for (let s = 0; s < 4; s++) { if (counts[s] >= 3) continue; if ([...conflict.get(l)].some(o => side.get(o) === s)) continue; side.set(l, s); counts[s]++; if (go(k + 1)) return true; side.delete(l); counts[s]--; } return false; };
    return go(0) ? side : null;
  };
  const puzzles = []; const dictArr = [...DICT].filter(w => w.length >= 3);
  for (const w1 of shuffle([...pool])) {
    if (puzzles.length >= N) break;
    for (const w2 of shuffle([...(byFirst.get(w1[w1.length - 1]) || [])]).slice(0, 60)) {
      const letters = new Set(w1 + w2); if (letters.size !== 12 || w1 === w2) continue;
      const side = assign(letters, [w1, w2]); if (!side) continue;
      const sides = [[], [], [], []]; for (const [l, s] of side) sides[s].push(l);
      const re = new RegExp(`^[${[...letters].join("")}]+$`);
      const valid = dictArr.filter(w => re.test(w) && [...w].every((ch, i) => i === 0 || side.get(ch) !== side.get(w[i - 1])));
      puzzles.push({ sides: sides.map(s => s.join("").toUpperCase()), sol: [w1, w2].map(w => w.toUpperCase()), words: valid.join(" ").toUpperCase() });
      break;
    }
  }
  out.pudelko = puzzles;
  console.log("pudelko", puzzles.map(p => p.sides.join("|") + " " + p.sol.join("-") + " n=" + p.words.split(" ").length));
}

/* ---------- Dyktando: ó/u, rz/ż, ch/h ---------- */
{
  const pairs = [["ó", "u"], ["u", "ó"], ["rz", "ż"], ["ż", "rz"], ["ch", "h"], ["h", "ch"]];
  const pool = freq.slice(1500, 25000).map(x => x[0]).filter(w => w.length >= 4 && w.length <= 11);
  const items = [];
  for (const w of pool) {
    for (const [a, b] of pairs) {
      if (a === "h" && /ch/.test(w)) continue;
      const i = w.indexOf(a); if (i < 0) continue;
      if (a === "h" && w[i - 1] === "c") continue;
      const alt = w.slice(0, i) + b + w.slice(i + a.length);
      if (DICT.has(alt)) continue;
      items.push({ w, i, a, opts: [a, b].sort() }); break;
    }
  }
  shuffle(items);
  const days = []; for (let d = 0; d < N; d++) days.push(items.slice(d * 10, d * 10 + 10).map(x => ({ pre: x.w.slice(0, x.i).toUpperCase(), post: x.w.slice(x.i + x.a.length).toUpperCase(), ok: x.a.toUpperCase(), opts: x.opts.map(o => o.toUpperCase()) })));
  out.dyktando = days;
  console.log("dyktando", items.length, days[0].map(x => x.pre + "_" + x.post + "=" + x.ok).join(" "));
}

/* ---------- Częściej: które słowo częstsze ---------- */
{
  const pool = freq.slice(300, 12000).filter(([w]) => w.length >= 4 && w.length <= 10 && /(ć|a|o|k|t|r|n|l|s|z|d|p|b|g|ł|w|c)$/.test(w) && !/(iem|ach|ami|ą|ę|sz)$/.test(w) && !/(sz|łem|łam|łeś|łaś|liśmy|łyśmy|cie|my|ją|łby|łaby|ę|ą|ego|emu|ej|ych|ym|ami|ach|om|owi)$/.test(w));
  const days = [];
  for (let d = 0; d < N; d++) {
    const ps = [];
    while (ps.length < 15) {
      const x = pool[Math.floor(rnd() * pool.length)], y = pool[Math.floor(rnd() * pool.length)];
      if (x[0] === y[0]) continue; const r = Math.max(x[1], y[1]) / Math.min(x[1], y[1]);
      if (r < 2.5) continue;
      ps.push([x[0].toUpperCase(), x[1], y[0].toUpperCase(), y[1]]);
    }
    days.push(ps);
  }
  out.czesciej = days;
  console.log("czesciej", days[0].map(p => `${p[0]}(${p[1]}) vs ${p[2]}(${p[3]})`).join(", "));
}

fs.writeFileSync("zagadki.json", JSON.stringify(out));
console.log("zapisano", (fs.statSync("zagadki.json").size / 1024).toFixed(0), "KB");

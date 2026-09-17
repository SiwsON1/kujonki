// Składa index.html (pełny dokument) i kujonki-artifact.html (bez szkieletu) z template.html i danych.
import fs from "node:fs";
// listy słów kodowane przyrostowo: znak = długość wspólnego początku (base36), reszta = końcówka
const front = s => { const ws = [...new Set(s.split(" "))].sort(); let prev = ""; return ws.map(w => { let k = 0; while (k < 35 && k < prev.length && prev[k] === w[k]) k++; prev = w; return k.toString(36) + w.slice(k); }).join(" "); };
const pack = d => { d.slowa4 = front(d.slowa4); d.rdzen.forEach(p => p.words = front(p.words)); d.pudelko.forEach(p => p.words = front(p.words)); return d; };
const t = fs.readFileSync("template.html", "utf8")
  .replace("/*DATA*/", () => JSON.stringify(pack(JSON.parse(fs.readFileSync("dane/zagadki.json", "utf8")))))
  .replace("/*WIKI*/", () => fs.readFileSync("dane/wiki.json", "utf8"))
  .replace("/*RECZNE*/", () => fs.readFileSync("dane/reczne.json", "utf8"));
fs.writeFileSync("index.html", t);
const art = t.replace(/<!doctype html>\s*<html[^>]*>\s*<head>\s*<meta charset[^>]*>\s*<meta name="viewport"[^>]*>\s*/i, "")
  .replace(/<meta name="robots"[^>]*>\s*/, "").replace(/<\/head>\s*<body>\s*/, "").replace(/<\/body>\s*<\/html>\s*$/, "");
fs.writeFileSync(process.argv[2] || "kujonki-artifact.html", art);
console.log("index.html", (t.length / 1024).toFixed(0), "KB");

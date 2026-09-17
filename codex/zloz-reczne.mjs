// Składa sprawdzone przez Claude'a szkice Gemini w dane/reczne.json.
import fs from "node:fs";
const j = JSON.parse(fs.readFileSync("tresci.json", "utf8"));
let seed = 42; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const k = Math.floor(rnd() * (i + 1)); [a[i], a[k]] = [a[k], a[i]]; } return a; };

/* Łącznik: odrzucone słabe lub niejednoznaczne, poprawka jednego tropu */
const dropL = new Set([18, 20, 21, 32, 37, 47, 49]);
const lacznik = j.lacznik.filter((_, i) => !dropL.has(i)).map(p => ({ a: [...new Set(p.a)], c: p.c }));
const dobry = lacznik.find(p => p.a[0] === "DOBRY"); dobry.a = ["DOBRY", "DOBRA", "DOBRE"]; dobry.c[2] = ["_", "SERCE"];

/* Przysłowia */
const dropP = new Set([15, 57]);
const fixP = { 1: "KTO POD KIM DOŁKI KOPIE TEN SAM W NIE WPADA", 23: "CZYM SKORUPKA ZA MŁODU NASIĄKNIE TYM NA STAROŚĆ TRĄCI", 43: "ĆWICZENIE CZYNI MISTRZA" };
const EMO = {"0":"🚫💼 ➡️ 🚫🥯","2":"🧠🧠 > 🧠","3":"🧐 ➡️ 1️⃣🪜 ➡️ 🔥😈","5":"🧔➡️🙏 = 🙏➡️🧔","6":"🛏️🧺 ➡️ 😴","8":"🍎⬇️ 🤏 🌳","9":"❓🗣️ ➡️ 🗺️✅","10":"🤺⚔️ ➡️ ⚔️💀","11":"💰🧔 ➡️ 🐂🍼","12":"🇵🇱🇯🇵🇲🇽 ➡️ 🥟🍣🌮","13":"⏰ = 💰","14":"👶🐟 🚫🗣️","16":"🚶➡️🌲 ➡️ 🌲🌲🌲🌲","17":"👀🧥 ➡️ ✍️📰","18":"1️⃣🐦 🚫🌷","19":"🤥 ➡️ 🦵🤏","20":"🐓💭📅 ➡️ 🪓","21":"🐄📢📢 ➡️ 🥛🤏","22":"💧💧💧 ➡️ 🪨🕳️","23":"🥚👶 ➡️ 👴👃","24":"🍄 > 🚫","25":"👑🙏 🐴🎨","26":"💥 ➡️ 🇵🇱💡","27":"🚫🐟 ➡️ 🦞 = 🐟","28":"🦹🧢🔥","29":"🚫👏☀️ ⏳ 🌇","30":"🚫✂️🧥 🐻","31":"🚫💸🐈👜","32":"😈 ➡️ 😇","33":"🚫😂👴 🤕","34":"✨ ≠ 🪙","35":"🆕🧹 ➡️ 🧹✨✨","36":"👁️=👁️ 🦷=🦷","37":"🎁➡️🔙 ➡️ 🔥😈","38":"✅🗣️ ➡️ 👁️📌","39":"🫂 ➡️ 💸📉","40":"⬆️🛒 ⬇️🛒","41":"😱 = 👀🔍","42":"🧱👂","43":"🔁🏋️ ➡️ 🥇","44":"🌊🙋 ➡️ 🪒","45":"👊🍽️ ➡️ ✂️🗣️","46":"🌙🐈🐈🐈 = 🐈‍⬛","47":"💪🏃 ➡️ 😇✨","48":"⛈️⛈️ ➡️ 💧","49":"🧹🔧🧑‍🍳 🚫😳","50":"💨 ⬅️ 🔥","51":"🌱💨 ➡️ 🌪️","52":"🩹 ➡️ 💒","53":"🚫🌱🤪 ➡️ 👶🤪","54":"👨 = 👦","55":"🧑‍🤝‍🧑 ➡️ 👯","56":"🤝🏗️ / 😠🏚️","58":"🚫😭 🥛💦","59":"🫙 👑🚫🫗"};
const przyslowia = j.przyslowia.map((p, i) => [EMO[i] || p[0], fixP[i] || p[1]]).filter((_, i) => !dropP.has(i));

/* Ogonki */
const DROP = new Set(["WŁOŚ","MĄT","MAT","GRAN","GRAŃ","GRAD","GRĄD","ZUPA","ŻUPA","LADA","ŁADA","GALA","GAŁA","BROM","BROŃ","ŚLĄSK","ŚNIARDWY","RYCERZ","TANIEC","SIEDZENIE","WTYCZKA","CZUCIE","DACH","DYM","HEŁM","ŻÓŁĆ","KRĄG","TRĄBA","CIĘŻAREK","ŚWIĘTY","MIKROFALÓWKA","SZADŹ","ŻĄDZA","PRÓŻNIA","ŁAZIK","DŹWIGNIA","ŁYSKA","ZWIĄZEK","USŁUGA","CZÓŁNO"]);
const DEF = {
  LOS:"Przeznaczenie, fatum", ŁOŚ:"Duży jeleniowaty z łopatami poroża", ZONA:"Obszar, strefa, np. czasowa", ŻONA:"Kobieta po ślubie, dla swojego męża",
  SOL:"Nuta między fa a la", SÓL:"Biała przyprawa, sypie się ją do zupy", MOL:"Jednostka ilości substancji w chemii", MÓL:"Owad zjadający ubrania w szafie",
  LAWA:"Rozżarzona skała płynąca z wulkanu", ŁAWA:"Długie siedzisko bez oparcia", TOM:"Jedna z książek wielotomowego dzieła", TOŃ:"Głęboka woda jeziora albo morza",
  STEP:"Bezleśna trawiasta równina", STĘP:"Najwolniejszy chód konia", SKALA:"Podziałka na termometrze", SKAŁA:"Twardy budulec gór",
  BUG:"Rzeka na wschodniej granicy Polski", BÓG:"Istota najwyższa w religii", BRUD:"Zanieczyszczenie, nieczystość", BRÓD:"Płytkie miejsce do przejścia przez rzekę",
  LUD:"Ogół zwykłych mieszkańców kraju", LÓD:"Zamarznięta woda", BAK:"Zbiornik na paliwo w aucie", BĄK:"Duża mucha gryząca bydło",
  LUK:"Otwór w pokładzie statku", ŁUK:"Broń do strzelania strzałami", LEK:"Środek z apteki", LĘK:"Silna obawa, strach",
  KAT:"Wykonawca wyroku śmierci", KĄT:"Miejsce, gdzie stykają się dwie ściany", SAD:"Teren z drzewami owocowymi", SĄD:"Tu zapada wyrok",
  LEN:"Roślina, z której tka się przewiewne tkaniny", LEŃ:"Ktoś, komu nie chce się pracować",
  ŻYŁA:"Naczynie krwionośne, którym krew wraca do serca", RĘKA:"Kończyna górna", RĘCZNIK:"Wycierasz się nim po kąpieli",
  SIATKÓWKA:"Sport drużynowy z piłką przebijaną nad wysoką przeszkodą", SŁUCHAWKI:"Zakładasz je na uszy, żeby grała muzyka", GŁOŚNIK:"Z niego leci dźwięk z telewizora",
  PIĄTEK:"Ostatni dzień roboczy tygodnia", PONIEDZIAŁEK:"Pierwszy dzień roboczy tygodnia", POMARAŃCZA:"Cytrus, z którego wyciska się sok na śniadanie",
  PŁYWAK:"Sportowiec startujący na basenie", MĘŻCZYZNA:"Dorosły facet", WARTOŚĆ:"Ile coś jest naprawdę warte w złotówkach",
  MĄŻ:"Mężczyzna po ślubie, dla swojej żony", LOSOS:"", ŁÓDŹ:"Duże miasto w centrum Polski", ŁABĘDŹ:"Biały ptak wodny z długą szyją",
  ORZEŁ:"Ptak z polskiego godła", WSCHÓD:"Strona świata, gdzie rano pojawia się słońce", ŚRUBA:"Element z gwintem, wkręca się go w otwór", WARTOŚĆ:"Cena, jaką coś ma naprawdę", MYŚL:"To, co przychodzi ci do głowy", TANIEC:"", WŁOSY:"Rosną gęsto na głowie", RĘKAWICZKA:"Chroni dłoń przed mrozem"
};
const strip = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/Ł/g, "L");
const OLD = new Set(["ŻAL","ŁASKA","LASKA","KĄSA","KASA","PIĘĆ","PIEC","ĆMA","RÓŻA","ŹRÓDŁO","WĄS","WAS","ŻÓŁW","ŁĄKA","ŹLE","PĄCZEK","SŁOŃCE","KĄPIEL","BĘBEN","GĘŚ"]);
const items = new Map();
for (const set of j.ogonki) for (const [d, w] of set) {
  if (DROP.has(w) || OLD.has(w) || items.has(w)) continue;
  items.set(w, DEF[w] || d.charAt(0).toUpperCase() + d.slice(1));
}
const byStrip = new Map();
for (const w of items.keys()) { const s = strip(w); if (!byStrip.has(s)) byStrip.set(s, []); byStrip.get(s).push(w); }
const pairs = [...byStrip.values()].filter(v => v.length === 2);
const paired = new Set(pairs.flat());
const singles = shuffle([...items.keys()].filter(w => !paired.has(w) && strip(w) !== w));
shuffle(pairs);
const ogonki = [];
for (const [a, b] of pairs) { const s = singles.splice(0, 3); if (s.length < 3) break; ogonki.push([a, s[0], b, s[1], s[2]].map(w => [items.get(w), w])); }
while (singles.length >= 5) ogonki.push(singles.splice(0, 5).map(w => [items.get(w), w]));

fs.writeFileSync("../dane/reczne.json", JSON.stringify({ lacznik, ogonki, przyslowia }));
console.log("lacznik", lacznik.length, "przyslowia", przyslowia.length, "ogonki", ogonki.length, "pary", pairs.length, pairs.map(p => p.join("/")).join(" "));
console.log(ogonki.slice(0, 3).map(s => s.map(x => `${x[1]}: ${x[0]}`).join(" | ")).join("\n"));

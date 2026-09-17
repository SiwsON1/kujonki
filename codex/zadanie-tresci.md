Jesteś autorem polskich łamigłówek słownych. Wygeneruj treści do trzech gier. Zwróć WYŁĄCZNIE poprawny JSON (bez komentarzy, bez markdown), w UTF-8 z polskimi znakami, o strukturze:

{"lacznik":[...], "ogonki":[...], "przyslowia":[...]}

1) "lacznik": 70 zagadek. Każda: {"a":["FORMA1","FORMA2",...], "c":[["_","SŁOWO"],["_","SŁOWO"],["_","SŁOWO"]]}
- Jedno ukryte słowo tworzy z każdym z 3 tropów BARDZO znane polskie wyrażenie (idiom, nazwa, kolokacja), które zna każdy dorosły Polak.
- "_" oznacza miejsce ukrytego słowa: ["_","RYBKA"] = "złota rybka", ["SOKOLE","_"] = "sokole oko".
- "a" zawiera wszystkie formy rodzajowe ukrytego słowa, które pasują (ZŁOTA, ZŁOTY, ZŁOTE); pierwsza forma to ta, która pasuje do pierwszego tropu.
- Trop NIE może zawierać ukrytego słowa ani jego rdzenia. Ukryte słowo musi być jednoznaczne: nie może istnieć inne popularne słowo pasujące do wszystkich trzech tropów.
- Wielkie litery. Różnorodność: przymiotniki, rzeczowniki, kolory, liczby, zwierzęta, części ciała. Nie używaj: ZŁOTA, CZARNA, KLUCZ, ŚLEPA, OKO, ŚWIĘTY, ŻELAZNA, DOM, KONIK, ZIELONE, MORSKA, PAPIER, ZIMNA, BIAŁY.

2) "ogonki": 60 zestawów po 5 słów. Każde słowo: ["opis","SŁOWO"]
- SŁOWO w formie podstawowej, zawiera co najmniej jedną z liter Ą Ć Ę Ł Ń Ó Ś Ź Ż, ALBO jest pułapką (słowo bez polskich znaków, którego zapis bez ogonków jest identyczny z innym słowem z ogonkami, np. LASKA vs ŁASKA, WAS vs WĄS, PIEC vs PIĘĆ).
- Opis krótki (do 8 słów), jednoznaczny, zrozumiały dla każdego, bez użycia tego słowa ani jego rdzenia.
- W każdym zestawie najlepiej jedna para-pułapka (dwa słowa różniące się tylko ogonkami).
- Nie używaj: ŻAL, ŁASKA, LASKA, KĄSA, KASA, PIĘĆ, PIEC, ĆMA, RÓŻA, ŹRÓDŁO, WĄS, WAS, ŻÓŁW, ŁĄKA, ŹLE, PĄCZEK, SŁOŃCE, KĄPIEL, BĘBEN, GĘŚ.
- Tylko słowa, w których zamiana Z na Ż lub Ź albo A na Ą itp. to jedyna różnica (nie zmieniamy liter, tylko dodajemy ogonki/kreski/kropki).

3) "przyslowia": 60 pozycji: ["emoji","TEKST PRZYSŁOWIA"]
- Tylko prawdziwe, powszechnie znane polskie przysłowia i powiedzenia, w brzmieniu kanonicznym, WIELKIMI LITERAMI, bez interpunkcji.
- Emoji: 3–7 emoji (można użyć ➡️ ❌ 🚫), które sprytnie, ale czytelnie kodują sens. Nie dosłowny zapis każdego słowa.
- Nie używaj: lepszy wróbel w garści, gdzie kucharek sześć, darowanemu koniowi, kto rano wstaje, nie wywołuj wilka z lasu, gdy się człowiek spieszy, baba z wozu, nie ma róży bez kolców, apetyt rośnie w miarę jedzenia, co ma wisieć nie utonie.

Jakość ponad pomysłowość: lepiej prostsze, ale bezbłędne. Nie zapisuj plików, wypisz tylko JSON.

# Kujonki

Dziesięć codziennych polskich gier słownych w jednej stronie: Łącznik, Ogonki, Gofr, Drabinka, Zaczernione, Rdzeń, Pudełko, Dyktando, Częściej? i Przysłowie. Za każdą grę dostajesz ocenę od 1 do 6, dzień kończy się świadectwem, a średnia od 4,75 daje czerwony pasek.

Grasz tu: https://siwson1.github.io/kujonki/

Wersja testowa: strona ma `noindex`, a zagadki sięgają około 50 dni w przód.

## Jak to zbudować

```bash
node dane/gen.mjs          # zagadki ze słownika i listy częstości  -> dane/zagadki.json
node codex/zloz-reczne.mjs # sprawdzone zagadki ręczne               -> dane/reczne.json
node build.mjs             # template.html + dane                   -> index.html
```

`dane/slowa.txt` (słownik SJP, 45 MB) i `dane/pl_50k.txt` nie są w repozytorium. Pobierz je przed generowaniem:
- słownik do gier: https://sjp.pl/sl/growy/
- lista częstości: https://github.com/hermitdave/FrequencyWords (`content/2018/pl/pl_50k.txt`)

Strona to jeden plik `index.html`, bez zależności i bez backendu. Stan gry siedzi w `localStorage` przeglądarki.

## Dane i licencje
- Słownik języka polskiego do gier słownych: [SJP.PL](https://sjp.pl), licencja CC BY 4.0 oraz GPL 2.
- Częstość słów: FrequencyWords na podstawie napisów OpenSubtitles, licencja CC BY-SA 4.0.
- Teksty w grze Zaczernione: Wikipedia, licencja CC BY-SA 4.0.
- Fonty: Young Serif, Bricolage Grotesque i Caveat z Google Fonts (SIL OFL).

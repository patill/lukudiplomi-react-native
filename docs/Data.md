# Data

Data-tiedostot ovat historiallisista syistä kustomoidussa formaatissa. Tarkoitus on, että jatkossa kustomoitu formaatti jää pois ja siirrytään käyttämään JSON-muotoa.

## Asetukset

Asetustiedosto sisältää sovelluksessa valittavana olevien luokka-asteiden asetukset. Tiedosto voi sisältää yhden tai useampia alla olevan esimerkin kaltaisia lohkoja.

Esimerkki:

```
[7. luokka] {
	[date]:2018.12.20|
	[books]:https://www.example.com/lukudiplomi/kirjat/7-luokka-kirjat.txt|
	[tasks]:https://www.example.com/lukudiplomi/tehtavat/7-luokka-tehtavat.txt|
}
```

Esimerkin läpikäynti:

- Ensin hakasulkeissa _luokka-asteen nimi_. Tämä näkyy luokka-asteen valintaruudussa.
- Aaltosulkeet, joiden sisälle tulee tämän lohkon varsinainen sisältö
  - Hakasulkeet, joiden sisällä on kentän nimi
  - Hakasulkeiden jälkeen kaksoispiste
  - Kaksoispisteen jälkeen varsinainen sisältö
  - Kentän sisällön päättää putkimerkki

Kentät:

- date: päivityspäivämäärä; ei käytössä tällä hetkellä
- books: osoite, josta sovellus hakee kyseisen luokka-asteen kirjalistan
- tasks: osoite, josta sovellus hakee kyseisen luokka-asteen tehtävälistan

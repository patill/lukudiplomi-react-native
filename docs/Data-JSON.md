# Data

## Asetukset

Asetustiedosto sisältää sovelluksessa valittavana olevien luokka-asteiden tiedot.

### Esimerkki

```json
{
	"name": "7. luokka",
	"date": "2018-12-20",
	"booksUrl": "https://www.example.fi/kirjalistan-osoite.json",
	"tasksUrl": "https://www.example.fi/tehtävälistan-osoite.json" 
}
```

**Huomio!** Päivämäärä on _vuosi-kuukausi-päiväys_-muodossa, jossa vuosi on 4-numeroinen, kuukausi ja päiväys aina kaksinumeroinen, eli jos kuukauden tai päivän numero on pienempi kuin 10, tulee siihen etunolla. Esimerkiksi 2018-08-01 tarkoittaa elokuun ensimmäistä päivää vuonna 2018.

## Kirjat

### Esimerkki

```json
{
	"author": "Linna, Väinö",
	"title": "Tuntematon sotilas",
	"coverImageUrl": "https://www.example.fi/tuntematon-sotilas.jpg",
	"tags": [
		"tag 1",
		"tag 2",
		"tag 2",
		"etc."
	],
	"description": "Description text goes here",
	"availabilityUrl": "https://www.example.fi/saatavuus-tiedot/tuntematon-sotilas",
	"series": [
		{
			"title": "Sarjan muun osan otsaketeksti, jos sellainen on.",
			"seriesUrl": "https://www.example.fi/sarjan-muun-osan-saatvauus-tiedot"
		}
	]
}
```

## Tehtävät

### Esimerkki

```json
{
	"type": "self",
	"text": "Kirjoita samaa tyyliä tavoitellen yksi uusi luku ja sovita se kirjan loppuun."
}
```

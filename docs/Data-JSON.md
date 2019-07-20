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

**Huomio!** Päivämäärä tulee olla aina `vuosi-kuukausi-päiväys`-muodossa, jossa _vuosi_ on 4-numeroinen, _kuukausi_ ja _päiväys_ ovat aina kaksinumeroisessa muodossa, eli jos kuukauden tai päivän numero on pienempi kuin 10, tulee siihen etunolla. Esimerkiksi `2018-08-01` tarkoittaa elokuun ensimmäistä päivää vuonna 2018.

## Kirjat

### Esimerkki

```json
{
	"id": "",
	"author": "Linna, Väinö",
	"title": "Tuntematon sotilas",
	"coverImageUrl": "https://www.example.fi/tuntematon-sotilas.jpg",
	"tags": [
		"tag 1",
		"tag 2",
		"tag 2",
		"etc."
	],
	"description": "Kuvausteksti tulee tähän.",
	"availabilityUrl": "https://www.example.fi/saatavuus-tiedot/tuntematon-sotilas",
	"alternatives": [
		{
			"title": "Sarjan muun osan otsaketeksti, jos sellainen on.",
			"availabilityUrl": "https://www.example.fi/sarjan-muun-osan-saatvauus-tiedot"
		}
	],
	"helpText": "Kirjoihin voidaan antaa lisäohjeita.",
	"additionalInformation": "Lisätietoja.",
	"updated": "2018-08-20"
}
```

**TODO**

- Mikä ID-tunnisteeksi?

## Tehtävät

### Esimerkki

```json
{
	"type": "self",
	"text": "Kirjoita samaa tyyliä tavoitellen yksi uusi luku ja sovita se kirjan loppuun."
}
```

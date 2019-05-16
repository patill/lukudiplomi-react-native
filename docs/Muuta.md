# Muuta

## Ongelmia

### Ongelma sovelluksen nimessä

Ilmeisesti `AndroidManifest.xml` ei hyväksy sovelluksen nimeen väliviivoja. Lisäksi sana `native` on Javan varattu sana, joten sitä ei voi käyttää nimessä niin, että muuttaisi aiemman `lukudiplomi-react-native` muotoon `lukudiplomi.react.native`.

Siitä syystä sovelluksen nimeksi`package.json`-tiedostoon on muutettu pelkkä `lukudiplomi`.

### Ohjelmaa `aapt` ei voida suorittaa.

Eräs syy on joidenkin 32-bittisten kirjastojen puuttuminen. Ongelman voi ratkaista asentamalla tarvittavat kirjastot. Katso ratkaisu alla olevasta linkistä.

Näyttäisi, että 

- https://stackoverflow.com/questions/18041769/error-cannot-run-aapt

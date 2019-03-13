# Lukudiplomi

Katso lisätietoja osoitteesta <https://piki.verkkokirjasto.fi/web/arena/lukudiplomi-nuoret/>.

## Kehitys

Kehittääksesi sovellusta eteenpäin tai tehdäksesi vain oman version nykyisestä lähdekoodista, tarvitset seuraavat ohjelmistot:

- [Git](https://git-scm.com) (valinnainen; voit myös vain ladata lähdekoodit .zip-pakettina)
- [NodeJS ja NPM](https://nodejs.org/en/)
- Editori (esim. [Atom](https://atom.io), [Visual Studio Code](https://code.visualstudio.com), jne.)
- [Android Studio](https://developer.android.com/studio) ja sen mukana tulevat työkalut jne., mm. emulaattori ja SDK

### Vaiheet

#### Yleiset

Olettaen, että edellä mainitut ohjelmistot on asennettu ja ne toimivat, voit edetä asennettavan sovelluspaketin tekoon (APK tai IPA, riippuen kohdejärjestelmästä). Jatkossa ohjeet Android-version tekemiseen. iOS-version ohjeet myöhemmin.

**Lähdekoodi.** Kloonaa (tai vaihtoehtoisesti lataa .zip-paketti) lähdekoodin sisältävä repository.

```bash
$ git clone https://github.com/Tampereen-kaupunginkirjasto/lukudiplomi-react-native.git
```

**Riippuvuudet.** Asenna riippuvuudet. Tarvittavat riippuvuudet löytyvät `package.json`-tiedoston `dependencies`-kohdasta. Ne asennetaan seuraavilla komennoilla:

```bash
$ cd lukudiplomi-react-native
$ npm install
```

Luo myös Android ja iOS -kansiot seuraavasti:

```bash
$ ./node_modules/.bin/react-native android
```

Jos edellisen komennon yhteydessä esiintyy ongelmia, kokeile seuraavia ratkaisukeinoja asiaan (Stack Overflow ja Github Issue):

- https://stacksoverflow.com/questions/43723958/react-native-android-project-not-found-maybe-run-react-native-android-first#
- https://github.com/facebook/react-native/issues/9312

#### Android

Kun asennus on valmis, käynnistä Android-emulaattori. Voit tehdä tämän joko komentoriviltä tai sitten Android Studion kautta. Kun Android-emulaattori on käynnissä, luo ja asenna sovelluspaketti (APK) seuraavasti:

```bash
$ npm run android
```

Tämä komento luo sovelluspaketin ja asentaa sen emulaattoriin.

#### iOS

- TBD

## Muu dokumentaatio

Katso `docs`-kansiosta.

## Lisenssi

MIT-lisenssi. Katso lisätiedot LICENSE-tiedostosta.
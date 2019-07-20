# Lukudiplomi

Katso lisätietoja osoitteesta <https://piki.verkkokirjasto.fi/web/arena/lukudiplomi-nuoret/> ja <https://https://piki.verkkokirjasto.fi/web/arena/pirkanmaan_lukudiplomi/>.

## Kehitys

Kehittääksesi sovellusta eteenpäin tai tehdäksesi vain oman version nykyisestä lähdekoodista, tarvitset seuraavat ohjelmistot:

- [Git](https://git-scm.com) (valinnainen; voit myös vain ladata lähdekoodit .zip-pakettina)
- [NodeJS ja NPM](https://nodejs.org/en/)
- Editori (esim. [Atom](https://atom.io), [Visual Studio Code](https://code.visualstudio.com), jne.)
- [Android Studio](https://developer.android.com/studio) ja sen mukana tulevat työkalut jne., mm. emulaattori ja SDK -- Android-versiota varten.
- [Xcode](https://developer.apple.com/xcode/) -- iOS-versiota varten

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
$ ./node_modules/.bin/react-native eject
```

Suorita myös seuraavat komennot:

```bash
./node_modules/.bin/react-native link react-native-elements
./node_modules/.bin/react-native link react-native-vector-icons
./node_modules/.bin/react-native link react-native-gesture-handler
./node_modules/.bin/react-native link react-native-splash-screen
./node_modules/.bin/react-native link react-navigation
```

Viimeisen kohdalla katso myös ohjeet täältä:

https://reactnavigation.org/docs/en/getting-started.html

Ennen kuin jatkat tästä eteenpäin, muista myös muuttaa konfiguraatio-tiedoston osoite `ConfigDatasource.js`-tiedostossa.

#### Android

Kun asennus on valmis, käynnistä Android-emulaattori. Voit tehdä tämän joko komentoriviltä tai sitten Android Studion kautta. Kun Android-emulaattori on käynnissä, luo ja asenna sovelluspaketti (APK) seuraavasti:

```bash
$ ./node_modules/.bin/react-native run-android
```

Tämä komento luo sovelluspaketin ja asentaa sen emulaattoriin (tai vaihtoehtoisesti laitteeseen).

#### iOS

iOS-versiota on helpointa testata simulaattorissa. Edellyttäen, että _Yleiset_-kohdan vaiheet on suoritettu ja Xcoden uusin versio on asennettu, voidaan sovellus ajaa komennolla

```bash
$ ./node_modules/.bin/react-native run-ios
```

Komento tekee sovelluksesta asennettavan paketin ja asentaa sen simulaattoriin.

Myös Xcodea voidaan käyttää. Repositoryn juurikansioon luotiin _Yleiset_-kohdassa omat kansionsa sekä Android että iOS -versioille. Kansiosta `ios` löytyy Xcoden projektitiedosto, joka voidaan avata Xcodessa. Tällöin sovelluksen voi asentaa Xcodesta simulaattorille.

## Muu dokumentaatio

Katso `docs`-kansiosta.

## Lisenssi

MIT-lisenssi. Katso lisätiedot LICENSE-tiedostosta.

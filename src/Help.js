/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import Styles from './Styles';

/**
 */
export default class Help extends Component {

  static navigationOptions = {
    title: 'Ohje'
  };

  render () {
    return (
      <ScrollView style={Styles.mainContainer}>
        <View style={Styles.container}>
          <Text style={Styles.heading}>Tervetuloa Porin lukudiplomi -sovelluksen käyttäjäksi</Text>
          <Text style={Styles.text}>Sovellus on tarkoitettu kaikenikäisille koululaisille, jotka suorittavat Porin lukudiplomia.</Text>



          <Text style={Styles.heading}>Listat auttavat löytämään lukemista</Text>
          <Text style={Styles.text}>Lukudiplomin kirjat on jaettu aiheen mukaan aihelistoihin. Valitse kirjoja eri listoilta. Sovi lukudiplomin suoritustavoista opettajasi kanssa. Kirjoja on tarkoitus valita luettavaksi niin, että eri lajit tulevat tutuiksi.</Text>



          <Text style={Styles.heading}>Kuinka monta luetaan?</Text>
          <Text style={Styles.text}></Text>

          <Text style={Styles.text}></Text>

          <Text style={Styles.text}></Text>

          <Text style={Styles.heading}>Tehtävät</Text>
          <Text style={Styles.text}>Jokaisella luokka-asteella on omat tehtävänsä. Jokaisesta luetusta kirjasta tehdään yksi valinnainen tehtävä.</Text>

          <Text style={Styles.text}>On myös mahdollista vertailla kirjoja tai muuten yhdistää useampi kirja samaan tehtävään. Valitse mieluummin erilaisia tehtäviä. Sovi opettajasi kanssa tehtävien suoristustapa.</Text>

          <Text style={Styles.text}>Sovelluksessa voit ylläpitää muistilistaa tehdyistä tehtävistä ja niihin valituista kirjoista. Voit tallentaa muistilistan tekstitiedostoksi laitteellesi ja halutessasi jakaa sen opettajan ohjeiden mukaisesti, esimerkiksi sähköpostilla.</Text>


          <Text style={Styles.heading}>Saatavuus</Text>
          <Text style={Styles.text}>Kirjan esittelysivulta pääset Satakirjastojen verkkokirjastoon, jossa voit tarkastaa kirjan saatavuuden Satakunnan kirjastoissa ja halutessasi varata sen.</Text>

          <Text style={Styles.text}>Verkkokirjastosta pääset myös e-kirjapalveluun, jossa e-kirjoja lainataan ja varataan.</Text>

          <Text style={Styles.text}>Mukautetun lukudiplomin suorittajan on mahdollista kuunnella osa kirjoista äänikirjoina. Äänikirjat löytyvät PIKI-kirjastojen kokoelmista tai lukiesteisille tarkoitetusta Celian äänikirjapalvelusta.</Text>

          <Text style={Styles.heading}>Lukudiplomitodistus</Text>
          <Text style={Styles.text}>Kun olet lukenut kirjat ja tehnyt opettajan kanssa sovitut tehtävät, saat opettajalta lukudiplomin.</Text>

          <Text style={Styles.text}>Onnea lukuharrastuksesi parissa!</Text>

          <Text style={Styles.heading}>Lisätietoja</Text>
          <Text style={Styles.text}>Tampereen kaupunginkirjasto, pääkirjasto Metson lasten ja nuorten osasto</Text>

          <Text style={Styles.heading}>Tekninen suunnittelu ja toteutus</Text>
          <Text style={Styles.text}>Miika Koskela (iOS ja Android versio 2.0)</Text>
          <Text style={Styles.text}>Samuli Puolakka (Android, versio 1.0)</Text>

          <Text style={Styles.heading}>Yhteistyössä:</Text>
          <View style={Styles.collaboratorContainer}>
            <Image
              source={require('../assets/placeholder.jpg')}
              style={Styles.collaborator}
            />
            <Text style={Styles.text}>Tampereen kaupunginkirjasto</Text>
          </View>

          <View style={Styles.collaboratorContainer}>
            <Image
              source={require('../assets/placeholder.jpg')}
              style={Styles.collaborator}
            />
            <Text style={Styles.text}>Lastenkirjainstituutti</Text>
          </View>

          <View style={Styles.collaboratorContainer}>
            <Image
              source={require('../assets/placeholder.jpg')}
              style={Styles.collaborator}
            />
            <Text style={Styles.text}>Kirjavälitys</Text>
          </View>

        </View>
      </ScrollView>
    );
  }
}

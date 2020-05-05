/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { TouchableOpacity, ScrollView, View, Text, Modal, Image } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

// Custom components or screens
import BookDetails from './BookDetails';
import BookList from './BookList';
import MyList from './MyList';
import TaskDetails from './TaskDetails';
import TaskList from './TaskList';
import GradeSelect from './GradeSelect';
import TaskBookSelect from './TaskBookSelect';
import Help from './Help.js';

import Styles, { Colors } from './Styles';

// General navigation options, which are passed to all three main tabs or
// screens. These are then concatenated with the screen-specific options, like
// the screen title.
const MenuButton = ({navigation}) => ({
  headerRight: (
    <View>
      <TouchableOpacity>
        <View style={Styles.NavigationButtonContainer}>
          <Icon
            name="menu"
            type="iconicon"
            color={Colors.White}
            onPress={() => {
              navigation.setParams({visible: !navigation.getParam('visible')});
            }}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!navigation.getParam('visible')}
        onRequestClose={() => {}}
      >
        <View style={Styles.modalHelp}>
          <View style={Styles.container}>


            <ScrollView style={Styles.mainContainer}>
              <View style={Styles.containerNoPadding}>
                <Text style={Styles.heading}>Tervetuloa Porin lukudiplomi -sovelluksen käyttäjäksi</Text>
                <Text style={Styles.text}>Lukudiplomi-sovellus on tarkoitettu alakoululaisille, jotka haluavat suorittaa Porin kaupunginkirjaston lukudiplomin.</Text>
                <Text style={Styles.heading}>Aihelistat ja lukutasot</Text>

                <Text style={Styles.text}>Lukudiplomin kirjat on jaoteltu aiheen mukaan. Jokaisessa aiheessa on vaikeustasoltaan kolmentasoisia kirjoja: 1. Lukutoukka, 2. Kirja-ahmatti ja 3. L.T.P.M.P.K. (Luen tosi paljon, myös paksuja kirjoja)</Text>
                <Text style={Styles.text}>Voit valita kirjoja miltä tasolta tahansa, tasot eivät siis ole sidoksissa luokka-asteisiin. Valitse siis itseäsi kiinnostavat kirjat!</Text>

                <Text style={Styles.text}>Sovi lukudiplomin suorittamisesta oman opettajasi kanssa. Opettaja kertoo, kuinka monta kirjaa sinun pitää lukea suorittaaksesi lukudiplomin, mutta määrä voi olla esimerkiksi 6-10 kirjaa eri aihelistoilta.</Text>

                <Text style={Styles.heading}>Merkkaa omat kirjat muistilistaan ja suorita tehtävät</Text>
                <Text style={Styles.text}>Sovelluksessa voit kerätä lukemasi kirjat Omat kirjat -listaan. Kun painat kirjan vieressä olevaa tähteä, tähti muuttuu keltaiseksi ja kirja siirtyy Omat kirjat -listaan. Voit poistaa kirjan listalta painamalla tähteä uudelleen. Omat kirjat -listan näet alareunan Omat kirjat -valikosta.</Text>

                <Text style={Styles.text}>
                Sovelluksesta löydät Tehtävät-valikosta myös kirjoihin liittyvät tehtävät, jotka pitää tehdä lukudiplomin suorittamiseksi. Suorita vain yksi tehtävä luettua kirjaa kohti. Avaa tehtävä painamalla tehtävää. Merkitse tehtävä tehdyksi valitsemalla sitä varten lukemasi kirja. Paina punaista Valitse kirja -nappia ja valitse avautuvasta listasta oikea kirja. Tehtävälistauksessa tehtävän kohdalle tulee vihreä merkki, kun tehtävä on tehty.</Text>

                <Text style={Styles.text}>Voit lähettää listan tekemistäsi tehtävistä opettajalle tai vaikka ystävälle sovelluksen kautta. Mene Tehtävät-valikkoon ja paina vihreää jaa-nappia. Valitse haluamasi sovellus, jonka kautta haluat listan lähettää (esim. sähköposti tai WhatsApp) ja valitse sen jälkeen haluamasi vastaanottaja.</Text>

                <Text style={Styles.heading}>Lisätietoja</Text>
                <Text style={Styles.text}>Porin kaupunginkirjasto, nuorten osastot</Text>

                <Text style={Styles.heading}>Tekninen suunnittelu ja toteutus</Text>
                <Text style={Styles.text}>Till Paala (mukautus Porin vaatimuksille)</Text>
                <Text style={Styles.text}>Miika Koskela (iOS ja Android versio 2.0)</Text>
                <Text style={Styles.text}>Samuli Puolakka (Android, versio 1.0)</Text>

                <Text style={Styles.heading}>Yhteistyössä:</Text>
                <View style={Styles.collaboratorContainer}>
                  <Image
                    source={require('../assets/Porin_kirjasto_musta.jpg')}
                    style={Styles.collaborator}
                  />
                  <Text style={Styles.text}>Porin kaupunginkirjasto</Text>
                </View>

                <View style={Styles.collaboratorContainer}>
                <Image
                  source={require('../assets/finna-logo2.png')}
                  style={Styles.collaborator}
                />
                  <Text style={Styles.text}>Finna.fi </Text>
                </View>
               </View>
            </ScrollView>



            <TouchableOpacity
              style={Styles.button}
              onPress={() => {
                navigation.setParams({visible: false});
              }}
            >
              <Text style={Styles.buttonText}>SULJE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
});

// Header options for all stacks
const Header = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.Blue
    },
    headerTitleStyle: {
      fontWeight: 'normal'
    },
    headerBackTitle: null,
    headerTintColor: Colors.White
  }
};

// Stack navigators for each tab, BookList, TaskList and MyList
const BookStack = createStackNavigator({
  Home: {
    screen: BookList,
    navigationOptions: MenuButton
  },
  BookDetails: {
    screen: BookDetails
  },
  GradeSelect: {
    screen: GradeSelect
  },
  Help: {
    screen: Help
  }
}, Header);

const TaskStack = createStackNavigator({
  TaskList: {
    screen: TaskList,
    defaultNavigationOptions: MenuButton
  },
  TaskDetails: {
    screen: TaskDetails
  },
  TaskBookSelect: {
    screen: TaskBookSelect
  },
  BookDetailsForTask: {
    screen: BookDetails
  },
  Help: {
    screen: Help
  }
}, Header);

const MyStack = createStackNavigator({
  MyList: {
    screen: MyList,
    navigationOptions: MenuButton
  },
  MyEntry: {
    screen: BookDetails
  },
  Help: {
    screen: Help
  }
}, Header);

// Set tabBar invisible on other than main screens
BookStack.defaultNavigationOptions = ({navigation}) => {
  let tabBarVisible = navigation.state.index < 1;
  return { tabBarVisible };
};

TaskStack.defaultNavigationOptions = ({navigation}) => {
  let tabBarVisible = navigation.state.index < 1;
  return { tabBarVisible };
};

MyStack.defaultNavigationOptions = ({navigation}) => {
  let tabBarVisible = navigation.state.index < 1;
  return { tabBarVisible };
};

// Tab bar navigator that sits on the bottom of the screen
const Navigation = createBottomTabNavigator({
  Home: {
    screen: BookStack,
    navigationOptions: {
      tabBarLabel: 'Kirjat',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name="book"
          type="material-community"
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Tasks: {
    screen: TaskStack,
    navigationOptions: {
      tabBarLabel: 'Tehtävät',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name="clipboard-text"
          type="material-community"
          size={24}
          color={tintColor}
        />
      )
    }
  },
  My: {
    screen: MyStack,
    navigationOptions: {
      tabBarLabel: 'Omat kirjat',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name="star"
          type="material-community"
          size={24}
          color={tintColor}
        />
      )
    }
  }
},
{
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: Colors.Blue
  }
});

const appContainer = createAppContainer(Navigation);
export default appContainer;

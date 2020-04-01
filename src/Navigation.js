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
import Help from './Help';

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
        <View style={Styles.modalContent}>
          <View style={Styles.container}>
            <TouchableOpacity
              style={Styles.navigationButton}
              onPress={() => {
                navigation.setParams({visible: false});
                navigation.navigate('GradeSelect');
              }}
            >
              <Text style={Styles.buttonText}>Vaihda lukudiplomi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.setParams({visible: false});
                navigation.navigate('Help');
              }}
            >
              <Text style={Styles.heading}>Ohjeet</Text>
            </TouchableOpacity>
            <ScrollView style={Styles.mainContainer}>
              <View style={Styles.containerNoPadding}>
                <Text style={Styles.heading}>Tervetuloa Porin lukudiplomi -sovelluksen käyttäjäksi</Text>
                <Text style={Styles.text}>Sovellus on tarkoitettu kaikenikäisille alakoululaisille, jotka suorittavat Porin lukudiplomia.</Text>
                <Text style={Styles.heading}>Aihelistat ja lukutasot</Text>

                <Text style={Styles.text}>Lukudiplomi koostuu 13 kirjalistasta, jotka ovat järjestetty yhden aiheen mukaan. Valitse aina listasta yksi kirja.</Text>
                <Text style={Styles.text}>Kirjat ovat jaettu kolmeen lukutasoon: 1. Lukutoukka, 2. Kirja-ahmatti ja 3. L.T.P.M.K (luen tosi paljon myös paksuja kirjoja). Voit lukea kirjoja eri tasoista oman taitosi mukaan.</Text>

                <Text style={Styles.heading}>Merkkaa omat kirjat muistilistaan</Text>
                <Text style={Styles.text}>Voit merkata omat kirjat tähdellä, jolloin löydät ne Omat Kirjat -osiossa.</Text>

                <Text style={Styles.heading}>Tehtävät</Text>
                <Text style={Styles.text}>Tee yksi tehtävä jokaisesta kirjasta. Valitse tehtävä sen mukaan, millä listalla kirja sijaitsee. Voit rajata näkyvät kirjat myös vain omiin kirjoihin, ja löydät helpommin sen kirjan, josta olet tehnyt tehtävän.</Text>
                <Text style={Styles.text}>Tehdyt tehtävät voit jakaa kavereiden tai opettajan kanssa vaikka sähköpostilla. Tehtävät suoritetaan kuitenkin erikseen ja palautetaan opettajalle paperilla.</Text>
                <Text style={Styles.heading}>Lukudiplomitodistus</Text>
                <Text style={Styles.text}>Kun olet lukenut kirjat ja tehnyt opettajan kanssa sovitut tehtävät, saat opettajalta lukudiplomin.</Text>

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
                  source={require('../assets/logo-kv-sininen.jpg')}
                  style={Styles.collaborator}
                />
                  <Text style={Styles.text}>Kirjavälitys</Text>
                </View>
               </View>
            </ScrollView>



            <TouchableOpacity
              style={Styles.button}
              onPress={() => {
                navigation.setParams({visible: false});
              }}
            >
              <Text style={Styles.buttonText}>PERUUTA</Text>
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

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
import { TouchableOpacity, View, Text, Modal } from 'react-native';
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
              onPress={() => {
                navigation.setParams({visible: false});
                navigation.navigate('Help');
              }}
            >
              <Text style={Styles.heading}>Ohje</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.setParams({visible: false});
                navigation.navigate('GradeSelect');
              }}
            >
              <Text style={Styles.heading}>Valitse luokka-aste</Text>
            </TouchableOpacity>
            <View style={Styles.spacer}></View>
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
    defaultNavigationOptions: MenuButton
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
    defaultNavigationOptions: MenuButton
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
    defaultNavigationOptions: {
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
    defaultNavigationOptions: {
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
    defaultNavigationOptions: {
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

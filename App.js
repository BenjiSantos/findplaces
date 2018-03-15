import React, { Component } from 'react';

import {
    StackNavigator,
} from 'react-navigation';

const Home = require('./src/components/homeView');
const Dashboard = require('./src/components/dashboardView');

const AppNavigation = StackNavigator({
    Home: { screen: Home },
    Dashboard: { screen: Dashboard },
},{
    headerMode: 'Home'
});

export default class App extends Component {
  render() {
    return (
        <AppNavigation/>
    );
  }
}



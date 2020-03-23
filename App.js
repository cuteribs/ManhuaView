import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UpdatePage, CategoryPage, CollectionPage, HistoryPage } from './app/pages';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="首页" component={UpdatePage} />
        {/* <Tab.Screen name="分类" component={CategoryPage} />
        <Tab.Screen name="收藏" component={CollectionPage} />
        <Tab.Screen name="历史" component={HistoryPage} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
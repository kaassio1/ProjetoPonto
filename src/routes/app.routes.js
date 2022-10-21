import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeUser from '../pages/HomeUser';
import Profile from '../pages/Profile';
import Registro from '../pages/Registro';
import CustomDrawer from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
    return(
        <AppDrawer.Navigator
        drawerContent={ (props) => <CustomDrawer {...props} /> }
        drawerStyle={{
        backgroundColor: '#35374A'
        }}
        drawerContentOptions={{
        labelStyle: {
            fontWeight: 'bold'
        },
        activeTintColor: '#FFF',
        activeBackgroundColor: '#2B5C8E',
        inactiveBackgroundColor: 'rgba(0,0,0,0.20)',
        inactiveTintColor: '#DDD',
        itemStyle: {
            marginVertical: 5,
        }
        }}
        >
            <AppDrawer.Screen name="Home" component={HomeUser}/>
            <AppDrawer.Screen name="Perfil" component={Profile}/>
            <AppDrawer.Screen name="Registro" component={Registro}/>
        </AppDrawer.Navigator>
    );
}

export default AppRoutes;
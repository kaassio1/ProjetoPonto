import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeAdmin from '../pages/HomeAdmin';
import RegistroEmpresa from '../pages/RegistroEmpresa';
import CustomDrawer from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

function AppAdmin() {
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
            <AppDrawer.Screen name="HomeAdmin" component={HomeAdmin}/>
            <AppDrawer.Screen name="Registrar Empresa" component={RegistroEmpresa}/>
        </AppDrawer.Navigator>
    );
}

export default AppAdmin;
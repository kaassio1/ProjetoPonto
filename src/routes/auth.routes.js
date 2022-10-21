import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

const AuthStack = createStackNavigator();

function AuthRoutes() {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen 
            name="SignIn" 
            component={SignIn}
            options={{headerShown: false}}
            />

        <AuthStack.Screen 
            name="SignUp" 
            component={SignUp}
            options={{
                headerStyle:{
                    backgroundColor: '#35374A',
                    borderBottomWidth: 1,
                    borderBottomColor: '#2B5C8E'
                },
                headerTintColor: '#FFF',
                headerBackTitleVisible: false,
                headerTitle: 'Voltar'
            }}
            />
        <AuthStack.Screen 
            name="ForgotPassword" 
            component={ForgotPassword}
            options={{
                headerStyle:{
                    backgroundColor: '#35374A',
                    borderBottomWidth: 1,
                    borderBottomColor: '#2B5C8E'
                },
                headerTintColor: '#FFF',
                headerBackTitleVisible: false,
                headerTitle: 'Voltar'
            }}
            />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;
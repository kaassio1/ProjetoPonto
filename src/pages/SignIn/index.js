import React, {useState, useContext} from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import { Background, Container, Logo, AreaInput, Input, SubmitButton,
SubmitText, Link, LinkText, LinkSenha, Text } from './styles';

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleLogin(){
    signIn(email, password);
  }

 return (
    <Background>
        <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        >
          <Logo source={require('../../assets/Logo.png')} />
          <Text>AllPoint</Text>

          <AreaInput>
            <Input 
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={ (text) => setEmail(text)}
            />
          </AreaInput>

          <AreaInput>
            <Input 
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={ (text) => setPassword(text)}
            secureTextEntry={true}
            />
          </AreaInput>

          <SubmitButton onPress={handleLogin}>
            {
              loadingAuth ? (
                <ActivityIndicator size={20} color="#FFF" />
              ) : (
                <SubmitText>Acessar</SubmitText>
              )
            }
            
          </SubmitButton>

          <Link onPress={ () => navigation.navigate('SignUp')}>
            <LinkText>Criar uma conta</LinkText>
          </Link>
          <LinkSenha onPress={ () => navigation.navigate('ForgotPassword')}>
            <LinkText>Esqueci minha senha</LinkText>
          </LinkSenha>
        </Container>
    </Background>    
  );
}
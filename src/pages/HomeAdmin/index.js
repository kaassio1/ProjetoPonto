import React, { useContext, useState, useEffect } from "react";
import { Alert, TouchableWithoutFeedback, } from "react-native";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import EmpresaList from "../../components/EmpresaList";

import Icon from "react-native-vector-icons/MaterialIcons";
import firebase from "../../services/firebaseConnection";

import {
  Background,
  Container,
  Nome,
  Title,
  List,
  Area,
} from "./styles";

export default function HomeAdmin() {
  const [empresa, setEmpresa] = useState([]);  

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadList() {
      await firebase
      .database()
      .ref("empresa")
      .child(uid)
      .orderByChild("razaoSocial")
      .on("value", (snapshot) => {
        setEmpresa([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            cnpj: childItem.val().cnpj,
            endereco: childItem.val().endereco,
            localidade: childItem.val().localidade,
            razaoSocial: childItem.val().razaoSocial,
          };

          setEmpresa((oldArray) => [...oldArray, list]);
        });
      });
    }

    loadList();
  }, []);

  function handleDelete(data) {
    Alert.alert(
      "ATENÇÃO!",
      `Voce deseja excluir a Empresa ${data.razaoSocial}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleDeleteSucess(data),
        },
      ]
    );
  }

  async function handleDeleteSucess(data) {
    await firebase
      .database()
      .ref("empresa")
      .child(uid)
      .child(data.key)
      .remove()
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Background>
      <Header />
      <Container>
        <Nome> {user && user.nome} </Nome>
      </Container>
 
      <Area>
       <TouchableWithoutFeedback>
         <Icon name="business" color="#FFF" size={30} />
       </TouchableWithoutFeedback>
       <Title>Minhas Empresas</Title>
      </Area>
 
      <List
      showsVerticalScrollIndicator={false}
      data={empresa}
      keyExtractor={(item) => item.key}
      renderItem={({item}) => (        
        <EmpresaList data={item} deleteItem={handleDelete} />
      )}
      />    
      
    </Background>
   );
 }
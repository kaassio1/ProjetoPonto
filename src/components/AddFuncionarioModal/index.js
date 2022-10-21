import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";
import firebase from "../../services/firebaseConnection";
import FuncionarioList from "../../components/FuncionarioList";

import {
  Area,
  Botao,
  Title,
  Container,  
  List,
  ValorText,
} from "./styles";

export default function AddFuncionarioModal({data}) {

  const [funcionario, setFuncionario] = useState([]);
  const [empresa, setEmpresa] = useState();
  
  const [modalVisivel, setModalVisivel] = useState(false);

  const alternaModal = () => {
    setModalVisivel(!modalVisivel);

  };  

  useEffect(() => {
    var rz = data.razaoSocial
    setEmpresa(rz);
  });

  useEffect(() => {
    async function loadList() {
      await firebase
      .database()
      .ref("users")
      .orderByChild("tipo").equalTo("usuario")
      .on("value", (snapshot) => {
        setFuncionario([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            cpf: childItem.val().cpf,
            nome: childItem.val().nome,
            telefone: childItem.val().telefone,
          };

          setFuncionario((oldArray) => [...oldArray, list]);
        });
      });
    }

    loadList();
  }, []);

  function handleUpdate(data) {
    Alert.alert(
      "ATENÇÃO!",
      `Voce deseja vincular o usuário ${data.nome}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleUpdateSucess(data),
        },
      ]
    );
  }

  async function handleUpdateSucess(data) {
    await firebase
      .database()
      .ref("users")
      .child(data.key)
      .update({
        empresa: empresa,
      })
      .catch((error) => {
        console.log(error);
      });

      Alert.alert(
        "SUCESSO!",
        `Usuário ${data.nome} vinculado com sucesso!`,
        [
          {
            text: "Continuar",
            onPress: () => {},
          },
        ]
      );
  };


 return (

    <Area>
      <Botao onPress={alternaModal}>
        <Icon name="md-person-add" color="#2B5C8E" size={30} />
        <Title>Vincular Funcionário</Title>
      </Botao>

        <Modal
          isVisible={modalVisivel}
          onBackdropPress={() => setModalVisivel(false)}
          backgroundColor="#35374A"
          style={{ borderRadius: 10, height: 50 }}
          onSwipeComplete={() => setModalVisivel(false)}
          swipeDirection="left"
        >

        <Container>
        
        <ValorText>Para vincular um usuário, pressione e segure.</ValorText>

        <List
        showsVerticalScrollIndicator={false}
        data={funcionario}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (        
        <FuncionarioList data={item} updateItem={handleUpdate}/>
        )}
        />

        </Container>

        </Modal>
      
    </Area>
 );
   
  
}
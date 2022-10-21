import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "../../services/firebaseConnection";
import HistoricoList from '../../components/HistoricoList';

import DateMonthPicker from "../../components/DateMonthPicker";
import { getMonth, getYear } from "date-fns";

import {
  Area,
  Botao,
  Title,
  Container, 
  List, 
} from "./styles";

export default function RegistroModal({data}) {

  const [registro, setRegistro] = useState([]);
  const [uid, setUid] = useState();

  const [modalVisivel, setModalVisivel] = useState(false);

  const [newDateMonth, setNewDateMonth] = useState(new Date());
  const [showMonth, setShowMonth] = useState(false);
  
  useEffect(() => {
    var user = data.key
    setUid(user);
  });

  const alternaModal = () => {
    setModalVisivel(!modalVisivel);
  };
  

  useEffect(() => {
    async function loadList() {
      await firebase
      .database()
      .ref("registro")
      .child(data.key)
      .orderByChild("date")
      .limitToLast(31)
      .on("value", (snapshot) => {
        setRegistro([]);

        let aux =  [];

        snapshot.forEach((childItem) => {
          aux.push({
            key: childItem.key,
            entrada: childItem.val().entrada,
            saida: childItem.val().saida,
            date: childItem.val().date,
          });
        });

        aux = aux.filter((item) =>{
          const parts = item.date.split("/");
          return (
            getMonth(new Date(`${parts[1]}/${parts[0]}/${parts[2]}`)) ===
            getMonth(newDateMonth) && getYear(newDateMonth) === parseInt(parts[2])
          );
        });

        setRegistro([...aux]);
      });
    }

    loadList();
  }, [newDateMonth]);

  function handleShowMonthPicker() {
    setShowMonth(true);
  }

  function handleCloseMonth() {
    setShowMonth(false);
  }

  const onChangeMonth = (date) => {
    setShowMonth(Platform.OS === "ios");
    setNewDateMonth(date);
  };

  function handleDelete(){
    return;
  }

  return (

    <Area>
      <Botao onPress={alternaModal}>
        <Icon name="calendar-clock" color="#FFF" size={30} />
        <Title>Ver Registros</Title>
      </Botao>

        <Modal
          onSwipeComplete={() => setModalVisivel(false)}
          swipeDirection="down"
          animationType='fade'
          isVisible={modalVisivel}
          onBackdropPress={() => setModalVisivel(false)}
          backgroundColor="#35374A"
          backdropColor="trasparent"
          style={{ borderRadius: 10 }}          
        >

        <Container>
        
        <Area>
          <TouchableOpacity onPress={handleShowMonthPicker}>
            <Icon name="calendar" color="#FFF" size={30} />          
          </TouchableOpacity>
          <Title>Selecione o mês</Title>        
        </Area>

        <List
          showsVerticalScrollIndicator={true}
          data={registro}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (        
          <HistoricoList data={item} deleteItem={handleDelete}/>
        )}
        />

        {showMonth && (
          <DateMonthPicker
            onClose={handleCloseMonth}
            date={newDateMonth}
            onChange={onChangeMonth}
          />
        )}

        </Container>

        </Modal>
      
    </Area>

  );
}
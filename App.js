import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert, ImageBackground} from 'react-native';
import api from './src/services/api';

import image from './src/assets/img.png';

export default function App() {
   const[cep, setCep] = useState('');
   const[cepResultado, setCepResultado] = useState(null);
   const inputRef = useRef(null);


   async function buscar(){
      if(cep === ''){
         Alert.alert('⚠️', 'Por favor, preencher o campo de CEP');
         setCep('');
         return;
      }

      

      try{
         const response = await api.get(`/${cep}/json`);
         setCepResultado(response.data);
         Keyboard.dismiss();
      }catch(error){
         Alert.alert('⚠️', 'Erro: ' + error);
      }
   

   }

   function limpar(){
      setCep('');
      inputRef.current.focus();
      setCepResultado(null);
      Keyboard.dismiss();
   }

 return (
   <ImageBackground 
   source={image} resizeMode="cover"
   style={styles.container}>
      <Text style={styles.titulo}>Digite o CEP desejado</Text>
      <Text>Um aplicativo sem fins lucrativos</Text>
      
      <View style={styles.areaInput}>
         <TextInput
         placeholder='EX: 01234567'
         maxLength={8}
         keyboardType='numeric'
         value={cep}
         onChangeText={(valor) => setCep(valor)}
         style={styles.input}
         ref={inputRef}
         />

         <View style={styles.areaBotoes}>
            {cep &&
            
            <TouchableOpacity
            onPress={buscar}
            style={styles.botao}
            >
            <Text style={[styles.textoBotao, {color: '#000'}]}>Buscar</Text>
            </TouchableOpacity>
            

         }

         </View>

         {cepResultado &&
         <View style={styles.areaResultado}>
            <Text style={styles.texto}>CEP: {cepResultado.cep}</Text>
            <Text style={styles.texto}>Rua: {cepResultado.logradouro}</Text>
            <Text style={styles.texto}>Bairro: {cepResultado.bairro}</Text>
            <Text style={styles.texto}>Cidade: {cepResultado.localidade}</Text>
            <Text style={styles.texto}>Estado: {cepResultado.uf}</Text>
            <Text style={styles.texto}>Complemento: {cepResultado.complemento}</Text>
            <Text style={styles.texto}>DDD local: {cepResultado.ddd}</Text>

            <TouchableOpacity
            onPress={limpar}
            style={[styles.botao, {backgroundColor: 'red', marginTop: 15,}]}
            >
               <Text style={styles.textoBotao}>Limpar</Text>
            </TouchableOpacity>
         </View>
         }
      </View>
   </ImageBackground>
  );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      alignItems: 'center',
      paddingHorizontal: 30,
   },
   titulo: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 30,
   },
   areaInput: {
      width: '100%',
      marginTop: 30,
   },
   input: {
      padding: 15,
      borderWidth: 1,
      borderRadius: 6,
   },
   areaBotoes: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 20,
      gap: 20
   },
   botao: {
      padding: 5,
      width: 80,
      borderRadius: 6,
      backgroundColor: '#FFD626',
   },
   textoBotao: {
      fontSize: 17,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center'
   },
   areaResultado: {
      width: '80%',
      alignItems: 'center',
      marginTop: 40,
      backgroundColor: '#fff',
      alignSelf: 'center',
      padding: 25,
      borderRadius: 10,
      borderWidth: 1,
   },
   texto: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 8
   }
});
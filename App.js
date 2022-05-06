import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { UNITS, LANGUAGE, CNT, APPID, BASE_URL  } from "@env"


export default function App() {
  const [cidade, setCidade] = useState('')
  const [previsoes, setProvisoes] = useState([])
  const capturarCidade = (cidadeDigitada) => {
    setCidade(cidadeDigitada)
  }




  /* const endPoint = `https://api.openweathermap.org/data/2.5/forecast?lang=${lang}&units=${units}&cnt=${cnt}&appid=${appid}&q=` */
  return (
    <View style={styles.containerView}>
      <View style={styles.entradaView}>
        <TextInput style={styles.cidadeTextInput}
          value={cidade}
          onChangeText={capturarCidade}
          placeholder="Digite o nome de uma cidade"/>
        <Button title="ok"/>

      </View>
      <FlatList
        data={previsoes}
        renderItem={p=> (
          <Text>{JSON.stringfy(p)}</Text>
        )}/>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    padding: 40,
  },
  entradaView: {
    marginBottom: 8
  },
  cidadeTextInput: {
    padding: 12,
    borderBottomColor: '#FF9800',
    borderBottomWidth: 2,
    marginBottom: 4
  }
  
});

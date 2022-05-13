import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { UNITS, LANGUAGE, CNT, APPID, BASE_URL, PROTOCOL  } from "@env"
import  PrevisaoItem  from './components/PrevisaoItem'


export default function App() {
  const [cidade, setCidade] = useState('')
  const [previsoes, setPrevisoes] = useState([])
  const capturarCidade = (cidadeDigitada) => {
    setCidade(cidadeDigitada)
  }

  const obterPrevisoes = () => {
    const endPoint = `${PROTOCOL}://${BASE_URL}?lang=${LANGUAGE}&units${UNITS}&cnt=${CNT}&appid=${APPID}&q=${cidade}`
    fetch(endPoint)
    .then (dados =>{ 
      return dados.json()
    })
    .then(dados => {
      setPrevisoes(dados["list"])
    })
  }
  return (
    <View style={styles.containerView}>
      <View style={styles.entradaView}>
        <TextInput style={styles.cidadeTextInput}
          value={cidade}
          onChangeText={capturarCidade}
          placeholder="Digite o nome de uma cidade"/>
        <Button title="ok"
          onPress={obterPrevisoes}/>

      </View>
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={previsoes}
          renderItem={p=> (
            <PrevisaoItem previsao={p.item}/>
          )}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    padding: 40
  },
  entradaView: {
    marginBottom: 8,
  },
  cidadeTextInput: {
    padding: 12,
    borderBottomColor: '#FF9800',
    borderBottomWidth: 2,
    marginBottom: 4
  }
});

import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { UNITS, LANGUAGE, CNT, APPID, BASE_URL, PROTOCOL  } from "@env"
import  PrevisaoItem  from './components/PrevisaoItem'


export default function App() {
  const [cidade, setCidade] = useState('')
  const [previsoes, setPrevisoes] = useState({})
  const capturarCidade = (cidadeDigitada) => {
    setCidade(cidadeDigitada)
  }

  const obterPrevisoes = async () => {
    const endPoint = `${PROTOCOL}://${BASE_URL}?lang=${LANGUAGE}&units${UNITS}&cnt=${CNT}&appid=${APPID}&q=${cidade}`
    const primeiraResposta = await fetch(endPoint)
    const primeiraRespostaTratada = await primeiraResposta.json()
    setPrevisoes(primeiraRespostaTratada['list'])
    console.log("Primeira tratada: ", primeiraRespostaTratada)
    const lat = parseInt(primeiraRespostaTratada.city.coord.lat)
    const lon = parseInt(primeiraRespostaTratada.city.coord.lon)
    console.log(lat, lon)
    const segundoEndPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APPID}&units=metric`
    const segundaResposta = await fetch(segundoEndPoint)
    const segundaRespostaTratada = await segundaResposta.json()
    console.log("Segunda tratada:  ", segundaRespostaTratada)
    
    const dt = segundaRespostaTratada.current.dt;
    const temp = segundaRespostaTratada.current.temp;
    const sensacao = segundaRespostaTratada.current.feels_like;
    const humidity = segundaRespostaTratada.current.humidity;
    const description = segundaRespostaTratada.current.weather[0].description;
    console.log("dt: ", dt)
    console.log("temperatura: ", temp)
    console.log("sensação: ", sensacao)
    console.log("humidity: ", humidity)
    console.log("description: ", description)




    
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

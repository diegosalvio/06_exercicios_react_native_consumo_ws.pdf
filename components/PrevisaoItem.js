import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PrevisaoItem = () => {

  return (
    <Cartao
        estilos={styles.cartao}>
        <View 
            style={styles.tela}>
            <Image style={styles.tela}  source={{uri: ''}}/>
        </View>

    </Cartao>
  )
}

export default PrevisaoItem

const styles = StyleSheet.create({
    cartao: {
        marginBottom: 8
    },
    tela: {
        flexDirection: 'row'
    },
    imagem: {
        width: 50,
        height: 50
    }
})
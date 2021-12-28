import * as React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import * as ExpoDocumentPicker from 'expo-document-picker'
import { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'

export default function FilePicker(){

    const [result, setResult] = useState(null)

    useEffect(()=>{
        // console.log(JSON.stringify(result,null,2))
    },[result])

    const handleError = (err) => {
          console.warn(err)
      }

    return(
        <View style={styles.container}>
        <Button
          title="open picker for single file selection"
          onPress={async () => {
            try {
           const pickerResult = await ExpoDocumentPicker.getDocumentAsync({})
           setResult([pickerResult])
            } catch (e) {
              handleError(e)
            }
          }}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      width: 60,
      height: 60,
      marginVertical: 20,
    },
  })
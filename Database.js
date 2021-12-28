import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import React, { useState } from "react";
import { StyleSheet,Button, View } from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore"; 

export default function App(){
  const firebaseConfig = {
    apiKey: "AIzaSyDZUJ2dxBwc8X4h9Zj1fanMk_Yl6Mjfqx4",
    authDomain: "insurance-tracker-fc94f.firebaseapp.com",
    projectId: "insurance-tracker-fc94f"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  
  const db = getFirestore();

 
const getData =async ()=>{ 
const querySnapshot = await getDocs(collection(db, "Insurance"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
})
};

const addData =async ()=>{
  try {
    const docRef = await addDoc(collection(db, "Insurance"), {
      InsuranceDocument:"google drive link 2",ContactInfo:"{}",FollowUpDate:new Date(),RC:"googledrive link"
    });
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

  return(
<View style={styles.container}>
<Button title="Successfully initialized the app 1" onPress={addData}></Button>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
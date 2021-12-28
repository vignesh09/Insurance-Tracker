import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import React, { useState } from "react";
import { StyleSheet,Button, View } from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import { gapi } from 'gapi-script';

export default function App(){

  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: "AIzaSyA-sDznIkyUIoN08d356BH6jylkYWNt2F8",
        clientId: "487685271998-40jrt2m2gobr2814f3l0ukq7tolpsr32.apps.googleusercontent.com",
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {}
      );
  };


  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
      setIsLoadingGoogleDriveApi(false);
      // list files if user is authenticated
      listFiles();
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };
  
   /**
   * List files.
   */
  const listFiles = (searchTerm = null) => {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        q: searchTerm,
      })
      .then(function (response) {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const res = JSON.parse(response.body);
        setDocuments(res.files);
      });
  };

  /**
   *  Sign in the user upon button click.
   */
  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

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
<Button title="click to see files" onPress={listFiles}></Button>
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
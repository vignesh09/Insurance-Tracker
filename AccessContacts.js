import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, ActivityIndicator,PermissionsAndroid } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function AccessContacts() {

  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [inMemoryContacts, setInMemoryContacts] = useState([])
  const [search, setSearch] = useState(false)
  

  
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.FirstName],
          });
          setContacts(data);
          setInMemoryContacts(data)
          console.log(data);
          setIsLoading(false)
          if (data.length > 0) {
            const contact = data[0];
            console.log("*****************")
            console.log(contact);
          }
        }
      })();
    }, []);
  
    const renderItem = ({ item }) => (
      <View style={{ minHeight: 70, padding: 5 }}>
        {/* console.clearlog(item); */}
        <Text style={{ color: '#bada55', fontWeight: 'bold', fontSize: 26 }}>
          {item.firstName + ' '}
          {item.lastName}
        </Text>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {item.phoneNumbers}
        </Text>
      </View>
    );
  
    const searchContacts = value => {
      setSearch(true);
       const filteredContacts = inMemoryContacts.filter(contact => {
        let contactLowercase = (
          contact.firstName +
          ' ' +
          contact.lastName
        ).toLowerCase();
  
        let searchTermLowercase = value.toLowerCase();
  
        return contactLowercase.indexOf(searchTermLowercase) > -1;
      });
      setContacts(filteredContacts)
    };
  
    
      return (
        <View style={{ height:"70%",width:"100%",paddingTop: 50}}>
          <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#dddddd"
            style={{
              backgroundColor: '#2f363c',
              height: 50,
              fontSize: 36,
              padding: 10,
              color: 'white',
              borderBottomWidth: 0.5,
              borderBottomColor: '#7d90a0'
            }}
            onChangeText={value => searchContacts(value)}
          />
          <View style={{ flex: 1, backgroundColor: '#2f363c' }}>
            {isLoading ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ActivityIndicator size="large" color="#bad555" />
              </View>
            ) : null}
           {search ? ( <FlatList
              data={contacts}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50
                  }}
                >
                  <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
                </View>
              )}
            />):null }
          </View>
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

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";

const polls = [1, 2, 3];
export default function HomeSxreen() {
  return (
  <>
  <Stack.Screen  options={{
          title: 'Polls',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
  <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={() => (
          <View style={styles.pollContainer}>
            <Text style={styles.pollText}>Example Poll Question</Text>
          </View>
        )}
      />
  </>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    padding: 10,
    gap: 5 ,
  },
  pollContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  pollText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

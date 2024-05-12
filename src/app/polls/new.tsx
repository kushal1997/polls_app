import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Redirect, Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../providers/AuthProvider";
const CreatePoll = () => {

  const { session, user } = useAuth();
  
  const [ques, setQues] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const createPoll = () => {
    console.warn("Created question", ques, "options", options);
  };

  if(!user){
    return <Redirect href={"/login"}/>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create poll" }} />

      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Type your question here"
        onChangeText={setQues}
        style={styles.input}
      />

      <Text style={styles.label}>Options</Text>


      {options.map((option, i) => (
        <View style={{ justifyContent: "center" }}  key={i}>
          <TextInput
           
            onChangeText={(text) => {
              const updated = [...options];
              updated[i] = text;
              setOptions(updated);
            }}
            placeholder={`Option ${i + 1}`}
            value={option}
            style={styles.input}
          />
          <Entypo
            name="cross"
            size={20}
            color="gray"
            onPress={()=>{
                const updated = [...options];
              updated.splice(i,1);
              setOptions(updated);
            }}
            style={{ position: "absolute", right: 10 }}
          />
        </View>
      ))}
      <Button title="Add Option" onPress={() => setOptions([...options, ""])} />
      <Button title={"Create Poll"} onPress={createPoll} />
    </View>
  );
};

export default CreatePoll;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  label: {
    fontWeight: "500",
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  options: {},
});

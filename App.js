import { StatusBar } from "expo-status-bar";

import {
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Checkbox } from "react-native-paper";

export default function App() {

  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [outputTasks, setoutputTasks] = useState([]);


  const numberOfTasks = outputTasks?.length;
  const numberOfDoneTasks = outputTasks.filter(
    (task) => task.checkedValue
  ).length;

  function handlePress() {
    if (!text) {
      setTextError("Empty Text!!");
    } else if (text.length <= 3) {
      setTextError("Min characters must be more than 3 chars");
    } else {
      setoutputTasks((old) => [...old, { data: text, checkedValue: false }]);
      setText("");
      setTextError("");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <StatusBar hidden />

        <Text style={styles.headerText}>My ToDo List</Text>

        <TextInput
          style={
            !textError
              ? styles.input
              : [styles.input, { borderColor: "#FF0080" }]
          }
          value={text}
          onChangeText={(value) => setText(value)}
          onFocus={() => setTextError("")}
        ></TextInput>

        <Text style={{ color: "white", fontSize: 18 }}>{textError}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.2 : 1 },
          ]}
          onPress={handlePress}
        >
          <Text style={styles.text}>Add</Text>
        </Pressable>

        <View>
          <Text
            style={{
              color: "white",
              position: "absolute",
              top: 25,
              left: 90,
              fontSize: 23,
            }}
          >
            {numberOfDoneTasks} done of {numberOfTasks} tasks
          </Text>
        </View>

        {/* view Output*/}

        <View style={{ marginTop: 70 }}>
          {outputTasks.map((task, index) => (
            <View style={styles.outputTasks} key={index}>
              {/* View contain 3 items*/}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    textDecorationLine: task.checkedValue
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.data}
                </Text>

                {/*First CheckBox view*/}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }
                  }
                >
                  <Checkbox
                    color="#FF0080"
                    status={task.checkedValue ? "checked" : "unchecked"}
                    uncheckedColor="#FF0080"
                  
                    onPress={() => {
                      setoutputTasks((prevState) =>
                        prevState.map((obj, i) =>
                          index === i
                            ? { ...obj, checkedValue: !obj.checkedValue }
                            : obj
                        )
                      );
                    }}
                  />
                  <Text style={{ fontSize: 18 }}>Done</Text>
                </View>

                {/*Second CheckBox view*/}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                    color="#FF0080"
                    uncheckedColor="#FF0080"
                    onPress={() => {
                      setoutputTasks((prevstate) =>
                        prevstate.filter((_, i) => index !== i)
                      );
                    }}
                  />
                  <Text style={{ fontSize: 18 }}>Delete</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    backgroundColor: "#FF0080",
    padding: 20,
  },
  button: {
    position: "absolute",
    right: 10,
    top: 110,
    width: 100,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: "#FF0080",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    height: 40,
    borderBottomColor: "#FF0080",
    borderWidth: 2,
    width: 245,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "white",
    marginTop: 35,
    marginBottom: 20,
    // marginHorizontal:35
  },
  outputTasks: {
    marginVertical: 10,
    backgroundColor: "white",
    color: "black",
    padding: 13,
    borderRadius: 50,
  },

});

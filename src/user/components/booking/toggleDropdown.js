import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import globalStyles from "../../../styles/globalStyles";

const ToggleDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Online");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={globalStyles.small}>{selectedOption}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          style={{marginHorizontal:10}}
          color={colors.grey300}
        />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectOption("Online")}
          >
            <Text style={globalStyles.small}>Online</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectOption("Offline")}
          >
            <Text style={globalStyles.small}>Offline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    marginTop: 10,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "flex-end",
    alignItems:'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey300,
  },

  dropdown: {
    marginTop: 5,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey300,
    overflow: "hidden",
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: colors.black,
  },
});

export default ToggleDropdown;

import React, { useEffect, useState } from "react";
import { Icon, Input, Overlay } from 'react-native-elements'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


export default ModalComponent = ({ isVisible = false, toggleOverlay = () => { }, applyChanges = () => { }, columns = [], selected = [] }) => {

  const [allColumns, setAllColumns] = useState(null)
  const [selectedColumns, setSelectedColumns] = useState(null)
  const [keyWord, setKeyWord] = useState("")

  const addSelected = item => setSelectedColumns([...selectedColumns, item])

  const removeSelected = needle => setSelectedColumns(selectedColumns.filter(item => item != needle))

  const filterColumns = keyWord => {
    setKeyWord(keyWord);
    setAllColumns(keyWord == ""
      ? columns
      : columns.filter(item => item.alias.toLowerCase().includes(keyWord.toLowerCase()))
    )
  }

  useEffect(() => {
    setAllColumns(columns)
    setSelectedColumns(selected)
  }, [columns, selected])
  
  return (
    <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay} overlayStyle={{ width: "95%" }}>
      <View>
        {/* Header */}
        <View>
          <Text style={styles.title}>
            Select columns for the grid
          </Text>
        </View>
        {/* Columns */}
        <View>
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
              {/* Available columns */}
              <View style={styles.side}>
                <View style={styles.search}>
                  <Input
                    placeholder="Search..."
                    value={keyWord}
                    onChangeText={val => filterColumns(val)}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                  />
                </View>
                <View style={styles.listContainer}>
                  <ScrollView>
                    {
                      allColumns
                        ?.filter(item => !selectedColumns.find(el => el.name == item.name))
                        ?.map((element, index) =>
                          <Item key={`left_${index}`} item={element} func={addSelected} />
                        )
                    }
                  </ScrollView>
                </View>
              </View>
              {/* Selected columns */}
              <View style={styles.side}>
                <View style={styles.search} />

                <View style={styles.listContainer}>
                  <ScrollView>
                    {
                      selectedColumns?.map((element, index) =>
                        <Item key={`right_${index}`} item={element} func={removeSelected} withCross />
                      )
                    }
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* Button */}
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { setKeyWord(""); applyChanges(selectedColumns) }}
          >
            <Text style={styles.buttonText}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  )
}

const Item = ({ item = "", func = () => { }, withCross = false }) => (
  <TouchableOpacity
    style={[styles.item, withCross && styles.itemRow]}
    onPress={() => { !withCross ? func(item) : null }}
  >

    <Text style={styles.itemText}>
      {item.alias}
    </Text>

    {withCross && <Icon name="close" type="ionicons" size={16} onPress={() => { func(item) }} />}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemText: {
    fontSize: 16
  },
  side: {
    width: "50%",
    padding: 10
  },
  search: {
    height: 40,
    marginVertical: 5
  },
  listContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#3e3e3e",
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 4,
    height: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    borderBottomWidth: 1,
    color: "#3e3e3e",
    paddingVertical: 5
  },
  button: {
    backgroundColor: "#04AA6D",
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  },
  inputContainer: {
    padding: 0,
    height: 36,
    borderWidth: 1,
    borderRadius: 10
  },
  inputContainerStyle: {
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderBottomWidth: 0
  },
  inputStyle: {
    paddingHorizontal: 2,
    borderBottomWidth: 0,
    fontSize: 14
  }
})

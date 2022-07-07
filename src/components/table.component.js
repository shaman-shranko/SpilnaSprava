import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default TableComponent = ({ columns = [], data = [] }) => (
  <View style={{ padding: 10 }}>
    <ScrollView>
      <View>
        <ScrollView horizontal persistentScrollbar >
          <View style={styles.row}>
            {columns?.map((element, index) => (
              <View key={`column_${index}`} style={styles.column}>
                <View style={[styles.cell, styles.headRow]}>
                  <Text style={styles.headText}>
                    {element.alias}
                  </Text>
                </View>
                {data?.map((item, subIndex) => (
                  <View
                    key={`data_${index}_${subIndex}`}
                    style={[styles.cell, subIndex % 2 == 0 ? styles.coloredRow : null]}
                  >
                    <Text style={styles.cellText}>
                      {item[element.name]}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  </View>
)
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column: {
    minWidth: 80,
    width: 'auto'
  },
  cell: {
    borderBottomWidth: 1,
    padding: 10
  },
  headRow: {
    backgroundColor: "#04AA6D",
  },
  headText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
  cellText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400"
  },
  coloredRow: {
    backgroundColor: "#E7E9EB"
  }
})
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeSelected } from "../actions/app.action"
import ModalComponent from '../components/modal.component';
import TableComponent from '../components/table.component';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MainScreen = (props) => {
  const [showOverlay, setShowOverlay] = useState(false)

  const toggleOverlay = () => setShowOverlay(!showOverlay)

  const applyChanges = (selected) => {
    props.goChangeSelected({ selected });
    toggleOverlay()
  }

  return (
    <View>
      {/* Select Grid Columns button */}
      <View style={styles.buttonContaier}>
        <TouchableOpacity onPress={toggleOverlay} style={styles.button}>
          <Text style={styles.buttonText}>
            Select Grid Columns
          </Text>
        </TouchableOpacity>
      </View>
      {/* Table */}
      <TableComponent columns={props?.selected} data={props?.data} />
      {/* Select columns modal */}
      <ModalComponent
        isVisible={showOverlay}
        toggleOverlay={toggleOverlay}
        columns={props.columns}
        selected={props.selected}
        applyChanges={val => applyChanges(val)}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#04AA6D",
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  buttonContaier: {
    alignItems: 'flex-end',
    width: "100%",
    padding: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  }
})
const mapStateToProps = (state) => ({
  data: state.app.data,
  columns: state.app.columns,
  selected: state.app.selected,
})
const mapDispatchToProps = (dispatch) => ({
  goChangeSelected: (data) => {
    dispatch(changeSelected(data))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Chip from './Chips';

const ChipMatrix = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.columnHeader}>NORMAL</Text>
        <Text style={styles.columnHeader}>+ LEADING ICON</Text>
        <Text style={styles.columnHeader}>+ TRAILING ICON</Text>
      </View>

      {/* default chips */}
      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} />
        <Chip
          label="Option"
          onPress={() => {}}
          leadingIcon="checkmark-circle"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          trailingIcon="keyboard-arrow-down"
        />
      </View>
      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} shape="full" />
        <Chip
          label="Option"
          onPress={() => {}}
          shape="full"
          leadingIcon="checkmark-circle"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          shape="full"
          trailingIcon="keyboard-arrow-down"
        />
      </View>

      {/* active chips */}
      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} variant="active" />
        <Chip
          label="Option"
          onPress={() => {}}
          leadingIcon="checkmark-circle"
          variant="active"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          trailingIcon="keyboard-arrow-down"
          variant="active"
        />
      </View>
      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} shape="full" variant="active" />
        <Chip
          label="Option"
          onPress={() => {}}
          shape="full"
          leadingIcon="checkmark-circle"
          variant="active"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          shape="full"
          trailingIcon="keyboard-arrow-down"
          variant="active"
        />
      </View>

      {/* disable chips */}
      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} variant="disabled" />
        <Chip
          label="Option"
          onPress={() => {}}
          variant="disabled"
          leadingIcon="checkmark-circle"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          variant="disabled"
          trailingIcon="keyboard-arrow-down"
        />
      </View>
      <View style={styles.chipRow}>
        <Chip
          label="Option"
          onPress={() => {}}
          variant="disabled"
          shape="full"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          variant="disabled"
          leadingIcon="checkmark-circle"
          shape="full"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          variant="disabled"
          trailingIcon="keyboard-arrow-down"
          shape="full"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#x',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default ChipMatrix;

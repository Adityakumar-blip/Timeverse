import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Chip from './Chips';

const ChipMatrix = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Timeverse Foundations</Text>
      <Text style={styles.title}>Chip Matrix</Text>
      <Text style={styles.subtitle}>
        Make sure to follow all the design aspects like padding, spacing. Don't
        forget to add t
      </Text>

      <View style={styles.row}>
        <Text style={styles.columnHeader}>NORMAL</Text>
        <Text style={styles.columnHeader}>+ LEADING ICON</Text>
        <Text style={styles.columnHeader}>+ TRAILING ICON</Text>
      </View>

      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} />
        <Chip label="Option" onPress={() => {}} leadingIcon="check" />
        <Chip
          label="Option"
          onPress={() => {}}
          trailingIcon="arrow-drop-down"
        />
      </View>

      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} variant="active" />
        <Chip
          label="Option"
          onPress={() => {}}
          leadingIcon="check"
          variant="active"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          trailingIcon="arrow-drop-down"
          variant="active"
        />
      </View>

      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} shape="full" />
        <Chip
          label="Option"
          onPress={() => {}}
          shape="full"
          leadingIcon="check"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          shape="full"
          trailingIcon="arrow-drop-down"
        />
      </View>

      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} shape="full" variant="active" />
        <Chip
          label="Option"
          onPress={() => {}}
          shape="full"
          leadingIcon="check"
          variant="active"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          shape="full"
          trailingIcon="arrow-drop-down"
          variant="active"
        />
      </View>

      <View style={styles.chipRow}>
        <Chip label="Option" onPress={() => {}} variant="dark" />
        <Chip
          label="Option"
          onPress={() => {}}
          variant="dark"
          leadingIcon="check"
        />
        <Chip
          label="Option"
          onPress={() => {}}
          variant="dark"
          trailingIcon="arrow-drop-down"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomiseEventSheet = ({
  visible,
  onClose,
  onSelect,
  selectedPattern,
  presets,
}) => {
  //   const presets = [
  //     {
  //       id: 'custom',
  //       title: 'Choose Custom',
  //       description: 'Create your own colors & patterns',
  //       icon: 'add',
  //       bgColor: '#F5F5F5',
  //       type: 'custom',
  //     },
  //     {
  //       id: 'celebrations',
  //       title: 'Celebrations 🎉',
  //       description: 'Parties, Festivals, Anniversaries',
  //       bgColor: '#E6E6FF',
  //       pattern: 'pattern-1',
  //     },
  //     {
  //       id: 'sports',
  //       title: 'Sports & Gymming ⚽',
  //       description: 'Games, Competitions, Outdoor Activities',
  //       bgColor: '#FFF0E6',
  //       pattern: 'pattern-2',
  //     },
  //     {
  //       id: 'fun',
  //       title: 'Fun 🎮',
  //       description: 'Movies, Games, Dinner',
  //       bgColor: '#FFE6E6',
  //       pattern: 'pattern-3',
  //     },
  //     {
  //       id: 'work',
  //       title: 'Work 💼',
  //       description: 'Office Tasks, Projects, Deadlines',
  //       bgColor: '#E6F0FF',
  //       pattern: 'pattern-4',
  //     },
  //     {
  //       id: 'ideation',
  //       title: 'Ideation ✍️',
  //       description: 'Brainstorming, Innovation, Strategy',
  //       bgColor: '#FFE6E6',
  //       pattern: 'pattern-5',
  //     },
  //   ];

  const styles = StyleSheet.create({
    sheetHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    sheetTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000',
    },
    sheetSubtitle: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
    },
    sheetCloseButton: {
      padding: 8,
      backgroundColor: '#F5F5F5',
      borderRadius: 50,
    },
    sectionLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: '#666',
      marginBottom: 16,
      letterSpacing: 1,
    },
    presetItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 8,
    },
    presetIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      //   backgroundColor: 'white',
      overflow: 'hidden',
    },
    presetInfo: {
      flex: 1,
    },
    presetName: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000',
      marginBottom: 4,
    },
    presetDescription: {
      fontSize: 14,
      color: '#666',
    },
    presetIndicator: {
      marginLeft: 12,
    },
    sheetAction: {
      backgroundColor: '#1A1A1A',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 16,
    },
    sheetActionText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.bottomSheet}>
      <View style={styles.sheetHeader}>
        <View>
          <Text style={styles.sheetTitle}>Customise Event</Text>
          <Text style={styles.sheetSubtitle}>
            Select your preferred Colour & Pattern
          </Text>
        </View>
        <TouchableOpacity style={styles.sheetCloseButton} onPress={onClose}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>CUSTOM</Text>
        <TouchableOpacity
          style={[styles.presetItem, {backgroundColor: '#F5F5F5'}]}
          onPress={() => onSelect(presets[0])}>
          <View style={styles.presetIcon}>
            <Icon name="add" size={24} color="#000" />
          </View>
          <View style={styles.presetInfo}>
            <Text style={styles.presetName}>{presets[0].title}</Text>
            <Text style={styles.presetDescription}>
              {presets[0]?.description}
            </Text>
          </View>
          <Icon
            name="chevron-forward"
            size={24}
            color="#000"
            style={styles.presetIndicator}
          />
        </TouchableOpacity>

        <Text style={[styles.sectionLabel, {marginTop: 16}]}>PRESETS</Text>
        {presets.map(preset => (
          <TouchableOpacity
            key={preset.name}
            style={[
              styles.presetItem,
              {
                backgroundColor:
                  selectedPattern?.name === preset.name
                    ? preset.color2
                    : 'transparent',
              },
            ]}
            onPress={() => onSelect(preset)}>
            <View
              style={[
                styles.presetIcon,
                {
                  backgroundColor:
                    selectedPattern?.name !== preset.name
                      ? preset.color
                      : 'transparent',
                },
              ]}>
              <preset.pattern
                style={{width: 50, height: 50, resizeMode: 'contain'}}
              />
            </View>
            <View style={styles.presetInfo}>
              <Text style={styles.presetName}>{preset.name}</Text>
              <Text style={styles.presetDescription}>{preset.description}</Text>
            </View>
            {selectedPattern?.name === preset.name && (
              <Icon
                name="checkmark"
                size={24}
                color="#000"
                style={styles.presetIndicator}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.sheetAction} onPress={onClose}>
        <Text style={styles.sheetActionText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomiseEventSheet;

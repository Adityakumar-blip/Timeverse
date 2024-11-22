import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You'll need to install this package

const StatusIcon = ({status}) => {
  const getIconProps = () => {
    switch (status) {
      case 'received':
        return {name: 'call-received', color: '#4CAF50'};
      case 'sent':
        return {name: 'call-made', color: '#2196F3'};
      case 'missed':
        return {name: 'call-missed', color: '#F44336'};
      default:
        return {name: 'call', color: '#757575'};
    }
  };

  const iconProps = getIconProps();

  return (
    <View style={styles.iconContainer}>
      <Icon name={iconProps.name} size={16} color={iconProps.color} />
    </View>
  );
};

const CallComponent = ({
  imageUrl = 'https://cdn.dribbble.com/userupload/5031237/file/original-6437dbbd67caf21a7b3db07edc026b34.png?resize=1024x768',
  status,
  isStatus = true,
}) => {
  console.log('isStatus', isStatus);
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.profileImage} />
      {isStatus && <StatusIcon status={status} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 70,
    height: 70,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#E1E1E1',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CallComponent;

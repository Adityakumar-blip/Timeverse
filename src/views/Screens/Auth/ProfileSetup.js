/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from '../../../components/Button';
import InputField from '../../../components/Input';
import {useTheme} from '../../../../utils/ThemeContext';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import Chip from '../../../components/Chips';
import {useImagePicker} from '../../../../hooks/useImagePicker';

import BackIcon from '../../../assets/svg/back-icon.svg';

const ProfileSetup = () => {
  const {theme} = useTheme();
  const imagePicker = useImagePicker();
  const navigation = useNavigation();

  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePhoneSubmit = () => {
    if (phoneNumber) {
      setIsOtpScreen(true);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('login');
  };

  const handleProfileImage = async () => {
    const result = await imagePicker();
    if (result) {
      console.log('Selected image:', result);
      setSelectedImage(result);
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.coolGrey[1],
    },
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between',
    },
    topContent: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom: '40%',
    },
    backContainer: {
      position: 'absolute',
      top: 100,
      left: 20,
    },
    backButton: {
      backgroundColor: theme.colors.coolGrey[4],
      borderRadius: theme.spacing['4S'],
      height: theme.spacing['11XL'],
      width: theme.spacing['11XL'],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    heading: {
      color: theme.colors.coolGrey[12],
      fontSize: theme.typography.h3.fontSize,
      lineHeight: theme.typography.h4.lineHeight,
      fontFamily: theme.fontFamily.CGM,
      marginBottom: 10,
    },
    subtitle: {
      color: theme.colors.coolGrey[10],
      fontFamily: theme.fontFamily.SUPL,
      fontSize: theme.typography.paragraphS.fontSize,
      lineHeight: theme.typography.paragraphS.lineHeight,
      marginBottom: 20,
    },
    inputContainer: {
      marginTop: 20,
    },
    bottomContent: {
      marginBottom: 20,
    },
    trustContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    trust: {
      borderWidth: 2,
      borderColor: theme.colors.coolGrey[4],
      paddingVertical: theme.spacing['1XXXS'],
      paddingHorizontal: theme.spacing['2XXS'],
      color: theme.colors.coolGrey[11],
      fontFamily: theme.fontFamily.CGM,
      borderRadius: 100,
      height: theme.spacing['10L'],
      width: 219,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    chipView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    genderP: {
      fontFamily: theme.fontFamily.SUPL,
      color: theme.colors.coolGrey['12'],
      fontSize: theme.typography.paragraphXS.fontSize,
    },
    profileContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0,
      borderRadius: 100,
      padding: 12,
      backgroundColor: theme.colors.coolGrey[3],
      justifyContent: 'space-between',
      height: 80,
    },
    imageContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    pickerContainer: {
      backgroundColor: theme.colors.coolGrey[1],
      borderRadius: 120,
      width: 50,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileText: {
      fontSize: theme.typography.h6.fontSize,
      fontFamily: theme.fontFamily.CGM,
      color: theme.colors.coolGrey[11],
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackIcon />
          </TouchableOpacity>

          <Text style={styles.heading}>Let's Setup Your Profile</Text>
          <Text style={styles.subtitle}>
            Let us know more about you, Add more details about you
          </Text>
          <View>
            <View style={styles.profileContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: selectedImage?.uri || '',
                    }}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </View>
                <Text style={styles.profileText}>Upload a profile</Text>
              </View>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => handleProfileImage()}>
                <Icon
                  name="image-outline"
                  size={20}
                  color={theme.colors.coolGrey[12]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <InputField placeholder="Ex. Nicole tesla" label={'FULL NAME'} />
            <InputField
              placeholder="Choose Birth Date"
              label={'DATE OF BIRTH'}
            />
            <View>
              <Text style={styles.genderP}>PICK YOUR GENDER</Text>
              <View style={styles.chipView}>
                <Chip label="Male" onPress={() => {}} shape="full" />
                <Chip label="Female" onPress={() => {}} shape="full" />
                <Chip label="Others" onPress={() => {}} shape="full" />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContent}>
          <Button
            title={'CONTINUE'}
            variant="primary"
            size="large"
            onPress={() => navigation.navigate('create-pin')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSetup;

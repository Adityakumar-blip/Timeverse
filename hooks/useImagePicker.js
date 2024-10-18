import {Platform, PermissionsAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export const useImagePicker = () => {
  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }

    if (Platform.OS === 'android') {
      try {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return false;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();

    if (!hasPermission) {
      console.error('Gallery permission denied');
      return null;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return null;
      } else if (result.error) {
        console.error('ImagePicker Error: ', result.error);
        return null;
      } else {
        const selectedAsset = result.assets[0];
        return {
          uri: selectedAsset.uri,
          width: selectedAsset.width,
          height: selectedAsset.height,
          fileSize: selectedAsset.fileSize,
          type: selectedAsset.type,
          fileName: selectedAsset.fileName,
        };
      }
    } catch (error) {
      console.error('Error picking image:', error);
      return null;
    }
  };

  return pickImage;
};

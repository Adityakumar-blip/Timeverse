import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../../../utils/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../../../components/Input';
import CustomToggleRow from '../../../components/CustomToggleRow';
import Ionic from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

import SearchIcon from '../../../assets/svg/SearchIcon.svg';
import Google from '../../../assets/svg/Group.svg';
import SendIcon from '../../../assets/svg/send-2.svg';
import Video from '../../../assets/svg/Video.svg';
import UploadMedia from '../../../assets/svg/UploadMedia.svg';
import UploadMediaLight from '../../../assets/svg/UploadMediaLight.svg';
import Celebrations from '../../../assets/svg/Celebrations.svg';
import Dating from '../../../assets/svg/Dating.svg';
import {useState} from 'react';
import {Group} from 'lucide-react-native';
import RepeatView from './RepeatView';
import BottomSheet from '../../../components/BottomSheet';
import CustomiseEventSheet from './PresetsSheet';

const coverArray = [
  {
    name: 'Celebrations 🎉',
    description: 'Parties, Festivals, Anniversaries',
    pattern: Celebrations,
    color: '#6e56cf',
    color2: '#e4defc',
  },
  {name: 'Dating', pattern: Dating, color: '#e93d82', color2: '#541b33'},
];

const AddEvent = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();
  const {width, height} = Dimensions.get('window');

  const categoryData = [
    {
      id: 2,
      name: 'Fun & Entertainment',
      icon: '🎸',
      subCategories: [
        {id: 1, name: 'Socialising', icon: '🍻'},
        {id: 2, name: 'Hobbies', icon: '🎮'},
        {id: 3, name: 'Entertainment', icon: '🎭'},
        {id: 4, name: 'Sports', icon: '⚽'},
      ],
    },
    {
      id: 3,
      name: 'Care',
      icon: '👤',
      subCategories: [
        {id: 1, name: 'Self-Care', icon: '🛁'},
        {id: 2, name: 'Others', icon: '💝'},
        {id: 3, name: 'Support', icon: '🩺'},
        {id: 4, name: 'Professional', icon: '🏆'},
      ],
    },
    {
      id: 1,
      name: 'Work / Learning',
      icon: '💼',
      subCategories: [
        {id: 1, name: 'Professional', icon: '💻'},
        {id: 2, name: 'Educational', icon: '📚'},
        {id: 3, name: 'Chores', icon: '🧹'},
        {id: 4, name: 'Creative', icon: '🎨'},
      ],
    },
    {
      id: 4,
      name: 'Rest',
      icon: '💤',
      subCategories: [
        {id: 1, name: 'Sleep', icon: '🛏️'},
        {id: 2, name: 'Leisure', icon: '📖'},
        {id: 3, name: 'Meditation', icon: '🧘'},
        {id: 4, name: 'Detox', icon: '☕'},
      ],
    },
  ];

  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryData[0]);
  const [isRepeat, setIsRepeat] = useState(false);
  const [selectedCover, setSelectedCover] = useState(coverArray[0]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const toggleRepeat = () => setIsRepeat(prev => !prev);

  const renderSubCategories = category => {
    if (selectedCategory?.id !== category.id) return null;

    return (
      <View style={styles.subCategoryContainer}>
        {category.subCategories.map(subCategory => (
          <TouchableOpacity
            key={subCategory.id}
            style={styles.categoryItem}
            onPress={() => console.log(`Selected: ${subCategory.name}`)}>
            <Text style={styles.subCategoryIcon}>{subCategory.icon}</Text>
            <Text style={styles.subCategoryText}>{subCategory.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSelection = cover => {
    setSelectedCover(cover);
    setIsBottomSheetOpen(false);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
      padding: 12,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    backButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      height: 50,
      width: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '9%',
    },
    avatarContainer: {
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: 'max-content',
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 6,
    },
    avatarName: {
      fontFamily: theme.fontFamily.SUPB,
    },
    mainContainer: {
      marginTop: 64,
      marginBottom: 24,
    },
    gradientBorder: {
      borderRadius: 16,
    },
    coverText: {
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphS.fontSize,
      marginBottom: 16,
      textTransform: 'uppercase',
    },
    coverContainer: {
      height: 200,
      backgroundColor: theme.colors.coolGrey['3'],
      margin: 2,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    meetingText: {
      fontFamily: theme.fontFamily.SUPM,
      textTransform: 'uppercase',
      color: theme.colors.coolGrey['12'],
      fontSize: theme.typography.paragraphXS.fontSize,
    },
    mainCategoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: 'transparent',
      marginVertical: 2,
      marginHorizontal: 8,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 2,
      borderColor: theme.colors.coolGrey['4'],
      borderWidth: 1,
    },
    selectedCategory: {
      backgroundColor: 'transparent',
    },
    categoryIcon: {
      fontSize: 24,
      marginRight: 12,
    },
    categoryText: {
      fontSize: 16,
      fontWeight: '600',
    },
    subCategoryContainer: {
      marginBottom: 8,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    subCategoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: 'trans',
      marginTop: 4,
      borderRadius: 6,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 1,
    },
    subCategoryIcon: {
      fontSize: 20,
      marginRight: 10,
    },
    subCategoryText: {
      fontSize: 14,
    },
    categoryTitle: {
      fontFamily: theme.fontFamily.SUPM,
      textTransform: 'uppercase',
      marginVertical: 12,
    },
    attachmentTitle: {
      fontFamily: theme.fontFamily.SUPM,
      textTransform: 'uppercase',
      marginBottom: 12,
    },
    imagePickers: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    pickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      gap: 8,
    },
    attachmentContainer: {
      marginVertical: 10,
      marginBottom: 12,
      flexDirection: 'column',
      gap: 10,
    },
    coverContainer1: {
      height: 200,
      backgroundColor: theme.colors.coolGrey['3'],
      margin: 2,
      borderRadius: 16,
      marginTop: 12,
    },
    bottomContainer: {
      height: 120,
      backgroundColor: theme.colors.coolGrey['2'],
      justifyContent: 'center',
      alignItems: 'center',
    },
    plusContainer: {
      borderRadius: 100,
      padding: 6,
    },
    addCoverText: {
      color: theme.colors.coolGrey['12'],
      fontFamily: theme.fontFamily.CGM,
      fontSize: 18,
      marginTop: 10,
    },
    uploadText: {
      color: theme.colors.coolGrey['10'],
      fontFamily: theme.fontFamily.SUPM,
      fontSize: 14,
      marginTop: 4,
    },
    eventInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      width: '100%',
      // marginBottom: 16,
    },
    inputContainer: {
      flex: 1,
    },
    coverPreview: {
      width: 60,
      height: 65,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 0,
      marginTop: 5,
    },
    patternContainer: {
      width: '50%',
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    svgContainer: {
      position: 'absolute',
      opacity: 1,
      overflow: 'hidden',
    },
    svg: {
      resizeMode: 'contain',
    },
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainView')}>
          <Icon name="arrow-back" size={width * 0.06} color="#fff" />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <MaterialIcon name="account-circle" size={24} color="#fff" />
          <Text style={styles.avatarName}>Naren Kumar</Text>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <Text style={styles.coverText}>Cover</Text>
        <LinearGradient
          colors={['#6e57ce', '#33275e']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.gradientBorder]}>
          <View style={[styles.coverContainer]}>
            <LinearGradient
              colors={['#DFE2EC', '#A0A8C5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={[styles.plusContainer]}>
              <Feather
                name="plus"
                size={20}
                style={{color: theme.colors.coolGrey['1']}}
              />
            </LinearGradient>
            <Text style={styles.addCoverText}>Add Cover</Text>
            <Text style={styles.uploadText}>
              Click here to upload event cover
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View>
        <View style={styles.eventInput}>
          <View style={styles.inputContainer}>
            <InputField placeholder="Enter title" label={'Event title'} />
          </View>
          <Pressable
            onPress={() => setIsBottomSheetOpen(true)}
            style={styles.coverPreview}>
            <View
              style={[
                styles.coverPreview,
                {backgroundColor: selectedCover?.color},
              ]}>
              <View style={styles.patternContainer}>
                {/* {selectedCover?.pattern && (
                  <selectedCover.pattern style={{resizeMode: 'contain'}} />
                )} */}
                <View style={styles.svgContainer}>
                  <selectedCover.pattern style={styles.svg} />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
        <InputField
          type="textarea"
          placeholder="Enter your message"
          numberOfLines={8}
          label="description"
          // onChange={handleTextAreaChange}
        />
        <View>
          {isEnabled ? (
            <View>
              <Text style={styles.meetingText}>Online Meeting</Text>
              <CustomToggleRow
                label={'Open Meeting Link'}
                icon={<Google />}
                endComponent={<SendIcon />}
              />
            </View>
          ) : (
            <InputField
              placeholder="Search Location"
              label={'Add Location'}
              leadingIcon={<SearchIcon />}
            />
          )}
          <CustomToggleRow
            label={'Virtual Event'}
            icon={<Video />}
            endComponent={
              <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
                trackColor={{false: '#D3D3D3', true: '#34C759'}} // iOS-style colors
                thumbColor="#FFFFFF" // White thumb for iOS-style look
                ios_backgroundColor="#D3D3D3" // Fallback color for iOS
              />
            }
          />
        </View>
      </View>

      <View>
        <Text style={styles.categoryTitle}>Category</Text>
        <View style={styles.mainCategoryContainer}>
          {categoryData.map(category => (
            <View key={category.id}>
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  selectedCategory?.id === category.id &&
                    styles.selectedCategory,
                ]}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory?.id === category.id ? null : category,
                  )
                }>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View>
          <View>
            <Text style={styles.categoryTitle}>Subcategory</Text>
          </View>
          {renderSubCategories(selectedCategory)}
        </View>
      </View>

      <View style={styles.attachmentContainer}>
        <Text style={styles.attachmentTitle}>Attachments</Text>
        <View style={styles.imagePickers}>
          <View style={styles.pickerRow}>
            <Ionic name="image" />
            <Text>Open Gallery</Text>
          </View>
          <View style={styles.pickerRow}>
            <Icon name="folder-outline" />

            <Text>Files & Folders</Text>
          </View>
        </View>
        <View style={[styles.coverContainer1]}>
          <View style={styles.bottomContainer}>
            <UploadMedia />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.attachmentTitle}>Repeat</Text>
        <CustomToggleRow
          label={'Repeat This Event'}
          icon={<Ionic name="refresh" size={30} />}
          endComponent={
            <Switch
              value={isRepeat}
              onValueChange={toggleRepeat}
              trackColor={{false: '#D3D3D3', true: '#34C759'}} // iOS-style colors
              thumbColor="#FFFFFF" // White thumb for iOS-style look
              ios_backgroundColor="#D3D3D3" // Fallback color for iOS
            />
          }
        />
        <View>
          <RepeatView />
        </View>
        <BottomSheet
          visible={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          bgColor={'white'}
          title="Time Scale">
          <CustomiseEventSheet
            presets={coverArray}
            visible={isBottomSheetOpen}
            onClose={() => setIsBottomSheetOpen(false)}
            onSelect={pattern => setSelectedCover(pattern)}
            selectedPattern={selectedCover}
          />
        </BottomSheet>
      </View>
    </ScrollView>
  );
};

export default AddEvent;

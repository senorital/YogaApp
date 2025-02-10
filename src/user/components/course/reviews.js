import React, { memo,useRef,useEffect,useState } from 'react';
import { View, Text, ScrollView, StyleSheet,TextInput,TouchableOpacity,Image } from 'react-native';
import { Header } from '../../../common/header/header';
import images from '../../../styles/images';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import ReviewCard from '../../../instructor/components/reviews/reviewCard';
import globalStyles from '../../../styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import { launchImageLibrary } from 'react-native-image-picker';
import { screenHeight, screenWidth } from '../../../common/utils/util';
import Title from '../../../common/title/title';

const MemoizedReviewCard = memo(ReviewCard);

const CourseReviews = () => {
const [review, setReview] = useState('');
const bottomSheetModalRef = useRef(null);
const snapPoints = ["40%", "90%"];
const [photos, setPhotos] = useState([]);  
const baseWidth = 375; 
const baseIconSize = 15; 
const iconSize = (screenWidth / baseWidth) * baseIconSize;
const [rating, setRating] = useState(0);
const maxRating = 5;
  const reviewData = [
    {
      username: 'John Doe',
      rating: 4,
      date: 'Feb 5, 2019',
      reviewText: "The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7\" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.",
      avatar: images.avatar1,
    },
    {
      username: 'Jane Smith',
      rating: 5,
      date: 'Jan 15, 2020',
      reviewText: "The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7\" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.",
      avatar: images.avatar1,
    },
  ];
 
 
  const handlePresentModalPress = () => {
    console.log('Button pressed');
    bottomSheetModalRef.current.open();
  };



  const handleAddPhoto = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 3, 
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedPhotos = response.assets.map((asset) => ({
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
          fileName: asset.fileName,
        }));

        setPhotos((prevPhotos) => [...prevPhotos, ...selectedPhotos]);
      }
    });
  };



  return (
    <View style={globalStyles.container}>
        
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.reviewsHeader}>
         <Title title={'Rating & Reviews'} />
          <Text style={styles.allButton}>View All</Text>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingLeft}>
            <Text style={[styles.ratingNumber]}>4</Text>
            <Text style={styles.ratingText}>out of 5</Text>
          </View>
          <View style={styles.ratingRight}>
            {[4, 3, 2, 1].map((stars, index) => (
              <View key={index} style={styles.ratingRow}>
                <View
                  style={[
                    styles.starsContainer,
                    { marginLeft: index * 15},
                  ]}
                >
                  {[...Array(stars)].map((_, starIndex) => (
                    <FontAwesome
                      key={starIndex}
                      name="star"
                      size={iconSize}
                      color={colors.rating}
                    />
                  ))}
                </View>

                <View style={styles.ratingBarContainer}>
                  <View
                    style={[styles.ratingBar, { backgroundColor: '#C9C9C9' }]}
                  />
                  <View
                    style={[
                      styles.ratingBar,
                      {
                        width: `${(stars / 5) * 100}%`,
                        backgroundColor: colors.orange,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.reviewsHeader,{marginBottom:20}]}>
        <Title title={'145 Reviews'} />
  <TouchableOpacity style={styles.writeReviewButton} onPress={handlePresentModalPress}>
    <Image source={images.edit} style={styles.image} />
    <Text style={styles.buttonText}>Write a Review</Text>
  </TouchableOpacity>
</View>

        {reviewData.map((review, index) => (
          <ReviewCard
            key={index}
            username={review.username}
            rating={review.rating}
            date={review.date}
            reviewText={review.reviewText}
            avatar={review.avatar}
          />
        ))}
      </ScrollView>  
     

      <RBSheet
        ref={bottomSheetModalRef}
        height={screenHeight * 0.7}
        
        closeOnDragDown={true}
        customStyles={{
          container: styles.bottomSheetContainer
        
        }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>What is you rate?</Text>
  
          <View style={styles.stars}>
          {[...Array(maxRating)].map((_, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => setRating(index + 1)}
          activeOpacity={0.7}
        >
          <FontAwesome 
            name={index < rating ? 'star' : 'star-o'} 
            size={25} 
            color={colors.rating} 
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      ))}

            </View>
         
        
           <Text style={styles.studioName}>Please share your opinion about the product</Text>
            <View style={styles.studioCard}>
            <TextInput
        style={[styles.input]} 
        placeholder="Enter your Review"
        placeholderTextColor={colors.grey}
        multiline={true}
        value={review}
        onChangeText={setReview}
      />
            </View>   
             <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
             {photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo.uri }}
            style={styles.photo}
          />
        ))}
        <TouchableOpacity style={[styles.camera,{marginLeft:'auto'}]} onPress={handleAddPhoto}>

        <Image source={images.addPhoto} style={globalStyles.camera}/>  
          <Text style={styles.add}>Add your photos</Text>
        </TouchableOpacity>
      </ScrollView>
            <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>SEND REVIEW</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};


 

const styles = StyleSheet.create({
input: {fontSize: fonts.sizes.semismall,color: '#333',fontFamily:fonts.families.primary},
stars :{flexDirection:'row',marginVertical:10},    
camera : {backgroundColor:'#FAFAFA',padding:12,borderRadius:10,height:100,justifyContent:'center',alignItems:'center'},    
photo: { width: 100, height: 100, borderRadius: 10,marginRight: 10},    
scrollView: {flexDirection: 'row',flex:1},
bottomSheetContainer: {borderTopLeftRadius: 20, borderTopRightRadius: 20,backgroundColor:'#F9F9F9'},  
image :{ width:18,height:18,resizeMode:'contain',alignItems:'center'} , 

text :{fontFamily:fonts.families.primary,fontSize:fonts.sizes.small},
writeReviewButton: {flexDirection: 'row',alignItems: 'center',backgroundColor: colors.purple300,padding: 10,borderRadius: 20,justifyContent: 'space-between',alignItems:'center' },
buttonText: {fontSize: fonts.sizes.small,color: '#fff',marginLeft: 5,fontFamily:fonts.families.primary,textAlign:'center'},
allButton: {fontFamily: fonts.families.primary,fontSize: fonts.sizes.small,color: colors.themelight,},
reviewsHeader: {flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginVertical:10},
reviewsCount: {fontSize: fonts.sizes.medium,fontFamily: fonts.families.secondary,color: colors.themelight},
ratingNumber: {fontFamily: fonts.families.secondary,fontSize: 50,textAlign: 'center',},
ratingContainer: {flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'},
ratingLeft: {flex: 1},
ratingText: {fontSize: fonts.sizes.regular,fontFamily: fonts.families.primary,textAlign: 'center',marginTop: -10,},
ratingRight: {flexDirection: 'column',alignItems: 'flex-start',},
ratingRow: {flexDirection: 'row',alignItems: 'center',marginBottom: 5,},
starsContainer: {flexDirection: 'row',marginRight: 10},
ratingBarContainer: {width: screenWidth * 0.4,height: 5,backgroundColor: '#C9C9C9',borderRadius: 2,position: 'relative'},
ratingBar: {position: 'absolute',top: 0,left: 0,height: 5,borderRadius: 2},
bottomSheetContainer: { borderTopLeftRadius: 20,borderTopRightRadius: 20},
modalContent: { paddingHorizontal:20,paddingVertical:10,justifyContent:'center',alignItems:'center'},
modalTitle: {fontSize: fonts.sizes.regular,fontFamily: fonts.families.bold,marginVertical: 10},
studioCard: {width:300,height:150,backgroundColor:colors.white,borderRadius:10,elevation:2,marginBottom:10},
studioName: { fontSize: fonts.sizes.regular, fontFamily: fonts.families.secondary,width:'80%',textAlign:'center',marginVertical:10 },
studioAddress: {fontSize: fonts.sizes.small,fontFamily: fonts.families.light,color: colors.themelight,},
arrowIcon: {position: 'absolute',right: 0},
add:{fontFamily:fonts.families.primary,fontSize:fonts.sizes.small,color:colors.rating,marginVertical:10,textAlign:'center'},
addButton : {backgroundColor:colors.purple300,borderRadius:20,borderColor:colors.theme,borderWidth:1,padding:10,width:'100%',marginVertical:20},

});

export default CourseReviews;

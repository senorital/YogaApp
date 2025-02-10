import React,{useState} from "react";
import { StyleSheet,View,Text, SafeAreaView,Image,FlatList, TouchableOpacity } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { Header } from "../../../common/header/header";
import images from "../../../styles/images";
import Title from "../../../common/title/title";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import IconCard from "../../../common/cards/IconCard";
import { screenHeight, screenWidth } from "../../../common/utils/util";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import IconCardList from "../../../common/cards/IconCard";
import CourseFlipCard from "../../../common/cards/flipCard";
import Button from "../../../common/button/button";
import CourseReviews from "./reviews";
import Video from "react-native-video";
import Ionicons from "react-native-vector-icons/Ionicons";

const Cards = ({text,image,desc}) => {

    return(
        <TouchableOpacity style={styles.row}>
        <Image source={image} style={globalStyles.camera}/>
        <View style={styles.column}>
        <Text style={styles.containerText}>{text}</Text>
        <Text style={[globalStyles.small]}>{desc}</Text>
        </View>
        <FontAwesome name="angle-right" size={25} color={colors.darkGrey100} style={{position:'absolute',right:10}} />
    
        </TouchableOpacity>
    );    
    };

const data = [
    { id: "1", text: "15 Videos", image: images.copy },
    { id: "2", text: "50 hrs", image: images.alarm_clock },
    { id: "3", text: "Lifetime Access", image: images.infinite },
    { id: "4", text: "Beginner", image: images.layers },
    { id: "5", text: "", image: images.medal },
    { id: "6", text: "Money-Back Guarantee", image: images.money_round },
  ];

const cardsData = [
    { id: "1", text: "Pallavi", image: images.avatar_3, desc :"Small description which we show" },
    { id: "2", text: "50 hrs", image: images.alarm_clock, desc :"Small description which we show" },
    { id: "3", text: "Lifetime Access", image: images.infinite,desc :"Small description which we show" },
    { id: "4", text: "Beginner", image: images.layers, desc :"Small description which we show" },
    { id: "5", text: "", image: images.medal,desc :"Small description which we show" },
    { id: "6", text: "Money-Back Guarantee", image: images.money_round ,desc :"Small description which we show" },
  ];

const FirstTab = () => {
    return (
        <View style={styles.scene}>
        <FlatList
          ListHeaderComponent={
            <>
              <Title title={"Description"} />
              <Text style={globalStyles.medium}>
                How to decrease body fat by doing these yoga asanas. This asana will help
                you reduce weight without any disadvantages. Learn more.
              </Text>
    
              <Title title={"Yoga Poses"} />
            </>
          }
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <IconCardList text={item.text} image={item.image} />}
          numColumns={3}
          ListFooterComponent={
            <>
              <Title title={"Instructors"} />
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Cards text={"Pallavi Srivastava"} image={images.avatar_3} desc={"Small description"} />
                )}
                numColumns={1}
              />
             
            </>

          }
        />
       
        </View>
      );
    };


  
  const SecondTab = () => (
    <View style={[styles.scene]}>
   <CourseFlipCard
  text="Yoga Basics"
  desc="Learn the basics of yoga through these videos."
  image={images.avatar_3}
  videosList={[
    { id: 1, question: "Introduction to Yoga", time: 5 },
    { id: 2, question: "Breathing Techniques", time: 8 },
    { id: 3, question: "Basic Poses", time: 10 },
  ]}
/>  
<CourseFlipCard
  text="Yoga Basics"
  desc="Learn the basics of yoga through these videos."
  image={images.avatar_3}
  videosList={[
    { id: 1, question: "Introduction to Yoga", time: 5 },
    { id: 2, question: "Breathing Techniques", time: 8 },
    { id: 3, question: "Basic Poses", time: 10 },
  ]}
/>   

</View>
  );
  
  const ThirdTab = () => (
    <View style={[styles.scene]}>
     <CourseReviews /> 
    </View>
  );

const CourseDetails = () => {
const layout = screenWidth;
const [index, setIndex] = useState(0);
const [routes] = useState([
      { key: "first", title: "OverView" },
      { key: "second", title: "Lessons" },
      { key: "third", title: "Reviews" },
    ]);    
const renderScene = SceneMap({
        first: FirstTab,
        second: SecondTab,
        third: ThirdTab,
      });

return(
    <GestureHandlerRootView>
    <SafeAreaView style={globalStyles.container}>
     <Header title={'Course Detail'} icon={images.back} />
     {/* <View style={globalStyles.flex}> */}
     <View style={globalStyles.flex}>
     <Title title={'Introduction'} />
     <View style={styles.videoContainer}>
     <Video
      source={{ uri: 'https://www.youtube.com/watch?v=IwaHGZ6_uSE&list=RDIwaHGZ6_uSE&start_radio=1' }}
      style={styles.video}
      controls
      resizeMode="cover"
          />
    
    </View>
     </View>
     <TabView
     navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{marginHorizontal:20}}
        initialLayout={{ width: layout.width, height:screenHeight }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            
            renderLabel={({ route, focused }) => (
              <Text
                style={[
                  styles.labelStyle,
                  {
                    color: focused ? colors.brown200 : colors.grey200, // Active: White, Inactive: Grey
                  }
                ]}
              >
                {route.title}
              </Text>
            )}
            
            inactiveColor={colors.grey200}
            activeColor={colors.brown200}
            style={[
              styles.tabBar,
            ]}
            indicatorStyle={{ backgroundColor: colors.lightOrange300,height:'80%', borderRadius: 20,width:'30%',margin:5}}
          />
        )}
      />

<View style={styles.footerContainer}>
              <Button
                text="Enroll Now"
                icon={images.arrow}
                // onPress={handleRegister}
                buttonStyle={{ backgroundColor: colors.purple300 }}
                textStyle={{ fontSize: fonts.sizes.medium }}
                iconStyle={{ tintColor: colors.white }}
              />
             
            </View>

    </SafeAreaView>
    </GestureHandlerRootView>
);   
};

const styles=StyleSheet.create({
video: { width: "100%",height: 200,borderRadius: 10, overflow: "hidden"},
videoContainer: {marginTop: 10,borderRadius: 10,backgroundColor:colors.white, overflow: "hidden",borderColor:colors.grey300,borderWidth:1,padding:15},    
containerText :{fontFamily:fonts.families.secondary,fontSize:fonts.sizes.regular},
column :{flexDirection:'column',marginLeft:20},
row :{flexDirection:'row',alignItems:'center',padding:10,borderColor:colors.grey300,borderWidth:1,borderRadius:20,marginVertical:10},
tabBar: {backgroundColor: "white",elevation: 2, borderRadius:12,marginVertical:10,overflow:'hidden',margin:4,padding:3},
tabStyle:{fontFamily:fonts.families.primary,fontSize:fonts.sizes.semismall},    
scene: { flex: 1,color:colors.black },
footerContainer: {width: "80%",alignSelf: "flex-end",paddingHorizontal: 20,position:'relative',bottom:0},
labelStyle :{fontFamily:fonts.families.secondary,fontSize:fonts.sizes.large,color:colors.black},
});
export default CourseDetails;
import React from "react";
import { StyleSheet,View,Text,FlatList } from "react-native";
import { SearchBar } from "react-native-screens";
import Search from "../../../common/searchBar/search";
import InstructorCard from "../../../common/cards/instructorCard";
import globalStyles from "../../../styles/globalStyles";
import { Header } from "../../../common/header/header";
import images from "../../../styles/images";
import ResultCard from "./resultCard";
const SearchResult = () => {
    const instructorData = [
        { id: 1, text: 'Ankush Gupta' , exp : '5' , slot: '5', profile:'Yoga Instructor' , description : 'Dedicated yoga instructor with a passion for helping individuals achieve balance, flexibility, and strength. Specializing in [insert specialization, e.g., Hatha Yoga'},
        { id: 2, text: 'Ankush Gupta' , exp : '5' , slot: '5', profile:'Yoga Instructor' , description : 'Dedicated yoga instructor with a passion for helping individuals achieve balance, flexibility, and strength. Specializing in [insert specialization, e.g., Hatha Yoga'},
    ]; 
    
    const renderInstructor = ({item}) =>  <View style={{flex:1}}><ResultCard text={item.text} exp={item.exp} slot={item.slot} profile={item.profile} description={item.description}/></View>;

return(
    <View style={globalStyles.container}>
     <Header title={'Search results'} icon={images.back} /> 
     <View style={globalStyles.flex}> 
     <Search /> 
     <View style={{marginTop:10}}>  
    <FlatList
     data={instructorData}
     renderItem={renderInstructor}
     keyExtractor={(item) => item.id.toString()}
     contentContainerStyle={styles.flatList}
     ItemSeparatorComponent={() => <View style={styles.cardSeparator} />} 
    
     />
     </View>  
     </View>     
    </View>
);
};

const styles = StyleSheet.create({

});

export default SearchResult;
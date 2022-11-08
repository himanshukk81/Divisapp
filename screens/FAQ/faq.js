import React, { useEffect , useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Image
} from "react-native";
import { faqCategories, faqQuestions } from "../../services/Api";
import Color from "../../utility/Color";

const FaqPage =(props) =>{
    const [isLoading , setLoading ] = useState(true);
    const [categories , setCategories ] = useState([]);
    const [questions , setFaqQuestions ] = useState([]);
    const [refresh , refreshList ] = useState(new Date());
    const [allQuestions , setAllQuestions ] = useState([]);
    const [faqIcons , setFAQIcons ] = useState([require('../../assets/images/faq/conversation.png'),require('../../assets/images/faq/user.png'),require('../../assets/images/faq/trade.png'),require('../../assets/images/faq/info.png')]);


    useEffect(async ()  =>{ 
        setLoading(true)
        getFaqCategory();
    },[]);
    
    const getFaqCategory =()=>{
        faqCategories().then((response)=>{
            let categories1 = response?.data;
            categories1 = categories1.map((category,index)=>{
                category.active = false;
                return category;
            })
            categories1[0]['active'] = true;
            setCategories(categories1);
            getFaqQuestions(categories1);

        }).catch((error)=>{
            setLoading(false);
            setCategories([]);
        })
    }
    const getFaqQuestions =(categories)=>{
        faqQuestions().then((response)=>{
            let questions = response?.data;
            setAllQuestions(response?.data)

            questions = questions.map((question)=>{
                question.active = false;
                return question;
            })
            // setFaqQuestions(questions);
            filterQuestions(categories,response?.data);
            setLoading(false);

        }).catch((error)=>{
            setLoading(false);
            setFaqQuestions([]);
        })
    }
    const filterQuestions = (categories,allQuestions) =>{
        
        let activeCategory = categories.find((category=>category.active === true));
        let filteredQuestions = allQuestions.filter((question)=>{
            return question.category_id === activeCategory.id
        });
        setFaqQuestions(filteredQuestions);
        refreshList(new Date());

    }
    const renderCategories = ({item,index}) =>{
        return(
            <View style={{paddingHorizontal:20}}>
                <TouchableOpacity onPress={()=>{
                    let categories_modifed = categories.map((category)=>{
                        category.active = false;
                        return category;
                    })
                    categories_modifed[index].active = !categories[index].active;
                    setCategories(categories_modifed);
                    filterQuestions(categories_modifed,allQuestions)
                    refreshList(new Date());
                }}>
                    <View style={categories[index] && categories[index].active?[styles.cardContainer,{backgroundColor:Color.theme} ]:[styles.cardContainer,{backgroundColor:Color.white}]}>
                            <Image
                                source={faqIcons[index]}
                                style={{ height: 35.0, width: 35.0,marginHorizontal:3}}
                                resizeMode="contain"
                            />

                        <Text style={(categories[index] && categories[index].active)?[styles.labelColor,{textAlign:'center',color:Color.white}]:[styles.labelColor,{textAlign:'center'}]}>{categories[index]?.category}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const renderFAQuestions = ({item,index}) =>{
        return(
            <View style={{paddingHorizontal:20}}>
                <View style={styles.cardQuestionContainer}>
                    <TouchableOpacity onPress={()=>{
                        questions[index].active = !questions[index].active;
                        setFaqQuestions(questions);
                        refreshList(new Date());
                    }}>
                        <Text style={[styles.labelColor,{marginHorizontal:12}]}>{questions[index]?.question}</Text>
                    </TouchableOpacity>
                    {questions[index] && questions[index].active &&<View style={{marginVertical:10}}>
                        <Text style={[styles.labelColor,{marginHorizontal:14}]}>{questions[index]?.answer}</Text>
                    </View>}
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={'#111'} />
            {isLoading &&
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color={Color.theme}  />
                </View>
            }

            <View style={styles.title}>
                <Text style={[styles.labelColor ,{fontSize:17,fontWeight:'bold'}]}>
                    Preguntas Frecuentes
                </Text>
            </View>
            <ScrollView>
                <View>
                    <FlatList
                            data={categories}
                            renderItem={renderCategories}
                            extraData={refresh}
                            // keyExtractor={item => item.id}
                    />
                </View>
                <View>
                    <FlatList
                            data={questions}
                            renderItem={renderFAQuestions}
                            extraData={refresh}
                            // keyExtractor={item => item.id}
                    />
                </View>
            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    labelColor:{
        color:Color.black,
        fontSize:16
    },
    title:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15
    },
    cardContainer:{
        // backgroundColor:Color.white,
        borderRadius:3,
        marginVertical:2,
        paddingVertical:30,
        flexDirection:'column',
        alignItems:'center'
        // paddingHorizontal:15
    },
    cardQuestionContainer:{
        backgroundColor:Color.white,
        borderRadius:3,
        marginVertical:15,
        // paddingVertical:10,
        paddingHorizontal:30
    }
});

export default FaqPage;


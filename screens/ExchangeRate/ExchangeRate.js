import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator,Text,Dimensions,
    ScrollView,
    StyleSheet,processColor, useWindowDimensions
} from "react-native";
import {LineChart,ScatterChart} from 'react-native-charts-wrapper';
import Color from "../../utility/Color";
import { WebView } from 'react-native-webview';
import Constant from "../../utility/Constant";
import { getRates } from "../../services/Api";

const ExchangeRate = (props) => {
    const [scatterData2 , setScatterData] = useState(null);
    const [lineChartData , setLineChartData] = useState(null);
    const [isLoading , setLoading] = useState(true);
    const [graphData , setGraphData] = useState(null);

    useEffect(()=>{
        // updateGraphValues(response2);
        // return;
        getRates().then((response)=>{
            setGraphData(response)
            updateGraphValues(response);
        }).catch((error)=>{
            setLoading(false);
        })
    },[]);

    const updateGraphValues= (response)=>{
        console.log({responseData:response})
        var graphData={
            hourlyBuyRate:[],
            hourlySellRate:[],
            hourlyLabelXaxis:[],
            dailyBuyRate:[],
            dailySellRate:[],
            dailyLabelXaxis:[]
        }
        
        // let hMin = response2?.rate_?.h_min;

        for(var i=0;i<response.today_hour.length;i++){
            graphData.hourlyLabelXaxis.push(response.today_hour[i].hour_txt);
            graphData.hourlyBuyRate.push({y:response.today_hour[i].buy_rate,x:i });
            graphData.hourlySellRate.push({y:response.today_hour[i].sell_rate ,x:i});
        }
        
        // for daily data
        for(var i=0;i<response.daily.length;i++){
            // graphData.dailyLabelXaxis.push(response.daily[i]?.day+3);
            // graphData.dailyBuyRate.push({y : response.daily[i].buy_rate?response.daily[i].buy_rate:0 , x : response.daily[i]?.day+3});
            // graphData.dailySellRate.push({y : response.daily[i].sell_rate?response.daily[i].sell_rate:0 , x : response.daily[i]?.day+3});
            graphData.dailyBuyRate.push({y : response.daily[i].buy_rate?response.daily[i].buy_rate:0 , x : response.daily[i]?.day+2});
            graphData.dailySellRate.push({y : response.daily[i].sell_rate?response.daily[i].sell_rate:0 , x : response.daily[i]?.day+2});
        }

        console.log("da,,");
        console.log(JSON.stringify(graphData));
        const scatterData = {
            data: {
                dataSets: [
                        {
                            // values: xData,
                            values:graphData.dailyBuyRate,
                            // values:(graphData.dailyBuyRate && graphData.dailyBuyRate.length)?graphData.dailyBuyRate:[{y:1,x:1},{y:2,x:2}],
                            label:"Compra",
                            config: {
                                color: processColor('green'),
                                scatterShape: 'CIRCLE',
                                scatterShapeSize: 25,
                            }
                        }, 

                        {
                            values: graphData.dailySellRate,
                            // values: (graphData.dailySellRate && graphData.dailySellRate.length)? graphData.dailySellRate:[{y:3,x:3},{y:4,x:4}],
                            label: 'Venta',
                            config: {
                                color: processColor('blue'),
                                scatterShape: 'CIRCLE',
                                scatterShapeSize: 15,
                                // scatterShapeHoleRadius: 6,
                                // scatterShapeHoleColor: processColor('teal')
                            }
                    
                        },
                        // {
                        //     data:[20]
                        // },
                        // {
                        //     data:[50]
                        // }
            ],
                labels:['edd','ff']
                
              },
            legend: {
                enabled: true,
                textSize: 16,
                form: 'CIRCLE',
                wordWrapEnabled: true,
                horizontalAlignment:'RIGHT'
            },
            marker: {
                enabled: true,
                // type: 'com.github.reactNativeMPAndroidChart.example.marker.OvalBlueMarker'
            },
            xAxis: {
                // valueFormatter: graphData.dailyLabelXaxis,
                granularityEnabled: true,
                granularity : 1,
                position:"BOTTOM",
                // visibleRange:{
                //     x:{
                //         min:8,
                //         max:8,
                //     }
                // }
            }
        }
        const lineGraphData ={
            data:{
                dataSets:[
                    {
                        
                        label: "Venta", 
                        values:graphData.hourlySellRate,
                        config:{
                            color:processColor("blue")
                        }
                    },
                    {
                        label: "Compra", 
                        values:graphData.hourlyBuyRate,
                        config:{
                            color:processColor("green")
                        }
                    }
                ]
            },
            xAxis: {
                valueFormatter: graphData.hourlyLabelXaxis,
                // granularityEnabled: true,
                // granularity : 1,
                position:"BOTTOM"
              }
        }
        console.log("linechartt:::::")
        console.log(JSON.stringify(lineGraphData));
        setScatterData(scatterData);
        setLineChartData(lineGraphData);
        setLoading(false);

    }
   
    
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#bdd8fc' }}>
            <StatusBar backgroundColor={'#111'} />

                {isLoading?<View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
                    <ActivityIndicator size="large" color={Color.theme} />
                </View>:
                <View style={styles.mainContainer}>
                    <ScrollView nestedScrollEnabled={true}>
                        <View style={{marginTop:20}}></View>
                        {lineChartData?.data &&  
                        <View style={styles.container}>

                            <Text style={{textAlign:'center',fontWeight:'bold',color:'#444',marginVertical:7}}>Tipo de Cambio del Día</Text>
                            <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'center',marginVertical:10}}>
                                <View><Text style={{color:'#444'}}><Text style={{fontWeight:'bold'}}>Divisapp</Text><Text>{' '}</Text> <Text>Actualización cada hora</Text></Text></View>
                                <View><Text style={{color:'#444'}}>Tipo de cambio promedio de ayer  <Text style={{fontWeight:'bold'}}>{graphData?.lastday?.rate}</Text></Text></View>
                            </View>
                            <LineChart style={styles.chart}
                                data={lineChartData.data}
                                xAxis={lineChartData.xAxis}
                                yAxis={{
                                        left: { axisMinimum:graphData?.rate_?.h_min ,axisMaximum:graphData?.rate_?.h_max },
                                        right: { enabled: false},
                                    }}
                                chartDescription={{ text: '' }}
                            />
                        </View>}

                        <View style={{marginBottom:30}}></View>
                        
                        <View style={styles.container}>
                            <Text style={{textAlign:'center',fontWeight:'bold',color:'#444'}}>Tipo de Cambio del Mes</Text>
                            
                            <Text style={{fontWeight:'bold',color:'#444'}}>
                                <Text style={{fontWeight:'bold'}}> Divisapp</Text>
                                <Text>{' '}</Text>
                                <Text>Actualización diaria</Text>
                            </Text>

                            {(scatterData2 && scatterData2.data) && <ScatterChart
                                style={styles.chart}
                                data={scatterData2.data}
                                legend={scatterData2.legend}
                                marker={scatterData2.marker}
                                xAxis={scatterData2.xAxis}
                                yAxis={{
                                    left: { axisMinimum:graphData?.rate_?.d_min ,axisMaximum:graphData?.rate_?.d_max }, //=> enabled is the key not enable
                                    right: { enabled: false},
                                
                                    }}
                                drawValues={false}
                                chartDescription={{ text: '' }}
                                
                            />}
                            
                        </View>

                        <View style={{paddingHorizontal:5,marginVertical:20}}>
                            <Text  style={{textAlign:'center',fontWeight:'bold',color:'#444',marginVertical:10}}>Tipo de Cambio Histórico</Text>
                            <WebView 
                                style={{
                                    width: Constant.width-40,
                                    height: Constant.height/2
                                }}
                                source={{ uri: 'https://sslcharts.forexprostools.com/index.php?force_lang=1&pair_ID=2177&timescale=1800&candles=50&style=candles' }} 
                                // nestedScrollEnabled={true}
                            />
                        </View>

                        <View style={{paddingHorizontal:5,marginVertical:20}}>
                            <Text style={{textAlign:'center',fontWeight:'bold',color:'#444',marginVertical:10}}>Principales Monedas</Text>
                                <ScrollView  showsHorizontalScrollIndicator={true}> 
                                    <WebView 
                                        style={{
                                            width: Constant.width-50,
                                            height: Constant.height/2
                                        }}
                                        source={{ uri: 'https://www.widgets.investing.com/live-currency-cross-rates?theme=lightTheme&roundedCorners=true&pairs=2086,2110,2112,2124,2126,2177' }} 
                                        
                                        nestedScrollEnabled={true}
                                        
                                    />
                                </ScrollView>
                        </View>

                    </ScrollView> 

                </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height:Constant.height/2,
        paddingHorizontal:30,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    },
    mainContainer:{
        flex:1,
        backgroundColor:'#e1e8f2',
        paddingHorizontal:20
    }
});

export default ExchangeRate;
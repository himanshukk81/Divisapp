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

    let response2 = {
        "today_hour": [
            {
                "hour": 9,
                "hour_txt": "09 AM",
                "rate": 3.9565,
                "buy_rate": 3.94075,
                "sell_rate": 3.97225
            },
            {
                "hour": 10,
                "hour_txt": "10 AM",
                "rate": 3.9595000000000002,
                "buy_rate": 3.95075,
                "sell_rate": 3.9682500000000003
            },
            {
                "hour": 11,
                "hour_txt": "11 AM",
                "rate": 3.9619999999999997,
                "buy_rate": 3.95275,
                "sell_rate": 3.97125
            },
            {
                "hour": 12,
                "hour_txt": "12 PM",
                "rate": 3.96,
                "buy_rate": 3.951,
                "sell_rate": 3.969
            }
        ],
        "daily": [
            {
                "day": 1,
                "rate": 3.99337,
                "buy_rate": 3.97835,
                "sell_rate": 4.0084
            },
            {
                "day": 2,
                "rate": 4.01006,
                "buy_rate": 3.99901,
                "sell_rate": 4.0211
            },
            {
                "day": 3,
                "rate": 4.01226,
                "buy_rate": 4.002,
                "sell_rate": 4.02252
            },
            {
                "day": 4,
                "rate": 4.01156,
                "buy_rate": 3.99954,
                "sell_rate": 4.02358
            },
            {
                "day": 5,
                "rate": 4.01286,
                "buy_rate": 4.00184,
                "sell_rate": 4.02388
            },
            {
                "day": 6,
                "rate": 4.0085,
                "buy_rate": 3.9943,
                "sell_rate": 4.0227
            },
            {
                "day": 7,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 8,
                "rate": 4.01465,
                "buy_rate": 4.00345,
                "sell_rate": 4.02585
            },
            {
                "day": 9,
                "rate": 4.01782,
                "buy_rate": 4.00558,
                "sell_rate": 4.03029
            },
            {
                "day": 10,
                "rate": 4.0257,
                "buy_rate": 4.01333,
                "sell_rate": 4.03807
            },
            {
                "day": 11,
                "rate": 4.01993,
                "buy_rate": 4.00822,
                "sell_rate": 4.03165
            },
            {
                "day": 12,
                "rate": 4.02028,
                "buy_rate": 4.00625,
                "sell_rate": 4.0343
            },
            {
                "day": 13,
                "rate": 4.01982,
                "buy_rate": 4.00641,
                "sell_rate": 4.03322
            },
            {
                "day": 14,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 15,
                "rate": 4.00085,
                "buy_rate": 3.98512,
                "sell_rate": 4.01657
            },
            {
                "day": 16,
                "rate": 3.99828,
                "buy_rate": 3.98456,
                "sell_rate": 4.01199
            },
            {
                "day": 17,
                "rate": 4.00493,
                "buy_rate": 3.99214,
                "sell_rate": 4.01772
            },
            {
                "day": 18,
                "rate": 4.021,
                "buy_rate": 4.00841,
                "sell_rate": 4.03358
            },
            {
                "day": 19,
                "rate": 4.01366,
                "buy_rate": 4.0001,
                "sell_rate": 4.02721
            },
            {
                "day": 20,
                "rate": 4.011,
                "buy_rate": 3.9956,
                "sell_rate": 4.0264
            },
            {
                "day": 21,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 22,
                "rate": 4.01402,
                "buy_rate": 4.00069,
                "sell_rate": 4.02735
            },
            {
                "day": 23,
                "rate": 4.01146,
                "buy_rate": 3.99743,
                "sell_rate": 4.02549
            },
            {
                "day": 24,
                "rate": 4.02225,
                "buy_rate": 4.00967,
                "sell_rate": 4.03483
            },
            {
                "day": 25,
                "rate": 4.02933,
                "buy_rate": 4.01652,
                "sell_rate": 4.04213
            },
            {
                "day": 26,
                "rate": 4.04019,
                "buy_rate": 4.02735,
                "sell_rate": 4.05302
            },
            {
                "day": 27,
                "rate": 4.04231,
                "buy_rate": 4.02844,
                "sell_rate": 4.05617
            },
            {
                "day": 28,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 29,
                "rate": 4.05495,
                "buy_rate": 4.04219,
                "sell_rate": 4.06771
            },
            {
                "day": 30,
                "rate": 4.06297,
                "buy_rate": 4.04942,
                "sell_rate": 4.07651
            },
            {
                "day": 1,
                "rate": 3.98235,
                "buy_rate": 3.97021,
                "sell_rate": 3.9944800000000003
            },
            {
                "day": 2,
                "rate": 3.96608,
                "buy_rate": 3.9508799999999997,
                "sell_rate": 3.98127
            },
            {
                "day": 3,
                "rate": 3.97254,
                "buy_rate": 3.96098,
                "sell_rate": 3.9840999999999998
            }
        ],
        "lastday": {
            "day": 3,
            "rate": 3.97254,
            "buy_rate": 3.96098,
            "sell_rate": 3.9840999999999998
        },
        "rate_": {
            "h_min": 3.8982500000000004,
            "h_max": 4.00275,
            "d_min": 3.91127,
            "d_max": 4.099419999999999
        }
    }
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
        
        let hMin = response2?.rate_?.h_min;

        for(var i=0;i<response.today_hour.length;i++){
            graphData.hourlyLabelXaxis.push(response.today_hour[i].hour_txt);
            // graphData.hourlyBuyRate.push({x:response.today_hour[i].buy_rate , y:hMin+i*0.1 });
            // graphData.hourlySellRate.push({x:response.today_hour[i].sell_rate , y:hMin+i*0.1});
            graphData.hourlyBuyRate.push({y:response.today_hour[i].buy_rate,x:i });
            graphData.hourlySellRate.push({y:response.today_hour[i].sell_rate ,x:i});
        }
        
        // for daily data
        for(var i=0;i<response.daily.length;i++){
            graphData.dailyLabelXaxis.push(response.daily[i]?.day+3);
            graphData.dailyBuyRate.push({y : response.daily[i].buy_rate?response.daily[i].buy_rate:0 , x : response.daily[i]?.day+3});
            graphData.dailySellRate.push({y : response.daily[i].sell_rate?response.daily[i].sell_rate:0 , x : response.daily[i]?.day+3});
        }

        const scatterData = {
            data: {
                dataSets: [{
                            // values: xData,
                            values:graphData.dailyBuyRate,
                            // values:(graphData.dailyBuyRate && graphData.dailyBuyRate.length)?graphData.dailyBuyRate:[{y:1,x:1},{y:2,x:2}],
                            label:"Compra",
                            config: {
                                color: processColor('gray'),
                                scatterShape: 'CIRCLE'
                            }
                         }, 
                        {
                            values: graphData.dailySellRate,
                            // values: (graphData.dailySellRate && graphData.dailySellRate.length)? graphData.dailySellRate:[{y:3,x:3},{y:4,x:4}],
                            label: 'Venta',
                            config: {
                                color: processColor('blue'),
                                scatterShape: 'CIRCLE',
                                // scatterShapeHoleRadius: 6,
                                // scatterShapeHoleColor: processColor('teal')
                            }
                    
                }],
                labels:['edd','ff']
                
              },
            legend: {
                enabled: true,
                textSize: 14,
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
                position:"BOTTOM"
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
                        label: "Compara", 
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
                                <View><Text style={{color:'#444'}}><Text style={{fontWeight:'bold'}}>Divisapp</Text> <Text>Actualización cada hora</Text></Text></View>
                                <View><Text style={{color:'#444'}}>Tipo de cambio promedio de ayer  <Text style={{fontWeight:'bold'}}>{graphData?.lastday?.rate}</Text></Text></View>
                            </View>
                            <LineChart style={styles.chart}
                                data={lineChartData.data}
                                xAxis={lineChartData.xAxis}
                                yAxis={{
                                        left: { 
                                            enabled: true,
                                            
                                        }, //=> enabled is the key not enable
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
                                <Text>Actualización diaria</Text>
                            </Text>

                            {(scatterData2 && scatterData2.data) && <ScatterChart
                                style={styles.chart}
                                data={scatterData2.data}
                                legend={scatterData2.legend}
                                marker={scatterData2.marker}
                                xAxis={scatterData2.xAxis}
                                yAxis={{
                                    left: { enabled: true}, //=> enabled is the key not enable
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
        height:Constant.height/2.5,
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
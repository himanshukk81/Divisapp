import React, { useEffect, useState } from "react";
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
// } from "react-native-chart-kit";
import {
    SafeAreaView,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator,Text,Dimensions,
    ScrollView,
    StyleSheet,processColor
} from "react-native";
import {LineChart,ScatterChart} from 'react-native-charts-wrapper';
const ExchangeRate = (props) => {



    // const graphData = {"labels":[1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"datasets":[{"color":()=>"#05f70d","data":[4.14138,4.14516,null,4.1437100000000004,4.14494,4.11072,4.11081,4.115,null,4.09048,4.07512,4.00986,3.94373,3.94855,3.94832,null,3.96339,3.96032,3.95865,3.96488,3.97813,3.98284,null,3.9878299999999998,4.0075,3.99707,3.99224,4.00453,4.00259,null],"strokeWidth":4},{"color":()=>"#0f20db","data":[4.11843,4.11934,null,4.12179,4.11556,4.07201,4.079,4.08,null,4.05725,4.03477,3.96798,3.90664,3.91759,3.92294,null,3.93843,3.93532,3.93307,3.94214,3.9546,3.95486,null,3.96324,3.98062,3.97139,3.97124,3.98184,3.9772,null],"strokeWidth":4}]}
    // return (
    //     <SafeAreaView style={{ flex: 1 }}>
    //         <StatusBar backgroundColor={'#111'} />
    //         <View style={{ flexDirection: 'row', alignSelf: 'flex-end', padding: 6 }}>
    //             {/* <Text>Bezier Line Chart</Text> */}
    //             <LineChart
    //                 data={{
    //                     labels: ["January", "February", "March", "April", "May", "June"],
    //                     datasets: [
    //                         {
    //                             data: [
    //                                 Math.random() * 100,
    //                                 Math.random() * 100,
    //                                 Math.random() * 100,
    //                                 Math.random() * 100,
    //                                 Math.random() * 100,
    //                                 Math.random() * 100
    //                             ],
    //                             color: () => '#C7EBFF', strokeWidth: 4 
    //                         },
    //                         {
    //                             data: [
    //                                 Math.random() * 100,
    //                                 Math.random() * 100,
    //                                 Math.random() * 100,
    //                                 Math.random() * 100,
    //                                 Math.random() * 100,
    //                                 Math.random() * 100
    //                             ],
    //                             color: () => '#ED7C33', strokeWidth: 4 
    //                         }
    //                     ]
    //                 }}
    //                 width={Dimensions.get("window").width} // from react-native
    //                 height={220}
    //                 yAxisLabel="$"
    //                 yAxisSuffix="k"
    //                 yAxisInterval={1} // optional, defaults to 1
    //                 // withVerticalLines = {true}
    //                 // withHorizontalLines = {true}
    //                 // withInnerLines ={false}
    //                 chartConfig={{
    //                     backgroundColor: "#ffffff",
    //                     backgroundGradientFrom: "#ffffff",
    //                     backgroundGradientTo: "#ffffff",
    //                     decimalPlaces: 2, // optional, defaults to 2dp
    //                     color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
    //                     labelColor: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
    //                     style: {
    //                         borderRadius: 16
    //                     },
    //                     propsForDots: {
    //                         r: "6",
    //                         strokeWidth: "2",
    //                         stroke: "#ffa726"
    //                     },
    //                     propsForBackgroundLines: {
    //                         strokeDasharray: "", // solid background lines with no dashes
    //                         stroke: "#949292"
    //                     }
                        
    //                 }}
    //                 bezier
    //                 style={{
    //                     marginVertical: 8,
    //                     borderRadius: 16
    //                 }}
    //             />
                
    //         </View>
    //         <View style={{ flexDirection: 'row', alignSelf: 'flex-end', padding: 6 }}>
    //             {/* <Text>Bezier Line Chart</Text> */}
    //             <ScrollView horizontal={true}>
    //             <LineChart
    //                 data={
    //                     graphData
    //                 }
    //                 // width={Dimensions.get("window").width} // from react-native
    //                 width={graphData.labels.length*Dimensions.get("window").width/5} // from react-native
    //                 height={220}
    //                 // yAxisLabel="$"
    //                 // yAxisSuffix="k"
    //                 yAxisInterval={1} // optional, defaults to 1
    //                 xAxisInterval={0.05}
    //                 // withVerticalLines = {true}
    //                 // withHorizontalLines = {true}
    //                 // withInnerLines ={false}
    //                 chartConfig={{
    //                     backgroundColor: "#ffffff",
    //                     backgroundGradientFrom: "#ffffff",
    //                     backgroundGradientTo: "#ffffff",
    //                     decimalPlaces: 2, // optional, defaults to 2dp
    //                     color: (opacity = 1) => `rgba(255, 255, 5, ${opacity})`,
    //                     labelColor: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
    //                     style: {
    //                         borderRadius: 16
    //                     },
    //                     propsForDots: {
    //                         r: "6",
    //                         strokeWidth: "2",
    //                         stroke: "#FFFFF"
    //                     },
    //                     propsForBackgroundLines: {
    //                         strokeDasharray: "", // solid background lines with no dashes
    //                         stroke: "#949292"
    //                     }
                        
    //                 }}
    //                 bezier
    //                 style={{
    //                     marginVertical: 8,
    //                     borderRadius: 16
    //                 }}
    //             />
    //             </ScrollView>
                
                
    //         </View>
    //     </SafeAreaView>
    // )
    var response = {
        "today_hour": [
            {
                "hour": 9,
                "hour_txt": "09 AM",
                "rate": 3.98825,
                "buy_rate": 3.971,
                "sell_rate": 4.0055
            },
            {
                "hour": 10,
                "hour_txt": "10 AM",
                "rate": 3.99037,
                "buy_rate": 3.98075,
                "sell_rate": 4
            },
            {
                "hour": 11,
                "hour_txt": "11 AM",
                "rate": 3.9905,
                "buy_rate": 3.9825,
                "sell_rate": 3.9985
            },
            {
                "hour": 12,
                "hour_txt": "12 PM",
                "rate": 3.99213,
                "buy_rate": 3.98325,
                "sell_rate": 4.001
            }
        ],
        "daily": [
            {
                "day": 1,
                "rate": 4.1299,
                "buy_rate": 4.11843,
                "sell_rate": 4.14138
            },
            {
                "day": 2,
                "rate": 4.13225,
                "buy_rate": 4.11934,
                "sell_rate": 4.14516
            },
            {
                "day": 3,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 4,
                "rate": 4.13275,
                "buy_rate": 4.12179,
                "sell_rate": 4.1437100000000004
            },
            {
                "day": 6,
                "rate": 4.13025,
                "buy_rate": 4.11556,
                "sell_rate": 4.14494
            },
            {
                "day": 7,
                "rate": 4.09137,
                "buy_rate": 4.07201,
                "sell_rate": 4.11072
            },
            {
                "day": 8,
                "rate": 4.09075,
                "buy_rate": 4.079,
                "sell_rate": 4.11081
            },
            {
                "day": 9,
                "rate": 4.09075,
                "buy_rate": 4.08,
                "sell_rate": 4.115
            },
            {
                "day": 10,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 11,
                "rate": 4.07387,
                "buy_rate": 4.05725,
                "sell_rate": 4.09048
            },
            {
                "day": 12,
                "rate": 4.05494,
                "buy_rate": 4.03477,
                "sell_rate": 4.07512
            },
            {
                "day": 13,
                "rate": 3.9889200000000002,
                "buy_rate": 3.96798,
                "sell_rate": 4.00986
            },
            {
                "day": 14,
                "rate": 3.92518,
                "buy_rate": 3.90664,
                "sell_rate": 3.94373
            },
            {
                "day": 15,
                "rate": 3.93307,
                "buy_rate": 3.91759,
                "sell_rate": 3.94855
            },
            {
                "day": 16,
                "rate": 3.9356299999999997,
                "buy_rate": 3.92294,
                "sell_rate": 3.94832
            },
            {
                "day": 17,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 18,
                "rate": 3.95091,
                "buy_rate": 3.93843,
                "sell_rate": 3.96339
            },
            {
                "day": 19,
                "rate": 3.94782,
                "buy_rate": 3.93532,
                "sell_rate": 3.96032
            },
            {
                "day": 20,
                "rate": 3.94586,
                "buy_rate": 3.93307,
                "sell_rate": 3.95865
            },
            {
                "day": 21,
                "rate": 3.95351,
                "buy_rate": 3.94214,
                "sell_rate": 3.96488
            },
            {
                "day": 22,
                "rate": 3.96637,
                "buy_rate": 3.9546,
                "sell_rate": 3.97813
            },
            {
                "day": 23,
                "rate": 3.9688499999999998,
                "buy_rate": 3.95486,
                "sell_rate": 3.98284
            },
            {
                "day": 24,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 25,
                "rate": 3.97553,
                "buy_rate": 3.96324,
                "sell_rate": 3.9878299999999998
            },
            {
                "day": 26,
                "rate": 3.99406,
                "buy_rate": 3.98062,
                "sell_rate": 4.0075
            },
            {
                "day": 27,
                "rate": 3.98423,
                "buy_rate": 3.97139,
                "sell_rate": 3.99707
            },
            {
                "day": 28,
                "rate": 3.98174,
                "buy_rate": 3.97124,
                "sell_rate": 3.99224
            },
            {
                "day": 29,
                "rate": 3.9931900000000002,
                "buy_rate": 3.98184,
                "sell_rate": 4.00453
            },
            {
                "day": 30,
                "rate": 3.9899,
                "buy_rate": 3.9772,
                "sell_rate": 4.00259
            },
            {
                "day": 31,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 1,
                "rate": 3.97525,
                "buy_rate": 3.95723,
                "sell_rate": 3.99327
            },
            {
                "day": 2,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 3,
                "rate": 3.96172,
                "buy_rate": 3.94618,
                "sell_rate": 3.9772499999999997
            },
            {
                "day": 4,
                "rate": 3.95008,
                "buy_rate": 3.93491,
                "sell_rate": 3.96525
            },
            {
                "day": 5,
                "rate": 3.96399,
                "buy_rate": 3.94884,
                "sell_rate": 3.97914
            },
            {
                "day": 6,
                "rate": 3.97871,
                "buy_rate": 3.96413,
                "sell_rate": 3.99329
            },
            {
                "day": 7,
                "rate": 3.96701,
                "buy_rate": 3.95223,
                "sell_rate": 3.98179
            },
            {
                "day": 8,
                "rate": 3.9583500000000003,
                "buy_rate": 3.94227,
                "sell_rate": 3.97444
            },
            {
                "day": 9,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 10,
                "rate": 3.96259,
                "buy_rate": 3.94806,
                "sell_rate": 3.97712
            },
            {
                "day": 11,
                "rate": 3.97172,
                "buy_rate": 3.96008,
                "sell_rate": 3.9833600000000002
            },
            {
                "day": 12,
                "rate": 3.98149,
                "buy_rate": 3.9702,
                "sell_rate": 3.99279
            },
            {
                "day": 13,
                "rate": 3.98131,
                "buy_rate": 3.96802,
                "sell_rate": 3.9946
            },
            {
                "day": 14,
                "rate": 3.98802,
                "buy_rate": 3.97637,
                "sell_rate": 3.99966
            },
            {
                "day": 15,
                "rate": 3.98617,
                "buy_rate": 3.97279,
                "sell_rate": 3.99956
            },
            {
                "day": 16,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 17,
                "rate": 3.97958,
                "buy_rate": 3.96769,
                "sell_rate": 3.99146
            },
            {
                "day": 18,
                "rate": 3.9773899999999998,
                "buy_rate": 3.96626,
                "sell_rate": 3.98852
            },
            {
                "day": 19,
                "rate": 3.98489,
                "buy_rate": 3.97331,
                "sell_rate": 3.99648
            },
            {
                "day": 20,
                "rate": 3.98239,
                "buy_rate": 3.9711,
                "sell_rate": 3.99369
            },
            {
                "day": 21,
                "rate": 3.98492,
                "buy_rate": 3.97263,
                "sell_rate": 3.9972
            },
            {
                "day": 22,
                "rate": 3.98097,
                "buy_rate": 3.96492,
                "sell_rate": 3.99702
            },
            {
                "day": 23,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            },
            {
                "day": 24,
                "rate": 3.9981999999999998,
                "buy_rate": 3.98567,
                "sell_rate": 4.01073
            },
            {
                "day": 25,
                "rate": 3.99702,
                "buy_rate": 3.98395,
                "sell_rate": 4.0101
            },
            {
                "day": 26,
                "rate": 3.99053,
                "buy_rate": 3.97815,
                "sell_rate": 4.0029
            },
            {
                "day": 27,
                "rate": 3.97856,
                "buy_rate": 3.96563,
                "sell_rate": 3.99148
            },
            {
                "day": 28,
                "rate": 3.97711,
                "buy_rate": 3.9643100000000002,
                "sell_rate": 3.98991
            },
            {
                "day": 29,
                "rate": 3.97823,
                "buy_rate": 3.9651300000000003,
                "sell_rate": 3.99133
            },
            {
                "day": 30,
                "rate": null,
                "buy_rate": null,
                "sell_rate": null
            }
        ],
        "lastday": {
            "day": 30,
            "rate": null,
            "buy_rate": null,
            "sell_rate": null
        },
        "rate_": {
            "h_min": 3.9285,
            "h_max": 4.03325,
            "d_min": 3.87373,
            "d_max": 4.17179
        }
    }
    var graphData={
        hourlyBuyRate:[],
        hourlySellRate:[],
        hourlyLabelXaxis:[],
        dailyBuyRate:[],
        dailySellRate:[]
        
    }
    // for today_hour data
    for(var i=0;i<response.today_hour.length;i++){
        graphData.hourlyLabelXaxis.push(response.today_hour[i].hour_txt);
        graphData.hourlyBuyRate.push(response.today_hour[i].buy_rate);
        graphData.hourlySellRate.push(response.today_hour[i].sell_rate);
    }
    
    // for daily data
    for(var i=0;i<response.daily.length;i++){
        graphData.dailyBuyRate.push({y : response.daily[i].buy_rate,x : response.daily[i].day});
        graphData.dailySellRate.push({y : response.daily[i].sell_rate,x : response.daily[i].day});
    }
    const scatterData = {
        data: {
            dataSets: [{
                // values: [{y:1,x:1},{y:2,x:2}],
                values:graphData.dailyBuyRate,
                label:"Purchase",
                config: {
                    color: processColor('gray'),
                    scatterShape: 'CIRCLE'
                }
                }, {
                // values: [{y:3,x:3},{y:4,x:4}],
                values: graphData.dailySellRate? graphData.dailySellRate:[{y:3,x:3},{y:4,x:4}],
                label: 'Sales',
                config: {
                    color: processColor('blue'),
                    scatterShape: 'CIRCLE',
                    // scatterShapeHoleRadius: 6,
                    // scatterShapeHoleColor: processColor('teal')
                }
                
            }],
            
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
        }
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F5FCFF'
        },
        chart: {
            flex: 1
        }
    });
    const lineGraphData ={
        data:{
            dataSets:[
                {
                    label: "Sales", 
                    values:graphData.hourlySellRate,
                    config:{
                        color:processColor("blue")
                    }
                },
                {
                    label: "Purchase", 
                    values:graphData.hourlyBuyRate,
                    
                    config:{
                        color:processColor("green")
                    }
                }
            ]
        },
        xAxis: {
            valueFormatter: graphData.hourlyLabelXaxis,
            granularityEnabled: true,
            granularity : 1,
            position:"BOTTOM"
          }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={'#111'} />
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <LineChart style={styles.chart}
                        // data={{dataSets:[{label: "demo", values: [{y: 1}, {y: 2}, {y: 1}]}]}}
                        data={lineGraphData.data}
                        xAxis={lineGraphData.xAxis}
                        yAxis={{
                            left: { enabled: true}, //=> enabled is the key not enable
                            right: { enabled: false},
                            }}
                        chartDescription={{ text: '' }}
                    />
                </View>
                <View style={styles.container}>
                    {/* {scatterData.data && <ScatterChart
                        style={styles.chart}
                        data={scatterData.data}
                        legend={scatterData.legend}
                        marker={scatterData.marker}
                        xAxis={{position:"BOTTOM"}}
                        yAxis={{
                            left: { enabled: true}, //=> enabled is the key not enable
                            right: { enabled: false},
                            }}
                        drawValues={false}
                        chartDescription={{ text: '' }}
                        // onSelect={this.handleSelect.bind(this)}
                        // onChange={(event) => console.log(event.nativeEvent)}
                    />} */}
                    
                </View>
            </View>
            
        </SafeAreaView>
    )
}

export default ExchangeRate;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accounts from '../../screens/accounts/Accounts';
import BankAccount from '../../screens/accounts/BankAccount';
import BankAccounts from '../../screens/accounts/BankAccounts';
import CreditCard from '../../screens/accounts/CreditCard';
import ChangePassword from '../../screens/ChangePassword/ChangePassword';
import ExchangeRate from '../../screens/ExchangeRate/ExchangeRate';
import FaqPage from '../../screens/FAQ/faq';
import TermsPage from '../../screens/profile/TermsPage';
import WebPage from '../../screens/web/WebPage';
import HomeScreen from '../../screens/home/homeScreen';

import React,{ useEffect, useState } from 'react';
import Operations from '../../screens/operations/Operations';

const HomeStack = createNativeStackNavigator();

const  HomeStacks = () =>{

    return (
      <HomeStack.Navigator>
          <HomeStack.Screen name="HomeS" component={ HomeScreen } 
                        options={{
                                    headerShown:false,
                                    headerTitle:''
                        }} 
          />

          <HomeStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                      headerShown:false,
                      headerTitle:''
          }} />

          <HomeStack.Screen name="Web" component={ WebPage } 
                    options={{
                                headerShown:false,
                                headerTitle:''
                    }} 
          />
          <HomeStack.Screen name="ChangePass" component={ ChangePassword } 
                        options={{
                                    headerShown:false,
                                    headerTitle:''
                        }} 
          />
          <HomeStack.Screen name="Operaciones" component={ Operations } 
                      options={{
                                  headerShown:false
          }} />

          <HomeStack.Screen name="faq" component={ FaqPage } 
            options={{
                        headerShown:false,
                        headerTitle:''
            }} 
          />

          <HomeStack.Screen name="BankAccounts" component={ BankAccounts }
            
            options={{
                        headerShown:false,
                        headerTitle:'' 
            }} 
          />

          <HomeStack.Screen name="BankAccount" component={ BankAccount } options={{
                      headerShown:false,
                      headerTitle:''  
          }} />

          <HomeStack.Screen name="Accounts" component={ Accounts } options={{
                      headerShown:false,
                      headerTitle:''  
          }} />

          
          <HomeStack.Screen name="CreditCard" component={ CreditCard } options={{
                      headerShown:false,
                      headerTitle:'' 
          }} />
        
          
          <HomeStack.Screen name="Terms" component={ TermsPage } options={{
                        headerShown:false,
                        headerTitle:''
          }} />

      </HomeStack.Navigator>
    )
}

export default HomeStacks;
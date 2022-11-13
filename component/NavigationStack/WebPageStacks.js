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
import React from 'react';

const WebPageStack = createNativeStackNavigator();

const WebPageStacks = () =>{
    return(
      <WebPageStack.Navigator>
            
            <WebPageStack.Screen name="Web" component={ WebPage } 
                          options={{
                                      headerShown:false,
                                      headerTitle:''
                          }} 
            />
            <WebPageStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                        headerShown:false,
                        headerTitle:''
            }} />

            <WebPageStack.Screen name="ChangePass" component={ ChangePassword } 
                          options={{
                                      headerShown:false,
                                      headerTitle:''
                          }} 
            />
            <WebPageStack.Screen name="faq" component={ FaqPage } 
              options={{
                          headerShown:false,
                          headerTitle:''
              }} 
            />
            <WebPageStack.Screen name="BankAccounts" component={ BankAccounts }
              
              options={{
                          headerShown:false,
                          headerTitle:'' 
              }} 
            />
            <WebPageStack.Screen name="BankAccount" component={ BankAccount } options={{
                        headerShown:false,
                        headerTitle:''  
            }} />
            <WebPageStack.Screen name="Accounts" component={ Accounts } options={{
                        headerShown:false,
                        headerTitle:''  
            }} />

            
            <WebPageStack.Screen name="CreditCard" component={ CreditCard } options={{
                        headerShown:false,
                        headerTitle:'' 
            }} />
          
            
            <WebPageStack.Screen name="Terms" component={ TermsPage } options={{
                          headerShown:false,
                          headerTitle:''
            }} />
      
       </WebPageStack.Navigator>
    )
}

export default WebPageStacks;
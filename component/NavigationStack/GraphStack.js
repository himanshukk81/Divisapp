import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accounts from '../../screens/accounts/Accounts';
import BankAccount from '../../screens/accounts/BankAccount';
import BankAccounts from '../../screens/accounts/BankAccounts';
import CreditCard from '../../screens/accounts/CreditCard';
import ChangePassword from '../../screens/ChangePassword/ChangePassword';
import ExchangeRate from '../../screens/ExchangeRate/ExchangeRate';
import FaqPage from '../../screens/FAQ/faq';
import Profile from '../../screens/profile/Profile';
import TermsPage from '../../screens/profile/TermsPage';
import WebPage from '../../screens/web/WebPage';

const GraphStack = createNativeStackNavigator();
const  GraphStacks = () =>{
    return(
      <GraphStack.Navigator> 
            <GraphStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                      headerShown:false,
                      headerTitle:''
            }} />
            <GraphStack.Screen name="Profile" component={ Profile } 
                          options={{
                                      headerShown:false,
                                      headerTitle:''
                          }} 
            />
            <GraphStack.Screen name="Web" component={ WebPage } 
                          options={{
                                      headerShown:false,
                                      headerTitle:''
                          }} 
            />
            <GraphStack.Screen name="ChangePass" component={ ChangePassword } 
                        options={{
                                    headerShown:false
            }} />
            <GraphStack.Screen name="faq" component={ FaqPage } 
              options={{
                          headerShown:false,
                          headerTitle:''
              }} 
            />
            <GraphStack.Screen name="BankAccounts" component={ BankAccounts }
              
              options={{
                          headerShown:false,
                          headerTitle:'' 
              }} 
            />
            <GraphStack.Screen name="BankAccount" component={ BankAccount } options={{
                        headerShown:false,
                        headerTitle:''  
            }} />
            <GraphStack.Screen name="Accounts" component={ Accounts } options={{
                        headerShown:false,
                        headerTitle:''  
            }} />

            
            <GraphStack.Screen name="CreditCard" component={ CreditCard } options={{
                        headerShown:false,
                        headerTitle:'' 
            }} />
          
            
            <GraphStack.Screen name="Terms" component={ TermsPage } options={{
                          headerShown:false,
                          headerTitle:''
            }} />
      
       </GraphStack.Navigator>
    )
}

export default GraphStacks;
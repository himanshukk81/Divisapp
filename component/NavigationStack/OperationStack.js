
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

const OperationStack = createNativeStackNavigator();

const  OperationStacks = () =>{
    return(
      <OperationStack.Navigator>
          <OperationStack.Screen name="Operaciones" component={ Operations } 
                        options={{
                                    headerShown:false
          }} />
          <OperationStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                        headerShown:false,
                        headerTitle:''
          }} />

          <OperationStack.Screen name="Web" component={ WebPage } 
                      options={{
                                  headerShown:false,
                                  headerTitle:''
                      }} 
          />
          <OperationStack.Screen name="ChangePass" component={ ChangePassword } 
                        options={{
                                    headerShown:false
          }} />
          <OperationStack.Screen name="ProgressDetail" component={ ProgressDetail } 
                        options={{
                                    headerShown:true,
                                    headerTitle:''
          }} />

          <OperationStack.Screen name="faq" component={ FaqPage } 
            options={{
                        headerShown:false,
                        headerTitle:''
            }} 
          />
          <OperationStack.Screen name="BankAccounts" component={ BankAccounts }
            
            options={{
                        headerShown:false,
                        headerTitle:'' 
            }} 
          />

          <OperationStack.Screen name="BankAccount" component={ BankAccount } options={{
                      headerShown:false,
                      headerTitle:''  
          }} />
          <OperationStack.Screen name="Accounts" component={ Accounts } options={{
                      headerShown:false,
                      headerTitle:''  
          }} />

          
          <OperationStack.Screen name="CreditCard" component={ CreditCard } options={{
                      headerShown:false,
                      headerTitle:'' 
          }} />
        
          
          <OperationStack.Screen name="Terms" component={ TermsPage } options={{
                        headerShown:false,
                        headerTitle:''
          }} />

      </OperationStack.Navigator>
    )
}

export default OperationStacks;
const progressData =[
    {
        'id':1,
        'label':'Tipo de Operación',
        'keys':'type',
        'values':'-',
        'key_dictonary':[{'id':1,'name':'Venta','key':'type'},{'id':2,'name':'Compra','key':'type'}],
    },
    {
        'id':2,
        'label':'Tipo de Cambio',
        'keys':'rate',
        'values':'-'
    },
    {
        'id':3,
        'label':'Cantidad de Envío',
        'keys':['send_currency-symbol','send_amount'],
        'values':'-'
    },
    {
        'id':4,
        'label':'Cantidad de Recibo',
        'keys':['rec_currency-symbol','rec_amount'],
        'values':'-'
    },
    {
        'id':5,
        'label':'Ahorro',
        'keys':'savings',
        'values':'-'
    },
    {
        'id':6,
        'label':'Operador Divisapp',
        'keys':'admin_user-email',
        'values':'-'
    },
    {
        'id':7,
        'label':'Cuenta de Envío',
        // 'keys':['send_user_account-bank-logo-thumbnail-send_user_account-bank-nickname','send_user_account-alias','send_user_account-number','send_user_account-cci','send_user_account-owner'],
        'keys':['send_user_account-alias','send_user_account-bank-logo-thumbnail','send_user_account-bank-nickname','send_user_account-type','send_currency-name','send_currency-symbol','send_user_account-number','send_user_account-cci','send_user_account-owner'],
        'key_dictonary':[{'id':1,'name':'Propia','key':'owner'},{'id':2,'name':'Tercero','key':'owner'}],
        'values':[]
    },
    {
        'id':8,
        'label':'Cuenta de Recibo',
        // 'keys':['rec_user_account-alias','rec_user_account-number','rec_user_account-cci','rec_user_account-owner'],
        'keys':['rec_user_account-alias','rec_user_account-bank-logo-thumbnail','rec_user_account-bank-nickname','rec_user_account-type','rec_currency-name','rec_currency-symbol','rec_user_account-number','rec_user_account-cci','rec_user_account-owner'],
        'key_dictonary':[{'id':1,'name':'Propia','key':'owner'},{'id':2,'name':'Tercero','key':'owner'}],
        'values':[]
    },
    {
        'id':9,
        'label':'Tarjeta de Crédito',
        'keys':['rec_user_cc-alias','rec_user_cc-bank-logo-thumbnail','rec_user_cc-bank-nickname','rec_user_cc-type','rec_user_cc-number'],
        'key_dictonary':[{'id':1,'name':'Visa','key':'type'},{'id':2,'name':'MasterCard','key':'Amex'}],
        'values':[]
    }

]

export default progressData;
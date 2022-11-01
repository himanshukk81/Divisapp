export default BankForm = [
    {
        'name':'Alias',
        'value':'',
        'required':true,
        'type':'input',
        'values':[],
        'id':1,
        'erroMessage':'',
        'alias':'',
        'key':'alias',
        'inputType':'default',
        'instruction':'* nombre corto de fácil recordación'
    },
    {
        'name':'Banco',
        'value':'',
        'required':true,
        'type':'select',
        'values':[
            {
                'value':1,
                'label':'BCP'
            },
            {
                'value':2,
                'label':'INTERBANK'
            },
            {
                'value':3,
                'label':'SCOTIABANK'
            },
            {
                'value':4,
                'label':'BANCO FALABELLA'
            },
            {
                'value':5,
                'label':'BANCO DE LA NACION'
            },
            {
                'value':6,
                'label':'BANCO PICHINCHA'
            }
        ],
        'id':2,
        'erroMessage':'',
        'bank_id':'',
        'key':'bank_id',
        'inputType':'',
        'search':true
    },
    {
        'name':'Tipo de Cuenta',
        'value':'',
        'required':true,
        'type':'select',
        'values':[
            {
                'value':1,
                'label':'AHORROS'
            },
            {
                'value':2,
                'label':'CORRIENTE'
            },
            {
                'value':3,
                'label':'PAGO DE SERVICIO'
            },   
        ],
        'id':3,
        'erroMessage':'',
        'bankType':'',
        'key':'bankType',
        'inputType':'default',
    },
    {
        'name':'Moneda',
        'value':'',
        'required':true,
        'type':'select',
        'values':[
            {
                'value':1,
                'label':'PEN'
            },
            {
                'value':2,
                'label':'USD'
            } 
        ],
        'id':4,
        'erroMessage':'',
        'currency_id':'',
        'key':'currency_id',
        'inputType':'default',
        'instruction':'USD ($) ó PEN (S/)'
    },
    {
        'name':'Número de Cuenta',
        'value':'',
        'required':true,
        'type':'input',
        'values':[],
        'id':5,
        'cuentaType':2,
        'erroMessage':'',
        'number':'',
        'key':'number',
        'inputType':'number-pad',
        'instruction':'* puede ingresar números y (-) si fuera necesario.'
    },
    {
        'name':'Detalles del Pago de Servicio',
        'placeholder':'Ingrese todos los detalles de su Servicio tal como lo muestra el BCP, por ejemplo: \n - Empresa: Mapfre \n - Tipo de Servicio: Seguro Auto \n  - Moneda: USD \n  - Código de cliente: 123456 \n - Otros detalles: póliza personal',
        'value':'',
        'required':true,
        'type':'input',
        'values':[],
        'id':8,
        'cuentaType':3,
        // 'parentId':5,
        'erroMessage':'',
        'details':'',
        'key':'details',
        'inputType':'default',
        'instruction':''
    },
    {
        'name':'Código de Cuenta Interbancaria',
        'value':'',
        'required':false,
        'type':'input',
        'values':[],
        'id':6,
        'erroMessage':'',
        'cci':'',
        'key':'cci',
        'inputType':'number-pad',
    },
    {
        'name':'Dueño de la Cuenta',
        'value':'',
        'required':true,
        'type':'select',
        'values':[
            {
                'value':1,
                'label':'PROPIA'
            },
            {
                'value':2,
                'label':'TERCERO'
            } 
        ],
        'id':7,
        'erroMessage':'',
        'owner':'',
        'key':'owner',
        'inputType':'default',
        'instruction':'Seleccione TERCERO si la cuenta no está a su nombre.'
    },

    
]
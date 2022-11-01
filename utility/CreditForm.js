export default CreditForm = [
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
        'instruction':'* nombre corto de fácil recordación',
        'readOnly':false
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
        'search':true,
        'readOnly':false
    },
    {
        'name':'Tipo de tarjeta',
        'value':'',
        'required':true,
        'type':'select',
        'values':[
            {
                'value':1,
                'label':'VISA'
            },
            {
                'value':2,
                'label':'MASTERCARD'
            },
            {
                'value':3,
                'label':'AMEX'
            },   
        ],
        'id':3,
        'erroMessage':'',
        'cType':'',
        'key':'cType',
        'inputType':'default',
        'readOnly':false
    },
    {
        'name':'Número de tarjeta',
        'value':'',
        'required':true,
        'type':'input',
        'values':[],
        'id':4,
        'erroMessage':'',
        'number':'',
        'key':'number',
        'inputType':'number-pad',
        'maxLimit':16,
        'readOnly':false
    },
    {
        'name':'Dueño de la Tarjeta',
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
            },
        ],
        'id':5,
        'erroMessage':'',
        'owner':'',
        'key':'owner',
        'inputType':'default',
        'instruction':'Seleccione TERCERO si la tarjeta no está a su nombre.',
        'readOnly':false
    },
    {
        'name':'Nombres y Apellidos',
        'value':'',
        'required':true,
        'type':'input',
        'values':[],
        'id':6,
        'parentId':5,
        'erroMessage':'',
        'owner_name':'',
        'key':'owner_name',
        'inputType':'default',
        'readOnly':false
    },
    {
        'name':'Tipo de Identificación',
        'value':'',
        'required':true,
        'type':'select',
        'values':[
            {
                'value':1,
                'label':'DNI'
            },
            {
                'value':2,
                'label':'CE'
            },
            {
                'value':3,
                'label':'PASAPORTE'
            },   
        ],
        'id':7,
        'parentId':5,
        'erroMessage':'',
        'owner_id_type':'',
        'key':'owner_id_type',
        'inputType':'',
        'readOnly':false
    },
    {
        'name':'Número de Identificación',
        'value':'',
        'required':true,
        'type':'input',
        'values':[],
        'id':8,
        'parentId':5,
        'erroMessage':'',
        'owner_id_number':'',
        'key':'owner_id_number',
        'inputType':'number-pad',
        'readOnly':false
    },

    
]
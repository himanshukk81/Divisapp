export default BankProfile = [
    {
        'name':'Tipo de Tercero',
        'value':'',
        'instruction':'',
        'required':true,
        'type':'select',
        'value':'',
        'values':[   
                    {
                        'label':'Persona',
                        'value':'Persona',
                        'id':1
                    },
                    {
                        'label':'Empresa',
                        'value':'Empresa',
                        'id':2
                    }
                ],
        'id':1,
        'erroMessage':'',
        'personType':'',
        'key':'personType'
    },
    {
        'name':'Tipo de Documento',
        'instruction':'',
        'required':true,
        'type':'select',
        'value':'',
        'values':[
                    
                    {
                        'label':'DNI',
                        'value':'DNI',
                        'id':1
                    },
                    {
                        'label':'CE',
                        'value':'CE',
                        'id':2
                    },
                    {
                        'label':'PASAPORTE',
                        'value':'PASAPORTE',
                        'id':3
                    }
                ],
        'id':2,
        'id_type':'',
        'key':'id_type',
        'erroMessage':'',
        'showType':1
    },
    {
        'name':'Número de Documento',
        'value':'',
        'instruction':'',
        'required':true,
        'id_number':'',
        'key':'id_number',
        'type':'input',
        'id':3,
        'erroMessage':'',
        'showType':1,
        'inputType':'number-pad',
    },
    {
        'title':'Nombre(s)',
        'value':'',
        'name':'',
        'key':'name',
        'instruction':'',
        'required':false,
        'type':'input',
        'id':4,
        'erroMessage':'',
        'inputType':'default',
        'showType':1
    },
    {
        'name':'Apellido(s)',
        'value':'',
        'lastname':'',
        'key':'lastname',
        'instruction':'',
        'required':false,
        'type':'input',
        'id':5,
        'inputType':'default',
        'erroMessage':'',
        'showType':1
    },
    {
        'name':'Número de RUC',
        'value':'',
        'ruc':'',
        'key':'ruc',
        'instruction':'',
        'required':false,
        'type':'input',
        'id':9,
        'inputType':'number-pad',
        'erroMessage':'',
        'showType':2
    },
    {
        'name':'Razón Social',
        'value':'',
        'business_name':'',
        'key':'business_name',
        'instruction':'',
        'required':false,
        'type':'input',
        'id':10,
        'inputType':'default',
        'erroMessage':'',
        'showType':2
    },
    {
        'name':'DATOS OPCIONALES',
        'type':'Text',
        'id':6,
        'erroMessage':'',
    },
    {
        'name':'Teléfono de Contacto',
        'value':'',
        'phone':'',
        'key':'phone',
        'instruction':'',
        'required':false,
        'type':'input',
        'id':7,
        'inputType':'default',
        'erroMessage':'',
        'fieldType':'optional',
        'showType':3
    },
    {
        'name':'Correo Electrónico',
        'value':'',
        'email':'',
        'key':'email',
        'instruction':'',
        'required':false,
        'type':'input',
        'id':8,
        'inputType':'default',
        'erroMessage':'',
        'fieldType':'optional',
        'showType':3
    },
]
export const SideMenu = [

    {
      'id':1,
      'name':'Cambiar Dolares',
      'icon':require('../assets/images/sideIcon/dollar.png'),
      'rightIcon':false,
      'path':'HomeS',
      'checked':false,
      'submenhus':[]
    },
    {
      'id':2,
      'name':'Operaciones',
      'icon':require('../assets/images/sideIcon/operation.png'),
      'rightIcon':false,  
      'path':'Operaciones',
      'checked':false,
      'submenhus':[]
    },
    {
      'id':3,
      'name':'Cuentas y Tarjetas',
      'icon':require('../assets/images/sideIcon/calendar.png'),  
      'submenhus':[
        {
          'name':'Cuentas Bancarias',
          'icon':require('../assets/images/sideIcon/bank.png'),
          'path':'BankAccounts'
        },
        {
          'name':'Tarjetas de Credito',
          'icon':require('../assets/images/sideIcon/credit-card.png'),
          'path':'Accounts'
        }
      ],
      'isActive':false,
      'rightIcon':true,
      'path':'',
      'checked':false
    },
    {
      'id':4,
      'name':'Tipo de Cambio',
      'icon':require('../assets/images/sideIcon/statistic.png'),
      'submenhus':[
      ],
      'rightIcon':false,
      'path':'ExchangeRate',
      'checked':false
    },
    {
      'id':5,
      'name':'Mi Cuenta',
      'icon':require('../assets/images/sideIcon/user.png'),
      'submenhus':[
        {
          'name':'Perfil',
          'icon':require('../assets/images/sideIcon/user.png'),
          'path':'profile'
        },
        {
          'name':'Cambiar contraseña',
          'icon':require('../assets/images/sideIcon/key.png'),
          'path':'ChangePass'
        }
      ],
      'rightIcon':true,
      'path':'',
      'checked':false
    },
    {
      'id':6,
      'name':'Preguntas Frecuentes',
      'icon':require('../assets/images/sideIcon/help.png'),
      'submenhus':[
       
      ],
      'path':'faq',
      'rightIcon':false,
      'checked':false
    },
    {
      'id':7,
      'name':'Más Información',
      'icon':require('../assets/images/sideIcon/info.png'),
      'submenhus':[
        {
          'name':'- Términos y Condiciones',
          'icon':'',
          'path':'https://www.divisapp.com/soporte/terminos/'
        },
        {
          'name':'- Política de Privacidad',
          'icon':'',
          'path':'https://www.divisapp.com/soporte/politica-privacidad/'
        },
        {
          'name':'- Libro de Reclamaciones',
          'icon':'',
          'path':'https://www.divisapp.com/soporte/libro-de-reclamaciones/'
        }
      ],
      'rightIcon':false,
      'path':'',
      'checked':false
    },
    {
      'id':7,
      'name':'Salir',
      'icon':require('../assets/images/sideIcon/logout.png'),
      'submenhus':[
      ],
      'rightIcon':false,
      'path':'logout',
    }
  ]
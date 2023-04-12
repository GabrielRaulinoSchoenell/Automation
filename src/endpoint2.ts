import { generalData } from "./types/generalData"

let ress= {
    project: 'Pagamento',
    description: 'Api da que realiza a conexão de terceiros permitindo o pagamento',
    groupId: 'br.com.intelbras',
    encodePattern: 'nameAfter',
    projectUrl: 'http://intelbras-pagamento.com',
    version: '1.0',
    versionType: "none",
    extra: {
      setVars: true,
      drawio: false,
      defining: true,
      postmanCollection: true,
      requestHelp: true,
      store: false,
      creation: false,
    },
    sequences: {
      type: "sequence",
      data: [
        {
          name: 'EnvironmentVariables'
        },
        {
          name: 'Pagamento'
        },
        {
          name: 'Vendas'
        },
        {
          name: 'Validacao'
        },
        {
          name: 'ErroNoPagamento'
        }
      ]
    },
    apis: {
      type: "api",
      data: [
        {
          name: 'pagamento',
          context: '/payment',
          resources: [
            {
              method: 'get post',
              url: '/'
            },
            {
              method: 'get',
              url: '/getInfo'
            },
            {
              method: 'post',
              url: '/retrievePayment'
            }
          ]
        },
        {
          name: 'vendas',
          context: '/sales',
          resources: [
            {
              method: 'get post',
              url: '/'
            },
            {
              method: 'get',
              url: '/getInfo'
            },
            {
              method: 'post',
              url: '/retrieveSale'
            }
          ]
        }
      ]
    },
    env: [
      {
        var: 'TZ',
        values: ['SAO_PAULO', 'SAO_PAULO'],
        name: 'timeZone',
      },
      {
        var: 'EVENT',
        values: ['http://', 'htpp://'],
        name: 'grafanaURL',
      }
    ],
    dependencies: [],
  }
  
  
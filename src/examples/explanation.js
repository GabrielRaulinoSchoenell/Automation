/*
    Testes automatizados: 

    segue a estrutura do endpoint.json que contem testes automatizados.
    Para criação desses deve ser passado os endpoints com a estrutura revisada depois.
*/

let endpointJsonTestes = {
    // the data attribute should be setted in order to able the backend to process the json. Validate the json through the Validate place in the devPortal
    data: {
        // o atributo projeto deve receber o nome do projeto e será usado para criar a documentação e criação de artefatos
        project: "",
        // A descricao tem um proposito parecido com o projeto. Será usado na documentação e na criação dos artefatos
        description: "",
        // group id
        groupId: "br.com.intelbras",
        // o encode pattern pode ser setado como nameAfter ou como noName; No primeiro caso, ao nomear uma api CadastraItems, o nome das referencias à api serão 
            // usadas como CadastraItemsAPI, essa mesma regra se aplica a sequences e aos demais. não tem porém no momento como referenciar os items separadamente
        encodePattern: "nameAfter",
        // project url diz respeito à url que estará publica no openshift. será utilizado para referenciar o projeto no caso de existencia de um portal dev
        projectUrl: "",
        // version será usada como padrão par versão de codigo, podendo ser adicionado ao url com o version: url
        version: "1.0",
        // o extra é uma lista de extraResources a serem criados. Seguindo esta mesma lista, sendo somente necessario alterar seus valores para true ou falso
        extra: {
            // o setVars é um arquivo TXT que auxilia a executar no cmd o comando que cria as variaveis. Não fica publico no codigo senhas e segredos. porém no portal
                // dev poderia estar livre
            setVars: true,
            //TODO drawio é um desenho do produto final. Essa aplicação não está funcionando ainda.
            drawio: false,
            // O defining é uma explição detalhada das funcionalidades do codigo, que facilita a pesquisa de endpoints, melhora o entendimento do codigo e auxilia 
                // na transformação do mesmo
            defining: true,
            // O swagger para criação na loja da intelbras
            store: false,
            //TODO não lembro o que faz kkk
            creation: false,
            // cria as envs e as collections do postman.
            postman: true
        },
        apis: {
            //TODO ainda pode ser criado dentro das apis a divisão de pastas; 
            // type pode ser create ou read. No create, ele criara todos os recursos e seus artifacts e poms prontos para serem utilizados.
            type: 'create',
            data: [
                {
                    // nome da api, que nesse caso como o encodePattern está como name after, no resultado final ficará como testadaAPIAPI
                    name: "testadaAPI",
                    // o contexto da api
                    context: "/testadaAPI",
                    resources: [
                        {
                            // metodo, normal como sempre mesmo
                            method: "get post put",
                            // url. seguingo sempre a regra de deixar o version na propriedade de url
                            url: "/",
                            // version contendo os tipos de versão, sendo necessario utilizar este padrão apenas se as tres fores diferentes entre si.
                            version: "context|context|url",
                            // Testes automatizados. Seguindo o padrão:
                            tests: [
                                {
                                    // status, para todas as verificações que tem a ver com status 200
                                    status: 200, // aqui deve haver o numero do status, com o que é esperado em cada instancia
                                    body: {
                                        // estrutura do body completa. mais abaixo vamos ver casos mais especificos. perceba que fazendo dessa forma, o body só 
                                        // vai para a request post, mas nem sempre é possivel fazer essa divisão. Se for necessario reestruture os methods 
                                        // para que cada um seja um recurso separado
                                        nutshell: "string",
                                        otherData: {
                                            data: [
                                                "string",
                                                "string"
                                            ]
                                        }
                                    },
                                    header: {
                                        // aqui um caso especial, onde um header deve conter o Authorization
                                        contains: {
                                            Authorization: "Bearer KJSAFDKLÇSJÇLKSJ"
                                        },
                                        // outro caso especial, onde o header deve não conter o ApplicationName
                                        notContains: {
                                            ApplicationName: true
                                        }
                                    },
                                    params: {
                                        id: ["possible values", "possible values", "possible values"]
                                    },
                                    query: {
                                        "data-inicial": "2023-02-20",
                                        "data-final": "2023-02-21"
                                    }
                                }],
                            correctPayload: {
                                // verificação do body de resposta, repare que esse difere do primeiro, que é um body de requisição
                                // outra opção seria simplesmente manter o body = true. Se a requisição vier com body, ta perfeito
                                body: {
                                    contains: {
                                        name: "neymar | string",
                                        age: "neymar | string"
                                    },
                                    notContains: {
                                        cpf: "neymar | string"
                                    }
                                }
                            },
                            // quantas requisições podem ser enviadas para que a requisição teste seu volume
                            highVolume: 100,
                            // tempo esperado para resposta. 
                            timeToRespond: 3000
                        }
                    ]
                }
            ]
        },
        // conjunto de sequences
        sequences: { 
            //mesmo conceito do APIS
            type: "read",
            data: [
                // aqui serão setadas todas as sequences. Existem padrões para as sequences abaixo:
                /*
                    1. EnvironmentVariables (pega as variaveis de ambiente setadas abaixo e joga na sequence)
                    2. Fault (inicia uma sequence generica com retorno ao banco de dados Event)
                    3. As sequences setadas no message processor também serão criadas automaticamente, fazendo qualquer associação necessaria
                */
                
                {name:"EnvironmentVariables"}
            ]
        },
        //listagem dos endpoints que serão utilizados
        endpoints: {
            type: "endpoint",
            data:[
                {
                    // nome do arquivo
                    name: "jsonPlaceHolder",
                    // url
                    http: "http://jsonplaceholder.typicode.com/todos/{id}"
                }
            ]
    
        },
        // criação dos message processors e stores, sendo feita a relação entre eles. pode claro ser feita uma relação externa, nesse caso basta por o interno para false 
        messageProcessorEStore: {
            type: "read",
            intern: true,
            data: [
                {
                    // nome do processor (se tiver)
                    processor: "messageProcessorTeste",
                    // nome do store
                    store: "messageStoreTeste",
                    // nome da queue para envio
                    queue: "messageQueueTeste",
                    // sequence de referencia (se tiver)
                    sequence: "exeQueue"
                }
            ]
        },
        // templates criados.
        templates: {
            type: 'read',
            data: [
                {
                    //nome do arquivo
                    name: "SVCSalesForceBulkAPIV2JobSuccessfulTemplate",
                    //parametros que o template aceita
                    parameters: [{
                        default: "",
                        isMandatory: "",
                        name: "churusbengos"
                    }]
                }
            ]
        },
        // regsitry
        resources: {
            type: "create",
            data: [
                {
                    // nome será usado no pom
                    name:"TransformJsonObject",
                    // tipo do arquivo
                    type: "transform"
                },
                {
                    name: "schemaValidation",
                    type: "schema" 
                }
            ]     
        },
        // dataservices a serem criados
        dataServices: {
            type: "create",
            data: [
                {   // nome do dataservice
                    name: "Quote",
                    // a configuração desses pode parecer um esforço desnecessario na hora de escrever (apesar de que n é), já que a formatação é bastante parecida com 
                        // o xml. Porém o json é um caminho de ida e volta, sendo possivel criar a partir do codigo um json desse, que documenta completamente todos os
                        // recursos utilizados no codigo
                    config: {
                        driver: "com.microsoft.sqlserver.jdbc.SQLServerDriver",
                        url: "$SYSTEM:ASSIST_DB_CONNECTOR",
                        username: "$SYSTEM:ASSIST_DB_USER",
                        password: "$SYSTEM:ASSIST_DB_PASSWORD"
                    },
                    items: [
                        {
                            // query a ser executada. Perceba que os parametros não precisam ser setados no camino de ida da api
                            query: `SELECT TOP 10
                            TB_osAbertura.osAbertura_id,
                                TB_AssistenciaTecnica.assistenciaTecnica_fantasia AS FANTASIA_AT,
                                TB_AssistenciaTecnica.assistenciaTecnica_telefone1 AS TELEFONE_AT,
                                TB_AssistenciaTecnica.assistenciaTecnica_email AS EMAIL_AT,
                                TB_Clientes.clientes_nome AS NOME_CLIENTE,
                                TB_Clientes.clientes_cgc AS CPFCNPJ_CLIENTE,
                                ISNULL(TB_osAtendimento.osAtendimento_osPosto, TB_osAbertura.osAbertura_id) AS NUMERO_OS,
                                ISNULL(TB_osAtendimento.osAtendimento_dataHora, TB_osAbertura.osAbertura_dataHora) AS DATAABERTURA_OS,
                                ISNULL(TB_osAtendimento.osAtendimento_SerialEletronico, TB_osAbertura.osAbertura_Serial) AS NUMERO_SERIE,
                                TB_Modelo.modelo_descrTecnico AS CODIGO_MODELO_PRODUTO,
                                TB_Modelo.modelo_descrComercial AS DESCRICAO_MODELO_PRODUTO,
                                TB_DefeitosReclamado.defeitosReclamado_descricao AS DEFEITO_RELATADO,
                                TB_statusOS.statusOS_descrTec AS STATUS_OS
                        FROM TB_osAbertura
                                INNER JOIN TB_AssistenciaTecnica ON TB_AssistenciaTecnica.assistenciaTecnica_codigo = TB_osAbertura.assistenciaTecnica_codigo
                                INNER JOIN TB_Clientes ON TB_Clientes.clientes_id = TB_osAbertura.clientes_id
                                INNER JOIN TB_DefeitosReclamado ON TB_DefeitosReclamado.defeitosReclamado_id = TB_osAbertura.defeitosReclamado_id
                                INNER JOIN TB_statusOS ON TB_statusOS.statusOS_codigo = TB_osAbertura.osAbertura_status
                                LEFT JOIN TB_osAtendimento ON TB_osAtendimento.osAbertura_id = TB_osAbertura.osAbertura_id
                                LEFT JOIN TB_Modelo ON TB_Modelo.modelo_id = ISNULL(TB_osAtendimento.modelo_id, TB_osAbertura.modelo_id)
                        WHERE TB_Clientes.clientes_cgc = :cpf
                        ORDER BY 8 DESC;`,
                            // recurso que chama à query
                            reource: {
                                method: 'get',
                                path: '/assist/os/{cpf}'
                            }

                        }
                    ]
                    
                }
            ]
        },
        // environment
        env: [
            {
                // nome do pod no opeshift
                var: "Ambiente",
                // valores estabelecidos em homolog e em produção nessa ordem
                values: ["HOMOLOG", "PRODUCAO"],
                // tome utilizado como var e na descrição da documentação
                name: "ambiente"
            },
            {
                var: "TZ",
                values: ["America/saoPaulo", "America/saoPaulo"],
                name: "timezone"
            },
            {
                var: "banco",
                values: ["sdbc://mysql:05", "sdbc://mysql:20"],
                name: "cadastraDB"
            }
        ],
        // dependencias são não apenas os codigos instalados no runtime, como também recursos que não foram criados dentro do codigo. Já vem com uma descrição completa e 
            // com as relações necessarias baseadas na estrutura desse json;
            /*
                1. Zabbix
                2. Grafana
                
                Os recursos criados no hello world serão descritos por la e poderam ser trazidos para ca (como o FileConnector utilizand o proxy)
            
            */
        dependencies: [
            {
                name: "zabbix",
                product: "api"
            },
            {
                name: "FILE_CONNECTOR_1",
                product: "local-entry"
            }
        ]
    }
}
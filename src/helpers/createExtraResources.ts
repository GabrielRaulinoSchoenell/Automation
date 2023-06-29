import fs from 'fs-extra';
import * as ConsoleLog from './consoleLog'

let progress = 0;
function createLoadingBar(message: any, total: any) {
    // console.log(total)
  
    const percentage = Math.ceil((progress / total));
    const barLength = progress;
    const bar = '█'.repeat(parseInt(barLength as any)) + ' '.repeat(100 - parseInt(barLength as any));

    // Create the loading bar string
    const loadingBar = `Progress: ==${bar}== ${percentage}%`;

    // Clear the previous output using a carriage return
    // process.stdout.write('\r' + loadingBar);

    progress++;

    if (progress > total) {
        process.stdout.write('\n');
    }
  }

export const defining  = (extra: any, generalData: any)=>{
    let postmanEndpointsContent = '';
    let postmanCollectionFolder = '';
    let endpointListingContent = '';
    let apiListingContent = '';
    
    let swaggerTags = '';

    let sequenceContent = '';

    generalData.sequences.data.forEach((sequence: any)=>{
        sequenceContent += `A sequence ${sequence.name} realiza ______.\n<br>\n`;
    });

    generalData.apis.data.forEach((api: any, genKey: number)=>{
        let context = api.context;

        swaggerTags += 
`  - name: ${api.name}
    description: Descrição\n`
        
        apiListingContent += `Api ${api.name} tem o contexto ${api.context} e tem recursos que servem para _________\n<br>\n`
        api.resources.forEach((resource: any, key: number) => {
            let methods = resource.method.split(' ');
            methods.forEach((method: string) => {
                endpointListingContent += `\t<tr>
        <td>${method.toUpperCase()}</td>
        <td>${context}${resource.url}</td>
        <td>Esse endpoint faz...........</td>
    </tr>\n`;

    const isLastIteration = genKey === generalData.apis.data.length - 1 &&
      key === api.resources.length - 1;
      createLoadingBar("postmanCollection", api.resources.length); // Total is 100, delay is 100ms
            postmanEndpointsContent += `
                {
                    "name": "${context}${resource.url}",
                    "request": {
                        "method": "${method.toUpperCase()}",
                        "header": "[]",
                        "body": {
                            "mode": "raw",
                            "raw": {"body": "body"},
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": "{{base_url}}${context}/${api.versionType=='url' ? generalData.version : generalData.version} ${resource.url ? resource.url : ''}"
                    },
                    "response": []
                }${isLastIteration ?'':','}
                `
            });
        });

    });
    let postmanCollectionContent = 
`{
    "info": {
        "_postman_id":"1234",
        "name": "${generalData.project}",
        "description": "${generalData.description}",
        "schema":  "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [${postmanEndpointsContent}]

}`;

    let swaggerContent = 
`openapi: 3.0.3
info:
  title: Swagger ERP - OpenAPI 3.0
  version: 1.0.11
tags:
${swaggerTags}paths:
  /supplier:
    post:
      tags:
        - Supplier
      summary: Adciona um novo forncedor no ERP (Ariba envia para ERP)
      requestBody:
        description: Objeto de criação de um fornecedor
        content:
          application/json:
            schema:
              properties:
                externalId:
                  type: string
                  description: Identificador unico do registro
                  example: BR54321633000120
                supplierType:
                  type: string
                  description: Tipo de Fornecedor
                  enum:
                    - Nacional
                    - Internacional
                corporateName:
                  maxLength: 80
                  type: string
                  description: Razão Social
                  example: Marlene e Ryan Eletrônica ME
                fantasyName:
                  maxLength: 12
                  type: string
                  description: Nome Fantasia
                language:
                  type: string
                  description: Idioma
                  enum:
                    - Português
                    - Inglês
                    - Espanhol
                legalRepresentativeName:
                  maxLength: 40
                  type: string
                  description: Nome completo do representante legal
                  example: Nome representante
                cpfLegalRepresentative:
                  type: string
                  description: CPF representante legal
                  example: '68478928588'
                legalRepresentativeEmail:
                  type: string
                  description: Email do representante Legal
                  example: emailRepresentante@gmail.com
                nameContactLogistics:
                  maxLength: 40
                  type: string
                  description: Nome completo do contato logística
                  example: Nome Logistic
                logisticsContactEmail:
                  type: string
                  description: Email do Contato Logística
                  example: emaillogistica@gmail.com
                logisticsContactPhone:
                  type: string
                  description: Telefone do Contato Logística
                  example: '1146402500'
                financialContactName:
                  type: string
                  description: Nome completo do Contato Financeiro
                  example: Nome Comercial
                financialContactEmail:
                  type: string
                  description: Email do contato Financeiro
                  example: emailcomercial@gmail.com
                financialContactPhone:
                  type: string
                  description: Telefone do Contato Financeiro
                  example: '1146402500'
                addressCountry:
                  maxLength: 2
                  type: string
                  description: País
                  example: BR
                addressStreet:
                  maxLength: 35
                  type: string
                  description: Rua
                  example: Rua Joviano de Carvalho
                addressNumber:
                  maxLength: 5
                  type: string
                  description: Número
                  example: '2611'
                addressComplement:
                  maxLength: 40
                  type: string
                  description: Complemento
                  example: Apto 4
                addressDistrict:
                  maxLength: 30
                  type: string
                  description: Bairro
                  example: Interlagos
                addressPostalCode:
                  maxLength: 12
                  type: string
                  description: CEP
                  example: 14405-177
                addressState:
                  maxLength: 2
                  type: string
                  description: Estado
                  example: SP
                addressCity:
                  maxLength: 25
                  type: string
                  description: Cidade
                  example: Sao Paulo
                Website:
                  maxLength: 40
                  type: string
                  description: Website
                  example: www.website.com.br
                bankCode:
                  maxLength: 3
                  type: string
                  description: Código do Banco
                  example: '725'
                bankName:
                  type: string
                  description: Nome do Banco
                  example: Original
                agency:
                  type: string
                  description: Agência
                  example: '2879'
                agencyDigit:
                  type: string
                  description: Dígito da Agência
                  example: '7'
                currentAccount:
                  type: string
                  description: Conta Corrente (sem dígito)
                  example: '123123'
                currentAccountDigit:
                  type: string
                  description: Dígito da Conta Corrente
                  example: '4'
                bankAddress:
                  type: string
                  description: Endereço do Banco
                  example: Rua Joviano de Carvalho
                currency:
                  type: string
                  description: Moeda
                  enum:
                    - Real
                    - Dolar
                    - Euro
                    - Iene
                    - Iuan
                pixKey:
                  type: string
                  description: Chave Pix
                  example: chavepixteste@gmail.com
                keyType:
                  type: string
                  description: Tipo de Chave
                  enum:
                    - CPF
                    - CNPJ
                    - E-mail
                    - Telefone
                    - Chave Aleatória
                cnpj:
                  type: string
                  description: CNPJ (apenas números)
                  example: '416137609343'
                municipalRegistration:
                  type: string
                  description: Inscrição Municipal
                  example: '111111111111'
                stateRegistration:
                  type: string
                  description: Inscrição Estadual
                  example: ISENTO
                serviceProvider:
                  type: string
                  description: Prestador de Serviço?
                  enum:
                    - Sim
                    - Não
                taxRegime:
                  type: string
                  description: Regime Tributário
                  example: Simples Nacional
                taxId:
                  type: string
                  description: Tax id
                swift:
                  type: string
                  description: SWIFT
                  example: '74724394000167'
                beneficiary:
                  type: string
                  description: Beneficiário
                  example: Marco
                formOfPayment:
                  type: string
                  description: Forma de Pagamento
                  enum:
                    - Boleto
                    - Depósito (DOC)
                    - PIX (Cheque Nominal)
                supplierGroup:
                  type: string
                  description: Grupo de Fornecedor
                  enum:
                    - FORNECEDOR NACIONAL - MP
                    - FORNECEDOR NACIONAL - OEM
                    - FORNECEDOR NACIONAL - OUTROS
                    - TRANSPORTADORA NACIONAL
                    - AGENTE DE CARGA
                    - TRANSPORTADORA
                    - FORNECEDOR IMPORTADO - MP
                    - FORNECEDOR IMPORTADO - OEM
                    - FORNECEDOR IMPORTADO - OUTROS
        required: true
      responses:
        '201':
          description: >-
            A requisição foi completamente processada pelo servidor e um ou mais
            recursos foram criados em decorrência disso
          content:
            application/json:
              schema:
                type: object
                properties:
                  externalId:
                    type: string
                    description: Identificador unico do registro
                    example: BR54321633000120
                  customerCode:
                    type: string
                    description: Código do emitente
                    example: '819385'
        '400':
          description: >-
            Indica que o servidor não pode ou não irá processar a requisição
            devido a alguma coisa que foi entendida como um erro do cliente.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
        '500':
          description: >-
            O servidor encontrou um condição inesperada que o impediu de atender
            completamente a requisição.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
      security:
        - default: []
      x-auth-type: None
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
  /suppliers:
    get:
      tags:
        - Supplier
      summary: Consulta de fornecedores (Serviço criado pelo NFS)
      description: >-
        Essa integração tem como objetivo consultar a base de fornecedores do
        ERP.
      parameters:
        - name: creationDate
          in: query
          required: false
          style: form
          explode: true
          schema:
            type: string
            format: date
        - name: modificationDate
          in: query
          required: false
          style: form
          explode: true
          schema:
            type: string
            format: date
        - name: page
          in: query
          required: false
          style: form
          explode: true
          schema:
            type: string
        - name: pageSize
          in: query
          required: false
          style: form
          explode: true
          schema:
            type: string
      responses:
        '200':
          description: Sucesso
          content:
            application/json:
              schema:
                type: object
                properties:
                  currentPage:
                    type: integer
                    format: int32
                  totalPages:
                    type: integer
                    format: int32
                  pageSize:
                    type: integer
                    format: int32
                  totalResults:
                    type: integer
                    format: int32
                  Payload:
                    type: array
                    items:
                      type: object
                      properties:
                        documentNumber:
                          type: string
                          description: 'Número do documento (CNPJ, CPF ou Estrangeiro)'
                          example: '81938567000105'
                        corporateName:
                          maxLength: 80
                          type: string
                          description: Razão Social
                          example: Marlene e Ryan Eletrônica ME
                        municipalRegistration:
                          type: string
                          description: Inscrição Municipal
                          example: '111111111111'
                        customerCode:
                          type: string
                          description: Código do emitente
                          example: '819385'
                        emails:
                          type: array
                          description: Lista de e-mail
                          items:
                            type: string
                            example: email3@example.com
        '500':
          description: Erro ao Buscar Fornecedores
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
      security:
        - default: []
      x-auth-type: Application & Application User
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
  '/supplier/{externalId}':
    put:
      tags:
        - Supplier
      summary: Atualiza um fornecedor existente (Ariba envia para ERP)
      parameters:
        - name: externalId
          in: path
          description: Identificador unico do registro
          required: true
          style: simple
          explode: false
          schema:
            type: string
      requestBody:
        description: Objeto para atualização de um fornecedor
        content:
          application/json:
            schema:
              properties:
                supplierType:
                  type: string
                  description: Tipo de Fornecedor
                  enum:
                    - Nacional
                    - Internacional
                language:
                  type: string
                  description: Idioma
                  enum:
                    - Português
                    - Inglês
                    - Espanhol
                legalRepresentativeName:
                  type: string
                  description: Nome completo do Representante Legal
                  example: Nome Representante
                legalRepresentativeEmail:
                  type: string
                  description: Email do Representante Legal
                  example: emailRepresentante@gmail.com
                nameContactLogistics:
                  type: string
                  description: Nome completo do Contato Logística
                  example: Nome Logistic
                logisticsContactEmail:
                  type: string
                  description: Email do Contato Logística
                  example: emaillogistica@gmail.com
                logisticsContactPhone:
                  type: string
                  description: Telefone do Contato Logística
                  example: '1146402500'
                financialContactName:
                  type: string
                  description: Nome completo do Contato Financeiro
                  example: Nome Comercial
                financialContactEmail:
                  type: string
                  description: Email do contato Financeiro
                  example: emailcomercial@gmail.com
                financialContactPhone:
                  type: string
                  description: Telefone do Contato Financeiro
                  example: '1146402500'
                addressCountry:
                  type: string
                  description: País
                  example: BR
                addressStreet:
                  type: string
                  description: Rua
                  example: Rua Joviano de Carvalho
                addressNumber:
                  type: string
                  description: Número
                  example: '2611'
                addressComplement:
                  type: string
                  description: Complemento
                  example: Apto 4
                addressDistrict:
                  type: string
                  description: Bairro
                  example: Interlagos
                addressPostalCode:
                  type: string
                  description: CEP
                  example: 14405-177
                addressState:
                  type: string
                  description: Estado
                  example: SP
                addressCity:
                  type: string
                  description: Cidade
                  example: Sao Paulo
                Website:
                  type: string
                  description: Website
                  example: www.website.com.br
                bankCode:
                  type: string
                  description: Código do Banco
                  example: '725'
                bankName:
                  type: string
                  description: Nome do Banco
                  example: Original
                agency:
                  type: string
                  description: Agência
                  example: '2879'
                agencyDigit:
                  type: string
                  description: Dígito da Agência
                  example: '7'
                currentAccount:
                  type: string
                  description: Conta Corrente (sem dígito)
                  example: '123123'
                currentAccountDigit:
                  type: string
                  description: Dígito da Conta Corrente
                  example: '4'
                bankAddress:
                  type: string
                  description: Endereço do Banco
                  example: Rua Joviano de Carvalho
                currency:
                  type: string
                  description: Moeda
                  enum:
                    - Real
                    - Dolar
                    - Euro
                    - Iene
                    - Iuan
                pixKey:
                  type: string
                  description: Chave Pix
                  example: chavepixteste@gmail.com
                keyType:
                  type: string
                  description: Tipo de Chave
                  enum:
                    - CPF
                    - CNPJ
                    - E-mail
                    - Telefone
                    - Chave Aleatória
                municipalRegistration:
                  type: string
                  description: Inscrição Municipal
                  example: '111111111111'
                stateRegistration:
                  type: string
                  description: Inscrição Estadual
                  example: ISENTO
                serviceProvider:
                  type: string
                  description: Prestador de Serviço?
                  enum:
                    - Sim
                    - Não
                swift:
                  type: string
                  description: SWIFT
                  example: '74724394000167'
                beneficiary:
                  type: string
                  description: Beneficiário
                  example: Marco
                formOfPayment:
                  type: string
                  description: Forma de Pagamento
                  enum:
                    - Boleto
                    - Depósito (DOC)
                    - PIX (Cheque Nominal)
        required: true
      responses:
        '200':
          description: A requisição foi bem sucedida.
          content:
            application/json:
              schema:
                type: object
                properties:
                  externalId:
                    type: string
                    description: Identificador unico do registro
                    example: BR54321633000120
                  customerCode:
                    type: string
                    description: Código do emitente
                    example: '819385'
        '400':
          description: >-
            Indica que o servidor não pode ou não irá processar a requisição
            devido a alguma coisa que foi entendida como um erro do cliente.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
        '500':
          description: >-
            O servidor encontrou um condição inesperada que o impediu de atender
            completamente a requisição.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
      security:
        - default: []
      x-auth-type: None
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
  /sourcing:
    post:
      tags:
        - Sourcing
      summary: Negociação Comercial de Produtos e Projetos (RFI/RFP) (Ariba envia para ERP)
      requestBody:
        description: Objeto de criação de abastecimento
        content:
          application/json:
            schema:
              type: array
              items:
                type: object
                properties:
                  centerID:
                    maxLength: 5
                    type: string
                    description: Estabelecimento
                  buyer:
                    maxLength: 12
                    type: string
                    description: Comprador Responsável
                  supplierID:
                    type: integer
                    description: Código do fornecedor
                  spendType:
                    type: string
                    description: Tipo de gasto
                    enum:
                      - OEM
                      - CKD
                      - SKD
                      - MP
                      - Indiretos
                      - QRF
                  Itens:
                    type: array
                    items:
                      type: object
                      properties:
                        sequence:
                          type: integer
                          description: Sequencia do item
                        shipper:
                          type: string
                          description: Transportador
                        paymentTerms:
                          type: string
                          description: Condição de Pagamento
                        productID:
                          type: string
                          description: Código do Item
                        supplierID:
                          type: string
                          description: Código do Fornecedor
                        productNameComplement:
                          maxLength: 2000
                          type: string
                          description: Descrição Complementar
                        ledgerAccount:
                          type: string
                          description: Conta Contábil
                        costCenter:
                          type: string
                          description: Centro de Custo
                        quantity:
                          type: number
                          description: Quantidade
                        unitPrice:
                          type: number
                          description: Preço Unitário
                        currency:
                          type: string
                          description: Moeda
                          enum:
                            - Real
                            - Dolar
                            - Euro
                            - Iene
                            - Iuan
                        ipiTax:
                          type: number
                          description: Aliquota IPI
                          example: 12
                        icmsTax:
                          type: number
                          description: Aliquota ICMS
                        issTax:
                          type: number
                          description: Aliquota ISS
                        incoterm:
                          type: string
                          description: Incoterm
                        purchaseType:
                          type: string
                          description: Finalidade de Compra
                          enum:
                            - Consumo
                            - Industrialização
                        leadTime:
                          type: number
                          description: Prazo de Entrega
                        transitTime:
                          type: number
                          description: Transit Time
                        supplierReference:
                          type: string
                          description: Referência Fabricante
                        unitMeasure:
                          type: string
                          description: Unidade de Medida Fornecedor
                        itinerary:
                          type: number
                          description: Itinerário
                        checkpoint:
                          type: number
                          description: Ponto de Controle Base
                        logisticsAnalyst:
                          type: string
                          description: Analista Logístico
      responses:
        '201':
          description: >-
            A requisição foi completamente processada pelo servidor e um ou mais
            recursos foram criados em decorrência disso
          content:
            application/json:
              schema:
                type: object
                properties:
                  externalId:
                    type: string
                    description: Identificador unico do registro
                    example: BR54321633000120
                  customerCode:
                    type: string
                    description: Código do emitente
                    example: '819385'
                  purchasingId:
                    type: string
                    description: Número do documento de compras
                    example: '123456'
        '400':
          description: >-
            Indica que o servidor não pode ou não irá processar a requisição
            devido a alguma coisa que foi entendida como um erro do cliente.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
        '500':
          description: >-
            O servidor encontrou um condição inesperada que o impediu de atender
            completamente a requisição.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
      security:
        - default: []
      x-auth-type: None
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
  /buying:
    post:
      tags:
        - Buying
      summary: Catálogo de compras (Ariba envia para ERP)
      requestBody:
        description: Objeto de criação do catálogo de compras
        content:
          application/json:
            schema:
                type: object
                properties:
                  centerID:
                    maxLength: 5
                    type: string
                    description: Estabelecimento
                  buyer:
                    maxLength: 12
                    type: string
                    description: Comprador Responsável
                  supplierID:
                    type: string
                    description: Código do Fornecedor
                  shipper:
                    type: string
                    description: Transportador
                  paymentTerms:
                    type: string
                    description: Condição de Pagamento
                  incoterm:
                    type: string
                    description: Incoterm
                  demandType:
                    type: string
                    description: Tipo de Solicitação
                    enum:
                      - Compra Normal
                      - Orçamento
                      - Regularização
                      - Compra Delegada
                      - Amostra MP
                      - Amostra OEM
                      - Compra Spot
                      - Spare Part
                      - Produtos 195
                      - Produtos 198
                      - Licença
                  logisticsAnalyst:
                    type: string
                    description: Analista Logístico
                  Itens:
                    type: array
                    items:
                      type: object
                      properties:
                        sequence:
                          type: string
                          description: Sequencia
                        productID:
                          type: string
                          description: Código do Item
                        productNameComplement:
                          maxLength: 2000
                          type: string
                          description: Descrição Complementar
                        quantity:
                          type: number
                          description: Quantidade
                        unitPrice:
                          type: number
                          description: Preço Unitário
                        requester:
                          maxLength: 12
                          type: string
                          description: Requisitante
                        currency:
                          type: string
                          description: Moeda
                          enum:
                            - Real
                            - Dolar
                            - Euro
                            - Iene
                            - Iuan
                        ipiTax:
                          type: number
                          description: Aliquota IPI
                          example: 12
                        icmsTax:
                          type: number
                          description: Aliquota ICMS
                        issTax:
                          type: number
                          description: Aliquota ISS
                        leadTime:
                          type: number
                          description: Prazo de Entrega
                        supplierReference:
                          type: string
                          description: Referência Fabricante
                        unitSupplierMeasure:
                          type: string
                          description: Unidade de Medida Fornecedor
                        supplierQuantity:
                          type: number
                          description: Quantidade Fornecedor
                        account:
                          type: array
                          items:
                            type: object
                            properties:
                              ledgerAccount:
                                type: string
                                description: Conta Contábil
                              costCenter:
                                type: string
                                description: Centro de Custo
                              apportionment:
                                type: number
                                description: Rateio
      responses:
        '201':
          description: >-
            A requisição foi completamente processada pelo servidor e um ou mais
            recursos foram criados em decorrência disso
          content:
            application/json:
              schema:
                type: object
                properties:
                  externalId:
                    type: string
                    description: Identificador unico do registro
                    example: BR54321633000120
                  customerCode:
                    type: string
                    description: Código do emitente
                    example: '819385'
                  purchasingId:
                    type: string
                    description: Número do documento de compras
                    example: '123456'
        '400':
          description: >-
            Indica que o servidor não pode ou não irá processar a requisição
            devido a alguma coisa que foi entendida como um erro do cliente.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
        '500':
          description: >-
            O servidor encontrou um condição inesperada que o impediu de atender
            completamente a requisição.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
      security:
        - default: []
      x-auth-type: None
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
    put:
      tags:
        - Buying
      summary: Catálogo de compras (Ariba envia para ERP)
      requestBody:
        description: Objeto de atualização do catálogo de compras
        content:
          application/json:
            schema:
                type: object
                properties:
                  purchaseOrder:
                    type: string
                    description: Número do documento de compras
                    example: '123456'
                  requester:
                    maxLength: 12
                    type: string
                    description: Requisitante
                  paymentTerms:
                    type: string
                    description: Condição de Pagamento
                  incoterm:
                    type: string
                    description: Incoterm
                  logisticsAnalyst:
                    type: string
                    description: Analista Logístico
                  Itens:
                    type: array
                    items:
                      type: object
                      properties:
                        sequence:
                          type: string
                          description: Sequencia
                        quantity:
                          type: number
                          description: Quantidade
                        unitPrice:
                          type: number
                          description: Preço Unitário
                        unitSupplierMeasure:
                          type: string
                          description: Unidade de Medida Fornecedor
                        supplierQuantity:
                          type: number
                          description: Quantidade Fornecedor
                        status:
                          type: boolean
                          default: false
                          description: Indica se o item foi eliminado
                        account:
                          type: array
                          items:
                            type: object
                            properties:
                              ledgerAccount:
                                type: string
                                description: Conta Contábil
                              costCenter:
                                type: string
                                description: Centro de Custo
                              apportionment:
                                type: number
                                description: Rateio
      responses:
        '201':
          description: >-
            A requisição foi completamente processada pelo servidor e um ou mais
            recursos foram criados em decorrência disso
          content:
            application/json:
              schema:
                type: object
                properties:
                  externalId:
                    type: string
                    description: Identificador unico do registro
                    example: BR54321633000120
                  customerCode:
                    type: string
                    description: Código do emitente
                    example: '819385'
                  purchasingId:
                    type: string
                    description: Número do documento de compras
                    example: '123456'
        '400':
          description: >-
            Indica que o servidor não pode ou não irá processar a requisição
            devido a alguma coisa que foi entendida como um erro do cliente.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
        '500':
          description: >-
            O servidor encontrou um condição inesperada que o impediu de atender
            completamente a requisição.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
      security:
        - default: []
      x-auth-type: None
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
  /buying/{purchaseOrderId}:
    delete:
      tags:
        - Buying
      summary: Exclusão de um catálogo de compras (Ariba envia para ERP)
      parameters:
        - name: purchaseOrderId
          in: path
          description: Identificador unico do registro
          required: true
          style: simple
          explode: false
          schema:
            type: string
      responses:
        '200':
          description: A requisição foi bem sucedida.
      security:
        - default: []
      x-auth-type: None
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
  /contracts:
    post:
      tags:
        - Contracts
      summary: Gestão de acordos comercias (Tabela de preços) (Ariba envia para ERP)
      requestBody:
        description: Objeto de criação de acordos comercias
        content:
          application/json:
            schema:
              type: array
              items:
                type: object
                properties:
                  supplierID:
                    maxLength: 9
                    type: integer
                    description: Código do Fornecedor
                    example: 153479898
                  centerID:
                    maxLength: 5
                    type: string
                    description: Estabelecimento
                  initialDate:
                    type: string
                    description: Data início vigência
                    format: date
                  finalDate:
                    type: string
                    description: Data fim vigência
                    format: date
                  currency:
                    type: string
                    description: Moeda
                    enum:
                      - Real
                      - Dolar
                      - Euro
                      - Iene
                      - Iuan
                  docType:
                    type: string
                    description: Tipo de documento
                    enum:
                      - Nova Contratação
                      - Renegociação
                      - Desenvolvimento de Produto
                  spendType:
                    type: string
                    description: Tipo de gasto
                    enum:
                      - OEM
                      - CKD
                      - SKD
                      - MP
                      - Indiretos
                      - QRF
                  Itens:
                    type: array
                    items:
                      type: object
                      properties:
                        productID:
                          maxLength: 16
                          type: string
                          description: Código do Item
                        unitPrice:
                          type: number
                          description: Preço Unitário
                        unitMeasure:
                          maxLength: 2
                          type: string
                          description: Unidade de Medida Fornecedor
                        leadTime:
                          maxLength: 4
                          type: number
                          description: Prazo de Entrega
                        transitTime:
                          type: number
                          description: Transit Time
                        moqQuantity:
                          type: number
                          description: Lote Mínimo (MOQ)
                        multipleQuantity:
                          type: number
                          description: Lote Múltiplo
                        share:
                          maxLength: 3
                          type: number
                          description: Share do item %
                        ipiTax:
                          type: number
                          description: Aliquota IPI
                          example: 12
                        icmsTax:
                          type: number
                          description: Aliquota ICMS
                        paymentTerms:
                          type: number
                          description: Condição de Pagamento
                        conversion:
                          type: number
                          description: Fator Conversão
                        decimalPlaces:
                          type: number
                          description: Casas Decimais
                        supplierReference:
                          maxLength: 60
                          type: string
                          description: Referência Fabricante
                        logisticsAnalyst:
                          maxLength: 12
                          type: string
                          description: Analista Logístico
                        safetyStock:
                          type: number
                          description: Quantidade Segurança
                        fftDays:
                          type: number
                          description: Libera FFT
      responses:
        '201':
          description: >-
            A requisição foi completamente processada pelo servidor e um ou mais
            recursos foram criados em decorrência disso
          content:
            application/json:
              schema:
                type: object
                properties:
                  purchasingContractId:
                    type: string
                    description: Número do documento do contrato de compras
                    example: '123456'
        '400':
          description: >-
            Indica que o servidor não pode ou não irá processar a requisição
            devido a alguma coisa que foi entendida como um erro do cliente.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
        '500':
          description: >-
            O servidor encontrou um condição inesperada que o impediu de atender
            completamente a requisição.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
      security:
        - default: []
      x-auth-type: None
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
    put:
      tags:
        - Contracts
      summary: Gestão de acordos comercias (Tabela de preços) (Ariba envia para ERP)
      requestBody:
        description: Objeto de atualização de acordos comercias
        content:
          application/json:
            schema:
              type: array
              items:
                type: object
                properties:
                  supplierID:
                    maxLength: 9
                    type: integer
                    description: Código do Fornecedor
                    example: 153479898
                  centerID:
                    maxLength: 5
                    type: string
                    description: Estabelecimento
                  initialDate:
                    type: string
                    description: Data início vigência
                    format: date
                  finalDate:
                    type: string
                    description: Data fim vigência
                    format: date
                  currency:
                    type: string
                    description: Moeda
                    enum:
                      - Real
                      - Dolar
                      - Euro
                      - Iene
                      - Iuan
                  docType:
                    type: string
                    description: Tipo de documento
                    enum:
                      - Nova Contratação
                      - Renegociação
                      - Desenvolvimento de Produto
                  spendType:
                    type: string
                    description: Tipo de gasto
                    enum:
                      - OEM
                      - CKD
                      - SKD
                      - MP
                      - Indiretos
                      - QRF
                  Itens:
                    type: array
                    items:
                      type: object
                      properties:
                        productID:
                          maxLength: 16
                          type: string
                          description: Código do Item
                        unitPrice:
                          type: number
                          description: Preço Unitário
                        unitMeasure:
                          maxLength: 2
                          type: string
                          description: Unidade de Medida Fornecedor
                        leadTime:
                          maxLength: 4
                          type: number
                          description: Prazo de Entrega
                        transitTime:
                          type: number
                          description: Transit Time
                        moqQuantity:
                          type: number
                          description: Lote Mínimo (MOQ)
                        multipleQuantity:
                          type: number
                          description: Lote Múltiplo
                        share:
                          maxLength: 3
                          type: number
                          description: Share do item %
                        ipiTax:
                          type: number
                          description: Aliquota IPI
                          example: 12
                        icmsTax:
                          type: number
                          description: Aliquota ICMS
                        paymentTerms:
                          type: number
                          description: Condição de Pagamento
                        conversion:
                          type: number
                          description: Fator Conversão
                        decimalPlaces:
                          type: number
                          description: Casas Decimais
                        supplierReference:
                          maxLength: 60
                          type: string
                          description: Referência Fabricante
                        logisticsAnalyst:
                          maxLength: 12
                          type: string
                          description: Analista Logístico
                        safetyStock:
                          type: number
                          description: Quantidade Segurança
                        fftDays:
                          type: number
                          description: Libera FFT
      responses:
        '201':
          description: >-
            A requisição foi completamente processada pelo servidor e um ou mais
            recursos foram criados em decorrência disso
          content:
            application/json:
              schema:
                type: object
                properties:
                  purchasingContractId:
                    type: string
                    description: Número do documento do contrato de compras
                    example: '123456'
        '400':
          description: >-
            Indica que o servidor não pode ou não irá processar a requisição
            devido a alguma coisa que foi entendida como um erro do cliente.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
        '500':
          description: >-
            O servidor encontrou um condição inesperada que o impediu de atender
            completamente a requisição.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Erros:
                    type: array
                    items:
                      type: object
                      properties:
                        errorInfo:
                          type: string
                          description: Infromação do erro
                        errorCode:
                          type: integer
                          description: Código de erro
                          format: string
                        errorDescription:
                          type: string
                          description: Descrição detalhada do erro
      security:
        - default: []
      x-auth-type: None
      x-throttling-tier: Unlimited
      x-wso2-application-security:
        security-types:
          - oauth2
        optional: false
components:
  securitySchemes:
    default:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: 'https://test.com'
          scopes: {}
x-wso2-cors:
  corsConfigurationEnabled: false
  accessControlAllowOrigins:
    - '*'
  accessControlAllowCredentials: false
  accessControlAllowHeaders:
    - authorization
    - Access-Control-Allow-Origin
    - Content-Type
    - SOAPAction
    - apikey
    - Internal-Key
  accessControlAllowMethods:
    - GET
    - PUT
    - POST
    - DELETE
    - PATCH
    - OPTIONS
x-wso2-production-endpoints:
  urls:
    - 'https://progress-wso2-homolog.apps.intelbras.com.br/account/v1'
  type: http
x-wso2-sandbox-endpoints:
  urls:
    - 'https://progress-wso2-homolog.apps.intelbras.com.br/account/v1'
  type: http
x-wso2-basePath: /supplierManagement/1.0.0
x-wso2-transports:
  - http
  - https
x-wso2-response-cache:
  enabled: false
  cacheTimeoutInSeconds: 300

    ` 


    let definingContent = `
# ${generalData.project}

Este arquivo é uma documentação completa do projeto. Vamos passar por todos os pontos que sejam necessarios para o entendimento do projeto:

## Listagem de endpoints

*Os endpoints podem ser baixados como Collection no POSTMAN em ExtraResources/postmanCollection.json*

### A seguir a listagem rápida dos endpoints:

<table border=1>
    <tr>
        <td>METHOD</td>
        <td>ENDPOINT</td>
        <td>DESCRIÇÃO</td>
    </tr>
    ${endpointListingContent}
</table>

____
____

## Informações para GMUD

<font color='#fb2' size='4'>Os servidores afetados pelo código são:</font>

* sjo-____ 
*  http:____

1. TOTVs, afetados pelos endpoints ou recursos: 
    * /___
    * /___ (GET e POST)
    * /___ (apenas POST)
2. SalesForce, afetados pelos endpoints ou recursos:
    * /___
    * ___Sequence
<br>
<br>

### As areas afetados pelo código são:

1. TI, _______


## Operações do projeto

### APIs: 
${apiListingContent}
### Sequences: 
${sequenceContent}
### Endpoints:
### DataServies:`;



extra.defining ? fs.writeFileSync(`./src/media/ExtraResources/defining.md`, definingContent) : null; 
extra.postman ? fs.writeFileSync(`./src/media/ExtraResources/postmanCollection.json`, postmanCollectionContent) : null;
extra.swagger ? fs.writeFileSync(`./src/media/ExtraResources/projectName.yaml`, swaggerContent) : null
}

export const listing = (extra: any, generalData: any)=>{
    generalData.apis.data.forEach((api: any)=>{
        api.resources.forEach((resource: any)=>{
            // console.log("lsiting", api.name)
        })
    })
}

export const vars = (extra: any, generalData: any, envType: any)=>{
    let varsContent = '===== variaveis em HOMOLOG, se alguma var for secreta, pegue-a no openShift =====\n\n';
    generalData.env?.forEach((el: any) => {
        varsContent += `setX -m ${el.var} "${el.values[envType]}"\n`
    }); 

    extra.setVars ? fs.writeFileSync(`./src/media/ExtraResources/setVars.txt`,varsContent) : null;
   
}

export const ExtraResources = (extra: any, generalData: any, envType: number)=>{
    console.log('----------------------------------------------------------------');
    console.log('================ Creating ExtraResources =======================');
    
    fs.mkdirSync('./src/media/ExtraResources');
    
    
    vars(extra, generalData, envType)
    listing(extra, generalData)
    defining(extra, generalData);  

   
    let postmanEnvContent = `{
        "id": "1234",
        "name": "${generalData.project}ENV",
        "values": [
                {
                    "key": "base_url",
                    "value": "${generalData.projectUrl}",
                    "enabled": true
                }
            ]
        }
    `;

    extra.creation ? fs.writeFileSync(`./src/media/ExtraResources/creation.json`, JSON.stringify(generalData)): null;
    extra.postman ? fs.writeFileSync(`./src/media/ExtraResources/postmanEnv.json`, postmanEnvContent) : null;


    ConsoleLog.success("---------------- Extra Resources have been created -----------------")
}
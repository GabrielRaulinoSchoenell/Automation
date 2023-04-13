
# Pagamento

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
    	<tr>
        <td>GET</td>
        <td>/assist/os/{cpf}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/colaboradorByLideranca</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/colaboradorByNome</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/colaborador</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/consultar-horas</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/grupos/programaERP/{codPrograma}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/pessoa/v1/juridica/{cnpj}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/conta/v1/chatbot/clienteFinal</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/conta/v1/{cnpj}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/assist/os/{cpf}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/centro-custo/v2undefined</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/centro-custo/v3undefined</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/centro-custo/v1/centro-custo</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/centro-custo/v1/centro-custo/{estabelecimento}/{codigo}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/centro-custo/v1/centro-custo/{descricao}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/colaboradorByLideranca</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/colaboradorByNome</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/colaborador</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/consultar-horas</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/colaborador/grupos/programaERP/{codPrograma}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/pessoa/v1/juridica/{cnpj}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/conta/v1/chatbot/clienteFinal</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/conta/v1/{cnpj}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/contato/v2/existe/cpfCnpj/{cpfCnpj}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/contato/v2/existe/email/{email}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/contato/v2/{cpfCnpj}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/contato/v2/email/{email}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/contato/v1/existe/cpfCnpj/{cpfCnpj}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/contato/v1/existe/email/{email}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/contato/v1/{cpfCnpj}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/contato/v1/email/{email}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/customerManagement/v1/customerAccountList</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/customerManagement/v1/customerAccountGet</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/estoque/v1/saldos</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/health-checkundefined</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/monitoramento/v1/zabbix?*</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/nota-fiscal/v1/devolucao/{cpfCnpj}/{serie}/{numero}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/nota-fiscal/v1/nota/{externalIdConsumer}/{startDate}/{endDate}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/nota-fiscal/v1/nota/{externalIdConsumer}/{orderCode}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/nota-fiscal/v1/nota-entrada/{numeroNota}/{numeroSerie}/{codEmitente}/{estabelecimento}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/nota-fiscal/v1/notas-fiscais/{numeroNota}/{numeroSerie}/{cgc}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/nota-fiscal/v1/nota/documentos/{numeroNota}/{numeroSerie}/{estabelecimento}/{cgc}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/nota-fiscal/v1/notas-fiscais-estrangeira/{numeroNota}/{numeroSerie}/{codEmitente}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/pagamento/v1/boleto</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/pagamento/v1/eventoGalaxPay</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/pedido/v1/pedido</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>PUT</td>
        <td>/pedido/v1/notafiscal-agenciamento</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/produto/v2/numero-serie/{ns}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/produto/v2/produtos/{idProduto}/{dataInicio}/{dataFim}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/produto/v2/produtos</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/produto/v2/produtos/{unidade}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/produto/v2/produtos/unidade/{unidade}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/produto/v2/produtos/codigo/{codigo}/status/{status}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/v1/produto/numero-serie/{ns}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/v1/produto/produtos/{idProduto}/{dataInicio}/{dataFim}</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/progress/v1/consulta</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>POST</td>
        <td>/tabelaPreco/v1/consultaItem</td>
        <td>Esse endpoint faz...........</td>
    </tr>
	<tr>
        <td>GET</td>
        <td>/unidade/v1/unidades</td>
        <td>Esse endpoint faz...........</td>
    </tr>

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
Api AssistAPI tem o contexto /assist e tem recursos que servem para _________
<br>
Api ColaboradorAPI tem o contexto /colaborador e tem recursos que servem para _________
<br>
Api ConsultaDadosFiscaisAPI tem o contexto /pessoa e tem recursos que servem para _________
<br>
Api ContaAPI tem o contexto /conta/v1 e tem recursos que servem para _________
<br>
Api AssistAPI tem o contexto /assist e tem recursos que servem para _________
<br>
Api CentroCustoAPI-v2 tem o contexto /centro-custo/v2 e tem recursos que servem para _________
<br>
Api CentroCustoAPI-v3 tem o contexto /centro-custo/v3 e tem recursos que servem para _________
<br>
Api CentroCustoAPI tem o contexto /centro-custo e tem recursos que servem para _________
<br>
Api ColaboradorAPI tem o contexto /colaborador e tem recursos que servem para _________
<br>
Api ConsultaDadosFiscaisAPI tem o contexto /pessoa e tem recursos que servem para _________
<br>
Api ContaAPI tem o contexto /conta/v1 e tem recursos que servem para _________
<br>
Api ContatoAPI-v2 tem o contexto /contato/v2 e tem recursos que servem para _________
<br>
Api ContatoAPI tem o contexto /contato e tem recursos que servem para _________
<br>
Api CustomerManagementAPI tem o contexto /customerManagement e tem recursos que servem para _________
<br>
Api EstoqueAPI tem o contexto /estoque/v1 e tem recursos que servem para _________
<br>
Api HealthCheck tem o contexto /health-check e tem recursos que servem para _________
<br>
Api MonitoramentoAPI tem o contexto /monitoramento/v1 e tem recursos que servem para _________
<br>
Api NotaFiscalAPI tem o contexto /nota-fiscal e tem recursos que servem para _________
<br>
Api PagamentoAPI tem o contexto /pagamento e tem recursos que servem para _________
<br>
Api PedidoAPI tem o contexto /pedido e tem recursos que servem para _________
<br>
Api ProdutoApi-v2 tem o contexto /produto/v2 e tem recursos que servem para _________
<br>
Api ProdutoApi tem o contexto /v1/produto e tem recursos que servem para _________
<br>
Api ProgressAPI tem o contexto /progress e tem recursos que servem para _________
<br>
Api TabelaPrecoAPI tem o contexto /tabelaPreco/v1 e tem recursos que servem para _________
<br>
Api UnidadeAPI tem o contexto /unidade/v1 e tem recursos que servem para _________
<br>

### Sequences: 
A sequence EnvironmentVariables realiza ______.
<br>
A sequence Pagamento realiza ______.
<br>
A sequence Vendas realiza ______.
<br>
A sequence Validacao realiza ______.
<br>
A sequence ErroNoPagamento realiza ______.
<br>

### Endpoints:
### DataServies:
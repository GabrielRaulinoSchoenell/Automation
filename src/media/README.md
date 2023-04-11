# CRMIntegration

Marcelão está adorando a nova automação de seu colega de trabalho/neto gabriel

---
---

## Realizar a instalação do projeto:

É possivel rodar o projeto na IDE seguindos os passos abaixo:

  1. <div class="steps">Instalação e configuração do Integration Studio - <a class="button-link" href="https://wso2.com/integration/integration-studio/" style="text-decoration: none">Baixe o Integration Studio</a></div> 

  2. <div class="steps">Apontando as variáveis JAVA_HOME e PATH para a JDK_8 - <a class="button-link" href="https://www.openlogic.com/openjdk-downloads?field_java_parent_version_target_id=416&field_operating_system_target_id=All&field_architecture_target_id=All& field_java_package_target_id=All" style="text-decoration: none">Baixe o JDK</a> | | <a style="text-decoration: none" class="button-link" href="https://docs.oracle.com/cloud/help/pt_BR/pbcs_common/DIEPM/epm_set_java_home_104x6dd63633_106x6dd6441c.htm#DIEPM-GUID-7D734C69-2DE8-4E93-A3C8-9C3F6AD12D1B" >Como apontar a variável</a></div>

  3. <div class="steps">Baixando o Maven e apontando o Path para o apache-maven-bin - <a class="button-link" style="text-decoration: none" href="https://maven.apache.org/guides/getting-started/windows-prerequisites.html">Guia completo Maven</a></div> 

  4. <div class="steps">Setando as variáveis de ambiente - <div class="tips">Arquivo para copiar e colar no cmd ExtraResources/setVars.txt</div> </div>
  <div style="color: #f30; font-weight: bold; background-color: #111; padding: 7px">Algumas variáveis do projeto estão como Secret pois precisam ser pegar diretamente do OpenShift</div>

  5. <div class="steps">Instalação das dependências do projeto na pasta do Integration Studio - <div class="tips"> encontre as dependências no dockerfile </div>| | <a class="button-link" style="text-decoration: none" href="http://githeellooworld">Guia</a></div> 

<br>
<div class="dashed"></div>
<br>

É possivel rodar o projeto pelo Docker

1. <div class="steps">Instalação e configuração do Integration Studio - <a class="button-link" href="https://wso2.com/integration/integration-studio/" style="text-decoration: none">Baixe o Integration Studio</a></div> 

  2. <div class="steps">Apontando as variáveis JAVA_HOME e PATH para a JDK_8 - <a class="button-link" href="https://www.openlogic.com/openjdk-downloads?field_java_parent_version_target_id=416&field_operating_system_target_id=All&field_architecture_target_id=All& field_java_package_target_id=All" style="text-decoration: none">Baixe o JDK</a> | | <a style="text-decoration: none" class="button-link" href="https://docs.oracle.com/cloud/help/pt_BR/pbcs_common/DIEPM/epm_set_java_home_104x6dd63633_106x6dd6441c.htm#DIEPM-GUID-7D734C69-2DE8-4E93-A3C8-9C3F6AD12D1B" >Como apontar a variável</a></div>

  3. <div class="steps">Setando as variáveis de ambiente - <div class="tips">Arquivo para copiar e colar no cmd ExtraResources/setVars.txt</div> </div>
  <div style="color: #f30; font-weight: bold; background-color: #111; padding: 7px">Algumas variáveis do projeto estão como Secret pois precisam ser pegar diretamente do OpenShift</div>

<br>

---
---

<br>

## Recursos utilizados no projeto

<br>
<a class="button-link" href="https://activeMQ/" style="text-decoration: none">Active MQ - Broker de filas de processamento</a>
<br>
<br>
<a class="button-link" href="https://activeMQ/" style="text-decoration: none">Serviço de notificação do ZABBIX</a>
<br>
<br>

---
---

<br>

# Terceiros 

<div class="terceiro" style="color: #a0c">Serviço de Notificação ZABBIX</div>

O projeto usa o conector do zabbix.

Para executar localmente em desenvolvimento sem acesso a banco de dados e sem alterar temporariamente o código, apenas remova a seleção de todos os "JDBC Message Store" e "JDBC Message Processor" no UtilitárioCompositeExporter.
Com isso, apenas os recursos de processamento InMemory estarão executando.

<a class="button-link">documentação do zabbix</a>

<br>


<div class="terceiro" style="color: #994">Serviço de notificação Events Grafana</div>

O projeto usa uma conexão com o banco de dados Event do grafana. 

<a class="button-link" href="http://">Grafana do projeto</a>



  <style>
    .steps {
      font-size: 16px;
      margin: 10px;
    }
    .button-link{
      border: 2px solid #555;
      background-color: #333;
      padding: 3px;
      border-radius: 10px;
      text-decoration: none;
    }
    .button-link:hover{
      filter: brightness(120%);
    }
    .tips{
      background-color: #444;
      display: inline-block;
      padding: 5px;
      border: 2px solid #000;
    }
    .dashed{
      border-top: 2px  dashed #555;
    }
    .terceiro{
      font-size: 20px;
      font-weight: bold;
      border-bottom: 3px dotted #555f55
    }
  </style>
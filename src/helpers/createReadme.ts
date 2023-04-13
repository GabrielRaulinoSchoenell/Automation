import fs from 'fs-extra';
import { Dependency, Project } from '../types/test';
import { dependencias } from './dependecias';




export const ReadMe = (generalData: Project)=>{
  let dependenciesContent = '';
  generalData.dependencies.forEach((el: Dependency)=>{
    dependencias.forEach((data)=>{
      if(data.name == el.name && data.type == el.product){
        dependenciesContent += `
<font color="${data.color}" size="6">${data.name}</font>
<p>${data.brief}</p>
${data.needsAccess ? '*Você precisa de acesso para acessar este recurso*\n' : ''} ${data.type == 'api' ? `URL da API: ${data.url_homolog}\n<br>\n` : ``} ${data.type != 'local-entry' ?  `URL de uso: ${data.url_homolog}\n<br>\n` : ''} URL documentação: ${data.url_documentation}\n<br>\n
----`
      };
    });
  });

    fs.writeFileSync(`./src/media/README.md`, 
`# ${generalData.project}

${generalData.description}

---
---

## Realizar a instalação do projeto:

É possivel rodar o projeto na IDE seguindos os passos abaixo:

  1. Instalação e configuração do Integration Studio - <a href="https://wso2.com/integration/integration-studio/">Baixe o Integration Studio</a>

  2. Apontando as variáveis JAVA_HOME e PATH para a JDK_8 - <a href="https://www.openlogic.com/openjdk-downloads?field_java_parent_version_target_id=416&field_operating_system_target_id=All&field_architecture_target_id=All& field_java_package_target_id=All" style="text-decoration: none">Baixe o JDK</a> | | <a  href="https://docs.oracle.com/cloud/help/pt_BR/pbcs_common/DIEPM/epm_set_java_home_104x6dd63633_106x6dd6441c.htm#DIEPM-GUID-7D734C69-2DE8-4E93-A3C8-9C3F6AD12D1B" >Como apontar a variável</a>

  3. Baixando o Maven e apontando o Path para o apache-maven-bin - <a href="https://maven.apache.org/guides/getting-started/windows-prerequisites.html">Guia completo Maven</a>

  4. Setando as variáveis de ambiente - Arquivo para copiar e colar no cmd ExtraResources/setVars.txt
  Algumas variáveis do projeto estão como Secret pois precisam ser pegar diretamente do OpenShift

  5. Instalação das dependências do projeto na pasta do Integration Studio -  encontre as dependências no dockerfile | | <a href="http://githeellooworld">Guia</a>

<br>
<br>

É possivel rodar o projeto pelo Docker

1. Instalação e configuração do Integration Studio - <a href="https://wso2.com/integration/integration-studio/">Baixe o Integration Studio</a>

  2. Apontando as variáveis JAVA_HOME e PATH para a JDK_8 - <a href="https://www.openlogic.com/openjdk-downloads?field_java_parent_version_target_id=416&field_operating_system_target_id=All&field_architecture_target_id=All& field_java_package_target_id=All" style="text-decoration: none">Baixe o JDK</a> | | <a href="https://docs.oracle.com/cloud/help/pt_BR/pbcs_common/DIEPM/epm_set_java_home_104x6dd63633_106x6dd6441c.htm#DIEPM-GUID-7D734C69-2DE8-4E93-A3C8-9C3F6AD12D1B" >Como apontar a variável</a>

  3. Setando as variáveis de ambiente - Arquivo para copiar e colar no cmd ExtraResources/setVars.txt
  *Algumas variáveis do projeto estão como Secret pois precisam ser pegar diretamente do OpenShift*

<br>

---
---

<br>

## Recursos utilizados no projeto

<br>
<a href="https://activeMQ/" style="text-decoration: none">Active MQ - Broker de filas de processamento</a>
<br>
<br>
<a href="https://activeMQ/" style="text-decoration: none">Serviço de notificação do ZABBIX</a>
<br>
<br>

---
---

<br>

# Terceiros 
${dependenciesContent}

# Notas

`
)}
export let dependencias = 
    [
        {
            name: "zabbix",
            url_documentation: "http://zabbix.com",
            url_homolog: "http://zabbix.com",
            needsAccess: true,
            color: "#0F4C81",
            type: "api",
            brief: "Zabbix é um gerenciador de logs e notificações. Ele armazena logs de erros. Nosso zabbix traz informações diretamente do banco de events. outras descrições legais.",
        },
        {
            name: "grafana",
            url_documentation: "http://grafana.com",
            url_homolog: "http://grafana.com",
            needsAccess: true,
            color: "#556B2F",
            type: "api",
            brief: "Grafana é um gerenciador de logs e notificações. Ele armazena logs de erros. Nosso zabbix traz informações diretamente do banco de events. outras descrições legais."
        },
        {
            name: "progress",
            url_documentation: "http://progress.com",
            url_homolog: "http://progress.com",
            needsAccess: true,
            color: "#556B2F",
            type: "api",
            brief: "Progress é um conector com o TOTVs"
        },
        {
            name: "FILE_CONNECTOR_1",
            url_documentation: "http://progress.com",
            url_homolog: "http://progress.com",
            needsAccess: false,
            color: "#4B0082",
            type: "local-entry",
            brief: "FILE_CONNECTOR_1 é um local-entry que realiza transformação de arquivos"
        }
    ]
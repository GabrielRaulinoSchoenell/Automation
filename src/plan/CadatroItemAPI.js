`/cadastroItem
    --> /v1/processExecutionDecision
        - faultSequence APIFaultSequence
            --> errorMessageSequence
                ? errorMessage --> ZabbixSequence
                :--> <log> 
                --> <log>
                --------
        - outSequence APIOutSequence
            --> <property><log>
            --------

        - resource GET
            --> call-template APIEntrySequenceTemplate
                case json   :--> <log>
                default     :--> <log>
                ? http_method --> <log>
                :--> log
            --> sequence ProcessExecutionDecisionSequence
                --> dbreport
    







`

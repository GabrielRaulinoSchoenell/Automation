import * as data from './Data'


export type generalData = {
    project?: string,
    description?: string
    groupId?: string,
    encodePattern: "nameAfter" | "nameBefore" | "noName",
    sequences?: data.Sequences,
    endpoints?: data.Endpoints,
    apis?: data.Apis,
    messageProcessorEStore?: data.MessageProcessorEStore,
    templates?: data.Templates,
    resources?: data.Resources,
    dataServices?: data.DataServices,
    env?: data.Env,
    dependencias?: data.Dependencias
}
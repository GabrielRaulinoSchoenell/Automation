export type Sequences = {
    type: "sequence",
    data: {name: string}[]
}

export type Endpoints = {
    type: "endpoint",
    data: {
        name: string,
        http: string
    }[] 
}
export type Apis = {
    type: "api",
    data: {
        name: string,
        context: string
        resources: {
            get: string
        }[],
    }[] 
}
export type MessageProcessorEStore = {
    type: "essageProcessorEStore",
    data: {name: string}[] 
}
export type Templates = {
    type: "emplates",
    data: {name: string}[] 
}
export type Resources = {
    type: "esources",
    data: {name: string}[] 
}
export type DataServices = {
    type: "ataServices",
    data: {name: string}[] 
}
export type Env = {
    type: "nv",
    data: {name: string}[] 
}
export type Dependencias = {
    type: "ependencias",
    data: {name: string}[] 
}
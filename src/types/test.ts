type EncodePattern = "nameAfter" | "nameBefore";

export type Endpoint = {
  name: string;
  http: string;
}

export type Sequence = {
  type?: 'create'|'read',
  data: {
    name: string
    description?: string
  }[]
}

export type Resource = {
  method: string;
  url: string;
}

export type Api = {
  name: string;
  context: string;
  resources: Resource[];
}

export type DataServiceProperty = {
  id: string;
  name: string;
  other: string;
}

export type DataService = {
  name: string;
  function: string;
  properties: (keyof DataServiceProperty)[];
}

export type EnvVariable = {
  var: string;
  values: string[];
  name: string;
}

export type Dependency = {
  name: string;
  product: string;
}

export type Project = {
  project: string;
  description: string;
  groupId: string;
  encodePattern: EncodePattern;
  projectUrl: string;
  version: string;
  versionType: "url";
  usedBy: [
    {
        sector: string,
        objective: string,
        urlFront: string
    }
],
  extra: {
    setVars: boolean;
    drawio: boolean;
    defining: boolean;
    requestHelp: boolean;
    store: boolean;
    creation: boolean;
    postman: boolean;
  };
  sequences: {
    type: "create"|"read";
    data: {
      name: string;
    }[];
  };
  endpoints: {
    type: "create"|"read";
    data: Endpoint[];
  };
  apis: {
    type: "api";
    data: Api[];
  };
  messageProcessorEStore: {
    type: "create"|"read";
    data: {
      processor: string;
      store: string;
      queue: string;
      sequence: string;
    }[];
  };
  templates: string[];
  resources: {
    type:"create"|"read";
    data: {
      name: string;
      type: "transform" | "schema";
    }[];
  };
  dataServices: {
    type: "create"|"read";
    data: DataService[];
  };
  env: EnvVariable[];
  dependencies: Dependency[];
}


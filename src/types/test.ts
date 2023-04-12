type EncodePattern = "nameAfter" | "nameBefore";

export type Endpoint = {
  name: string;
  http: string;
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
    type: "sequence";
    data: {
      name: string;
    }[];
  };
  endpoints: {
    type: "endpoint";
    data: Endpoint[];
  };
  apis: {
    type: "api";
    data: Api[];
  };
  messageProcessorEStore: {
    type: "messageProcessor-messageStore";
    data: {
      processor: string;
      store: string;
      queue: string;
      sequence: string;
    }[];
  };
  templates: string[];
  resources: {
    type: "resources";
    data: {
      name: string;
      type: "transform" | "schema";
    }[];
  };
  dataServices: {
    type: "dataService";
    data: DataService[];
  };
  env: EnvVariable[];
  dependencies: Dependency[];
}


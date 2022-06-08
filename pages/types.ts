export interface IService {
    name: string;
    description: string;
    online: boolean;
    machine: string;
    url: string;
    port: number;
    version: string;

    process: {
        pid: number;
        ram: number;
    }

    iconURL?: string;
}

export interface IMachine {
    name: string;
    ip: string;
    url: string;
    online: boolean;

    capabilities: {
        ram: number;
        disk: number;
        network: number;
    };

    services: IService[];
}

export type IServerResponse = IMachine[];
import { CustomScriptDefinition } from '../types';
export declare const getJobsByType: CustomScriptDefinition<[
    totalItems: number,
    jobIds: string[]
], [
    skip: number,
    take: number,
    queueName: string | undefined,
    ...states: string[]
]>;

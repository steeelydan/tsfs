import { Model, ModelAttributes, Sequelize } from 'sequelize';
import { TSFSCreationAttributes, TSFSUserRole } from './types';
export interface ICoreTestUser {
    id: string;
    username: string;
    role: TSFSUserRole;
    password: string;
}
export declare class CoreTestUser extends Model<ICoreTestUser, TSFSCreationAttributes<ICoreTestUser>> implements ICoreTestUser {
    readonly id: string;
    username: string;
    role: TSFSUserRole;
    password: string;
}
export declare const coreTestUserAttributes: ModelAttributes<CoreTestUser>;
export declare const initializeCoreTestModels: (sequelize: Sequelize) => Promise<CoreTestModels>;
export declare type CoreTestModels = {
    CoreTestUser: typeof CoreTestUser;
};

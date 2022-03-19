import { DataTypes, Model } from 'sequelize';
export class CoreTestUser extends Model {
}
export const coreTestUserAttributes = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        unique: true,
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    }
};
export const initializeCoreTestModels = async (sequelize) => {
    CoreTestUser.init(coreTestUserAttributes, {
        sequelize
    });
    // Define relations here.
    await sequelize.drop();
    await sequelize.sync();
    return { CoreTestUser };
};

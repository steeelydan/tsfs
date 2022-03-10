import path from 'path';
import { Sequelize } from 'sequelize/types';
import { getTestDatabase } from '../../coreTestHelpers.js';
import { CoreTestModels, initializeCoreTestModels } from '../../coreTestModels.js';
import { database } from '../..';

let sequelize: Sequelize;
let models: CoreTestModels;

const dbConfig = {
    test: {
        logging: false,
        storage: path.resolve('data/db-test.sqlite3'),
        dialect: 'sqlite'
    }
};

describe('setup database', () => {
    it('throws if no process.env.NODE_ENV specified', async () => {
        process.env.NODE_ENV = undefined;
        try {
            await database.create(dbConfig);
            fail();
        } catch (e) {}
    });

    it('creates sequelize and model instances', async () => {
        sequelize = await getTestDatabase(dbConfig);
        models = await initializeCoreTestModels(sequelize);

        expect(sequelize).toBeTruthy();
        expect(sequelize.getDialect()).toBe('sqlite');
        expect(models.CoreTestUser).toBeTruthy();
    });
});

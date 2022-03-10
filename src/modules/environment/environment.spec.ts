import { EnvVars, TestGlobal, ValidEnvValues } from '../../coreTypes';
import { environment } from '../..';

const coreTestPathConfig = (global as unknown as TestGlobal).coreTestPathConfig;

describe('core: environment', () => {
    const testRequiredEnvVars: EnvVars = ['NODE_ENV'];
    const testValidEnvValues: ValidEnvValues = { NODE_ENV: ['development', 'production', 'test'] };

    it('prepares dotenv environment', () => {
        expect(process.env.SESSION_SECRET).toBeFalsy();
        environment.setup(coreTestPathConfig, testRequiredEnvVars, testValidEnvValues);
        expect(process.env.SESSION_SECRET).toBeTruthy();
    });
});

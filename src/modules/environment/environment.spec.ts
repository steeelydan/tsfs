import { TSFSRequiredEnvVars, TSFSValidEnvValues } from '../../types';
import { Environment } from '../..';
import { TestGlobal } from '../../testTypes';

const testPathConfig = (global as unknown as TestGlobal).testPathConfig;

describe('core: environment', () => {
    const testRequiredEnvVars: TSFSRequiredEnvVars = ['NODE_ENV'];
    const testValidEnvValues: TSFSValidEnvValues = { NODE_ENV: ['development', 'production', 'test'] };

    it('prepares dotenv environment', () => {
        expect(testPathConfig).toBeTruthy();
        expect(process.env.SESSION_SECRET).toBeFalsy();
        Environment.setup(testPathConfig, testRequiredEnvVars, testValidEnvValues);
        expect(process.env.SESSION_SECRET).toBeTruthy();
    });
});

import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test', 'production')
        .optional()
        .default('development'),
      ECCS_BASE_URL: Joi.string(),
      ECCS_AUTHORIZATION_HEADER: Joi.string(),
      ECCS_IBM_CLIENT_ID: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
      { presence: 'required' },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): any {
    return this.envConfig[key];
  }

  get eccsBaseUrl() {
    return this.envConfig.ECCS_BASE_URL;
  }
  get eccsAuthorizationHeader() {
    return this.envConfig.ECCS_AUTHORIZATION_HEADER;
  }
  get eccsIbmClientId() {
    return this.envConfig.ECCS_IBM_CLIENT_ID;
  }
}

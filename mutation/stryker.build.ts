import { Config } from '@stryker-mutator/api/config';
import { LoggerApi } from "@angular-devkit/core/src/logger";
import { LogLevel } from '@stryker-mutator/api/core';
import { SchemaObject as StrykerBuilderSchema } from './schema';

export class StrykerConfiguration{
  private readonly _config = new Config();

    constructor(private _logger: LoggerApi, private _workspaceRoot: string){}

    validateConfig(options:StrykerBuilderSchema){
      if(options.configFile){
        switch (options.testRunner) {
          case 'jest':
              return this.getConfigurationByFile(options.configFile, options.jest);
        case 'karma':
            return this.getConfigurationByFile(options.configFile, options.karma);
        }
      }
      return this.getConfigByParams(options);
      
    }

    getConfigByParams(options:StrykerBuilderSchema){        
      this._logger.debug(`Starting stryker builder with params configuration`);

        this._config.set({
          mutator: options.mutator,
          packageManager: options.packageManager,
          testRunner: options.testRunner,
          jest: {
            ...options.jest,
            config: require(options.jest.config.replace('./',`${this._workspaceRoot}/`))
          },
          plugins: options.plugins,
          coverageAnalysis: options.coverageAnalysis,
          tsconfigFile: options.tsconfigFile,
          files: options.files,
          mutate:  options.mutate,
          fileLogLevel: options.fileLogLevel || LogLevel.Off,
          logLevel: options.logLevel || LogLevel.Off,
          timeoutMS: options.timeoutMS,
          reporters: options.reporters || ['html']
          });
          this._logger.debug(`Stryker Config ${JSON.stringify(this._config)}`);
       return this._config;
    }

    getConfigurationByFile(configFilePath: string, runnerConfig: any){
      this._logger.debug(`Starting stryker builder with file configuration ${configFilePath}`);
      const configFile = require(configFilePath.replace('./',`${this._workspaceRoot}/`));
      configFile(this._config);
      this._logger.debug(`Stryker Config ${JSON.stringify(this._config)}`);
      this._config.set({
        jest: {
          ...runnerConfig,
          config: require(runnerConfig.jest.config.replace('./',`${this._workspaceRoot}/`))
        }
      })
      return this._config
    }
}
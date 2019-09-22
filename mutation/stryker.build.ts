import { Config } from '@stryker-mutator/api/config';
import { LoggerApi } from "@angular-devkit/core/src/logger";
import { LogLevel } from '@stryker-mutator/api/core';
import { SchemaObject as StrykerBuilderSchema } from './schema';

export class StrykerConfiguration{
    constructor(private _logger: LoggerApi, private workspaceRoot: string){}

    validateConfig(options:StrykerBuilderSchema){
      if(options.configFile){
         this._logger.debug(`Starting stryker builder with file configuration ${options.configFile}`);
         return new Config();
      }
      this._logger.debug(`Starting stryker builder with params configuration`);
      return this.generateConfig(options);
      
    }
    generateConfig(options:StrykerBuilderSchema){        
        const config = new Config();
        let files;
      if(options.files){
        files = options.files.map((filePath: string)=>
        filePath.replace('./',`${this.workspaceRoot}/`)
      )
      }
        config.set({
          mutator: options.mutator,
          packageManager: options.packageManager,
          testRunner: options.testRunner,
          jest: {
            config: require(options.jest.config)
          },
          plugins: options.plugins,
          coverageAnalysis: options.coverageAnalysis,
          tsconfigFile: options.tsconfigFile,
          files,
          mutate:  options.mutate.map((filePath: string)=>
          filePath.replace('./',`${this.workspaceRoot}/`)
        ),
          fileLogLevel: options.fileLogLevel || LogLevel.Off,
          logLevel: options.logLevel || LogLevel.Off,
          timeoutMS: options.timeoutMS || 5000000,
          reporters: options.reporters || ['html']
          });
          this._logger.debug(`Stryker Config ${JSON.stringify(config)}`);

       return config;
    }
}
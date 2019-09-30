"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@stryker-mutator/api/config");
const core_1 = require("@stryker-mutator/api/core");
class StrykerConfiguration {
    constructor(_logger, _workspaceRoot) {
        this._logger = _logger;
        this._workspaceRoot = _workspaceRoot;
        this._config = new config_1.Config();
    }
    validateConfig(options) {
        if (options.configFile) {
            return this.getConfigurationByFile(options.configFile);
        }
        return this.getConfigByParams(options);
    }
    getConfigByParams(options) {
        this._logger.debug(`Starting stryker builder with params configuration`);
        const plugins = [...options.plugins, '@stryker-mutator/html-reporter'];
        switch (options.testPackage) {
            case "jest":
                plugins.push('@stryker-mutator/jest-runner');
                break;
            case "karma":
                plugins.push('@stryker-mutator/karma-runner');
                break;
        }
        this._config.set({
            mutator: options.mutator,
            packageManager: options.packageManager,
            testRunner: options.testRunner,
            commandRunner: options.commandRunner,
            plugins: plugins,
            coverageAnalysis: options.coverageAnalysis,
            tsconfigFile: options.tsconfigFile,
            files: options.files,
            mutate: options.mutate,
            fileLogLevel: options.fileLogLevel || core_1.LogLevel.Off,
            logLevel: options.logLevel || core_1.LogLevel.Off,
            timeoutMS: options.timeoutMS,
            reporters: options.reporters || ['html']
        });
        this._logger.debug(`Stryker Config ${JSON.stringify(this._config)}`);
        return this._config;
    }
    getConfigurationByFile(configFilePath) {
        this._logger.debug(`Starting stryker builder with file configuration ${configFilePath}`);
        const configFile = require(configFilePath.replace('./', `${this._workspaceRoot}/`));
        configFile(this._config);
        this._logger.debug(`Stryker Config ${JSON.stringify(this._config)}`);
        return this._config;
    }
}
exports.StrykerConfiguration = StrykerConfiguration;
//# sourceMappingURL=stryker.build.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stryker_build_1 = require("./stryker.build");
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const core_1 = require("@stryker-mutator/core");
const operators_1 = require("rxjs/operators");
function createStrykerRunner(options, { logger, workspaceRoot }) {
    const config = new stryker_build_1.StrykerConfiguration(logger, workspaceRoot).validateConfig(options);
    const strykerInstance = new core_1.default(config);
    // strykerInstance.runMutationTest().then(()=> 
    // {
    //     logger.info('pass');
    // }).catch((val)=>logger.error('error' + val));
    return rxjs_1.from(strykerInstance.runMutationTest()).pipe(operators_1.map(() => ({ success: true })), operators_1.tap(() => logger.warn("Mutation Tests ran successfully")), operators_1.catchError(e => {
        logger.error("Failed to ran mutation tests", e);
        return rxjs_1.of({ success: false });
    }));
}
exports.createStrykerRunner = createStrykerRunner;
exports.default = architect_1.createBuilder(createStrykerRunner);
//# sourceMappingURL=index.js.map
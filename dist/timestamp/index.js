"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const core_1 = require("@angular-devkit/core");
const fs_1 = require("fs");
const operators_1 = require("rxjs/operators");
const dateFormat = require("dateformat");
const rxjs_2 = require("rxjs");
function createTimestamp({ path, format }, { workspaceRoot, logger }) {
    const timestampFileName = `${core_1.getSystemPath(core_1.normalize(workspaceRoot))}/${path}`;
    const writeFileObservable = rxjs_1.bindNodeCallback(fs_1.writeFile);
    const timestampLogger = logger.createChild('Timestamp');
    return writeFileObservable(timestampFileName, dateFormat(new Date(), format)).pipe(operators_1.map(() => ({ success: true })), operators_1.tap(() => timestampLogger.info("Timestamp created")), operators_1.catchError(e => {
        timestampLogger.error("Failed to create timestamp", e);
        return rxjs_2.of({ success: false });
    }));
}
exports.createTimestamp = createTimestamp;
exports.default = architect_1.createBuilder(createTimestamp);
//# sourceMappingURL=index.js.map
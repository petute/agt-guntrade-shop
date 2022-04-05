"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = exports.OperationError = exports.pluginErrorCodes = void 0;
exports.pluginErrorCodes = {
    bulkOperationFailed: `111000`,
    unknownSourcingFailure: `111001`,
    unknownApiError: `111002`,
    apiConflict: `111003`,
};
class OperationError extends Error {
    constructor(node) {
        const { errorCode, id } = node;
        super(`Operation ${id} failed with ${errorCode}`);
        this.node = node;
        Error.captureStackTrace(this, OperationError);
    }
}
exports.OperationError = OperationError;
class HttpError extends Error {
    constructor(response) {
        super(response.statusText);
        this.response = response;
        Error.captureStackTrace(this, HttpError);
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=errors.js.map

class CdjError extends Error {

    constructor(status, message, cause){
        super();
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, CdjError);
        this.stack += (cause) ? ('\n' + cause.stack) : '';
    }

    print() {
        console.error(this.stack);
    }
}

module.exports = CdjError;
class ApiError extends Error{
    constructor(
        statusCode = 500,
        message = "Something is wrong...Internal Server Error",
        errors = [],
        stack = "",
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
        // this.stack = stack;
    }
}

export {ApiError};
class GlobalErrorhandling {
    constructor({ message, error}) {
        this.message = message;
        this.error = error;
    }

    notFoundError(){
        let obj = {
            name : "Not Found",
            status : 404,
            message : this.message,
            error : this.error,
        }
        return obj;
    }

    internalServerError(){
        let obj = {
            name : "Internal Server Error",
            status : 500,
            message : this.message,
            error : this.error,
        }
        return obj;
    }

    badRequest(){
        let obj = {
            name : "Bad Request",
            status : 400,
            message : this.message,
            error : this.error,
        }
        return obj;
    }
}

module.exports = {
    GlobalErrorhandling,
}
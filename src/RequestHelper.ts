import { type } from "os"

class RequestHelper {
    static isValidBody(bodyString: string): boolean {
        if ( typeof bodyString === 'object') {
            return true
        } else {
            return false
        }
    }

    static isUndefined(reqBody: any): boolean {
        if (reqBody === undefined) {
            return true
        } else {
            return false
        }
    }
}

export default RequestHelper
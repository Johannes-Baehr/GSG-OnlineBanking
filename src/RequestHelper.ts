import { type } from "os"

class RequestHelper {

    static isUndefined(reqBody: any): boolean {
        if (reqBody === undefined) {
            return true
        } else {
            return false
        }
    }

    static hasKeys(keys: any, obj: any) {
        for (const key of keys) {
          if (!obj.hasOwnProperty(key)) {
            return false;
          }
        }
        return true;
      }
}

export default RequestHelper
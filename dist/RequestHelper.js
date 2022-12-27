class RequestHelper {
    static isUndefined(reqBody) {
        if (reqBody === undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    static hasKeys(keys, obj) {
        for (const key of keys) {
            if (!obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
}
export default RequestHelper;

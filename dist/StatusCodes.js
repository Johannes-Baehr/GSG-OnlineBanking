const success = {
    success: 200,
    created: 201,
    auth: 210
};
const error = {
    invalidJSON: 320,
    badRequest: 400,
    authFail: 310,
    server: 500,
    conflict: 409,
    sameUUID: 320,
    balance: 330,
    invalidUUID: 340,
    amount: 350,
    pinFormat: 360
};
const code = { success, error };
export default code;

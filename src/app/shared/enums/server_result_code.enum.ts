export enum ServerResultCode
{
    NO_RESULT = 0,
    SUCCESS = 100,
    SUCCESS_ADD = 101,
    SUCCESS_UPDATE = 102,
    SUCCESS_DELETE = 103,

    ERROR = 500,
    ERROR_ADD = 501,
    ERROR_UPDATE = 502,
    ERROR_DELETE = 503,

    FAIL = 800,
    FAIL_ADD = 801,
    FAIL_UPDATE = 802,
    FAIL_DELETE = 803,
    FAIL_RENEW = 804,
    FAIL_SUBSTITUE = 805,
    FAIL_SUBMIT = 806,

    DATA_NOTFOUND = 400,
    
    INTERNET_CONNECTION_ERROR = -900,
    SERVER_ERROR = -901
    
}
// -----------------------------------------------------------------
// catch for serious case only
export enum HTTPStatusCode{
    OK = 200,
    ADD_OK = 201,
    ACCEPTED = 202,
    NO_AUTHORIZATION_INFO = 203,
    NO_CONTENT = 204,

    BAD_REQUEST = 400,
    UNAUTHERORIZED = 401,
    LOGIN_TIMEOUT = 440,

    INTERNET_SERVER_ERROR = 500,

}
// -----------------------------------------------------------------
// const ServerResoutMessage = {
//     [0]: "NO_RESULT",
//     [100]: "SUCCESS",
//     [101]: "SUCCESS_ADD = 101",
//     [102]: "SUCCESS_UPDATE = 102",
//     [103]: "SUCCESS_DELETE = 103",

//     [500]: "ERROR = 500",
//     [501]: "ERROR_ADD = 501",
//     [502]: "ERROR_UPDATE = 502",
//     [503]: "ERROR_DELETE = 503",

//     [800]: "FAIL = 800",
//     [801]: "FAIL_ADD = 801",
//     [802]: "FAIL_UPDATE = 802",
//     [803]: "FAIL_DELETE = 803",
//     [804]: "FAIL_RENEW = 804",
//     [805]: "FAIL_SUBSTITUE = 805",
//     [806]: "FAIL_SUBMIT = 806",

//     [400]: "DATA_NOTFOUND = 400"
// }
// // -----------------------------------------------------------------
// export { ServerResoutMessage };
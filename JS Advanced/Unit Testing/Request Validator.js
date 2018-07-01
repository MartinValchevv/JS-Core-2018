function validateRequest(obj) {
    let methods = ["GET", "POST", "DELETE", "CONNECT"];
    if (!obj.hasOwnProperty("method") || !methods.includes(obj.method)) {
        throw new Error("Invalid request header: Invalid Method");
    }

    let pattern = /^[A-Za-z0-9.]+$/g;
    let matched = pattern.exec(obj.uri);
    if (!obj.hasOwnProperty("uri") || obj.uri === "" || matched === null) {
        throw new Error("Invalid request header: Invalid URI");
    }

    let versions = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"];
    if (!obj.hasOwnProperty("version") || !versions.includes(obj.version)) {
        throw new Error("Invalid request header: Invalid Version");
    }
    if (!obj.hasOwnProperty("message")) {
        throw new Error("Invalid request header: Invalid Message");
    }
    let specialChars = [`<`, `>`, `\\`, `&`, `'`, `"`];
    for (let element of obj.message) {
        if (specialChars.includes(element)) {
            throw new Error("Invalid request header: Invalid Message");
        }
    }

    return obj;
}

console.log(validateRequest({
    method: 'POST',
    uri: 'home.bash',
    version: 'HTTP/2.0'
}));
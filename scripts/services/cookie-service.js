'use strict';

/*
 * Service to read and write cookies
 * http://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
 */

exports.name = 'CookieService';

exports.readCookie = function(request, name) {
    var cookies = request.cookies;
    return cookies ? cookies[name] : undefined;
};

exports.writeCookie = function(response, name, content) {
    response.setCookie(name, content, {
        path: '/',
        // domain:'www.example.com',
        maxAge: 60000,
        secure: false,
        httpOnly: false
    });
};

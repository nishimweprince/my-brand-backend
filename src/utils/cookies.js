const getCookie = (req) => {

    // Check existence of the cookie and return it
    let cookie = req.headers.cookie ? req.headers.cookie.split('=')[1] : req.headers.credentials;
    return cookie;

}

export default getCookie;
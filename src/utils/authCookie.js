const getCookie = (res) => {

    let cookie = res.getHeaders()["set-cookie"].split(";")[0].split("=")[1];
    return cookie;

}

export default getCookie;
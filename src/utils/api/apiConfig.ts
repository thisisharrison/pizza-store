let apiUrl;

/** Production and Development endpoints, do not change */
const apiUrls = {
    production: "https://hidden-springs-06951.herokuapp.com/",
    development: "http://localhost:8080",
};

if (window.location.hostname === "localhost") {
    apiUrl = apiUrls.development;
} else {
    apiUrl = apiUrls.production;
}

export default apiUrl as string;

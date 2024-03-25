// Purpose: Extracts the base URL from a given URL.

/**
 * Extracts the base URL from a given URL.
 * @param {string} url - The URL to extract the base URL from.
 */
const baseUrl =(url) => {

    const urlObject = new URL(url);
    const baseUrl = `${urlObject.protocol}//${urlObject.hostname}:${urlObject.port}`;
    return baseUrl;

}

// baseUrl("http://www.example.com/article/2020/09/14/this-is-an-article/");
// baseUrl("http://localhost:3000/uploads/service-1.jpg");
// baseUrl("https://food-delivery-api-v1.herokuapp.com/uploads/service-1.jpg")
module.exports = baseUrl;
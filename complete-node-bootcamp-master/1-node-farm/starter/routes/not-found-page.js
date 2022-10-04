// Not Found Page
const getNotFoundPage = (req, res) => {
    const output = '<h1>Page nor found!</h1>';
    res.writeHead(404, {
        'content-type': 'text/html'
    });
    res.end(output);
}

module.exports = {
    getNotFoundPage
}
import fs from 'fs';

export default (req, res) => {
    fs.readFile('./resource/dev-resume/_index.html', (err, data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(data)
    })
}

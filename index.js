http = require('http');
const fs = require('fs');
const path = require('path');
http.createServer(function(request,response){
    const {url} = request;
    
    if(url==='/'){
        
        response.writeHead(200, { 'content-type': 'text/html' });
        const template = fs.readFileSync('./html/index.html');
        response.end(template);
    }
    else{
        
        const filePath = `./${url}`;
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json'
        };
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        staticFileHandler(request, response, filePath, contentType);
    }
   
   

}).listen(8081);
console.log("listening on 8081")
const staticFileHandler = (request, response, filePath, contentType) => {

	fs.readFile(filePath, (err, content) => {
		if (err) {
			response.writeHead(500);
			response.end(`Sorry, Please check with admin for error: ${err.code}`)
		} else {
			response.writeHead(200, {
				'Content-Type': contentType
			}); 
			response.end(content, 'utf-8');
		}
	})
}
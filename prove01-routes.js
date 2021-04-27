//const fs = require('fs');
let userList = ["User1", "User2","User3"];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    //let userList = ["User1", "User2","User3"];
    if (url === "/") {
        res.write('<html>');
        res.write('<head><title>Prove-01</title></head>');
        res.write('<body>');
        res.write('<h1>Hello, this is my prove-01 assignment</h1>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username"><button type="submit">Send</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === "/users") {
        res.write('<html>');
        res.write('<head><title>Prove-01 Users</title></head>');
        res.write('<body>');
        res.write('<h1>Here is the list of users</h1>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username"><button type="submit">Send</button>');
        res.write('</form>');
        res.write('<ul>');
        for (let user of userList) {
            res.write('<li>');
            res.write(user);
            res.write('</li>');
        }
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            //console.log(parsedBody);
            const userName = parsedBody.split('=')[1];
            console.log(userName);
            userList.push(userName);
            console.log(userList);
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
            //fs.writeFileSync('message.txt', message);
            /*fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });*/
        });
    }

    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Prove-01</title></head>");
    res.write("<body>");
    res.write("<h1>Hello from my Node.js server!</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
};

module.exports = {
    handler: requestHandler
};
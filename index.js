
import express from 'express'
import httpProxy from 'http-proxy'
import { globalMiddleware } from './middlewares/globalMiddleware.js';


const app = express();
const proxy = httpProxy.createProxyServer();

export const services = {
    user: 'http://localhost:3000',
    post:'http://localhost:3001'
};

app.use(express.json());
app.use('/:service/*', globalMiddleware, (req, res) => {
    const { service } = req.params;
    if (services.hasOwnProperty(service)) {
        proxy.web(req, res, { target: `${services[service]}${req.baseUrl}`});
    } else {
        res.status(404).send('Service not found');
    }
});

proxy.on('error', (err, req, res) => {
    console.log(err)
    res.status(500).send('Proxy Error');
});
proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log(req.body)
    if(JSON.stringify(req.body).length > 2){
      let bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.write(bodyData);
    }
  });


const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Reverse proxy server running on port ${PORT}`);
});

const server = require('./app');
const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '0.0.0.0';

server.listen(PORT, IP, () => console.log(`Listening on PORT ${PORT}`));

const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World - CI/CD funcionando!'));
app.listen(3000);
module.exports = app; // Exportamos para o teste

const express = require('express');
const app = express();

let visitCount = 0;

app.get('/', (req, res) => {
  visitCount++;
  res.send(`Hello World - CI/CD funcionando! Visitas: ${visitCount}`);
});

app.get('/status', (req, res) => {
  res.json({ 
    status: 'online', 
    visitas: visitCount,
    timestamp: new Date().toISOString()
  });
});

app.listen(3000);
module.exports = app; // Exportamos para o teste

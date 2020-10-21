const app = require('./src/app');
const port = 8083;

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)
});
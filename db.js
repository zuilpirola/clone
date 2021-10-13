const { Client } = require('pg');

const cli = new Client({
    user: "postgres",
    host: "localhost",
    database: "testeAPI",
    password: "3131",
    port: 5432
});

cli.connect();

cli.query(`Select * from persons`, (erro, result) => {
    if (!erro) {
        console.log(result.rows)    ;
    } else {
        console.log(erro.message);
    }
    cli.end;
})

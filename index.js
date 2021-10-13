const express = require('express');
// const bodyParser = require("body-parser");
// const cors = require("cors");

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "testeAPI",
    password: "3131",
    port: 5432
});



const api = express();
api.use(express.static(__dirname));
//api.use(cors());
//api.use(bodyParser.json());

api.listen(3000, () => {
    console.log('API up and running!');
    console.log('http://localhost:3000')
    console.log('--------------')
});


/**
 * ROUTES
 */
api.get('/app', (req, res) => {
    console.log(req);
    let response = JSON.parse('{"name":"John", "age":30, "city":"New York"}')
    res.send(response);
    console.log(response);
});

// GET - Read persons 
api.get("/api", (req, res) => {
    pool.query(
        "Select * from persons",
        [],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
});

// GET - Read persons 
api.get("/teste", (req, res) => {
    let diaInicio = req.query["q3_de3"].day;
    let mesInicio = req.query["q3_de3"].month;
    let anoInicio = req.query["q3_de3"].year;

    let diaFim = req.query["q4_ate4"].day;
    let mesFim = req.query["q4_ate4"].month;
    let anoFim = req.query["q4_ate4"].year;

    let assunto = req.query.q6_assunto;
    let escola = req.query.q7_escola;

    let anoEscolar = "";
    let genero = "";

    console.log(Object.keys(req.query).length)
    console.log(diaInicio + '.' + mesInicio + '.' + anoInicio + '|' + diaFim + '.' + mesFim + '.' + anoFim + '|' + assunto + '|' + escola);

    if ((Object.keys(req.query).length) === 4) {  //não tem ano nem genero
        //enviar todos os campos
    }
    else if ((Object.keys(req.query).length) === 5) { //não tem um dos - ano || genero
        //Se [4] === 'q8_anoEscolar || [4] === 'q8_genero
        if (Object.keys(req.query)[4] === 'q8_anoEscolar') {
            anoEscolar = Object.values(req.query)[4];

        }
        if (Object.keys(req.query)[4] === 'q9_genero') {
            genero = Object.values(req.query)[4]
        }
    }
    else {
        anoEscolar = Object.values(req.query)[4];
        genero = Object.values(req.query)[5];
    }

   

    console.log(anoEscolar + '-' + genero)

    res.status(200).json(req.query);

});



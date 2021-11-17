const express = require('express');
// const bodyParser = require("body-parser");
// const cors = require("cors");

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "bd950d6b2c",
    host: "debaqi.pt",
    database: "chatapp",
    password: "6cd97a0ec45cc61093428d5dfef2c317",
    port: 5432
});

const api = express();
api.use(express.static(__dirname));
//api.use(cors());
//api.use(bodyParser.json());

api.listen(3131, () => {
    console.log('API up and running!');
    console.log('http://localhost:3131')
    console.log('\n\n')
    
});


/**
 * ROUTES
 */
api.get('/', function (req, res, next) {
    res.status(200).send(
        '<p>API de acesso à Base de Dados debaqi</p><br>' +
        '<ul>'+
        '<li>   /api - GET all messages from topic "Futuro da escola: redes sociais"</li>'+
        '<li>   /oneroom - GET all messages from ROOM_ID = 9</li>'+
        '<li>   /multiroom - GET all messages from topic "Futuro da escola: adaptação" </li>'+
        '</ul>'
    );
});

api.get("/api", (req, res) => {
    pool.query(
        "Select * from message m " +
        "join room r on m.room_id = r.id " +
        "join topic t on r.topic_id = t.id " +
        "join jhi_user ju on m.user_id = ju.id " +
        "where t.topic = 'Futuro da escola: redes sociais'",
        [],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
            //console.log(results.rows);
        }
    );
});

api.get("/oneroom", (req, res) => {
    pool.query(
        "Select * from message m " +
        "join room r on m.room_id = r.id " +
        "join topic t on r.topic_id = t.id " +
        "join jhi_user ju on m.user_id = ju.id " +
        "where m.room_id = 9",
        [],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
            //console.log(results.rows);
        }
    );
});

api.get("/multiroom", (req, res) => {
    pool.query(
        "Select * from message m " +
        "join room r on m.room_id = r.id " +
        "join topic t on r.topic_id = t.id " +
        "join jhi_user ju on m.user_id = ju.id " +
        "where t.topic = 'Futuro da escola: adaptação'"+
        'order by "time"',
        [],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
            //console.log(results.rows);
        }
    );
});

// GET - Read form and create query 
api.get("/teste", (req, res) => {
    let diaInicio = req.query["q3_de3"].day;
    let mesInicio = req.query["q3_de3"].month;
    let anoInicio = req.query["q3_de3"].year;

    let diaFim = req.query["q4_ate4"].day;
    let mesFim = req.query["q4_ate4"].month;
    let anoFim = req.query["q4_ate4"].year;

    let assunto = req.query.q6_assunto;
    let escola = req.query.q7_escola;

    let anoEscolar;
    let genero;

    console.log(Object.keys(req.query).length)
    console.log(diaInicio + '.' + mesInicio + '.' + anoInicio + '|' + diaFim + '.' + mesFim + '.' + anoFim + '|' + assunto + '|' + escola);

    if ((Object.keys(req.query).length) === 4) {  //não tem ano nem genero
        anoEscolar = genero = ''
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

    /**
     * Neste ponto está tudo preenchido
     * Ler cada um dos dados e fazer a respectiva query
     */


    /*
    Select * from message m
    join room r on m.room_id = r.id 
    join topic t on r.topic_id = t.id
    join jhi_user ju on m.user_id = ju.id 
    join user_details ud on ud.user_id = ju.id 
    join institution i on ud.institution_id = i.id
    where m."time" between '2021-10-14' and '2021-10-16'
    and t.topic = 'Test topic'  
    and i."name" = 'ES Gil Vicente - Lisboa'
    anoEscolar???
    and ud.gender = 'MALE'
    */

    

});



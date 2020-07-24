const mongoose = require("mongoose")
require('dotenv').config()

const Course = require('../models/Course.model')
const Subject = require('../models/Subject.model')
const User = require('../models/User.model')

mongoose.connect(`mongodb://localhost/${process.env.DB}`, { useUnifiedTopology: true, useNewUrlParser: true })


const courses = [
    { title: '1º de primaria', subjects: []  },
    { title: '2º de primaria', subjects: [] },
    { title: '3º de primaria', subjects: [] },
    { title: '4º de primaria', subjects: [] },
    { title: '5º de primaria', subjects: [] },
    { title: '6º de primaria', subjects: [] }
]

const subjects = [
    { title: 'Matemáticas', teacher: 'users.type.teacher.id' },
    { title: 'Lengua Castellana y Literatura' },
    { title: 'Primera Lengua Extranjera' },
    { title: 'Ciencias Sociales' },
    { title: 'Ciencias de la Naturaleza' },
    { title: 'Educación Física' },
    { title: 'Valores Sociales y Cívicos' },
    { title: 'Educación Artística' },
    { title: 'Tecnología' },
    { title: 'Segunda Lengua Extranjera' },
    { title: 'Religión' },
]   

const users = [
    { name: "Stephi", lastname: "Bloxholm", email: "sbloxholm0@admin.ch", profileImg: "https://robohash.org/doloressitmaiores.jpg?size=50x50&set=set1", type: "DIRECTOR" },
    { name: "Man", lastname: "Bottom", email: "mbottom1@sfgate.com", profileImg: "https://robohash.org/quisquiaquo.jpg?size=50x50&set=set1", type: "PARENT" },
    { name: "Karlik", lastname: "Copozio", email: "kcopozio2@independent.com", profileImg: "https://robohash.org/mollitianatusdignissimos.jpg?size=50x50&set=set1", type: "PARENT" },
    { name: "Costa", lastname: "Godlip", email: "cgodlip3@nyu.edu", profileImg: "https://robohash.org/sedconsecteturdolor.bmp?size=50x50&set=set1", type: "TEACHER" },
    { name: "Stepha", lastname: "Cowlishaw", email: "scowlishaw4@house.gov", profileImg: "https://robohash.org/quodminimaaut.png?size=50x50&set=set1", type: "PARENT" },
    { name: "Lyndsey", lastname: "Dettmar", email: "ldettmar5@com.com", profileImg: "https://robohash.org/exercitationemrepellatest.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Briano", lastname: "Szymonwicz", email: "bszymonwicz6@google.com", profileImg: "https://robohash.org/providentquibusdamitaque.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Kain", lastname: "Kubas", email: "kkubas7@japanpost.jp", profileImg: "https://robohash.org/nonautemasperiores.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Jedd", lastname: "Phillcox", email: "jphillcox8@bloomberg.com", profileImg: "https://robohash.org/illodeseruntea.jpg?size=50x50&set=set1", type: "PARENT" },
    { name: "Barret", lastname: "Moller", email: "bmoller9@bigcartel.com", profileImg: "https://robohash.org/cumqueimpeditreprehenderit.png?size=50x50&set=set1", type: "PARENT" },
    { name: "Nike", lastname: "Gregan", email: "ngregana@gmpg.org", profileImg: "https://robohash.org/laudantiumquoddoloribus.jpg?size=50x50&set=set1", type: "PARENT" },
    { name: "Fairleigh", lastname: "Trowell", email: "ftrowellb@issuu.com", profileImg: "https://robohash.org/laborequasdignissimos.bmp?size=50x50&set=set1", type: "PARENT" },
    { name: "Lani", lastname: "Rundall", email: "lrundallc@newyorker.com", profileImg: "https://robohash.org/voluptatumeanon.png?size=50x50&set=set1", type: "PARENT" },
    { name: "Ax", lastname: "Valentin", email: "avalentind@example.com", profileImg: "https://robohash.org/placeatconsequaturvoluptates.png?size=50x50&set=set1", type: "PARENT" },
    { name: "Kim", lastname: "Falconbridge", email: "kfalconbridgee@ca.gov", profileImg: "https://robohash.org/quamenimet.png?size=50x50&set=set1", type: "TEACHER" },
    { name: "Guy", lastname: "Ginnety", email: "gginnetyf@alibaba.com", profileImg: "https://robohash.org/maioresquianecessitatibus.jpg?size=50x50&set=set1", type: "TEACHER" },
    { name: "Britt", lastname: "Sodory", email: "bsodoryg@bloglovin.com", profileImg: "https://robohash.org/quiaomnisautem.jpg?size=50x50&set=set1", type: "TEACHER" },
    { name: "Dennet", lastname: "Schiersch", email: "dschierschh@privacy.gov", profileImg: "https://robohash.org/dolorundeet.bmp?size=50x50&set=set1", type: "PARENT" },
    { name: "Nicola", lastname: "Hawkslee", email: "nhawksleei@guardian.com", profileImg: "https://robohash.org/quosanimiomnis.jpg?size=50x50&set=set1", type: "TEACHER" },
    { name: "Morgen", lastname: "Ince", email: "mincej@scientificamerican.com", profileImg: "https://robohash.org/siterrormaiores.bmp?size=50x50&set=set1", type: "TEACHER" }
]

let usersCreadted = []

User
    .create(users).then(users => {
        console.log('Se han creado los usuarios')
        const teacher = users[users.length - 1]
        usersCreadted = [...users]
        return Subject.create(subjects.map(elm => ({ ...elm,teacher: teacher.id })))
    })
    .then(subjects => {
        console.log('Se han creado las asignaturas')
        return Course.create(courses.map((elm, index) => ({ ...elm, subjects: subjects.map(subject => subject.id),
        users: !index ? usersCreadted.filter(elm => elm.type === "STUDENT") : [] })))
    })
    .then(() => {
        console.log('Se han creado los cursos')
        mongoose.connection.close()
    })
    .catch(err => console.log(err))

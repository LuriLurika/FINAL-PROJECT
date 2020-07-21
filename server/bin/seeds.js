const mongoose = require("mongoose")
const Course = require('../models/Course.model')
const Subject = require('../models/Subject.model')
const User = require('../models/User.model')
mongoose.connect(`mongodb://localhost/${process.env.DB}`, { useUnifiedTopology: true, useNewUrlParser: true })
Course.collection.drop()
Subject.collection.drop()
User.collection.drop()
const courses = [
    { title: 'Primero', }
]
const subjects = [
    { title: 'Matemática' }
]

const users = [
        { name: "Stephi", lastname: "Bloxholm", email: "sbloxholm0@admin.ch", profileImg: "https://robohash.org/doloressitmaiores.jpg?size=50x50&set=set1", type: "DIRECTOR" },
        { name: "Man", lastname: "Bottom", email: "mbottom1@sfgate.com", profileImg: "https://robohash.org/quisquiaquo.jpg?size=50x50&set=set1", type: "PARENT" },
        { name: "Karlik", lastname: "Copozio", email: "kcopozio2@independent.co.uk", profileImg: "https://robohash.org/mollitianatusdignissimos.jpg?size=50x50&set=set1", type: "PARENT" },
        { name: "Costa", lastname: "Godlip", email: "cgodlip3@nyu.edu", profileImg: "https://robohash.org/sedconsecteturdolor.bmp?size=50x50&set=set1", type: "TEACHER" },
        { name: "Stepha", lastname: "Cowlishaw", email: "scowlishaw4@house.gov", profileImg: "https://robohash.org/quodminimaaut.png?size=50x50&set=set1", type: "PARENT" },
        { name: "Lyndsey", lastname: "Dettmar", email: "ldettmar5@com.com", profileImg: "https://robohash.org/exercitationemrepellatest.jpg?size=50x50&set=set1", type: "STUDENT" },
        { name: "Briano", lastname: "Szymonwicz", email: "bszymonwicz6@google.co.jp", profileImg: "https://robohash.org/providentquibusdamitaque.png?size=50x50&set=set1", type: "STUDENT" },
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
        { name: "Dennet", lastname: "Schiersch", email: "dschierschh@privacy.gov.au", profileImg: "https://robohash.org/dolorundeet.bmp?size=50x50&set=set1", type: "PARENT" },
        { name: "Nicola", lastname: "Hawkslee", email: "nhawksleei@guardian.co.uk", profileImg: "https://robohash.org/quosanimiomnis.jpg?size=50x50&set=set1", type: "TEACHER" },
        { name: "Morgen", lastname: "Ince", email: "mincej@scientificamerican.com", profileImg: "https://robohash.org/siterrormaiores.bmp?size=50x50&set=set1", type: "TEACHER" }
]

const coursePromise = Course.create(courses)
const subjectPromise = Subject.create(subjects)
const userPromise = User.create(users)
Promise
    .all([coursePromise, subjectPromise, userPromise])
    .then(results => console.log(`Created ${results.length} collections`))
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))
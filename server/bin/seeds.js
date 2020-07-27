const mongoose = require("mongoose")
require('dotenv').config()

const Course = require('../models/Course.model')
const Subject = require('../models/Subject.model')
const User = require('../models/User.model')

mongoose.connect(`mongodb://localhost/${process.env.DB}`, { useUnifiedTopology: true, useNewUrlParser: true })

// mongoose.connect(`mongodb+srv://EFdez:1234@cluster0.umhf5.mongodb.net/SchoolHack?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const courses = [
    { title: '1º de primaria', subjects: [] },
    { title: '2º de primaria', subjects: [] },
    { title: '3º de primaria', subjects: [] },
    { title: '4º de primaria', subjects: [] },
    { title: '5º de primaria', subjects: [] },
    { title: '6º de primaria', subjects: [] }
]

const subjects = [
  {
    title: "Matemáticas",
    teacher: "users.type.teacher.id",
    description: "Matemáticas",
  },
  { title: "Lengua Castellana y Literatura", description: "Lengua Castellana y Literatura" },
  { title: "Primera Lengua Extranjera", description: "Primera Lengua Extranjera" },
  { title: "Ciencias Sociales", description: "Ciencias Sociales" },
  { title: "Ciencias de la Naturaleza", description: "Ciencias de la Naturaleza" },
  { title: "Educación Física", description: "Educación Física" },
  { title: "Valores Sociales y Cívicos", description: "Valores Sociales y Cívicos" },
  { title: "Educación Artística", description: "Educación Artística" },
  { title: "Tecnología", description: "Tecnología" },
  { title: "Segunda Lengua Extranjera", description: "Segunda Lengua Extranjera" },
  { title: "Religión", description: "Religión" },
];

const users = [
    { name: "Stephi", lastname: "Bloxholm", email: "sbloxholm0@admin.ch", profileImg: "https://robohash.org/doloressitmaiores.jpg?size=50x50&set=set1", type: "DIRECTOR" },
    { name: "Man", lastname: "Bottom", email: "mbottom1@sfgate.com", profileImg: "https://robohash.org/quisquiaquo.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Karlik", lastname: "Copozio", email: "kcopozio2@independent.com", profileImg: "https://robohash.org/mollitianatusdignissimos.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Costa", lastname: "Godlip", email: "cgodlip3@nyu.edu", profileImg: "https://robohash.org/sedconsecteturdolor.bmp?size=50x50&set=set1", type: "TEACHER" },
    { name: "Stepha", lastname: "Cowlishaw", email: "scowlishaw4@house.gov", profileImg: "https://robohash.org/quodminimaaut.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Lyndsey", lastname: "Dettmar", email: "ldettmar5@com.com", profileImg: "https://robohash.org/exercitationemrepellatest.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Briano", lastname: "Szymonwicz", email: "bszymonwicz6@google.com", profileImg: "https://robohash.org/providentquibusdamitaque.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Kain", lastname: "Kubas", email: "kkubas7@japanpost.jp", profileImg: "https://robohash.org/nonautemasperiores.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Jedd", lastname: "Phillcox", email: "jphillcox8@bloomberg.com", profileImg: "https://robohash.org/illodeseruntea.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Barret", lastname: "Moller", email: "bmoller9@bigcartel.com", profileImg: "https://robohash.org/cumqueimpeditreprehenderit.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Nike", lastname: "Gregan", email: "ngregana@gmpg.org", profileImg: "https://robohash.org/laudantiumquoddoloribus.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Fairleigh", lastname: "Trowell", email: "ftrowellb@issuu.com", profileImg: "https://robohash.org/laborequasdignissimos.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Lani", lastname: "Rundall", email: "lrundallc@newyorker.com", profileImg: "https://robohash.org/voluptatumeanon.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Ax", lastname: "Valentin", email: "avalentind@example.com", profileImg: "https://robohash.org/placeatconsequaturvoluptates.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Kim", lastname: "Falconbridge", email: "kfalconbridgee@ca.gov", profileImg: "https://robohash.org/quamenimet.png?size=50x50&set=set1", type: "TEACHER" },
    { name: "Guy", lastname: "Ginnety", email: "gginnetyf@alibaba.com", profileImg: "https://robohash.org/maioresquianecessitatibus.jpg?size=50x50&set=set1", type: "TEACHER" },
    { name: "Britt", lastname: "Sodory", email: "bsodoryg@bloglovin.com", profileImg: "https://robohash.org/quiaomnisautem.jpg?size=50x50&set=set1", type: "TEACHER" },
    { name: "Dennet", lastname: "Schiersch", email: "dschierschh@privacy.gov", profileImg: "https://robohash.org/dolorundeet.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Nicola", lastname: "Hawkslee", email: "nhawksleei@guardian.com", profileImg: "https://robohash.org/quosanimiomnis.jpg?size=50x50&set=set1", type: "TEACHER" },
    { name: "Morgen", lastname: "Ince", email: "mincej@scientificamerican.com", profileImg: "https://robohash.org/siterrormaiores.bmp?size=50x50&set=set1", type: "TEACHER" },
    { name: "Roanne", lastname: "Orbon", email: "rorbon0@vistaprint.com", profileImg: "https://robohash.org/quisidoptio.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Eula", lastname: "Combes", email: "ecombes1@apache.org", profileImg: "https://robohash.org/ipsamquovoluptatem.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Otha", lastname: "Ponsford", email: "oponsford2@infoseek.co.jp", profileImg: "https://robohash.org/ametfaciliscorrupti.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Joshuah", lastname: "McGauhy", email: "jmcgauhy3@abc.net.au", profileImg: "https://robohash.org/pariaturetquisquam.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Ulrika", lastname: "Scarlett", email: "uscarlett4@techcrunch.com", profileImg: "https://robohash.org/officiisseddignissimos.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Trixy", lastname: "Jukubczak", email: "tjukubczak5@storify.com", profileImg: "https://robohash.org/suscipitomnisimpedit.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Gabriela", lastname: "Birtle", email: "gbirtle6@nydailynews.com", profileImg: "https://robohash.org/oditeaaccusantium.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Hildegarde", lastname: "Charpling", email: "hcharpling7@xinhuanet.com", profileImg: "https://robohash.org/maximeconsecteturet.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Myrlene", lastname: "Tweed", email: "mtweed8@nydailynews.com", profileImg: "https://robohash.org/evenietetreprehenderit.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Enrica", lastname: "Kemp", email: "ekemp9@nih.gov", profileImg: "https://robohash.org/undesolutavero.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Nick", lastname: "Attkins", email: "nattkinsa@yellowpages.com", profileImg: "https://robohash.org/quaerateligendilabore.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Waite", lastname: "Perfitt", email: "wperfittb@drupal.org", profileImg: "https://robohash.org/iddoloribusullam.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Marj", lastname: "Kures", email: "mkuresc@ibm.com", profileImg: "https://robohash.org/aveniamreprehenderit.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Hendrika", lastname: "Terese", email: "hteresed@home.pl", profileImg: "https://robohash.org/occaecatievenietsed.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Andriana", lastname: "Brahan", email: "abrahane@icq.com", profileImg: "https://robohash.org/autrepudiandaeerror.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Rich", lastname: "Fazzioli", email: "rfazziolif@globo.com", profileImg: "https://robohash.org/asperioresquiaveritatis.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Muire", lastname: "Judkins", email: "mjudkinsg@stanford.edu", profileImg: "https://robohash.org/accusantiumsitquasi.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Edee", lastname: "Vatini", email: "evatinih@about.com", profileImg: "https://robohash.org/voluptatemmaioresquas.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Flor", lastname: "Penniell", email: "fpennielli@ehow.com", profileImg: "https://robohash.org/adetquod.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Riobard", lastname: "Alvarado", email: "ralvaradoj@webs.com", profileImg: "https://robohash.org/exercitationemesseaspernatur.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Clarine", lastname: "Gianetti", email: "cgianettik@mtv.com", profileImg: "https://robohash.org/providentitaquemolestias.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Chane", lastname: "Awde", email: "cawdel@scientificamerican.com", profileImg: "https://robohash.org/quositunde.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Danny", lastname: "Hedditeh", email: "dhedditehm@dailymotion.com", profileImg: "https://robohash.org/exercitationemrepellatest.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Clerc", lastname: "Mardee", email: "cmardeen@newyorker.com", profileImg: "https://robohash.org/rerumetlaudantium.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Agace", lastname: "Sywell", email: "asywello@shutterfly.com", profileImg: "https://robohash.org/solutasedtempora.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Reena", lastname: "Withrington", email: "rwithringtonp@craigslist.org", profileImg: "https://robohash.org/quiadolorumipsam.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Perla", lastname: "Murrum", email: "pmurrumq@shutterfly.com", profileImg: "https://robohash.org/distinctioexpeditaqui.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Lisabeth", lastname: "Rippin", email: "lrippinr@studiopress.com", profileImg: "https://robohash.org/laborummagnamomnis.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Denney", lastname: "Diggar", email: "ddiggars@scribd.com", profileImg: "https://robohash.org/necessitatibusdoloremcumque.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Alisa", lastname: "Iacovuzzi", email: "aiacovuzzit@yale.edu", profileImg: "https://robohash.org/doloremeoset.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Marcus", lastname: "Questier", email: "mquestieru@youtu.be", profileImg: "https://robohash.org/idnatusdistinctio.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Roosevelt", lastname: "Cluatt", email: "rcluattv@github.io", profileImg: "https://robohash.org/suntmaioresvoluptatem.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Dedie", lastname: "Mayler", email: "dmaylerw@va.gov", profileImg: "https://robohash.org/exercitationeminfugiat.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Brigid", lastname: "Hannon", email: "bhannonx@goo.gl", profileImg: "https://robohash.org/natussaepevoluptatem.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Carlotta", lastname: "Longman", email: "clongmany@newyorker.com", profileImg: "https://robohash.org/sintquivoluptatem.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Rhetta", lastname: "Catchpole", email: "rcatchpolez@washington.edu", profileImg: "https://robohash.org/nisiipsamsimilique.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Marge", lastname: "Haydon", email: "mhaydon10@deliciousdays.com", profileImg: "https://robohash.org/voluptateestnihil.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Fin", lastname: "Drynan", email: "fdrynan11@furl.net", profileImg: "https://robohash.org/quiseosamet.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Nickie", lastname: "Riccard", email: "nriccard12@psu.edu", profileImg: "https://robohash.org/maximequivoluptatibus.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Sarette", lastname: "Knightsbridge", email: "sknightsbridge13@nyu.edu", profileImg: "https://robohash.org/occaecatireiciendisquo.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Cortie", lastname: "Haydon", email: "chaydon14@yolasite.com", profileImg: "https://robohash.org/hicexercitationemvoluptatibus.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Tremain", lastname: "Elmar", email: "telmar15@independent.co.uk", profileImg: "https://robohash.org/sitveroaut.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Nappy", lastname: "Pawling", email: "npawling16@apple.com", profileImg: "https://robohash.org/autquosnemo.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Amalia", lastname: "Fattore", email: "afattore17@apple.com", profileImg: "https://robohash.org/velquiarecusandae.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Rebe", lastname: "Cuttings", email: "rcuttings18@icio.us", profileImg: "https://robohash.org/cumquedistinctiosint.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Tim", lastname: "Giabuzzi", email: "tgiabuzzi19@t-online.de", profileImg: "https://robohash.org/fugafacereeum.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Stormie", lastname: "Devanny", email: "sdevanny1a@barnesandnoble.com", profileImg: "https://robohash.org/omnismagniarchitecto.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Marcello", lastname: "Josey", email: "mjosey1b@privacy.gov.au", profileImg: "https://robohash.org/minimaquiquia.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Clarine", lastname: "Harsnipe", email: "charsnipe1c@cnbc.com", profileImg: "https://robohash.org/fugiatearepellendus.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Burnard", lastname: "Kerans", email: "bkerans1d@imgur.com", profileImg: "https://robohash.org/impeditdebitisculpa.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Lotty", lastname: "Foucar", email: "lfoucar1e@umn.edu", profileImg: "https://robohash.org/voluptasoditmaiores.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Heath", lastname: "Aikett", email: "haikett1f@webs.com", profileImg: "https://robohash.org/earumautlaboriosam.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Neysa", lastname: "Khristyukhin", email: "nkhristyukhin1g@weather.com", profileImg: "https://robohash.org/ipsumodiovelit.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Blythe", lastname: "Bushel", email: "bbushel1h@sciencedirect.com", profileImg: "https://robohash.org/autaccusamusofficiis.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Noble", lastname: "Arlett", email: "narlett1i@jiathis.com", profileImg: "https://robohash.org/architectovoluptateshic.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Timmi", lastname: "Dumbar", email: "tdumbar1j@bravesites.com", profileImg: "https://robohash.org/dolordelenitiquo.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Idelle", lastname: "Benedick", email: "ibenedick1k@furl.net", profileImg: "https://robohash.org/pariaturexpeditaquia.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Tova", lastname: "Gillooly", email: "tgillooly1l@imgur.com", profileImg: "https://robohash.org/verovoluptasipsa.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Karilynn", lastname: "Annatt", email: "kannatt1m@redcross.org", profileImg: "https://robohash.org/temporacupiditateaut.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Tiffany", lastname: "Linge", email: "tlinge1n@narod.ru", profileImg: "https://robohash.org/enimutvelit.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Jacquetta", lastname: "Patise", email: "jpatise1o@sitemeter.com", profileImg: "https://robohash.org/initaquevoluptatem.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Cris", lastname: "Cothey", email: "ccothey1p@acquirethisname.com", profileImg: "https://robohash.org/numquamautaut.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Alyce", lastname: "Crowcum", email: "acrowcum1q@reference.com", profileImg: "https://robohash.org/quilaborumcorporis.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Sadella", lastname: "Courson", email: "scourson1r@a8.net", profileImg: "https://robohash.org/oditreiciendisiure.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Willie", lastname: "Foskew", email: "wfoskew1s@usgs.gov", profileImg: "https://robohash.org/enimadsed.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Cosmo", lastname: "Doran", email: "cdoran1t@slate.com", profileImg: "https://robohash.org/rerumodiosed.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Stephanie", lastname: "Lowles", email: "slowles1u@sohu.com", profileImg: "https://robohash.org/ipsamautlaudantium.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Martino", lastname: "Timberlake", email: "mtimberlake1v@list-manage.com", profileImg: "https://robohash.org/blanditiisadmaiores.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Artemus", lastname: "Gisburne", email: "agisburne1w@gov.uk", profileImg: "https://robohash.org/inciduntessenumquam.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Darcey", lastname: "Durrad", email: "ddurrad1x@1und1.de", profileImg: "https://robohash.org/sunttotamautem.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Daisie", lastname: "Wilkin", email: "dwilkin1y@fema.gov", profileImg: "https://robohash.org/veldebitisaccusantium.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Benn", lastname: "Akid", email: "bakid1z@miitbeian.gov.cn", profileImg: "https://robohash.org/utipsumdicta.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Lilllie", lastname: "Methuen", email: "lmethuen20@census.gov", profileImg: "https://robohash.org/estmodinumquam.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Maridel", lastname: "Tuer", email: "mtuer21@sitemeter.com", profileImg: "https://robohash.org/inciduntlaudantiumaut.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Danya", lastname: "Spanton", email: "dspanton22@chron.com", profileImg: "https://robohash.org/quoddelenitiut.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Nicky", lastname: "Thurlow", email: "nthurlow23@npr.org", profileImg: "https://robohash.org/inconsequunturtempore.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Mathias", lastname: "Ridewood", email: "mridewood24@skype.com", profileImg: "https://robohash.org/eligendiullamcumque.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Roseanna", lastname: "Gopsell", email: "rgopsell25@histats.com", profileImg: "https://robohash.org/recusandaeodioautem.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Fina", lastname: "Otridge", email: "fotridge26@eventbrite.com", profileImg: "https://robohash.org/autquiaet.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Worth", lastname: "Beaufoy", email: "wbeaufoy27@fc2.com", profileImg: "https://robohash.org/atodiovoluptatibus.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Doro", lastname: "Kenewell", email: "dkenewell28@a8.net", profileImg: "https://robohash.org/excepturiquodvoluptatem.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Nissie", lastname: "Partner", email: "npartner29@nbcnews.com", profileImg: "https://robohash.org/assumendavitaevoluptas.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Rhys", lastname: "Vescovini", email: "rvescovini2a@npr.org", profileImg: "https://robohash.org/doloremetqui.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Kora", lastname: "McMeekan", email: "kmcmeekan2b@e-recht24.de", profileImg: "https://robohash.org/liberoiureofficiis.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Tait", lastname: "Tort", email: "ttort2c@smh.com.au", profileImg: "https://robohash.org/delenitiquaeplaceat.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Cariotta", lastname: "Goracci", email: "cgoracci2d@newsvine.com", profileImg: "https://robohash.org/hicrepellatvitae.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Mattie", lastname: "Beig", email: "mbeig2e@hexun.com", profileImg: "https://robohash.org/occaecatisolutaaliquid.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Keen", lastname: "Brunning", email: "kbrunning2f@homestead.com", profileImg: "https://robohash.org/porroautdolore.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Emelia", lastname: "Levitt", email: "elevitt2g@psu.edu", profileImg: "https://robohash.org/dolormolestiaerepudiandae.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Norbie", lastname: "Braben", email: "nbraben2h@howstuffworks.com", profileImg: "https://robohash.org/nesciuntvoluptatemmagni.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Urban", lastname: "Liverock", email: "uliverock2i@patch.com", profileImg: "https://robohash.org/sedetid.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Michelle", lastname: "Vardey", email: "mvardey2j@amazonaws.com", profileImg: "https://robohash.org/nisiperferendissapiente.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Guthrie", lastname: "Androck", email: "gandrock2k@techcrunch.com", profileImg: "https://robohash.org/autdoloresvoluptatem.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Rich", lastname: "Jemmett", email: "rjemmett2l@rakuten.co.jp", profileImg: "https://robohash.org/ipsumpariaturmolestiae.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Dahlia", lastname: "Braker", email: "dbraker2m@utexas.edu", profileImg: "https://robohash.org/nonperferendisvoluptate.jpg?size=50x50&set=set1", type: "STUDENT" },
    { name: "Gabie", lastname: "Lobbe", email: "globbe2n@slideshare.net", profileImg: "https://robohash.org/illodoloresquam.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Ewen", lastname: "Kopfer", email: "ekopfer2o@miibeian.gov.cn", profileImg: "https://robohash.org/voluptasconsequatursaepe.png?size=50x50&set=set1", type: "STUDENT" },
    { name: "Luciana", lastname: "Viña", email: "lucianavina@lelschool.com", profileImg: "https://robohash.org/fugiatnostrumdistinctio.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Laura", lastname: "Martínez", email: "lurimartinez@lelschool.com", profileImg: "https://robohash.org/essedictaitaque.bmp?size=50x50&set=set1", type: "STUDENT" },
    { name: "Escarlata", lastname: "Fdez", email: "escarlatafdez@lelschool.com", profileImg: "https://robohash.org/accusantiumdolorcorporis.jpg?size=50x50&set=set1", type: "STUDENT" }
]

let usersCreadted = []

User
    .create(users).then(users => {
        console.log('Se han creado los usuarios')
        const teacher = users[users.length - 1]
        usersCreadted = [...users]
        return Subject.create(subjects.map(elm => ({ ...elm, teacher: teacher.id })))
    })
    .then(subjects => {
        console.log('Se han creado las asignaturas')
        return Course.create(courses.map((elm, index) => ({
            ...elm, subjects: subjects.map(subject => subject.id),
            users: !index ? usersCreadted.filter(elm => elm.type === "STUDENT") : []
        })))
    })
    .then(() => {
        console.log('Se han creado los cursos')
        mongoose.connection.close()
    })
    .catch(err => console.log(err))

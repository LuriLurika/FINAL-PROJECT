const mongoose = require("mongoose")
require('dotenv').config()

const Course = require('../models/Course.model')
const Subject = require('../models/Subject.model')
const User = require('../models/User.model')

// mongoose.connect(`mongodb://localhost/${process.env.DB}`, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// })

mongoose.connect(`mongodb+srv://EFdez:1234@cluster0.umhf5.mongodb.net/SchoolHack?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })


const users1 = [
  { username: "mbednall0", parent: "Mischa Bednall", name: "Man", lastname: "Bottom", email: "mbottom1@sfgate.com", profileImg: "https://robohash.org/quisquiaquo.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "dcartan1", parent: "Dan Cartan", name: "Karlik", lastname: "Copozio", email: "kcopozio2@independent.com", profileImg: "https://robohash.org/mollitianatusdignissimos.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "ljanczyk2", parent: "Lief Janczyk", name: "Stepha", lastname: "Cowlishaw", email: "scowlishaw4@house.gov", profileImg: "https://robohash.org/quodminimaaut.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "ibullick3", parent: "Ibby Bullick", name: "Stepha", lastname: "Cowlishaw", email: "scowlishaw4@house.gov", profileImg: "https://robohash.org/quodminimaaut.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "adowbekin4", parent: "Arnaldo Dowbekin", name: "Lyndsey", lastname: "Dettmar", email: "ldettmar5@com.com", profileImg: "https://robohash.org/exercitationemrepellatest.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "mjuden5", parent: "	Mendel Juden", name: "Briano", lastname: "Szymonwicz", email: "bszymonwicz6@google.com", profileImg: "https://robohash.org/providentquibusdamitaque.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "gjepensen6", parent: "Gerard Jepensen", name: "Kain", lastname: "Kubas", email: "kkubas7@japanpost.jp", profileImg: "https://robohash.org/nonautemasperiores.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "lmeasey7", parent: "Lemmie Measey", name: "Jedd", lastname: "Phillcox", email: "jphillcox8@bloomberg.com", profileImg: "https://robohash.org/illodeseruntea.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "ccrummay8", parent: "Cathyleen Crummay", name: "Barret", lastname: "Moller", email: "bmoller9@bigcartel.com", profileImg: "https://robohash.org/cumqueimpeditreprehenderit.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "grideout9", parent: "Gilburt Rideout", name: "Nike", lastname: "Gregan", email: "ngregana@gmpg.org", profileImg: "https://robohash.org/laudantiumquoddoloribus.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "ahancea", parent: "Aubrie Hance", name: "Fairleigh", lastname: "Trowell", email: "ftrowellb@issuu.com", profileImg: "https://robohash.org/laborequasdignissimos.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "cdareyb", parent: "Cristal Darey", name: "Lani", lastname: "Rundall", email: "lrundallc@newyorker.com", profileImg: "https://robohash.org/voluptatumeanon.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "jjenteauc", parent: "Joey Jenteau", name: "Ax", lastname: "Valentin", email: "avalentind@example.com", profileImg: "https://robohash.org/placeatconsequaturvoluptates.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "dkasherd", parent: "Dinny Kasher", name: "Tiffany", lastname: "Linge", email: "tlinge1n@narod.ru", profileImg: "https://robohash.org/enimutvelit.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "aluname", parent: "	Ashely Lunam", name: "Jacquetta", lastname: "Patise", email: "jpatise1o@sitemeter.com", profileImg: "https://robohash.org/initaquevoluptatem.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "zbendigf", parent: "Zacharie Bendig", name: "Cris", lastname: "Cothey", email: "ccothey1p@acquirethisname.com", profileImg: "https://robohash.org/numquamautaut.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "tblenking", parent: "	Tiertza Blenkin", name: "Alyce", lastname: "Crowcum", email: "acrowcum1q@reference.com", profileImg: "https://robohash.org/quilaborumcorporis.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "osimukovh", parent: "Olvan Simukov", name: "Sadella", lastname: "Courson", email: "scourson1r@a8.net", profileImg: "https://robohash.org/oditreiciendisiure.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "lblakesi", parent: "Lena Blakes", name: "Willie", lastname: "Foskew", email: "wfoskew1s@usgs.gov", profileImg: "https://robohash.org/enimadsed.jpg?size=50x50&set=set1", type: "STUDENT" },
]
const users2 = [
  { username: "cmarchingtonj", parent: "Caddric Marchington", name: "Dennet", lastname: "Schiersch", email: "dschierschh@privacy.gov", profileImg: "https://robohash.org/dolorundeet.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "nmacksteadk", parent: "Noreen Mackstead", name: "Roanne", lastname: "Orbon", email: "rorbon0@vistaprint.com", profileImg: "https://robohash.org/quisidoptio.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "echenel", parent: "Elle Chene", name: "Eula", lastname: "Combes", email: "ecombes1@apache.org", profileImg: "https://robohash.org/ipsamquovoluptatem.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "lpiscotm", parent: "Lillis Piscot", name: "Otha", lastname: "Ponsford", email: "oponsford2@infoseek.co.jp", profileImg: "https://robohash.org/ametfaciliscorrupti.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "whysomn", parent: "Wanda Hysom", name: "Joshuah", lastname: "McGauhy", email: "jmcgauhy3@abc.net.au", profileImg: "https://robohash.org/pariaturetquisquam.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "hsarvaro", parent: "Hanni Sarvar", name: "Ulrika", lastname: "Scarlett", email: "uscarlett4@techcrunch.com", profileImg: "https://robohash.org/officiisseddignissimos.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "fdougalp", parent: "Feodora Dougal", name: "Trixy", lastname: "Jukubczak", email: "tjukubczak5@storify.com", profileImg: "https://robohash.org/suscipitomnisimpedit.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "bvargasq", parent: "Bernelle Vargas", name: "Gabriela", lastname: "Birtle", email: "gbirtle6@nydailynews.com", profileImg: "https://robohash.org/oditeaaccusantium.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "acaskeyr", parent: "Alina Caskey", name: "Hildegarde", lastname: "Charpling", email: "hcharpling7@xinhuanet.com", profileImg: "https://robohash.org/maximeconsecteturet.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "bfibbenss", parent: "Bette-ann Fibbens", name: "Myrlene", lastname: "Tweed", email: "mtweed8@nydailynews.com", profileImg: "https://robohash.org/evenietetreprehenderit.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "jscownt", parent: "Judi Scown", name: "Enrica", lastname: "Kemp", email: "ekemp9@nih.gov", profileImg: "https://robohash.org/undesolutavero.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "kdyteu", parent: "Kirstyn Dyte", name: "Nick", lastname: "Attkins", email: "nattkinsa@yellowpages.com", profileImg: "https://robohash.org/quaerateligendilabore.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "epluckv", parent: "Enriqueta Pluck", name: "Daisie", lastname: "Wilkin", email: "dwilkin1y@fema.gov", profileImg: "https://robohash.org/veldebitisaccusantium.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "nizzatw", parent: "Niles Izzat", name: "Benn", lastname: "Akid", email: "bakid1z@miitbeian.gov.cn", profileImg: "https://robohash.org/utipsumdicta.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "hhaugehx", parent: "Harriette Haugeh", name: "Lilllie", lastname: "Methuen", email: "lmethuen20@census.gov", profileImg: "https://robohash.org/estmodinumquam.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "ahansardy", parent: "Aurthur Hansard", name: "Maridel", lastname: "Tuer", email: "mtuer21@sitemeter.com", profileImg: "https://robohash.org/inciduntlaudantiumaut.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "sglenfieldz", parent: "Skippie Glenfield", name: "Flor", lastname: "Penniell", email: "fpennielli@ehow.com", profileImg: "https://robohash.org/adetquod.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "eatthow10", parent: "Eleonore Atthow", name: "Riobard", lastname: "Alvarado", email: "ralvaradoj@webs.com", profileImg: "https://robohash.org/exercitationemesseaspernatur.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "jrowthorn11", parent: "Jillian Rowthorn", name: "Clarine", lastname: "Gianetti", email: "cgianettik@mtv.com", profileImg: "https://robohash.org/providentitaquemolestias.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "ggrouen12", parent: "Giffard Grouen", name: "Chane", lastname: "Awde", email: "cawdel@scientificamerican.com", profileImg: "https://robohash.org/quositunde.jpg?size=50x50&set=set1", type: "STUDENT" },
]

const users3 = [
  { username: "pgrain13", parent: "Phillipe Grain", name: "Clerc", lastname: "Mardee", email: "cmardeen@newyorker.com", profileImg: "https://robohash.org/rerumetlaudantium.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "aocurrigan14", parent: "Ardis O'Currigan", name: "Agace", lastname: "Sywell", email: "asywello@shutterfly.com", profileImg: "https://robohash.org/solutasedtempora.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "tmurrell15", parent: "Tonnie Murrell", name: "Reena", lastname: "Withrington", email: "rwithringtonp@craigslist.org", profileImg: "https://robohash.org/quiadolorumipsam.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "driddiford16", parent: "Danya Riddiford", name: "Perla", lastname: "Murrum", email: "pmurrumq@shutterfly.com", profileImg: "https://robohash.org/distinctioexpeditaqui.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "asteen17", parent: "Aland Steen", name: "Lisabeth", lastname: "Rippin", email: "lrippinr@studiopress.com", profileImg: "https://robohash.org/laborummagnamomnis.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "scouroy18", parent: "	Samara Couroy", name: "Denney", lastname: "Diggar", email: "ddiggars@scribd.com", profileImg: "https://robohash.org/necessitatibusdoloremcumque.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "chydechambers19", parent: "Crosby Hyde-Chambers", name: "Alisa", lastname: "Iacovuzzi", email: "aiacovuzzit@yale.edu", profileImg: "https://robohash.org/doloremeoset.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "mmayhew1a", parent: "Maisey Mayhew", name: "Marcus", lastname: "Questier", email: "mquestieru@youtu.be", profileImg: "https://robohash.org/idnatusdistinctio.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "jbrenard1b", parent: "Jimmie Brenard", name: "Roosevelt", lastname: "Cluatt", email: "rcluattv@github.io", profileImg: "https://robohash.org/suntmaioresvoluptatem.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "proskams1c", parent: "Phyllida Roskams", name: "Dedie", lastname: "Mayler", email: "dmaylerw@va.gov", profileImg: "https://robohash.org/exercitationeminfugiat.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "cellcome1d", parent: "Carlo Ellcome", name: "Brigid", lastname: "Hannon", email: "bhannonx@goo.gl", profileImg: "https://robohash.org/natussaepevoluptatem.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "vdorin1e", parent: "Vivyanne Dorin", name: "Carlotta", lastname: "Longman", email: "clongmany@newyorker.com", profileImg: "https://robohash.org/sintquivoluptatem.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "otocknell1f", parent: "Oriana Tocknell", name: "Michelle", lastname: "Vardey", email: "mvardey2j@amazonaws.com", profileImg: "https://robohash.org/nisiperferendissapiente.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "aperrins1g", parent: "Alard Perrins", name: "Guthrie", lastname: "Androck", email: "gandrock2k@techcrunch.com", profileImg: "https://robohash.org/autdoloresvoluptatem.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "ubarnet1h", parent: "Udell Barnet", name: "Rich", lastname: "Jemmett", email: "rjemmett2l@rakuten.co.jp", profileImg: "https://robohash.org/ipsumpariaturmolestiae.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "elegister1i", parent: "Elsa Legister", name: "Dahlia", lastname: "Braker", email: "dbraker2m@utexas.edu", profileImg: "https://robohash.org/nonperferendisvoluptate.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "ledon1j", parent: "Latashia Edon", name: "Gabie", lastname: "Lobbe", email: "globbe2n@slideshare.net", profileImg: "https://robohash.org/illodoloresquam.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "joshesnan1k", parent: "Jerri O'Shesnan", name: "Ewen", lastname: "Kopfer", email: "ekopfer2o@miibeian.gov.cn", profileImg: "https://robohash.org/voluptasconsequatursaepe.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "kmacwilliam1l", parent: "Kevyn MacWilliam", name: "Waite", lastname: "Perfitt", email: "wperfittb@drupal.org", profileImg: "https://robohash.org/iddoloribusullam.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "jlumpkin1m", parent: "Jane Lumpkin", name: "Marj", lastname: "Kures", email: "mkuresc@ibm.com", profileImg: "https://robohash.org/aveniamreprehenderit.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "oolsen1n", parent: "Olivette Olsen", name: "Hendrika", lastname: "Terese", email: "hteresed@home.pl", profileImg: "https://robohash.org/occaecatievenietsed.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "arugge1o", parent: "Aubert Rugge", name: "Andriana", lastname: "Brahan", email: "abrahane@icq.com", profileImg: "https://robohash.org/autrepudiandaeerror.bmp?size=50x50&set=set1", type: "STUDENT" },

]
const users4 = [
  { username: "zriddich1p", parent: "Aubert Rugge", name: "Rhetta", lastname: "Catchpole", email: "rcatchpolez@washington.edu", profileImg: "https://robohash.org/nisiipsamsimilique.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "rlivingstone1q", parent: "Reynolds Livingstone", name: "Marge", lastname: "Haydon", email: "mhaydon10@deliciousdays.com", profileImg: "https://robohash.org/voluptateestnihil.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "bmasic1r", parent: "Buiron Masic", name: "Fin", lastname: "Drynan", email: "fdrynan11@furl.net", profileImg: "https://robohash.org/quiseosamet.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "aarton1s", parent: "Arthur Arton", name: "Nickie", lastname: "Riccard", email: "nriccard12@psu.edu", profileImg: "https://robohash.org/maximequivoluptatibus.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "dspearman1t", parent: "Darryl Spearman", name: "Sarette", lastname: "Knightsbridge", email: "sknightsbridge13@nyu.edu", profileImg: "https://robohash.org/occaecatireiciendisquo.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "lfreegard1u", parent: "Lynett Freegard", name: "Cortie", lastname: "Haydon", email: "chaydon14@yolasite.com", profileImg: "https://robohash.org/hicexercitationemvoluptatibus.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "rmcquade1v", parent: "Rina McQuade", name: "Tremain", lastname: "Elmar", email: "telmar15@independent.co.uk", profileImg: "https://robohash.org/sitveroaut.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "gshoppee1w", parent: "Germain Shoppee", name: "Nappy", lastname: "Pawling", email: "npawling16@apple.com", profileImg: "https://robohash.org/autquosnemo.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "rkik1x", parent: "Raimondo Kik", name: "Amalia", lastname: "Fattore", email: "afattore17@apple.com", profileImg: "https://robohash.org/velquiarecusandae.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "cbeviss1y", parent: "Cassie Beviss", name: "Rebe", lastname: "Cuttings", email: "rcuttings18@icio.us", profileImg: "https://robohash.org/cumquedistinctiosint.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "lmulryan1z", parent: "Lucila Mulryan", name: "Tim", lastname: "Giabuzzi", email: "tgiabuzzi19@t-online.de", profileImg: "https://robohash.org/fugafacereeum.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "ssartain20", parent: "Syd Sartain", name: "Stormie", lastname: "Devanny", email: "sdevanny1a@barnesandnoble.com", profileImg: "https://robohash.org/omnismagniarchitecto.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "mnathan21", parent: "Moyna Nathan", name: "Danny", lastname: "Hedditeh", email: "dhedditehm@dailymotion.com", profileImg: "https://robohash.org/exercitationemrepellatest.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "dfairley22", parent: "Dayna Fairley", name: "Doro", lastname: "Kenewell", email: "dkenewell28@a8.net", profileImg: "https://robohash.org/excepturiquodvoluptatem.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "dhemphrey23", parent: "Danni Hemphrey", name: "Nissie", lastname: "Partner", email: "npartner29@nbcnews.com", profileImg: "https://robohash.org/assumendavitaevoluptas.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "scovolini24", parent: "Shantee Covolini", name: "Rhys", lastname: "Vescovini", email: "rvescovini2a@npr.org", profileImg: "https://robohash.org/doloremetqui.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "mmarquess25", parent: "Mignonne Marquess", name: "Kora", lastname: "McMeekan", email: "kmcmeekan2b@e-recht24.de", profileImg: "https://robohash.org/liberoiureofficiis.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "mglidden26", parent: "Maynard Glidden", name: "Tait", lastname: "Tort", email: "ttort2c@smh.com.au", profileImg: "https://robohash.org/delenitiquaeplaceat.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "bclelland27", parent: "Batholomew Clelland", name: "Cariotta", lastname: "Goracci", email: "cgoracci2d@newsvine.com", profileImg: "https://robohash.org/hicrepellatvitae.png?size=50x50&set=set1", type: "STUDENT" },
]

const users5 = [
  { username: "tsher28", parent: "Thedric Sher", name: "Marcello", lastname: "Josey", email: "mjosey1b@privacy.gov.au", profileImg: "https://robohash.org/minimaquiquia.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "wpetz29", parent: "Wake Petz", name: "Clarine", lastname: "Harsnipe", email: "charsnipe1c@cnbc.com", profileImg: "https://robohash.org/fugiatearepellendus.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "jscarth2a", parent: "Jolyn Scarth", name: "Burnard", lastname: "Kerans", email: "bkerans1d@imgur.com", profileImg: "https://robohash.org/impeditdebitisculpa.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "abrech2b", parent: "Ambrose Brech", name: "Lotty", lastname: "Foucar", email: "lfoucar1e@umn.edu", profileImg: "https://robohash.org/voluptasoditmaiores.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "fwhordley2c", parent: "Florri Whordley", name: "Heath", lastname: "Aikett", email: "haikett1f@webs.com", profileImg: "https://robohash.org/earumautlaboriosam.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "sstephen2d", parent: "Sarge Stephen", name: "Neysa", lastname: "Khristyukhin", email: "nkhristyukhin1g@weather.com", profileImg: "https://robohash.org/ipsumodiovelit.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "pchatelot2e", parent: "Pennie Chatelot", name: "Blythe", lastname: "Bushel", email: "bbushel1h@sciencedirect.com", profileImg: "https://robohash.org/autaccusamusofficiis.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "snelane2f", parent: "Simonne Nelane", name: "Noble", lastname: "Arlett", email: "narlett1i@jiathis.com", profileImg: "https://robohash.org/architectovoluptateshic.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "sdarker2g", parent: "Skyler Darker", name: "Timmi", lastname: "Dumbar", email: "tdumbar1j@bravesites.com", profileImg: "https://robohash.org/dolordelenitiquo.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "csamways2h", parent: "Celie Samways", name: "Idelle", lastname: "Benedick", email: "ibenedick1k@furl.net", profileImg: "https://robohash.org/pariaturexpeditaquia.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "fwinchurst2i", parent: "Fancy Winchurst", name: "Tova", lastname: "Gillooly", email: "tgillooly1l@imgur.com", profileImg: "https://robohash.org/verovoluptasipsa.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "idomanski2j", parent: "Ilario Domanski", name: "Karilynn", lastname: "Annatt", email: "kannatt1m@redcross.org", profileImg: "https://robohash.org/temporacupiditateaut.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "lucianavina", parent: "Spenser Lynock", name: "Luciana", lastname: "Viña", email: "lucianasvina@gmail.com", profileImg: "https://robohash.org/fugiatnostrumdistinctio.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "lauramartinez", parent: "Ado Mineghelli", name: "Laura", lastname: "Martínez", email: "lauram.delgado87@gmail.com", profileImg: "https://robohash.org/essedictaitaque.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "escarlatafdez", parent: "Marsiella Velde", name: "Escarlata", lastname: "Fdez", email: "escarlafdez@gmail.com", profileImg: "https://robohash.org/accusantiumdolorcorporis.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "ctopham2n", parent: "Celestine Topham", name: "Rich", lastname: "Fazzioli", email: "rfazziolif@globo.com", profileImg: "https://robohash.org/asperioresquiaveritatis.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "spimley2o", parent: "Sibley Pimley", name: "Muire", lastname: "Judkins", email: "mjudkinsg@stanford.edu", profileImg: "https://robohash.org/accusantiumsitquasi.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "kcattel2p", parent: "Kerstin Cattel", name: "Edee", lastname: "Vatini", email: "evatinih@about.com", profileImg: "https://robohash.org/voluptatemmaioresquas.png?size=50x50&set=set1", type: "STUDENT" },
]

const users6 = [
  { username: "nhickford2q", parent: "Nobe Hickford", name: "Cosmo", lastname: "Doran", email: "cdoran1t@slate.com", profileImg: "https://robohash.org/rerumodiosed.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "kgilbride2r", parent: "Kory Gilbride", name: "Stephanie", lastname: "Lowles", email: "slowles1u@sohu.com", profileImg: "https://robohash.org/ipsamautlaudantium.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "Tirsoda", parent: "Fancy Winchurst", name: "Tirso", lastname: "del Álamo", email: "tirsodelalamomartin@gmail.com", profileImg: "https://robohash.org/blanditiisadmaiores.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "victorsl", parent: "Simonne Nelane", name: "Víctor", lastname: "Sánchez Leal", email: "victor1305@icloud.com", profileImg: "https://robohash.org/inciduntessenumquam.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "sunuk", parent: "Spenser Lynock", name: "Soon Woo ", lastname: "Kwon", email: "soonk@outlook.com", profileImg: "https://robohash.org/sunttotamautem.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "rodrigopg", parent: "Marsiella Velde", name: "Rodrigo", lastname: "Perez Garces", email: "rpgarces1991@gmail.com", profileImg: "https://robohash.org/quoddelenitiut.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "robertogc", parent: "Jolyn Scarth", name: "Roberto", lastname: "González Camejo", email: "rob.gonzalez3@gmail.com", profileImg: "https://robohash.org/inconsequunturtempore.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "pablodth", parent: "Sarge Stephen", name: "Pablo", lastname: "de Tuero Herrero", email: "pablo91th@gmail.com", profileImg: "https://robohash.org/eligendiullamcumque.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "miguelsm", parent: "Kerstin Cattel", name: "Miguel", lastname: "Serrano Muñoz", email: "miguel5x@hotmail.com", profileImg: "https://robohash.org/recusandaeodioautem.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "laurasl", parent: "Skyler Darker", name: "Laura", lastname: "Sánchez López", email: "lauren695@hotmail.com", profileImg: "https://robohash.org/autquiaet.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "lauratm", parent: "Batholomew Clelland", name: "Laura", lastname: "Toro Sosa", email: "lauradeltoro.arq@gmail.com", profileImg: "https://robohash.org/atodiovoluptatibus.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "evam", parent: "Mignonne Marquess", name: "Eva", lastname: "Mera", email: "evameravivar@gmail.com", profileImg: "https://robohash.org/occaecatisolutaaliquid.png?size=50x50&set=set1", type: "STUDENT" },
  { username: "elenasl", parent: "Florri Whordley", name: "Elena", lastname: "Sánchez León", email: "elena.farma94@gmail.com", profileImg: "https://robohash.org/porroautdolore.bmp?size=50x50&set=set1", type: "STUDENT" },
  { username: "davidrg", parent: "Shantee Covolini", name: "David", lastname: "Roel Gómez", email: "drgomez92@gmail.com", profileImg: "https://robohash.org/dolormolestiaerepudiandae.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "andresbr", parent: "Danni Hemphrey", name: "Andrés", lastname: "Barros Rivas", email: "andresbr92@gmail.com", profileImg: "https://robohash.org/nesciuntvoluptatemmagni.jpg?size=50x50&set=set1", type: "STUDENT" },
  { username: "germanas", parent: "Dayna Fairley", name: "Germán", lastname: "Álvarez Sánchez", email: "ger.alvarez.sanchez@gmail.com", profileImg: "https://robohash.org/voluptatemmaioresquas.png?size=50x50&set=set1", type: "STUDENT" },
]


const courses = [{
  title: '1º de primaria',
  subjects: []
},
{
  title: '2º de primaria',
  subjects: []
},
{
  title: '3º de primaria',
  subjects: []
},
{
  title: '4º de primaria',
  subjects: []
},
{
  title: '5º de primaria',
  subjects: []
},
{
  title: '6º de primaria',
  subjects: []
}
]

const subjects = [
  { title: "Matemáticas", teacher: "users.type.teacher.id", description: "Se entienden así las matemáticas como un conjunto de ideas y formas de actuar que conllevan no sólo utilizar cantidades y formas geométricas, sino, y sobre todo, hacerse preguntas. obtener modelos e identificar relaciones y estructuras, de modo que, al analizar los fenómenos y situaciones que se presentan en la realidad, se puedan obtener informaciones y conclusiones que inicialmente no estaban explícitas. Concebidas de esta forma, las matemáticas incorporan las características que les han sido tradicionalmente asignadas y que se identifican con la deducción, la precisión, el rigor, la seguridad, etc., pero son y aportan mucho más de lo que se deduce de estos términos. También son inducción, estimación, aproximación, probabilidad y tentativa, y mejoran la capacidad de enfrentarse a situaciones abiertas, sin solución única y cerrada.", },
  { title: "Lengua Castellana y Literatura", description: "La educación relativa al lenguaje y a la comunicación es uno de los ejes fundamentales en la Educación Primaria, puesto que permite al alumnado comunicarse de manera eficiente oralmente y por escrito, expresar y compartir ideas, percepciones y sentimientos, apropiarse de los contenidos culturales, regular la conducta propia y la de los demás, ejercer su sentido crítico, adoptar una postura creativa y construir, en definitiva, la propia visión del mundo. A lo largo de esta etapa los niños deben empezar a adquirir un saber reflexivo sobre las prácticas comunicativas necesarias para vivir en la sociedad del siglo XXI. El área de Lengua castellana y literatura es el ámbito privilegiado para conseguir estas metas aunque todas las áreas, al emplear el lenguaje como medio de comunicación y de adquisición y transmisión del conocimiento, son responsables del desarrollo de la comunicación lingüística. Así pues, la enseñanza y el aprendizaje en esta área tiene corno objeto el desarrollo de las habilidades lingüísticas: hablar, escuchar y conversar, leer y escribir. También, y de manera especifica, pretende acercar a la lectura y comprensión de textos literarios." },
  { title: "Primera Lengua Extranjera", description: "El conocimiento de lenguas extranjeras es cada vez más importante y necesario para vivir en un mundo que, debido a los progresivos avances en los campos tecnológicos e informáticos, nos lleva a una sociedad donde la comunicación a través de otras lenguas abre enormes posibilidades de progreso y libertad, además de contribuir al entendimiento y el respeto entre las distintas culturas y sus hablantes." },
  { title: "Ciencias Sociales", description: "El área de Ciencias Sociales pertenece al bloque de las asignaturas troncales, por tanto los contenidos, criterios de evaluación y estándares de aprendizaje evaluables para toda la etapa son los propuestos por el Ministerio de Educación, Cultura y Deporte en el Real Decreto 126/2014, de 28 de febrero, por el que se establece el currículo básico de la Educación Primaria. La Comunidad de Madrid ha complementado y concretado los contenidos, distribuyéndolos, junto con sus correspondientes estándares de aprendizaje evaluables, curso a curso." },
  { title: "Ciencias de la Naturaleza", description: "La enseñanza y el aprendizaje de las ciencias proporcionan al alumno la oportunidad de conocer y poner en práctica los valores y las conductas que están en la base del trabajo científico: observación, análisis, crítica, contraste, reflexión, perseverancia, así como la formulación de preguntas, la confección de hipótesis, la interpretación de datos y la experimentación." },
  { title: "Educación Física", description: "El área de Educación física contribuye esencialmente al desarrollo de la competencia en el conocimiento y la interacción con el mundo físico, mediante la percepción e interacción apropiada del propio cuerpo, en movimiento o en reposo, en un espacio determinado mejorando sus posibilidades motrices. Se contribuye también mediante el conocimiento, la práctica y la valoración de la actividad física corno elemento indispensable para preservar la salud. Esta área es clave para que los niños adquieran hábitos saludables y de mejora y mantenimiento de la condición física que les acompañen durante la escolaridad y, lo que es más importante, a lo largo de la vida." },
  { title: "Valores Sociales y Cívicos", description: "A través del centro escolar el niño entra en contacto con la sociedad. Allí aprende a convivir con los otros y a respetar las normas colectivas al tiempo que desarrolla su carácter y su personalidad. Los contenidos del área de Valores Sociales y Cívicos conducen al alumno a reflexionar sobre los pequeños problemas que cada día surgen en la vida escolar y, de esa forma, empieza a tomar conciencia de los fundamentos morales que rigen el comportamiento de los individuos en una sociedad libre y democrática" },
  { title: "Educación Artística", description: "Educación El área de Educación Artística comprende diversas formas de expresión y representación mediante las cuales el niño aprende, expresa y comunica distintos aspectos de su mundo interior y de la realidad exterior. De ahí que su enseñanza sea eminentemente práctica y su metodología consista básicamente en proporcionar al alumno conocimientos y claves para el desarrollo de su sentido estético y, fundamentalmente, herramientas y técnicas para la expresión." },
  { title: "Religión", description: "Los contenidos de esta área se organizan sobre la base de siete bloques, que recogen los aspectos fundamentales de la convivencia. El primer bloque se centra en conocer los principales valores humanos y reconocer la importancia de la educación en valores; de modo que los alumnos sean capaces de diferenciar valores positivos de otros que no lo son. El segundo bloque aborda contenidos referidos a la identificación y regulación de las emociones y la importancia de un adecuado entrenamiento en habilidades sociales para adquirir una conducta social compatible con la sociedad a la que se pertenece. La convivencia y la resolución pacífica de conflictos se engloban dentro del bloque tercero. Es importante que los alumnos desarrollen competencias que les enseñen a convivir en sociedad, adoptando actitudes cooperativas y entendiendo y respetando la diversidad." }
];

const users = [
  { name: "Stephi", lastname: "Bloxholm", username: 'username1', email: "sbloxholm0@admin.ch", profileImg: "https://robohash.org/doloressitmaiores.jpg?size=50x50&set=set1", type: "DIRECTOR" },
  { name: "Costa", lastname: "Godlip", username: 'username2', email: "cgodlip3@nyu.edu", profileImg: "https://robohash.org/sedconsecteturdolor.bmp?size=50x50&set=set1", type: "TEACHER" },
  { name: "Kim", lastname: "Falconbridge", username: 'username3', email: "kfalconbridgee@ca.gov", profileImg: "https://robohash.org/quamenimet.png?size=50x50&set=set1", type: "TEACHER" },
  { name: "Guy", lastname: "Ginnety", username: 'username4', email: "gginnetyf@alibaba.com", profileImg: "https://robohash.org/maioresquianecessitatibus.jpg?size=50x50&set=set1", type: "TEACHER" },
  { name: "Britt", lastname: "Sodory", username: 'username5', email: "bsodoryg@bloglovin.com", profileImg: "https://robohash.org/quiaomnisautem.jpg?size=50x50&set=set1", type: "TEACHER" },
  { name: "Nicola", lastname: "Hawkslee", username: 'username6', email: "nhawksleei@guardian.com", profileImg: "https://robohash.org/quosanimiomnis.jpg?size=50x50&set=set1", type: "TEACHER" },
  { name: "Morgen", lastname: "Ince", username: 'username7', email: "mincej@scientificamerican.com", profileImg: "https://robohash.org/siterrormaiores.bmp?size=50x50&set=set1", type: "TEACHER" },
  { name: "Germán", lastname: "Álvarez", username: 'username8', email: "sbloxholm0@admin.ch", profileImg: "https://robohash.org/doloressitmaiores.jpg?size=50x50&set=set1", type: "DIRECTOR" },
  { name: "Angel", lastname: "Rivas", username: 'username9', email: "lauram.delgado87@gmail.com", profileImg: "https://robohash.org/sedconsecteturdolor.bmp?size=50x50&set=set1", type: "TEACHER" },
  { name: "Luna", lastname: "Franco", username: 'username10', email: "lauram.delgado87@gmail.com", profileImg: "https://robohash.org/quamenimet.png?size=50x50&set=set1", type: "TEACHER" },
  { name: "Arek", lastname: "Martinez", username: 'username11', email: "lauram.delgado87@gmail.com", profileImg: "https://robohash.org/maioresquianecessitatibus.jpg?size=50x50&set=set1", type: "TEACHER" },
]

let usersCreadted = []
let createdSubjects = []
const userMap = {
  us0: users1,
  us1: users2,
  us2: users3,
  us3: users4,
  us4: users5,
  us5: users6
};
User.create(users)
  .then((users) => {
    console.log("Se han creado los profesores");

    usersCreadted = [...users];
    return Subject.create(
      subjects.map((elm, idx) => ({ ...elm, teacher: usersCreadted[idx].id }))
    );
  })
  .then((subjects) => {
    console.log("Se han creado las asignaturas");
    createdSubjects = [...subjects]
    return Promise.all([
      User.create(users1),

      User.create(users2),
      User.create(users3),

      User.create(users4),

      User.create(users5),
      User.create(users6),
    ]);
  })
  .then(users => {
    console.log("Se han creado los usuarios de cursos");

    const promises = courses.map((elm, indx) => {
      elm.users = users[indx].map((elm) => elm._id);
      elm.subjects = createdSubjects.map((elm) => elm.id);
      return Course.create(elm);
    })


    // courses[0].users = us2.map((elm) => elm._id);
    // courses.subjects = createdSubjects.map((elm) => elm.id);
    // create1 = Course.create(courses[0]);

    // courses[0].users = us1.map((elm) => elm._id);
    // courses.subjects = createdSubjects.map((elm) => elm.id);
    // create1 = Course.create(courses[0]);

    // courses[0].users = us1.map((elm) => elm._id);
    // courses.subjects = createdSubjects.map((elm) => elm.id);
    // create1 = Course.create(courses[0]);

    // courses[0].users = us1.map((elm) => elm._id);
    // courses.subjects = createdSubjects.map((elm) => elm.id);
    // create1 = Course.create(courses[0]);

    // courses[0].users = us1.map((elm) => elm._id);
    // courses.subjects = createdSubjects.map((elm) => elm.id);
    // create1 = Course.create(courses[0]);


    return Promise.all(promises);

  })
  .then((courses) => {
    console.log("Se han creado los cursos", courses);
    mongoose.connection.close();

  })
  .catch((err) => console.log(err));

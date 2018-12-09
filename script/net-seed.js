'use strict'
const brain = require('brain.js')
const db = require('../server/db')
const fs = require('fs')
const { Net } = require('../server/db/models')
const { thomas, ginsberg, spenser, snyder, ashbery, fabbro, auden, shakespeare } = require('./training/data')
const {tokenizeString, shuffle, filterAuthor } = require('./training/new-approach')
const {characterTable, indexTable, characters, json} = require('./test-net-function.txt')

const firstHundredAuthors = [
  {
    input: (tokenizeString(filterAuthor(thomas, 0.5, 0.5).data.join(' '))).slice(0, 30),
    output: '1'
  },
  {
    input: (tokenizeString(filterAuthor(ginsberg, 0.5, 0.5).data.join(' '))).slice(0, 30),
    output: '2'
  },
  {
    input: (tokenizeString(filterAuthor(spenser, 0.5, 0.5).data.join(' '))).slice(0, 30),
    output: '3'
  },
  {
    input: (tokenizeString(filterAuthor(snyder, 0.5, 0.5).data.join(' '))).slice(0, 30),
    output: '4'
  },
  {
    input: (tokenizeString(filterAuthor(ashbery, 0.5, 0.5).data.join(' '))).slice(0, 30),
    output: '5'
  },
  {
    input: (tokenizeString(filterAuthor(fabbro, 0.5, 0.5).data.join(' '))).slice(0, 30),
    output: '6'
  },
  {
    input: (tokenizeString(filterAuthor(auden, 0.5, 0.5).data.join(' '))).slice(0, 30),
    output: '7'
  },
  {
    input: (tokenizeString(filterAuthor(shakespeare, 0.5, 0.5).data.join(' '))).slice(0, 30),
    output: '8'
  }
]

 

// let net = new brain.recurrent.LSTM()

// net.train(firstHundredAuthors, {
//   // Defaults values --> expected validation
// iterations: 200,    // the maximum times to iterate the training data --> number greater than 0
// errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
// log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
// logPeriod: 20,        // iterations between logging out --> number greater than 0
// learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1
// momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
// callback: null,       // a periodic call back that can be triggered while training --> null or function
// callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
// timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
// })

// var characterTable = {"0":"1","1":"2","2":"3","3":"4","4":"5","5":"6","6":"7","7":"8","8":"april","9":"is","10":"the","11":"cruellest","12":"month","13":"breeding","14":"lilacs","15":"out","16":"of","17":"dead","18":"land","19":"mixing","20":"memory","21":"and","22":"desire","23":"stirring","24":"dull","25":"roots","26":"with","27":"spring","28":"rain","29":"winter","30":"kept","31":"us","32":"warm","33":"covering","34":"earth","35":"in","36":"forgetful","37":"from","38":"fairest","39":"creatures","40":"we","41":"increase","42":"that","43":"thereby","44":"beauty","45":"s","46":"rose","47":"might","48":"never","49":"die","50":"but","51":"as","52":"riper","53":"should","54":"by","55":"time","56":"decease","57":"his","58":"tender","59":"heir","60":"bear","61":"he","62":"disappeared","63":"brooks","64":"were","65":"frozen","66":"airports","67":"almost","68":"deserted","69":"snow","70":"disfigured","71":"public","72":"statues","73":"mercury","74":"sank","75":"mouth","76":"dying","77":"had","78":"driven","79":"half","80":"night","81":"far","82":"down","83":"san","84":"joaquin","85":"through","86":"mariposa","87":"up","88":"dangerous","89":"mountain","90":"roads","91":"pulled","92":"at","93":"eight","94":"a","95":"m","96":"big","97":"truckload","98":"i","99":"saw","100":"best","101":"minds","102":"my","103":"generation","104":"destroyed","105":"madness","106":"starving","107":"hysterical","108":"naked","109":"dragging","110":"themselves","111":"negro","112":"streets","113":"dawn","114":"looking","115":"for","116":"an","117":"angry","118":"fix","119":"angelheaded","120":"hipsters","121":"burning","122":"lo","123":"man","124":"whose","125":"muse","126":"whilome","127":"did","128":"maske","129":"her","130":"taught","131":"lowly","132":"shepheards","133":"weeds","134":"am","135":"now","136":"enforst","137":"unfitter","138":"taske","139":"trumpets","140":"sterne","141":"to","142":"chaunge","143":"mine","144":"first","145":"undecoded","146":"messages","147":"read","148":"popeye","149":"sits","150":"thunder","151":"unthought","152":"shoebox","153":"apartment","154":"livid","155":"curtain’s","156":"hue","157":"tangram","158":"emerges","159":"country","160":"meanwhile","161":"there","162":"you","163":"are","164":"they","165":"aw","166":"who","167":"sent","168":"them","169":"make","170":"everything","171":"ok","172":"take","173":"your","174":"mittens","175":"what","176":"do","177":"want","178":"all","179":"healthy","180":"contact","181":"or","182":"detect","183":null,"184":null,"185":null};

// var indexTable = {"1":0,"2":1,"3":2,"4":3,"5":4,"6":5,"7":6,"8":7,"april":8,"is":9,"the":10,"cruellest":11,"month":12,"breeding":13,"lilacs":14,"out":15,"of":16,"dead":17,"land":18,"mixing":19,"memory":20,"and":21,"desire":22,"stirring":23,"dull":24,"roots":25,"with":26,"spring":27,"rain":28,"winter":29,"kept":30,"us":31,"warm":32,"covering":33,"earth":34,"in":35,"forgetful":36,"from":37,"fairest":38,"creatures":39,"we":40,"increase":41,"that":42,"thereby":43,"beauty":44,"s":45,"rose":46,"might":47,"never":48,"die":49,"but":50,"as":51,"riper":52,"should":53,"by":54,"time":55,"decease":56,"his":57,"tender":58,"heir":59,"bear":60,"he":61,"disappeared":62,"brooks":63,"were":64,"frozen":65,"airports":66,"almost":67,"deserted":68,"snow":69,"disfigured":70,"public":71,"statues":72,"mercury":73,"sank":74,"mouth":75,"dying":76,"had":77,"driven":78,"half":79,"night":80,"far":81,"down":82,"san":83,"joaquin":84,"through":85,"mariposa":86,"up":87,"dangerous":88,"mountain":89,"roads":90,"pulled":91,"at":92,"eight":93,"a":94,"m":95,"big":96,"truckload":97,"i":98,"saw":99,"best":100,"minds":101,"my":102,"generation":103,"destroyed":104,"madness":105,"starving":106,"hysterical":107,"naked":108,"dragging":109,"themselves":110,"negro":111,"streets":112,"dawn":113,"looking":114,"for":115,"an":116,"angry":117,"fix":118,"angelheaded":119,"hipsters":120,"burning":121,"lo":122,"man":123,"whose":124,"muse":125,"whilome":126,"did":127,"maske":128,"her":129,"taught":130,"lowly":131,"shepheards":132,"weeds":133,"am":134,"now":135,"enforst":136,"unfitter":137,"taske":138,"trumpets":139,"sterne":140,"to":141,"chaunge":142,"mine":143,"first":144,"undecoded":145,"messages":146,"read":147,"popeye":148,"sits":149,"thunder":150,"unthought":151,"shoebox":152,"apartment":153,"livid":154,"curtain’s":155,"hue":156,"tangram":157,"emerges":158,"country":159,"meanwhile":160,"there":161,"you":162,"are":163,"they":164,"aw":165,"who":166,"sent":167,"them":168,"make":169,"everything":170,"ok":171,"take":172,"your":173,"mittens":174,"what":175,"do":176,"want":177,"all":178,"healthy":179,"contact":180,"or":181,"detect":182,"stop-input":183,"start-output":184,"unrecognized":185};

// var characters = ["1","2","3","4","5","6","7","8","april","is","the","cruellest","month","breeding","lilacs","out","of","dead","land","mixing","memory","and","desire","stirring","dull","roots","with","spring","rain","winter","kept","us","warm","covering","earth","in","forgetful","from","fairest","creatures","we","increase","that","thereby","beauty","s","rose","might","never","die","but","as","riper","should","by","time","decease","his","tender","heir","bear","he","disappeared","brooks","were","frozen","airports","almost","deserted","snow","disfigured","public","statues","mercury","sank","mouth","dying","had","driven","half","night","far","down","san","joaquin","through","mariposa","up","dangerous","mountain","roads","pulled","at","eight","a","m","big","truckload","i","saw","best","minds","my","generation","destroyed","madness","starving","hysterical","naked","dragging","themselves","negro","streets","dawn","looking","for","an","angry","fix","angelheaded","hipsters","burning","lo","man","whose","muse","whilome","did","maske","her","taught","lowly","shepheards","weeds","am","now","enforst","unfitter","taske","trumpets","sterne","to","chaunge","mine","first","undecoded","messages","read","popeye","sits","thunder","unthought","shoebox","apartment","livid","curtain’s","hue","tangram","emerges","country","meanwhile","there","you","are","they","aw","who","sent","them","make","everything","ok","take","your","mittens","what","do","want","all","healthy","contact","or","detect","stop-input","start-output","unrecognized"];

// const json = require('./test-net-json.txt')

async function seed() {
  await db.sync()
  console.log('db synced!')

  await Net.destroy({where: {}})

  await Net.create({
    name: 'smallAuthors',
    characterTable,
    indexTable,
    characters,
    json
  })

  // const testFunc = net.toFunction()
  // const fullText = `module.exports = ${testFunc}`
  // // console.log(testFunc(['a']))
  // fs.writeFile('test-net-function.txt', fullText, function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });
  // const testNet = new brain.recurrent.LSTM()
  // testNet.fromJSON(testJSON)
  // console.log(testNet.run(['a']))

  // const nets = await Promise.all([
  //   Net.destroy({where: {category: 'authors'}}),
  //   Net.create({category: 'authors', data: net.toFunction().toString()}),
  // ])

  // console.log(`seeded ${nets.length - 1} nets`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

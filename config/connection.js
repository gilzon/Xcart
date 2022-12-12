// const mongoClient=require('mongodb').MongoClient
// const state={
//     db:null
// }
// const mongoose = require('mongoose')
// let db

// module.exports.connect=function(done){
//     const url='mongodb://Gilzon:Coding@1234@atlascluster.sw1jlza.mongodb.net/xcart?retryWrites=true&w=majority'
//     const dbname='shopping'

//     mongoClient.connect(url,(err,data)=>{
//         if(err){
//             console.log(err)
//             return done(err)
//         }
//         console.log('db connected')
//         state.db=data.db(dbname)

//          done()
//     })
//     mongoose.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       db = mongoose.connection
// db.on('error', () => console.log('DB not connected'))
// db.once('open', () => console.log('Db connected'))
// }


// module.exports.get=function(){
//     return db
// }

const mongoClient=require('mongodb').MongoClient
const state={
    db:null
}

module.exports.connect=function(done){
    const url='mongodb://localhost:27017'
    const dbname='shopping'

    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)

         done()
    })
}


module.exports.get=function(){
    return state.db
}
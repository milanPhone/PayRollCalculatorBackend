const mongoose = require('mongoose');
const password = encodeURIComponent('Milansingh@1')
let db = null;

const myConnect = (cb)=>{
    
    mongoose.connect('mongodb+srv://milan:'+password+'@cluster0.hgtna.mongodb.net/payroller?retryWrites=true&w=majority')
    .then(res=>{
        console.log('connections-----')
        db = res.connections[0].db;
        // console.log('db = ',db)
        cb();
        console.log('conection done')
    })
    .catch(err=>{
        console.log('error while connection: ',err);
    })
}
const getDb = ()=>{
    if(db)
        return db;
    throw new "no db found!!!";
}

module.exports =  {
    getDb,
    myConnect
}

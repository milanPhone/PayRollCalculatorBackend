const Sales = require('../models/Sales/Sales')
const Agent = require('../models/Agents/Agent');
const errors = require('../util/errors');
const messages = require('../util/messages');
const errorHandlingFunction = require('../util/errorHandlingFunction');
const salesController = {

    async searchSales(req,res,next){
        let sales = await Sales.find({}).lean()
        const searchedSales = []
        sales.forEach((sale,index)=>{
            let searchCount = 0;
            for(let prop in sale){
                req.body.searchArray.forEach(word=>{
                    if(sale[prop].toString().includes(word))
                        searchCount++;

                })
            }
            sale.searchCount = searchCount
            if(searchCount>0){
                searchedSales.push(sale);
            }
            
        })
        searchedSales.sort((a,b)=>{
            return b.searchCount - a.searchCount
        })
        const total = searchedSales.length;
        const currentPage = req.query.page ||  1;
        const perPage = 5
        const salesToSend = searchedSales.slice(((currentPage - 1)*5),perPage)
        res.status(201).json({
            searchedSales: salesToSend,
            total
        })
    },
    async editSale(req,res,next){
        try{
            let editor = await Agent.findById(req.user_id);
            let reqAgent = await Agent.findOne({email: req.body.Agent_Email})
            if(editor.role!='admin'){
                if(adder._id.toString()!=reqAgent._id.toString()){
                    let newError = new Error();
                    newError.message = errors.authenticationError
                    throw newError;
                }
            }
            if(!reqAgent){
                let newError = new Error();
                newError.message = errors.AgentNotFound;
                throw newError;
            }
            let sale = await Sales.findById(req.body._id);
            if(!sale){
                let newError = new Error();
                newError.message = errors.saleNotFound;
                throw newError;
            }
            for(let prop in req.body){
                sale[prop] = req.body[prop]
            }
            const savedSale = await sale.save();
            if(!savedSale){
                let newError = new Error();
                newError.message = errors.savingError;
                throw newError;
            }
            res.status(201).json({
                message: messages.editedSuccessfully
            })
        }
        catch(err){
            console.log('err---',err)
            errorHandlingFunction(err,res);
        }
    },
   async AddSale(req,res,next){
        try{
            let adder = await Agent.findById(req.user_id);
            let reqAgent = await Agent.findOne({email: req.body.Agent_Email})
            if(adder.role!='admin'){
                if(adder._id.toString()!=reqAgent._id.toString()){
                    let newError = new Error();
                    newError.message = errors.authenticationError
                    throw newError;
                }
            }
            if(!reqAgent){
                let error = new Error();
                error.message = errors.AgentNotFound
                throw error;
            }
            
            let newSales = new Sales({
                ...req.body,
                Agent_id: reqAgent._id
            
            })
            const savedSale = await newSales.save()
            console.log('savedSale----',savedSale);
            res.status(201).json({
                ...savedSale._doc,
                message: messages.saleAdded
            })
            
        }
        catch(err){
            console.log('err---',err)
            errorHandlingFunction(err,res);
        }
   },
   async getSaleById(req,res,next){
        const _id = req.params._id;
        try{
            const sale = await Sales.findById(_id,{_id:0,Agent_id:0,__v:0});
            if(!sale){
                let newError = new Error();
                newError.mesage = errors.saleNotFound;
                throw newError;
            }
            res.status(200).json({
                sale,
                message: 'sale retrieved successfully...!!'
            })
            
        }
        catch(err){
            console.log('error----',err.message)
            errorHandlingFunction(err,res);
        }
   },
   async getSales(req,res,next){
        try{
            const currentPage = req.query.page ||  1;
            const perPage = 5
            let total = await Sales.find().countDocuments()
            if(!total){
                let error = new Error();
                error.message = errors.countingError;
                throw error;
            }
            const items = await Sales.find({},{ Agent_id: 0}).skip((currentPage - 1)*perPage).limit(perPage)
            if(!items){
                let error = new Error();
                error.message = errors.findingItemsError;
                throw error;
            }
            res.status(200).json({
                message: messages.itemsRetrievedSuccess,
                items,
                total
            })
        }
        catch(err){
            console.log('err---',err)
            errorHandlingFunction(err,res);
        }
   },
   async deleteSales(req,res,next){
        try{

        }
        catch(err){
            console.log('err----',err);
            errorHandlingFunction(err,res)
        }
   }
}

module.exports = salesController
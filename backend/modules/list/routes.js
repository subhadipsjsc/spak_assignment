const router = require('express').Router();

const { List , getListByUser , addList , markCompleted , delItem , updatePosition } = require('./model')
const { validateList , validateListPosition } = require('./validation')


router.get('/', async(req,res) =>{
    try{
        const {userId} = res.locals.user
        const lists = await getListByUser(userId)
        res.status(200).send({"success" : 1 , "lists" : lists}); 
    }
    catch(err){
        res.status(400).send({"success" : 0,"error" : err.message });  
    }  
   
})

router.post('/add', async(req,res) =>{
    try{
        const {userId} = res.locals.user
        validationResult = validateList(req.body)        
        if (validationResult.error ){
            res.status(400).send({"success" : 0,"error" : "validation error" ,"data" : req.body}); 
        }
        else{
            const newListData = { userId : userId, ...validationResult.value}
            // console.log(newListData)
            const newList = new List (newListData);
            let result = await addList(newList);
            result= JSON.parse(JSON.stringify(result));
            delete result.__v
            res.status(200).send({"success" : 1,"list" : result}); 
        }
    }
    catch(err){
        res.status(400).send({"success" : 0,"error" : err.message });  
    }  
   
})

router.patch('/mark-completed/:taskId', async(req,res) =>{
    try{
        const taskId = req.params.taskId
        const {userId} = res.locals.user
        const result = await markCompleted(taskId , userId);
        res.status(200).send({"success" : 1,"completed" : result}); 
    
    }
    catch(err){
        res.status(400).send({"success" : 0,"error" : err.message });  
    }  
   
})

router.delete('/delete-task/:taskId', async(req,res) =>{
    try{
        const taskId = req.params.taskId
        const {userId} = res.locals.user
        const result = await delItem(taskId , userId);
        res.status(200).send({"success" : 1,"deleted" : result}); 
    
    }
    catch(err){
        res.status(400).send({"success" : 0,"error" : err.message });  
    }  
   
})


router.patch('/update-position', async(req,res) =>{
    try{        
        const {userId} = res.locals.user
        validationResult = validateListPosition(req.body)        
        if (validationResult.error ){
            // console.log(validationResult.error)
            res.status(400).send({"success" : 0,"error" : "validation error" ,"data" : req.body}); 
        }
        else{
            const result = await updatePosition(validationResult.value , userId);
            res.status(200).send({"success" : 1,"completed" : result}); 
        }
    
    }
    catch(err){
        res.status(400).send({"success" : 0,"error" : err.message });  
    }  
   
})



module.exports = router;
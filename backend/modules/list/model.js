const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*==================================================== 
List Scheme               
=====================================================*/
const ListSchema = new mongoose.Schema({ 
    userId : {type: Schema.Types.ObjectId, ref: 'User' },
    task : { type: String  } ,    
    date : { type : Date , default : Date.now},
    position : {type: Number},
    completed : {type: Boolean , default : false } ,
});
const List = mongoose.model('Lists',ListSchema);

/* =================================================== 
    get all tasks by user         
=================================================== */

function getListByUser(id){
    return List.find({userId : id},'-__v',).exec()
}

/* =================================================== 
    Save User in database         
=================================================== */
function addList(newList){
    return newList.save()    
}

/* =================================================== 
    mark completed         
=================================================== */
async function markCompleted(listId, userId){
    const res = await List.updateOne({ _id: listId , userId : userId }, { completed: true });
    if (res.nModified) return true 
    return false    
}

/* =================================================== 
    delete         
=================================================== */
async function delItem(listId , userId) {
    const res = await List.deleteOne({ _id: listId , userId : userId , completed: true  });
    // console.log(res)
    if (res.deletedCount) return true 
    return false   
}

/* =================================================== 
    update position         
=================================================== */
async function updatePosition(id_position_array ,  userId) {
    let modified = 0
    let err = 0
    for (const v of id_position_array) {
        const res = await List.updateOne({ _id: v.taskId , userId : userId , completed: false}, { position: v.position });
        if (res.nModified) {
            modified++;
        }else{
            err++ 
        }        
    }
    return {modified ,err}
    
    
    
}



module.exports={List, getListByUser ,addList , markCompleted , delItem , updatePosition }
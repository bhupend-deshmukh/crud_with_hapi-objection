const Userdata = require("../models/crud.model")

class Users{

    async insertData(data){
        try {
            const {Name,Surname,email,password,city} = data.payload
            if(Name === undefined || Surname === undefined || email === undefined || password === undefined || city === undefined) return {status:"error",message:"body data is empty..."}
            const presentData = await Userdata.query().where({email:data.payload.email})
            if(presentData.length > 0){
                return {status:"error",message:"users allready exist...",hint:"please try another email accaunt...."}
            }else{
                const userr = await Userdata.query().insert({Name,Surname,email,password,city})
                return {status:"success",message:"users details inserted successfully...",users:{
                    Name,Surname,email,password,city,id:userr.id            
                }}
            }
        } catch (err) {
            console.log(err);
            return {status:"error",message:err.message}
        }
    } 

    async getDataBy_id(data){

        try {
            let id = data.params.id
            const presentData = await Userdata.query().findById(id)
            if( presentData === undefined ){
                return {status:"error",message:"id not found..."} 
            }else{
                return {status:"success",userData:presentData}
            }
        } catch (err) {
            return {status:'error',message:err.message}
        }
    }

    async detelte_user_By_Id(data){
        try {
            let id = data.params.id
            const deleteData = await Userdata.query().deleteById(id)
            if (deleteData > 0){
                return {status:"success",message:"user data deleted successfully...",}
            }else{
                return {status:"error",message:"id not found "}
            }
        } catch (error) {
            return {status:"success",message:error.message}
        }
    }

    async updateUserData(data){
        try {
            
            let id = data.params.id 
            const {Name,Surname,city} = data.payload
            const updateData = await Userdata.query().findById(id).patch({Name,Surname,city})
            if(updateData > 0){
                return {status:"success",message:"user details updated successfully..."}
            }else{
                return {status:"error",message:"id not found..."}
            }
        } catch (error) {
            return {status:'error',message:error.message}
        }
    }

    async getAllUsersData(data){
        try {

            const AllUsers = await Userdata.query()
            if(AllUsers.length > 0){
                return {status:"success",message:"all users fetched successfully......",count:AllUsers.length,Users:AllUsers}
            }else{
                return {status:"error",message:"any users dosn't exists..."}
            }

        } catch (error) {
            return {status:"error",message:error.message}
        }
    }

}

module.exports = Users;
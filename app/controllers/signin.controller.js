//Bcrypt to hash user password
const bcrypt = require('bcrypt');
const message = require('../../utils/config/messages.json').message;


exports.login = (req, res)=> {
    // var username = req.body.username || req.body.email;
    // var password = req.body.password;

    //just to simulate data remove after and ucomment the top
    var username = "toure5013";
    var password = "012346789";
    var hashedPassword = bcrypt.hashSync(password,10); //COME FROM DATABASE, i crypt the password for simulation
    console.log(hashedPassword);
    //------------------Do async verification after--------------------
                //get user from database
    //---------------SQL GET REQUEST-------------//
    //compare his password to the password get from database
    bcrypt.compare(password, hashedPassword/*this is the password get from database */, (err , res)=>{
        console.log("je crypte");
        if(res){
            console.log("Mot de passe cripté");
           

        }else{
            console.log("password don't match");
            return {
                error : true,
                status : 500,
                message : "ERROR : "+  message.error.invalid_password + err
            }
        }
    });

    const  dataReturn  = {
        "error": false,
        "status" : 200,
        "username" : username,
        "password" : hashedPassword,
        "message" : "SUCCESS : " +  message.success.login
    };

    return  dataReturn;
}
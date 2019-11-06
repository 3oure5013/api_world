//./utils/middlewares/uploadFileMiddleware
const multer = require('multer');
//set Storage
var storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads');
    },
    
    filename: (req, file)=>{
        cb(null, file.fieldname + '-' +Date.now());
    }
})
var upload = multer({storage : storage});
/*-------------------------------------------------------
                        Modules
-------------------------------------------------------*/
const userRoute = require('./user.route');
const loginRoute = require('./login.route')




/*-------------------------------------------------------
                        Routes
-------------------------------------------------------*/
exports.configRoutes = (baseUrl, app) =>{
    userRoute.users(baseUrl, app);
    loginRoute.login(baseUrl, app);
}

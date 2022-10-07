const Hapi = require('@hapi/hapi');
const Users = require('./services/crud.service');
const router = new Users;

const init = async () => {

    const server = Hapi.server({
        port: 3132,
        host: 'localhost'
    });

    // insert users details.....

    server.route({
        method: 'POST',
        path: '/create',
        handler: router.insertData
    });    

    // read users data by id 
    server.route({
        method:"GET",
        path:"/getUserData/{id}",
        handler: router.getDataBy_id
    })

    // delete data by id

    server.route({
        method:"DELETE",
        path:"/deleteUser/{id}",
        handler: router.detelte_user_By_Id
    })

    // Update user
    server.route({
        method:"PUT",
        path:"/updateUser/{id}",
        handler: router.updateUserData
    })

    // Get All Users Data
    
    server.route({
        method:"GET",
        path:"/AllUsers",
        handler: router.getAllUsersData
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
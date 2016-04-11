/**
 * Created by yangsaw on 7/31/2014.
 */
module.exports = {
    // mongod --dbpath XXX --logpath XXX ----nohttpinterface --auth
    // needs to start the server with auth, or anyone can connect to the db
    'url': 'mongodb://dbUser2:123@localhost:5555/api'
};
const MongoClient = require('mongodb').MongoClient

class ChattyDB {
    static async connectToDB() {
        return await MongoClient.connect(this.url, {useNewUrlParser: true}, this.options)
            .then(client => {this.db = client.db(process.env.DB_NAME)})
            .catch(err => console.log(err));
    }
}

ChattyDB.db = null
ChattyDB.url = process.env.DB_URI
ChattyDB.options = {
    bufferMaxEntries: 0,
    reconnectTries: 5000,
}

module.exports = ChattyDB;
module.exports = {
  env: {
    MONGO_URI: "mongodb://mongo:mongo@cluster0-shard-00-00.klhhn.mongodb.net:27017,cluster0-shard-00-01.klhhn.mongodb.net:27017,cluster0-shard-00-02.klhhn.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-gc1w2j-shard-0&authSource=admin&retryWrites=true&w=majority"
  },
  images: {
    domains: ["res.cloudinary.com"]
  }
}

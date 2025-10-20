const {SESClient} = require('@aws-sdk/client-ses')

const region = "ap-south-1"; 

const sesClient = new SESClient({ region, credentials: {
    accessKeyId : process.env.ACCESSKEY,
    secretAccessKey : process.env.SECRETKEY
} });

module.exports = { sesClient };

const amqp = require('amqplib/callback_api')

// establish connection
amqp.connect('amqp://127.0.0.1', (err, connection) => {
    if (err){
        throw err;
    }
    // creating a channel 
    connection.createChannel((err, channel) => {
        if (err){
            throw err;
        }
        let queueName = "test_queue_1"
        let mssg = "Hello this is user 1 reporting"
        // set properties to queue 
        channel.assertQueue(queueName, {
            durable: false
        })
        // send data to queue 
        channel.sendToQueue(queueName, Buffer.from(mssg))
        setTimeout(() => {
            connection.close()
        }, 1000)
    })
})

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()

app.use(cors())
app.use(bodyParser.json())


app.post('/api/events', async(req, res) => {
    const { eventType, payload } = req.body
    try {
        await axios.post('http://localhost:4000/api/events', {eventType, payload})
        await axios.post('http://localhost:4001/api/events', {eventType, payload})
        await axios.post('http://localhost:4002/api/events', {eventType, payload})
        await axios.post('http://localhost:4003/api/events', {eventType, payload})

        res.status(200).json({"message`":"Ok"})
    }
    catch(err) {
        console.error(`Error on Event bus`, err)
    }
})


app.listen(5005, () => console.log('Event bus service up on 5005'))

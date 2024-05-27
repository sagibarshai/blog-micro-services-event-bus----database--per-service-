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
        await axios.post('http://posts-service:4000/api/posts/events', {eventType, payload})
        await axios.post('http://comments-service:4001/api/comments/events', {eventType, payload})
        await axios.post('http://posts-with-comments-service:4002/api/postsWithComments/events', {eventType, payload})
        await axios.post('http://comment-moderation-service:4003/api/commentModeration/events', {eventType, payload})

        res.status(200).json({"message`":"Ok"})
    }
    catch(err) {
        console.error(`Error on Event bus`, err)
    }
})


app.listen(5005, () => console.log('Event bus service up on 5005'))



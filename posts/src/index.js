import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import axios from 'axios'
import {randomBytes} from 'crypto'

const app = express()

app.use(cors())
app.use(bodyParser.json())


const posts = []

app.get('/api/posts', (_,res) => res.status(200).json({ posts }))


app.get('/api/posts/:id', (req,res) => {
    const post = posts.find(p => p.id === req.params.id)
    return res.status(200).json({ post })
})


app.post('/api/posts', async(req,res) => {
    const {title} = req.body
    const id = randomBytes(16).toString('hex')
    const post = {id, title}
    posts.push(post)

    await axios.post('http://localhost:5005/api/events', { eventType: "PostCreated", payload:{
        id, title
    }})

    return res.status(201).json({ post })
})


app.post('/api/events', (_,res) => {
    res.status(200).json({ "message:": "Ok" })
})


app.listen(4000 , () => console.log('Posts service up on 4000'))
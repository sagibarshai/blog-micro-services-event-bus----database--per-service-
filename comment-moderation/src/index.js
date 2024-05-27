import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const postsWithComments = []

app.post('/api/commentModeration/events', async(req, res) => {
    const { eventType, payload } = req.body

    if(eventType ==='PostCreated') {
        const { id,title} = payload

        const idIsInUse = postsWithComments.find(p => p.id === id)

        if(!idIsInUse) postsWithComments.push({id, title, comments:[]})
        else return res.status(400).json({message: "Post is already exist"})           
    
        
    }
    else if(eventType === 'CommentCreated') {
        const {id, commentId, content} = payload

        const postIndex = postsWithComments.findIndex(c => c.id === id)

        if(postIndex === -1) return res.status(400).json({message:"Post not exist"})

        let status = 'Approved'
        
        if(content.includes('orange')) status = 'Suspended'

        postsWithComments[postIndex].comments.push({id: commentId, status, content})

        try {
            await axios.post('http://event-bus-service:5005/api/events', {
                eventType: 'CommentModerated',
                payload:{status, commentId, content, id}
            })
        } catch(err) {
            console.error(`Error on Comment Moderation Event route `, err)
        }
    }
    return res.status(200).json({"message": "Ok"})
})

app.listen(4003,() => console.log('Comment moderation up on 4003!'))




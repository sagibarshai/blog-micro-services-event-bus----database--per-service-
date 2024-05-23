import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {randomBytes} from 'crypto'
import axios from 'axios'

const app = express()

app.use(bodyParser({}))
app.use(cors())

const commentsWithPostId = []

app.get('/api/comments', (req,res) => res.status(200).json({ commentsWithPostId }))


app.get('/api/comments/:postId', (req,res) => {
    const comment = commentsWithPostId.find(c => c.postId === req.params.postId)
    return res.status(200).json({ comment })
})


app.post('/api/comments', async(req,res) => {
    const {content, postId} = req.body
    const id = randomBytes(16).toString('hex')


    const postIndex = commentsWithPostId.findIndex(c => c.postId === postId)

    const newComment = {id, content, status:"Pending"}

    if(postIndex >= 0) {
        const updatedCommentWithPostId =   {...commentsWithPostId[postIndex], comments:[...commentsWithPostId[postIndex].comments, newComment]}
        commentsWithPostId[postIndex] = updatedCommentWithPostId
        console.log('postId from comments 1 ', postId)

        await axios.post('http://localhost:5005/api/events', {eventType: "CommentCreated", payload:{
            id: postId, commentId: id, content, status: newComment.status
        }})
        
        return res.status(201).json({ postIdWithComments : updatedCommentWithPostId })

    }
    else {
        const newCommentWithPostId = {postId, comments:[newComment]}
        commentsWithPostId.push(newCommentWithPostId)
        console.log('postId from comments 2 ', postId)

        await axios.post('http://localhost:5005/api/events', {eventType: "CommentCreated", payload:{
            id: postId, commentId: id, content, status: newComment.status
        }})

        return res.status(201).json({ postIdWithComments : newCommentWithPostId })
    }
    })


app.post('/api/events', (req,res) => {
    res.status(200).json({ "message:": "Ok" })
})

app.listen(4001 , () => console.log('Comments service up on 4001'))
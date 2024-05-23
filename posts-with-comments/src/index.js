import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const postsWithComments = []

app.get('/api/postsWithComments', (_,res) => res.status(200).json({ postsWithComments }))


app.get('/api/postsWithComments/:postId', (req,res) => {
    const postWithComments = postsWithComments.find(p => p.id === req.params.postId)
    return res.status(200).json({ postWithComments })
})


app.post('/api/events', (req,res) => {
    const {eventType, payload} = req.body

    if(eventType === 'PostCreated') {
        const { id,title} = payload
        const idIsInUse = postsWithComments.find(p => p.id === id)

        if(!idIsInUse) postsWithComments.push({id, title, comments:[]})
        else return res.status(400).json({message: "Post is already exist"})           
    }
    else if(eventType === 'CommentCreated') {
        const {id, commentId, content, status} = payload
        const postWithCommentIndex = postsWithComments.findIndex(p => p.id === id)

        if(postWithCommentIndex >= 0) postsWithComments[postWithCommentIndex].comments.push({id:commentId, content, status})
        else return res.status(400).json({message: "Post not exist"})   
    }
    else if(eventType === 'CommentModerated') {
        const {id, commentId, content, status} = payload
        const postWithCommentIndex = postsWithComments.findIndex(p => p.id === id)

        const commentIndex = postsWithComments[postWithCommentIndex].comments.findIndex(c => c.id === commentId )
        
        if(postWithCommentIndex >= 0) postsWithComments[postWithCommentIndex].comments[commentIndex] = ({id:commentId, content, status})
        else return res.status(400).json({message: "Post not exist"})      
    }
    
    return res.status(200).json({ message: "Ok" })
})


app.listen(4002 , () => console.log('postsWithComments service up on 4002'))
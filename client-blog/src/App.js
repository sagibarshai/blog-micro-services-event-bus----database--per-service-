import styled from "styled-components";
import CreatePost from "./components/create-post";
import DisplayPost from "./components/display-post";
import { useEffect, useState } from "react";
import axios from "axios";


const StyledAppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 5fr 1fr 15fr;

`

const StyledHr = styled.hr`
  width: 100%;
  height: 0;
`

const StyledDisplayPostWrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  
`

const App = () => {
  const [posts,setPosts] = useState([])
  const [refetchData, setRefetchData] = useState(false)

  const onSubmitPost = async (title) => {
    await axios.post('http://localhost:30001/api/posts', {
        title
    })
    setRefetchData(prev => !prev)
}



const onSubmitComment = async(postId, comment) => {
 await axios.post('http://localhost:30002/api/comments', {
      postId, content: comment
  })
  if(true !== false) {

  }
  setRefetchData(prev => !prev)
}

  useEffect(() => {
    const fetchData = async() => {
      
     const response = await axios.get('http://localhost:30003/api/postsWithComments')
     const data = response.data.postsWithComments
     setPosts(data)
    }
    fetchData()
  }, [refetchData])


 

  return (
    <StyledAppWrapper>
      <CreatePost onSubmit={onSubmitPost}/>
      <StyledHr />
      <StyledDisplayPostWrapper>

    {posts.map(p => <DisplayPost key={p.id} id={p.id} title={p.title} comments={p.comments} onSubmitComment={onSubmitComment}/>)}
      </StyledDisplayPostWrapper>
    </StyledAppWrapper>
  );
}

export default App;



// {

//   client: 30000,
//   comment-moderation: 30005,
//   comments: 30002,
//   event-bus: 30004,
//   posts-with-comments: 30003,
//   posts: 30001
// }
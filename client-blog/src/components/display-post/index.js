import styled from "styled-components"
import DisplayComment from "../display-comment"
import CreateComment from "../create-comment"

const StyledPostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 300px;
    width: 500px;
    background-color: brown;
    align-items: center;
    border-radius: 12px;
    padding: 24px;
`

const StyledCommentsWrapper = styled.div`
    height: 150px;
    width: 100%;
    text-align: center;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;


`

const DisplayPost = ({id, title,comments, onSubmitComment}) => {
    return <StyledPostWrapper>
        <h1>{title}</h1>
        <StyledCommentsWrapper>

        {comments.map(c => <DisplayComment key={c.id} comment={c.content} status={c.status}  />)}
        </StyledCommentsWrapper>
        <CreateComment postId={id} onSubmit={onSubmitComment} />
    </StyledPostWrapper>
}
export default DisplayPost
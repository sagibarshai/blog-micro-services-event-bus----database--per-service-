import axios from "axios"
import { useState } from "react"
import styled from "styled-components"

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    width: 60%;
`

const StyledComment = styled.input`
    border: 1px solid black;
    width:100%;
    color: black;
    height: 16px;
    text-indent: 12px;
`



const StyledTitle = styled.h1`
    font-size: 16px;
`

const StyledSubmitButton = styled.button`
    width:100%;
    height: 32px;
    background-color: aqua;
    color: black;
    cursor: pointer;

`
const CreateComment = ({postId, onSubmit}) => {
    const [comment, setComment] = useState("")
    
    const onCommentChange = (event) => setComment(event.target.value)

    return <StyledWrapper>
        <StyledTitle>Create Comment</StyledTitle>
    <StyledComment value={comment} onChange={(e) => onCommentChange(e)}/>
    <StyledSubmitButton onClick={() => onSubmit(postId, comment)}>Submit</StyledSubmitButton>
    </StyledWrapper>

}
export default CreateComment;
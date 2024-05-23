
import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'


const StyledWrapper = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledPostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    padding: 24px;
    height: 200px;
    background-color: purple;
    text-align: center;
`

const StyledTitleInput = styled.input`
    height: 32px;
    border: 1px solid black;
    text-indent: 12px;
    color: black;
`

const StyledSubmitButton = styled.button`
    width: 100%;
    height: 32px;
    background-color: aqua;
    color: black;
    cursor: pointer;

`

const CreatePost = ({onSubmit}) => {
    const [title,setTitle] = useState("")

    const onTitleChange = (event) => setTitle(event.target.value)
    
    return  <StyledWrapper>
            <h1>Create Post</h1>
            <StyledPostWrapper>
                <h1>{title || "Title"}</h1>
                <StyledTitleInput value={title} onChange={(e) =>onTitleChange(e)} />
                <StyledSubmitButton onClick={() => onSubmit(title)}>Submit</StyledSubmitButton>
            </StyledPostWrapper>
    </StyledWrapper>
}

export default CreatePost;
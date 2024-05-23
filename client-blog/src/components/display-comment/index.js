import styled from 'styled-components'

const StyledCommentWrapper = styled.li`
    font-size: 10px;
    color: black;
`

const DisplayComment = ({comment, status}) => {
    let text = ''
    if(status === 'Pending') text = 'Comment Pending for moderation'
   else if(status === 'Suspended') text = 'Comment Suspended'
   else text = comment
    return <StyledCommentWrapper>{text}</StyledCommentWrapper>
}
export default DisplayComment
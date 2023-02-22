import React from 'react'

const Comment = ({comments}) => {
  return (
    <div>
      <p>{comments.comment}</p>
    </div>
  )
}

export default Comment
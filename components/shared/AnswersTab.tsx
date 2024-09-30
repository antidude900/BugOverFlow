import { getUserAnswers } from '@/lib/actions/user.action'

import React from 'react'
import AnswerCard from '../cards/AnswerCard'

interface Props{
  userId:string
  clerkId?:string
}

const AnswersTab = async ({userId,clerkId}:Props) => {

  const result = await getUserAnswers({userId})
  return (
    <>
      {
        result.answers.map((answer)=>(
          <AnswerCard
            clerkId={clerkId}
            key={answer._id}
            _id={answer._id}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes}
            createdAt={answer.createdAt}/>
        ))
      }
    </> 
  )
}

export default AnswersTab
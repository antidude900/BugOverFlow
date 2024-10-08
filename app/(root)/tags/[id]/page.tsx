import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/shared/NoResult'
import LocalSearch from '@/components/shared/search/LocalSearch'


import { getQuestionByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'


const page = async ({params,searchParams }:URLProps) => {
  
  const result = await getQuestionByTagId({
    tagId:params.id,
    searchQuery:searchParams.q
  })

  return (
    		<>
			<h1 className="h1-bold text-dark100_light900">Tag Questions</h1>

			<div className="mt-11 w-full">
				<LocalSearch
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Search for tag questions"
					otherClasses="flex-1"
				/>
			</div>
	

			<div className="mt-10 flex w-full flex-col gap-6">
				{result.questions.length > 0 ? (
					result.questions.map((question:any) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : (
					<NoResult
						title="There’s no question related to the tag to show to show"
						description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
						link="/ask-question"
						linkTitle="Ask a Question"
					/>
				)}
			</div>
		</>
  )
}

export default page
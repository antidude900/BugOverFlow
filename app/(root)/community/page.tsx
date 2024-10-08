import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

const page = async () => {
	const users = await getAllUsers({});
	return (
  <>
			<h1 className="h1-bold text-dark100_light900">Users</h1>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearch
					route="/community"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Search for users"
					otherClasses="flex-1"
				/>
				<Filter
					filters={UserFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>

			<section className="mt-12 flex flex-wrap gap-4">
				{users.length > 0 ? (
					users.map((user) => <UserCard key={user._id} user={user}></UserCard>)
				) : (
					<div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
						<p>No users yet</p>
						<Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
							Join to be the first
						</Link>
					</div>
				)}
			</section>
		</>
	);
};

export default page;

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Theme from "../Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";
import Icon from "../Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GlobalSearchMini from "../search/GlobalSearchMini";

const Navbar = () => {
	return (
		<nav className="background-light900_dark200 fixed z-50 flex h-[75px] w-full items-center justify-between gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
			<div className="flex items-center gap-4">
				<MobileNav />
				<Link href="/" className="flex items-center">
					<Icon />
					<p className="h2-bold text-dark100_light900 mt-[15px] font-spaceGrotesk max-sm:hidden">
						Bug<span className="text-primary-200">OverFlow</span>
					</p>
				</Link>
			</div>

			{/* Centered GlobalSearch */}
			<div className="flex grow justify-center">
				<GlobalSearch />
			</div>

			<div className="mt-[14px] flex shrink-0 items-center gap-4">
				<GlobalSearchMini />

				<SignedOut>
					<div className="flex flex-row items-center justify-center gap-2">
						<Link href="/sign-in">
							<Button className="small-medium rounded-lg">
								<Image
									src="/assets/icons/account.svg"
									alt="login"
									width={25}
									height={25}
									className="invert-colors xl:hidden"
								/>
								<span className="primary-text-gradient max-xl:hidden">
									Log In
								</span>
							</Button>
						</Link>

						<Link href="/sign-up">
							<Button className="small-medium text-dark400_light900 rounded-lg">
								<Image
									src="/assets/icons/sign-up.svg"
									alt="sign up"
									width={20}
									height={20}
									className="invert-colors xl:hidden"
								/>
								<span className="max-xl:hidden">Sign up</span>
							</Button>
						</Link>
					</div>
				</SignedOut>

				<SignedIn>
					<Link href={"/badge"} className="mx-[16px]">
						<Image
							src={"/assets/icons/badge.svg"}
							alt={"Badge"}
							width={30}
							height={30}
							className="invert-colors"
						/>
					</Link>
					<Link href={"/profile"} className="mx-[16px]">
						<Image
							src={"/assets/icons/user.svg"}
							alt={"Profile"}
							width={20}
							height={20}
							className="invert-colors"
						/>
					</Link>
				</SignedIn>

				<Theme />
			</div>
		</nav>
	);
};

export default Navbar;

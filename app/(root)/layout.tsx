import Navbar from "@/components/shared/navbar/Navbar";
import LeftSideBar from "@/components/shared/navbar/LeftSideBar";
import React from "react";
import RightSideBar from "@/components/shared/navbar/RightSideBar";

const Layout = ({ children }: { children:	 React.ReactNode }) => {
	return (
		<main className="background-light850_dark100 relative">
			<Navbar />
			<div className="flex">
				<LeftSideBar />
				<section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
					<div className="mx-auto w-full max-w-5xl">{children}</div>
				</section>
				<RightSideBar />
			</div>
			{/* Toaster */}
		</main>
	);
};

export default Layout;

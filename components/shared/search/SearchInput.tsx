import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const SearchInput = () => {
	const [input, setInput] = useState("");

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);
	if (!isClient) return null;

	return (
		<Input
			type="text"
			placeholder="Search All"
			value={input}
			className="paragraph-regular placeholder text-dark400_light700 grow border-none bg-transparent shadow-none outline-none"
			onChange={(e) => setInput(e.target.value)}
		/>
	);
};

export default SearchInput;

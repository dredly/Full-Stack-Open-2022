import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({parts}: {parts: CoursePart[]}) => {
	return (
		<>
			{parts.map(p => (
				<Part part={p} key={p.name}/>
			))}
		</>
	);
};

export default Content;
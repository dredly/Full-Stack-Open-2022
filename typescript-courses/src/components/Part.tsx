import { CoursePart } from "../types";
import assertNever from "../utils/assertNever";

const Part = ({part}: {part: CoursePart}) => {
	const partContent = () => {
		switch (part.type) {
			case "groupProject":
				return (
					<div>
						Group exercises: {part.groupProjectCount}
					</div>
				);
			case "normal":
				return (
					<p>
						{part.description}
					</p>
				);
			case "submission":
				return (
					<div>
						<p>{part.description}</p>
						<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">{part.exerciseSubmissionLink}</a>
					</div>
				);
			case "special":
				return (
					<div>
						<p>{part.description}</p>
						<h4>Requirements</h4>
						<ul>
							{part.requirements.map(r => (
								<li key={r}>{r}</li>
							))}
						</ul>
					</div>
				);
			default:
				return assertNever(part);
		}
	};
	
	return (
		<div>
			<h3>{part.name} {part.exerciseCount}</h3>
			{partContent()}
		</div>
	);
};

export default Part;
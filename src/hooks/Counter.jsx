import React, { Fragment, useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

function Counter(props) {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");

	useDocumentTitle(`${name} has clicked ${count} times!`);

	return (
		<Fragment>
			<div className='counter-container'>
				<input type='text' onChange={(e) => setName(e.target.value)} />
				<div>
					{name} has clicked {count} times!
				</div>
				<button onClick={() => setCount(count + 1)}>Increase</button>
			</div>
		</Fragment>
	);
}

export default Counter;

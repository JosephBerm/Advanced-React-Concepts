import React, { Fragment, useEffect, useState } from "react";

function Counter(props) {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");

	useEffect(() => {
		document.title = `${name} has clicked ${count} times!`;
		return () => {
			console.log("Clean up...");
		};
	}, [count]);

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

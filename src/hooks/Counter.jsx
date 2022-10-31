import React, { Fragment, useState } from "react";

function Counter(props) {
	const [count, setState] = useState(0);

	return (
		<Fragment>
			<div className='counter-container'>
				<div>Counter: {count}</div>
				<button onClick={() => setState(count + 1)}>Increase</button>
			</div>
		</Fragment>
	);
}

export default Counter;

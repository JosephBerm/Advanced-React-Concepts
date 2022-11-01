import "./App.css";
import Movie from "./hoc/Movie";
import { Fragment } from "react";
import Counter from "./hooks/Counter";
import Users from "./hooks/Users";

function App() {
	return (
		<Fragment>
			<div className='container'>
				{/* <Movie id={5} /> */}
				{/* <Counter /> */}
				<Users />
			</div>
		</Fragment>
	);
}

export default App;

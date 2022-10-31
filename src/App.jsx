import "./App.css";
import Movie from "./hoc/Movie";
import { Fragment } from "react";
import Counter from "./hooks/Counter";

function App() {
	return (
		<Fragment>
			<div className='container'>
				{/* <Movie id={5} /> */}
				<Counter />
			</div>
		</Fragment>
	);
}

export default App;

import "./App.css";
import Movie from "./hoc/Movie";
import React, { Component, Fragment } from "react";
import Counter from "./hooks/Counter";
import Users from "./hooks/Users";
import MoviePage from "./context/MoviePage";

class App extends Component {
	render() {
		return (
			<Fragment>
				<div className='container'>
					{/* <Movie id={5} /> */}
					{/* <Counter /> */}
					{/* <Users /> */}
					<MoviePage />
				</div>
			</Fragment>
		);
	}
}

export default App;

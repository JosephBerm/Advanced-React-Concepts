import "./App.css";
import Movie from "./hoc/Movie";
import React, { Component, Fragment } from "react";
import Counter from "./hooks/Counter";
import Users from "./hooks/Users";
import MoviePage from "./context/MoviePage";
import UserContext from "./context/userContext";

class App extends Component {
	state = {
		currentUser: { name: "Joseph" },
	};

	render() {
		return (
			<UserContext.Provider value={this.state.currentUser}>
				<div className='container'>
					{/* <Movie id={5} /> */}
					{/* <Counter /> */}
					{/* <Users /> */}
					<MoviePage />
				</div>
			</UserContext.Provider>
		);
	}
}

export default App;

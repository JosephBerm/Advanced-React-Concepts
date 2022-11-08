import "./App.css";
import Movie from "./hoc/Movie";
import React, { Component, Fragment } from "react";
import Counter from "./hooks/Counter";
import Users from "./hooks/Users";
import MoviePage from "./context/MoviePage";
import CartContext from "./context/cartContext";
import UserContext from "./context/userContext";
import Login from "./context/Login";

class App extends Component {
	state = {
		currentUser: null,
	};

	handleLoggedIn = (username) => {
		console.log(`Getting the user: ${username}`);
		const user = { name: "Joseph" };

		this.setState({ currentUser: user });
	};

	render() {
		return (
			<CartContext.Provider value={{ cart: [] }}>
				<UserContext.Provider
					value={{
						currentUser: this.state.currentUser,
						onLoggedIn: this.handleLoggedIn,
					}}>
					<div className='container'>
						{/* <Movie id={5} /> */}
						{/* <Counter /> */}
						{/* <Users /> */}
						<MoviePage />
						<Login />
					</div>
				</UserContext.Provider>
			</CartContext.Provider>
		);
	}
}

export default App;

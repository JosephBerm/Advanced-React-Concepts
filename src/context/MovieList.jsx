import React, { Component } from "react";
import UserContext from "./userContext";

class MovieList extends Component {
	render() {
		return (
			<UserContext.Consumer>
				{(userContext) => <div>Movie List With {userContext.name}</div>}
			</UserContext.Consumer>
		);
	}
}

export default MovieList;

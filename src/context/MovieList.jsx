import React, { Component } from "react";
import UserContext from "./userContext";
import MovieRow from "./MovieRow";

class MovieList extends Component {
	static contextType = UserContext;

	componentDidMount() {}

	render() {
		return (
			<UserContext.Consumer>
				{(userContext) => (
					<div>
						Movie List With {userContext.currentUser ? userContext.currentUser.name : ""}
						<MovieRow />
					</div>
				)}
			</UserContext.Consumer>
		);
	}
}

export default MovieList;

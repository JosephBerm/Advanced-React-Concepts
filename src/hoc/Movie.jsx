import React, { Component } from "react";
import withToolTip from "./withToolTip";

class Movie extends Component {
	render() {
		return (
			<div>
				Movie
				{this.props.showToolTip && <div className='toolTip'>Some tooltip</div>}
			</div>
		);
	}
}

export default withToolTip(Movie);

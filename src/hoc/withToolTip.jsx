import React from "react";

function withToolTip(Component) {
	return class WithToolTip extends React.Component {
		state = {
			showToolTip: false,
		};

		onMouseOver = () => this.setState({ showToolTip: true });
		onMouseOut = () => this.setState({ showToolTip: false });
		render() {
			return (
				<div
					onMouseOver={this.onMouseOver}
					onMouseOut={this.onMouseOut}
					className='withToolTip'>
					<Component {...this.props} showToolTip={this.state.showToolTip} />
				</div>
			);
		}
	};
}

export default withToolTip;

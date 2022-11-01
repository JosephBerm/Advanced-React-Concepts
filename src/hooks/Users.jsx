import React, { useState, useEffect } from "react";
import axios from "axios";

function Users(props) {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		async function getUsers() {
			const { data } = await axios(`https://jsonplaceholder.typicode.com/users`);
			setUsers(data);
		}
		getUsers();
	});

	return (
		<div>
			<ul>
				{users.map((user) => (
					<li key={user.key}>{user.name}</li>
				))}
			</ul>
		</div>
	);
}

export default Users;

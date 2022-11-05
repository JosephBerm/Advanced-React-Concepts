We'll be going over Higher Order Components, Hooks, and Context.

# SHORTCUTS

- **`rsf`** for functional components. The acronym stands for **React Stateless Function**.
- **`rcc`** for classes.

[1]: ../hoc/Movie.jsx
[2]: ../hoc/withToolTip.jsx
[3]: ../hooks/Counter.jsx
[4]: ../App.jsx
[5]: ../context/userContext.js
[6]: ../context/MovieRow.jsx
[7]: ../context/MovieList.jsx
[8]: ../context/MoviePage.jsx

# Setting Up the Development Environment

Go to the website [nodejs.org](https://nodejs.org) and downlaod the latest recommended version of node available.

Going forward, React no longer supportd global installation of the create-react-app package, so you need to uninstall it globally and then bring it using a tool called `npx`.

to uninstall it globally, type the following command in the terminal:

```
npm uninstall -g create-react-app
```

Using a tool called npx. NPX came with node version 5.2. With it, we can download and run the latest version of a package. For example, we can download the latest version of create-react-app with the name all in one command. Previously, we had to use npm to get the latest version of create-react-app and then you'd name it. However, with the `npx`, you no longer have to do these two things. It does both of those things in one line of code as seen below:

```
npx create-react-app react-advanced
```

I ran this code in the root of all my react applications and it created the project folder named **`react-advanced`**

# Higher Order Components

We use higher order components to reuse logic across components. For example, let's say we have three components, and when we have our mouse over these components, we should see a tooltip and when you move away from it, the tooltip should disappear.

In this component we need some kind of state, something like a Boolean flag called **`showToolTip`**.

Next we should handle **mouse events** such as `mouseOver` or `mouseOut`. In our event handlers we need to change the state. Thus, we must replace the value of our boolean field that is **`showToolTip`** flag. We have to repeat the same logic in all of these components.

Now, if we implement a tooltip individually for each and every single one of these tooltips, what would happen if they all share a bug that was discovered later in the project?

We'd have to go back to every spot that implements this and fix it. **We can have it in one spot and it's much better.**

HIGHER ORDER COMPONENTS SOLVE THIS PROBLEM.

The way it works, if your functionality or feature that you want to sharea across multiple components, will create a new component. That new component wraps around your main component and includes the functionality you want to have.

Another example of a higher order component is imagine you have multiple components that make an API call. Every time it makes an API call, you want to show a loading spinner. We can implement that logic inside the wrapper component. Now you no longer have to repeat it across different components.

## Creating the ToolTip

Create a folder called `hoc`.
Inside this folder create a file named [Movie.jsx][1]

Give it the following Code:

```jsx
import React, { Component } from "react";

class Movie extends Component {
	render() {
		return <div>Movie</div>;
	}
}

export default Movie;
```

I have downloaded the new Visual Studio Extension called **Reactjs Code Snippets**.
Inside this file, type "rcc" and enter tab.

Lets say we want to enhance this component and give it a tooltip functionality. In the same folder add a file called **[withToolTip.jsx][2]**

**NOTICE THE "with" IN THE BEGINNING OF THE NAME CONVENTION.**

Inside this file import react at the top. Create a function called `withToolTip` that takes in a component. Make sure to capitalize component or else it wouldn't work when putting it inside the markup. The file should contain the following lines:

```jsx
import React from "react";

function withToolTip(Component) {
	return class WithToolTip extends React.Component {
		render() {
			return (
				<div>
					<Component />
				</div>
			);
		}
	};
}

export default withToolTip;
```

Now back in [Movie.jsx][1], import `withToolTip` and change the export default statement to pass `withToolTip` and the `Movie` component as an argument. The class should now look as follows:

```jsx
import React, { Component } from "react";
import withToolTip from "./withToolTip";

class Movie extends Component {
	render() {
		return <div>Movie</div>;
	}
}

export default withToolTip(Movie);
```

If you go to devtools, and go to the react devtools, you can see the higher order component and Movie inside it. Now lets modify `withToolTip`.

Add a state to determine if you should show a tooltip or not.

Create two Lambda functions, one for handling the `onMouseOver` event and one for handling `onMouseOut` event. On the parent div of `<Component />`, utilize the properties **`onMouseOver` & `onMouseOut`**

Finally pass the state of the boolean inside the state as a prop of `<Component />`. It should now look as follows:

```jsx
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
				<div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
					<Component showToolTip={this.state.showToolTip} />
				</div>
			);
		}
	};
}

export default withToolTip;
```

Inside your [Movie.jsx][1], conditionally render a div based off the prop that was just passed in. It should look as follow:

```jsx
import React, { Component } from "react";
import withToolTip from "./withToolTip";

class Movie extends Component {
	render() {
		return (
			<div>
				Movie
				{this.props.showToolTip && <div>Some tooltip</div>}
			</div>
		);
	}
}

export default withToolTip(Movie);
```

When you save your changes, you should see the words "Some tooltip" appear when hovering over "Movie". However, there's still a problem with this implementation. When you go back to App.js and you pass a prop to the Movie component, the prop doesn't actually get passed. It's missing. You can know this by using the Devtools and going into the React Components tab.

**This is happening because we forgot to pass the props to our higher order component.**

This has a simple and easy fix. Go to [withToolTip.jsx][2] pass the props passed by using the spread operator within the component. The line should look as follows:

```jsx
render() {
	return (
		<div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
			<Component {...this.props} showToolTip={this.state.showToolTip} />
		</div>
	);
}
```

Now when we save the changes, you should be able to see the prop that was passed into the Movie component.

**So, in order implement a higher order component, we create a new function that takes in an existing component and returns a new component. In this case we're returning a class component but we can also return a functional component. All we're doing here is implementing some logic and we're sharing this logic across different components.**

# Hooks

_Towards the beginning of the course, Mosh mentioned the difference between Functional Components and Class Components. The difference was that funcitonal components were stateless and Class Components were not. So, if you wanted to store some state, you want to use a Class... right?_

**Since React 16.8, this is no longer valid. In 16.8 we got a new feature called Hooks.**

Hooks allow us to build functional components with all the features we have in class components. So, we can use state and lifecycle features of class components.

Hooks in a functional component can be cleaner to use and can take less lines of code. It also looks less confusing than using a Class.

# The useState Hook

In the source folder, add a new folder called hooks. Create a new file called [Counter.jsx][3]. In the file, type **`rsf`** and press tab.

### A **Hook** is a function that allows us to hook into react features like working with state or lifecycle methods.

At the top, import `useState`. All the suggestions that start with **use** are examples of hooks in react.

At the top, where you'd normally put `state={}`, use the hook and give it an initial value like zero. Now this is going to return an array with two elements. So store that array in a const, like below:

```jsx
const array = useState(0);
```

The first element in this array is the value of our counter. This is equivalent to `this.state.count` in a class component. So, we can store it in a const called `count` and display it in the markup. The file should now look as follows:

```jsx
import React, { useState } from "react";

function Counter(props) {
	const array = useState(0);
	const count = array[0]; //equivalent to this.state.count

	return <div>Counter: {count}</div>;
}

export default Counter;
```

In class components we also have a method called `this.setState()`, that we inherit from the base component class in React. However, here we don't have inheritance. That's why we don't have a setState method inside the function component. So, how're we going to update the value of our counter?

The `useState()` function is an array with **TWO** items. The first being the value of our counter. The second item is a function for updating this value. That is equivalent to **this.setState()** in a class. Lets set it in a constant called `setState`.

```jsx
const array = useState(0);
const count = array[0]; //equivalent to this.state.count
const setState = array[1]; //equivalent to this.setState()
```

Now instead of writing these three lines, we can use object destructuring and extract these two items in a single line. Remember, to destructure an array, we use squared-brackets, not curly-brackets. It should look as follows:

```jsx
const [count, setState] = useState(0);
```

The first item in the returned array will be given to count and setState will be given the second item, which updates the value of count.

In the HTML markup of the functional component, create a button labeled "Increment" and `onClick()`, pass a lambda expression. In this lambda expression, call setState to increment the value of our counter. The new value would be `counter + 1`. Your code should now look as follows:

```jsx
import React, { Fragment, useState } from "react";

function Counter(props) {
	const [count, setCount] = useState(0);

	return (
		<Fragment>
			<div>Counter: {count}</div>
			<button onClick={() => setState(count + 1)}>Increase</button>
		</Fragment>
	);
}

export default Counter;
```

> You must surround it all with `<Fragment> </Fragment>` because you're returning more than one element.

Add the counter to [App.jsx][4] and save your changes to see the counter in the browser.

Now we can add another useState. This time add an input in the `counter-component` and add some text. Make this `useState` update a value based on the input. The file should now look as follows:

```js
import React, { Fragment, useState } from "react";

function Counter(props) {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");

	return (
		<Fragment>
			<div className='counter-container'>
				<input type='text' onChange={(e) => setName(e.target.value)} />
				<div>
					{name} has clicked {count} times!
				</div>
				<button onClick={() => setState(count + 1)}>Increase</button>
			</div>
		</Fragment>
	);
}

export default Counter;
```

Now test this and the text should update as you type into the input.

> There's one rule. You can't call hooks inside loops, conditions, or nested functions.

For example, we can't do the following thing:

```js
const [count, setCount] = useState(0);
if (count == 0) {
	const [name, setName] = useState("");
}
```

Save the changes and note the error that comes up.

The error: **React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.**

How does React know that the value `0` belongs to `count`? In other words, if React has some kind of storage, how does React know what value belongs to what variable. React relies on the order in which hooks are called. The first time it's called, React creates a state variable and stores it somewhere in memory, let's say an array. The second time we call useState, React creates another state variable. This is the reason why we cannot use this hook in if statements or loops.

In the second render, the hook wouldn't get called because count got updated.

> Mosh accidentally called the first useState hook as setState. This is a mistake because it's too generic. Typically you want to call the set function name with the name of the initial value. Therefore, it's best to put `setCount` instead.

# The useEffect Hook

In classes we have the following lifeCycle hooks:

```js
componentDidMount();
componentDidUpdate();
componentWillUnmount();
```

In functions we have the following hook:

```js
useEffect(func);
```

This one hook does the job of the three above. We pass a function that implements all the logic in a single place. Let's see this in code.

`useEffect()` gets called every time the component renders. Type the following code in [Counter.jsx][3]:

```js
useEffect(() => {
	document.title = `${name} has clicked ${count} times!`;
});
```

We can supply a second argument to this function that is an array of dependencies. As previously said, this function gets called every time the component re-renders. That applies to the first render, when the state changes, or when a new prop gets passed. **However, what if we don't want it to rerender every time for performance reasons?** This is where we use an array of dependencies.

This array will list all the state variables that our effect hook is dependent upon. For example, if we had `[count]`, that means that the function only gets called when the value of count gets changed. So if we change the name, the title of the document won't get changed. Save and test this yourself.

The title of the tab only changes when the counter is clicked. When the name is changed, the useEffect function isn't called.

### Cleanup Code

There's one last lifecycle hook that gets called in a Class that we haven't covered in components yet. That hook is called componentWillUnmount. This is where we write cleanup code. When using the `useEffect()` hook, we can optionally return a function. In that function, we can write cleanup code. Any code that we previously wrote in componentWillUnmount, will be in that return.

With this implementation we can see all the logic of a feature in one place and not spread over different lifecycle methods...

Put a console in the return and you'll see the comment when it's doing the 'cleanup'.

```js
useEffect(() => {
	document.title = `${name} has clicked ${count} times!`;

	return () => {
		console.log("Clean up...");
	};
});
```

Now whenever we increment count, we'll see the cleanup method.
When there're no dependencies, the cleanup function gets called first, just in case the event is already happening. This can cause some performance penalties. For example, you don't want to disconnect a network connection every time the user types something in a text box. in those situations, we can pass a dependency array to prevent this from happening. As such:

```js
useEffect(() => {
	document.title = `${name} has clicked ${count} times!`;

	return () => {
		console.log("Clean up...");
	};
}, []);
```

# Custom Hooks

What you must do is to create a file in the [hooks](../hooks/) called `useDocumentTitle.js`. Cut out the useEffect function inside `Counter.jsx`. After cutting it, create an export default of a function called `useDocumentTitle` that takes in the title as an argument.
Because I no longer have `useEffect` in [Counter.jsx][3], delete the import and put it at the top.
The code should look as follows:

```js
import { useEffect } from "react";

export default function useDocumentTitle(title) {
	console.log("TITLE", title);
	useEffect(() => {
		document.title = title;
		return () => {
			console.log("Clean up...");
		};
	});
}
```

Now I have a custom hook created. Import the custom hook at the top of [Counter.jsx][3]. Use the function and pass a title, as follows:

```js
useDocumentTitle(`${name} has clicked ${count} times!`);
```

# Fetching Data with Hooks

Let's say we wanted to fetch data from an api like the one found in [JSON PlaceHolder /users API](https://jsonplaceholder.typicode.com/users)'.

Create new file in the hooks folder. Call this file: [Users.jsx](../hooks/Users.jsx). Inside this file, create a stateless functional component using the shortcut: `rsf`.

> This creates the functional component and the import at the top.

Inside this SFC, import and use the `useEffect` lifecycle hook. Inside the hook make the api call using axios. Axios must be installed and imported first. You have to await the request. However, you're unable to make the `useEffect` async so there's a workaround this. Inside the `useEffect` function make an async function. Call the function INSIDE the `useEffect` hook right after creating it.

Set the users by setting it up with `useState` hook. It should look as follows:

```js
const [users, setUsers] = useState([]);
```

The `useEffect` hook should now look as follows:

```js
useEffect(() => {
	async function getUsers() {
		const { data } = await axios(`https://jsonplaceholder.typicode.com/users`);
		setUsers(data);
	}
	getUsers();
});
```

In the return statement of the functional component, return an unordered list of all the users retrieved from the api. Now go to [App.jsx][4] and it there so you can see the results.

# Context

If you've built enough apps on React you've come across something called **prop drilling**. This is when you have a value on a parent and you want to use it in a grandchild component. What you'd have to do is to pass the data to the child and the child would have to pass it to its child. On every level, you have to "drill a hole" to pass a prop. Over time, as the app grows and more components share the same data, this approach becomes unmaintainable and not scalable. Before context, Redux solved this problem and has additional features.

With context, we have this concept called **Store**, which is an object which stores the global state of our application. So, the way it works is we can "store" some data in the global store and use it in a component way deeper in level of the tree.

Basically any component can get data from the `store`. This is idea behind Redux. A few years later, React introduced this new concept called `Context`. With context, we can pass data down our component tree without prop drilling. So, in component 1, you create a context and in the third component you use the data inside the context.

First lets use context in class components than in functional components.

# Context in Class Components

Create a new folder in the `src` folder and call it `context`. Inside this folder, create two new files, one called [MovieList.jsx][7] and [MoviePage.jsx][8]. Create a class inside them by typing `rcc` and tabbing. Inside the `MovieList` component, just put a _lorem 10_ or anything. Inside `MoviePage.jsx` render `MovieList`.

> I've also changed the way App.jsx looks because the file is created as a function by default. I typed `rcc` and pasted the contents inside the class.

Now if you open DevTools, you'll be able to see the component tree. If you want to store information about the user at the App level, what do you do to pass it down the tree without setting it to props all the way down?

Create a state in App.jsx. As follows:

```js
state = {
	currentUser: { name: "Joseph" },
};
```

Create a new file in the context folder, call it [userContext.js](./../context/userContext.js). This is a context that will be used when you want to pass information about the user. In a real application, you can have different kinds of context. So, we use the user context to share the current user, we have have a theme context for sharing the currentTheme, and so on...

In this file, import react and call `createContext()` from `React`. This call returns a context object. **By convention, we should name these contexts with pascal notation, the same way we name our components.** The file should look as follows:

```js
import React from "react";

const UserContext = React.createContext();

export default UserContext;
```

Now that you're exporting this context, go to [App.js][4]. Import this new context at the top. After importing, wrap the `div.container` inside an element utilizing the UserContext import. It should also use the Providor class. When you type the **`.`** you should see it in your recommendations from intellisense. It should look as follows when done:

```js
state = {
	currentUser: { name: "Joseph" },
};

<UserContext.Provider value={this.state.currentUser}>
	<div className='container'>
		{/* <Movie id={5} /> */}
		{/* <Counter /> */}
		{/* <Users /> */}
		<MoviePage />
	</div>
</UserContext.Provider>;
```

Now, go to wherever you want to **consume** the user context. In this case, it'll be [MovieList.jsx](./../context/MovieList.jsx)'. Import `UserContext` at the top. Extract everything in the return with a `control + x` with your keyboard. Inside the return, insert the following code snippet:

```js
<UserContext.Consumer></UserContext.Consumer>
```

You DON'T past it yet. Why? Well, this `UserContext.Consumer` element is expecting a function as a child, so we can't pass it that div. So, what we can do is create a lambda function inside curley braces and then paste your code inside the return of the function. It should look as follows:

```js
import React, { Component } from "react";
import UserContext from "./userContext";

class MovieList extends Component {
	render() {
		return (
			<UserContext.Consumer>
				{(userContext) => <div>Movie List</div>}
			</UserContext.Consumer>
		);
	}
}

export default MovieList;
```

Now look at the component tree in DevTools.

Below `App`, we have the context provider. However, as we develop in the project, we create many context providers. For that reason we must give it a name. It is good practice to give these context providors a name.

Go to [userContext][5] file and after creating the context object, set the display name to something like "userContext". This can be done as follows:

```js
import React from "react";
import UserContext from "./userContext";

const UserContext = React.createContext();
UserContext.displayName = "UserContext";

export default UserContext;
```

Now go into DevTools and look at what the context is now called. Click on the context. Inside it, you should now see the object that you created and provided in [App.js][4]. You can now use inside the function that consumes it. Go to MovieList class and use it inside the markup as follows:

```js
class MovieList extends Component {
	render() {
		return (
			<UserContext.Consumer>
				{(userContext) => <div>Movie List With {userContext.name}</div>}
			</UserContext.Consumer>
		);
	}
}
```

**What if you want to consume this context outside of the render method?** Let's say in one of the lifecycle hooks, such as `ComponentDidMount()`. In that method, you don't have access to the user component in the return.

This is pretty easy.

First, after creating the class, we need to set one of its static properties. We're going to set the context type of this class. This is done the following way:

```js
MovieList.contextType = UserContext;
```

> This is what Mosh means by a static property. A property that belongs to a class not an object. It's set to `UserContext`, which we imported at the top.

Try this out in [MovieList.jsx][7]. You want to put this part of the code typically at the bottom of the page, below the class but above the export. Now in `componentDidMount()`, log the context in the following way:

```js
componentDidMount() {
	console.log("context", this.context);
}
```

After saving and reloading take a look at the console. Now you should be able to see the context object with the set properties provided by the `UserContext.Provider` element.

In a real world application, we can make certain decisions in this component based on the current user.

**There is another way to set a contextType property in a class.** Instead of setting it after the class has been created, _we can set it as part of creating the class_.

So, lets delete that line and go to the top of the class. On the very next line of the class being created type the following code:

```js
class MovieList extends Component {
	static contextType = userContext;

	componentDidMount() {
		console.log("context", this.context);
	}
}
```

> The `static` keyword is saying that we're setting a static property in this class.

Some people prefer the second approach, other people prefer to explicitly set it after creating the class component.

# Context in Functional Components

Now we're going to learn how to use the context API in functional components. According to Mosh, this method is much easier than in class components.

We're going to introduce a new component in the component Tree. We're going to add a component called [movieRow][6]. The `movieList` component can have one or more `movieRow` components.

Functional Components have a hook that pertains to functional components only. This hook is called `useContext`. Import it in the same line as React is imported. Also import the [UserContext][5] that we've created already.

In the `MovieRow` function, first we're going to call `useContext` and pass the `userContext` as an argument. This contains our `userContext` object which is our current user. You can use it in the following manner:

```js
import React, { useContext } from "react";
import UserContext from "./userContext";

function MovieRow(props) {
	const currentUser = useContext(UserContext);
	console.log("context", currentUser);

	return <div>{currentUser.name}</div>;
}

export default MovieRow;
```

Now let's go to our [MovieList][7] component and add a `MovieRow` component. Inside the div, after displaying the name of the user, add a `movieRow` component. The render method should look as follows:

```js
render() {
		return (
			<UserContext.Consumer>
				{(userContext) => (
					<div>
						Movie List With {userContext.name}
						<MovieRow />
					</div>
				)}
			</UserContext.Consumer>
		);
	}
```

Save your changes and go into DevTools. Look at the component tree. There is no `UserContext.Consumer` component under the `MovieRow` component. For the `MovieList` class there was a `UserContext.Consumer` component below it but not for the functional component and that's because the class is using a consumer component. This gives us an extra child.

This is an immediate advantage because over time the hierarchy becomes more convoluted. If you use functional components, you're not going to see this consumer component in the component tree.

Also, the console displayed the user as created inside [MovieRow][6].

A side-by-side comparison of both implementation shows how much more simple it is to use a functional component.

In the class we had to set a static property, in the return of the render we have to use the `UserContext.Consumer` element (making our heirarchy more convoluted), and inside the element we had to pass a function as a lamda expression. This function distracts the reader of the code from seeing the actual content of this method. **It's introducing extra complexity.**

On the contrary, in the functional component, all we had to do was call the hook `useContext`.

## **Going forward, prefer functional components over class components.**

# Updating The Context

**What if you want to update the context?** In this app, we're assuming the user is already logged in. We're going to change this behavior and simulate the scenario where the user is not logged in. Then we're going to build a log in component with a button. When you press the button, the user will log in with the name of the user rendered.

Look at our app component, in [App.jsx][4]. In the `UserContext.Providor` component, we're providing an object which is part of the state of the app component.

Forget about the context for a second. **How can we update the state of a component higher in the component tree?**

Since we're already passing the state as an object, we should also provide methods for updating the state. Then we pass those methods as props for child component. Create a method in this class called `handledLoggedIn`. As follows:

```js
handleLoggedIn = (username) => {
	console.log(`Getting the user: ${username}`);
	const user = { name: "Joseph" };

	this.setState({ currentUser: user });
};
```

Now we have a method for updating the state. We should pass this method just like the currentUser is being passed using our `ContextObject`. Let's change the structure of the object. Instead of only passing one property, let's pass an object with both properties in it. as follows:

```js
class App extends Component {
	handleLoggedIn = (username) => {
		console.log(`Getting the user: ${username}`);
		const user = { name: "Joseph" };

		this.setState({ currentUser: user });
	};

	state = {
		currentUser: { name: "Joseph" },
	};

	render() {
		return (
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
				</div>
			</UserContext.Provider>
		);
	}
}
```

Now we should modify our child components because we have changed the structure of the object we're passing down. Go to [MovieList][7]. Now in the render return, there is no longer a `name` in the `UserContext`, instead we have an object.

We must extract the name from the object but we must check if name is not null in the object in order to display it. If not null, display it, if null, display an empty string as follows:

```js
<UserContext.Consumer>
	{(userContext) => (
		<div>
			Movie List With {userContext.currentUser ? userContext.currentUser.name : ""}
			<MovieRow />
		</div>
	)}
</UserContext.Consumer>
```

We must make the same adjustment for [MovieRow][6].

Rename the const from `currentUser` to `userContext`. If not, we'll end up with `currentUser.currentUser.name` and that sounds redundant. After renaming it, insert the same ternary operator as the one above inside the return of this function. The function should now look as follows:

```js
function MovieRow(props) {
	const userContext = useContext(UserContext);
	console.log("context", userContext);

	return (
		<div>
			Movie Row With {userContext.currentUser ? userContext.currentUser.name : ""}
		</div>
	);
}
```

We haven't implemented the concept of updating the context yet. We've simply changed the structure of the context object.

**LEFT OFF AT 4:25**
Now to update the context...

We'll be going over Higher Order Components, Hooks, and Context.

[1]: ../hoc/Movie.jsx
[2]: ../hoc/withToolTip.jsx
[3]: ../hooks/Counter.jsx
[4]: ../App.jsx

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

When you save your changes, you should see the words "Some tooltip" appear when hovering over "Movie". However, there's still a problem with this implementation. When you go back to App.js and you pass a prop to the Movie componenet, the prop doesn't actually get passed. It's missing. You can know this by using the Devtools and going into the React Componenets tab.

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

**So, in order implement a higher order component, we create a new function that takes in an existing component and returns a new component. In this case we're returning a class component but we can also return a functional component. All we're doing here is implementing some logic and we're sharing this logic across different componenets.**

# Hooks

_Towards the beginning of the course, Mosh mentioned the difference between Functional Componenets and Class Components. The difference was that funcitonal components were stateless and Class Componenets were not. So, if you wanted to store some state, you want to use a Class... right?_

**Since React 16.8, this is no longer valid. In 16.8 we got a new feature called Hooks.**

Hooks allow us to build functional components with all the features we have in class componenets. So, we can use state and lifecycle features of class componenets.

Hooks in a functional componenet can be cleaner to use and can take less lines of code. It also looks less confusing than using a Class.

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

In class componenets we also have a method called `this.setState()`, that we inherit from the base component class in React. However, here we don't have inheritance. That's why we don't have a setState method inside the function component. So, how're we going to update the value of our counter?

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
	const [count, setState] = useState(0);

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

# LEFT OFF AT 4:03.

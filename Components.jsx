// ? ===== State of Components ====== //
/**
 * STATE is an object that describe the behavior of a component
 * A React component can be either "stateful" or "Stateless".
 * A stateful component updates as per the current state.
 * stateful components are the CLASS type.
 * stateless components are the FUNCTION type.
 */

// ? ===== Types of Components ====== //
/* *
 * Functional Components
 * Class Components
 * Pure Components
 * High-order Components
 */

/* *Functional Components

 * May or may not receive data as parameters.
 * take in 'props' and return JSX.
 * Do not natively have state (they are stateless) or lifecycle but can be added by implementing React hooks
 * used to display information that is easy to read, debug and test.
 */

// example
const FunctionalComponent = () => {
  return <h1>Welcome Message</h1>
}

/* * Class Components

 * More complex than functional components.
 * can pass data from one class component to another.
 * used more frequently than other components as they have some additional functions
 * can use react functions like state, props, and lifecycle methods
 * they are stateful and can be re-rendered.
 */

// example
class DemoComponent extends React.Component {
  render() {
    return <h1>Welcome Message!</h1>
  }
}

/* * Pure Components

 * Better than functional components.
 * can replace simple functional components.
 * simplest and fastest components to write.
 * primarily used to provide optimization.
 * Do not depend on or modify the state of variables outside their scope.
 */

// example
// Import React and PureComponent from the react library.
import React, { PureComponent } from 'react'

// Declare a class called MyComponent which extends the PureComponent base class from React.
class MyComponent extends PureComponent {
  // Define the render function to return the markup for this component.
  render() {
    return (
      <div>
        {/* Display a heading with the text "Hello, world!". */}
        <h1>Hello, world!</h1>
      </div>
    )
  }
}

// Export the MyComponent class so it can be used in other parts of the code.
export default MyComponent

/* * High-order React Components

 * Not a react component that is available in the API.
 * advanced technique in react for reusing component logic
 * a pattern that emerged from react's compositional nature
 * returns a component
 */
// example

// Import React
import React from 'react'

// Define a Higher-order Component
const withUpperCase = (WrappedComponent) => {
  // Define a new Component that takes in props
  const WithUpperCase = (props) => {
    // Map over the props and convert all strings to uppercase
    const newProps = Object.keys(props).reduce((obj, key) => {
      obj[key] =
        typeof props[key] === 'string' ? props[key].toUpperCase() : props[key]
      return obj
    }, {})

    // Return the WrappedComponent with the newProps
    return <WrappedComponent {...newProps} />
  }

  // Return the new Component
  return WithUpperCase
}

// Define a basic Component
const BasicComponent = (props) => {
  // Return a div with a message
  return <div>{props.message}</div>
}

// Use the Higher-order Component to create a new Component
const EnhancedComponent = withUpperCase(BasicComponent)

// Render the EnhancedComponent
ReactDOM.render(
  <EnhancedComponent message='hello world' />,
  document.getElementById('root')
)

//? ======= Custom styling and click events using props ========

//  !====  in FUNCTIONAL COMPONENTS
// using styling and click events in props in functional components

const FunctionalStyling = (props) => {
  const customStyling = {
    color: props.color,
    fontSize: `${props.size}px`,
  }
  return (
    <div>
      {/* use props with styling */}
      <span style={customStyling}>Hello World!</span>
      {/* use props with click events */}
      <button type='submit' onClick={props.clickEvent}>
        Click me
      </button>
    </div>
  )
}

// !==== in CLASS COMPONENTS
// using styling and click events in props in Class components using the same example in the just above functional components

class ClassStyling extends React.Component {
  constructor(props) {
    super(props)
  }
  // override the render method
  render() {
    const colorStyle = {
      color: this.props.color,
      fontSize: this.props.size + 'px',
    }
    return (
      <div>
        <span style={colorStyle}>Hello World!</span>
        <button onClick={this.props.clickEvent}>Click Me</button>
      </div>
    )
  }
}

// use the above components here,
const AppStyling = () => {
  return (
    <div>
      <FunctionalStyling
        color='blue'
        size='25'
        clickEvent={() => {
          alert('You Clicked me')
        }}
      />
      <ClassStyling
        clickEvent={() => {
          alert('You Clicked me')
        }}
      />
    </div>
  )
}

//? ======= Class Component States ========
/**
 * props is set from outside the class
 * state is internal to the class
 */

class ClassStateAndProps extends React.Component {
  constructor(props) {
    super(props)
  }
  state = { counter: '0' }
  // A function to increment the counter every time a button is clicked
  incrementCounter = () => {
    this.setState({ counter: parseInt(this.state.counter) + 1 })
  }
  // override the render method
  render() {
    return (
      <div>
        <button onClick={this.incrementCounter}>Click Me</button>
        <br />
        {this.state.counter}
      </div>
    )
  }
}

// ? =============== using APIs in objects in Class Component States ========

// Importing the React library and the axios library to make API requests
import React from 'react'
import axios from 'axios'

// Defining a class called 'App' that extends the React Component class
class App extends React.Component {
  // Defining the initial state of the App component
  state = { APIlist: [] }

  // A method that will be called when the App component mounts
  componentDidMount() {
    // Setting the API endpoint URL to a variable
    let url = 'https://api.publicapis.org/entries?category=Animals'

    // Making a GET request to the API endpoint using axios
    axios({
      method: 'get',
      url: url,
      responseType: 'json',
    })
      .then((resp) => {
        // Getting the data from the response and extracting the 'entries' object
        let listOfEntries = resp.data.entries

        // Converting the 'entries' object into an array
        let listOfEntriesAsArray = Object.entries(listOfEntries)

        // Mapping the array to create a list of API entries with links
        let entryDetails = listOfEntriesAsArray.map((entryDetail) => {
          return (
            <li style={{ color: 'green' }}>
              {entryDetail[1]['API']}
              ------- {entryDetail[1]['Link']}{' '}
            </li>
          )
        })

        // Setting the state of the component with the list of API entries
        this.setState({ APIlist: <ul>{entryDetails}</ul> })
      })
      .catch((err) => {
        // Logging any errors that occur
        console.log(err.toString())
      })
  }

  // A method that is called to render the component
  render() {
    // Creating a style object with a color and font size based on props passed to the component
    const colorStyle = {
      color: this.props.color,
      fontSize: this.props.size + 'px',
    }

    // Returning the JSX for the component with a header, some spacing, and the list of API entries
    return (
      <div style={colorStyle}>
        <h2>APIs List</h2>
        <br />

        <div>{this.state.APIlist}</div>
      </div>
    )
  }
}

// ? =============== using APIs in arrays in Class Component States ========

import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = { APIlist: [] }

  componentDidMount() {
    let url = 'https://api.publicapis.org/entries?category=Animals'
    axios
      .get(url)
      .then((resp) => {
        let entries = resp.data
        let entryDetails = entries.map((entry) => {
          return (
            <li style={{ color: 'green' }}>
              {entry.API} ------- {entry.Link}
            </li>
          )
        })
        this.setState({ APIlist: <ul>{entryDetails}</ul> })
      })
      .catch((err) => {
        console.log(err.toString())
      })
  }

  render() {
    const colorStyle = {
      color: this.props.color,
      fontSize: this.props.size + 'px',
    }
    return (
      <div style={colorStyle}>
        <h2>APIs List</h2>
        <br />

        <div>{this.state.APIlist}</div>
      </div>
    )
  }
}

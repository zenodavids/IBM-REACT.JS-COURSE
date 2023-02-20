/** States
 * Allows you to change data
 * An object that specifies different types of data
 * a built-in state object stores property values belonging ti the component
 * change in state results in re-rendering of the component
 * determines how a component renders and behaves

 * * Types of States
 * Local state = present in a simple component that needs it such as hiding and showing information
 * shared state = shared by multiple component and its complicated

 * * Need for State
 * State is required in a component that changes during a user interaction
 * it tracks the change in a component.

 * * Example of using state
 * State stores the counter value in a component that changes on every click

 */

// ? ===== example of props in a class component ======

class TestComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 1,
      name: 'John',
      age: 30,
      gender: 'male',
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.id}</p>
        <p>{this.state.name}</p>
        <p>{this.state.age}</p>
        <p>{this.state.gender}</p>
      </div>
    )
  }
}

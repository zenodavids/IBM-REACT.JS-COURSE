//? CONNECTING TO AN EXTERNAL SERVER

/*
 *====== HTTP ==========
 * GET: To "obtain" information
 * POST: To "send" information
 * UPDATE: To "change" information
 * DELETE: To "delete" information
 */

// Example of a GET request
class GETRequest extends React.Component {
  // set the state initially to "none logged in"
  state = {
    user: 'None logged in',
  }
  // Most requests to external servers/APIs are blocking so we use asynchronous.
  // To make the call asynchronous, you can use promises.
  // connect to a server through an axios request
  componentDidMount() {
    const req = axios.get('external server url')
    // When the promise is fulfilled, you parse the response and extract the data from it to change user to have the same name as its value.
    req
      .then((response) => {
        this.setState({ user: response.data.name })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ user: 'Invalid user' })
      })
  }
  render() {
    return (
      <div>
        <h1>Current User: {this.state.user}</h1>
      </div>
    )
  }
}

///////////////////////////////////////////////////////////////////////

// Example of a POST request

// an Express server
const express = require('express')
const app = new express()

// uses the CORS middleware to allow cross-origin requests to the server
const cors = require('cors')
app.use(cors())

let userCollection = []

// takes a POST request at endpoint /user, extracts the name and gender sent as query parameters
app.post('/user', (req, res) => {
  //   creates a JavaScript Object Notation (JSON) object,
  let newUser = {
    name: req.query.name,
    gender: req.query.gender,
  }
  //   pushes that into the userCollection array.
  userCollection.push(newUser)
  return res.send('user successfully added')
})

app.get('/user', (req, res) => {
  return res.send(userCollection)
})

app.listen(3333, () => {
  console.log('Listening for connections at port 3333')
})

// see how a React client can connect to this Express js server above
class POSTRequest extends React.Component {
  state = { CompletionStatus: '' }
  postDataToServer = () => {
    axios
      .post(
        `http://localhost:3333/user?name${
          document.getElementById('name').value
        }&gender${document.getElementById('name').value} `
      )
      .then((res) => {
        tis.setState({ CompletionStatus: res.data })
      })
      .catch((err) => {
        this.setState({ CompletionStatus: 'Operation Failure' })
      })
  }
  render() {
    return (
      <div>
        Enter the name <input type='text' id='name' />
        <br />
        Enter the gender <input type='text' id='gender' />
        <br />
        <button onClick={this.postDataToServer}>Post Data</button>
        <span>{this.state.CompletionStatus}</span>
      </div>
    )
  }
}

// Another GET request at endpoint /user is where all the objects in the usercollection destination are sent as the response. This server uses the CORS middleware to allow cross-origin requests to the server. A client from anywhere can connect to this Express server. Now you will see how a React client can connect to this server. Here, you send data to the server with a POST request and receive a response. The React root component has two input components and one button. It has a state, completionStatus, which is initially empty. When the user adds data in the name and gender text boxes and clicks the button, the postDataToServer method is called. This sends the data to the server and updates the response from the server to the component's state completionStatus. In the same way, you can send UPDATE and DELETE requests to the server. In this video you learned that: You can use promises to make calls to an external server asynchronous. With middleware, you can enable a client from anywhere to connect to an Express server. You can receive and send information from a React client to an external server with GET, POST, UPDATE, and DELETE requests.

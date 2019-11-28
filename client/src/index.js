import React from "react";
import ReactDOM from "react-dom";
import "react-table/react-table.css";
import "./styles.css";
import AuthentificationForms from "./components/authentification";
import TitleSpace from "./components/TitleSpace";

//Global variables
window.myQuery = "";
window.search = ["female", "male"];
window.JWT = null;

//this function should build the https request needed to filter
//data results.

class App extends React.Component {
  constructor() {
    super();
    this.loggedIn = this.loggedIn.bind(this);
    this.state = {
      logged: false
    };
  }

  // Function to track whether user is logged in
  loggedIn() {
    this.setState({ logged: !this.state.logged });
  }

  render() {
    return (
      <div className="App">
        <AuthentificationForms
          logged={this.loggedIn.bind(this)}
          check={this.state.logged}
        />
        <TitleSpace logged={this.state.logged} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

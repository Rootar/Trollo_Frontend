import React, { Component } from 'react';
import HeadBar from "./HeadBar";
import SignInSignUpBar from './SignInSignUpBar';
import SignIn from "./SignIn";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";

import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { lists } = this.props;

    return (
      <div className="App">
        {/* <SignInSignUpBar/><br/> */}
        <HeadBar />
        {/* <SignIn/> */}
        {lists.map(list => <TrolloList title={list.title} cards={list.cards} />)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);

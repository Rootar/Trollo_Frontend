import React, { Component } from 'react';
import TrolloBoard from './TrolloBoard';
import Login from './Login';
import Register from './Register';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { lists } = this.props;

    return (
      <div className="App">
        {/*<TrolloBoard lists={lists}/>*/}
        {/*<Login/>*/}
        {/*<Register/>*/}
        <TrolloBoard lists={lists}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);

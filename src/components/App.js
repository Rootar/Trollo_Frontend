import React, { Component } from 'react';
import TrolloBoard from './TrolloBoard';
import TrolloBoardsList from './TrolloBoardsList';
import Login from './Login';
import Register from './Register';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { lists } = this.props;
    const { boards } = this.props;

    return (
      <div className="App">
        {/*<TrolloBoard lists={lists}/>*/}
        {/*<Login/>*/}
        {/*<Register/>*/}
        <TrolloBoard lists = { lists }/>
        <TrolloBoardsList boards = { boards }/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  boards: state.boards
});

export default connect(mapStateToProps)(App);

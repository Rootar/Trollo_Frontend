import React, { Component } from 'react';
import TrolloBoard from './TrolloBoard';
import TrolloBoardsList from './TrolloBoardsList';
import Login from './Login';
import Register from './Register';
import TrolloCardView from "./TrolloCardView";

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
        <TrolloBoard boards = {boards} boardId = {0} lists = { lists }/>
        {/*<TrolloBoardsList boards = { boards }/>*/}
        {/*<TrolloCardView lists = {lists} listId = { 1 } cardId = { 0 } />*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  boards: state.boards
});

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import TrolloBoard from './TrolloBoard';
import TrolloBoardsList from './TrolloBoardsList';
import Login from './Login';
import Register from './Register';
import TrolloCardView from "./TrolloCardView";
import HeadBar from "./HeadBar";

import { connect } from 'react-redux';

class App extends Component {
  state = {
    showBoardList: false,
    showCard: false,
    listId: 0,
    cardId: 0,
  };
  
  render() {
    const { lists } = this.props;
    const { boards } = this.props;

    return this.state.showBoardList ? this.ShowBoardListMode(lists, boards) 
                                    : this.state.showCard 
                                    ? this.ShowCardMode(lists, boards) 
                                    : this.ShowBoardMode(lists, boards);
  }

  ShowBoardListMode = (lists, boards) => {
    return (
      <div className="App">
        <HeadBar />
        <TrolloBoard boards = {boards} boardId = {0} lists = { lists }/>
        <TrolloBoardsList boards = { boards }/>
      </div>
    )
  }
  ShowBoardMode = (lists, boards) => {
    return (
      <div className="App">
        <HeadBar />
        <TrolloBoard boards = {boards} boardId = {0} lists = { lists }/>
      </div>
    )
  }
  ShowCardMode = (lists, boards) => {
    return (
      <div className="App">
        <HeadBar />
        <TrolloBoard boards = {boards} boardId = {0} lists = { lists }/>
        <TrolloCardView lists = {lists} listId = { this.state.listId } cardId = { this.state.cardId } />
      </div>
    )
  }
  ShowLoginMode = () => {
    return (
      <div className="App">
        <Login/>
      </div>
    )
  }
  ShowRegisterMode = () => {
    return (
      <div className="App">
        <Login/>
      </div>
    )
  }

  OpenCard = (listId, cardId) => {
		this.setState({showCard: true});
  };
  
  CloseCard = (listId, cardId) => {
		this.setState({showCard: false});
	};
}

const mapStateToProps = state => ({
  lists: state.lists,
  boards: state.boards,
});

export default connect(mapStateToProps)(App);

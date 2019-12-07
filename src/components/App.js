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
		loginView: true,
		registerView: false,
		showBoardList: false,
		showCard: false,
		listId: 0,
		cardId: 0,
		login: sessionStorage.getItem('Token') ? true : false,
		username: '',
		password: '',
	};
  
	render() {
		const { lists } = this.props;
		const { boards } = this.props;

		return (this.state.loginView && !this.state.login)
				? this.ShowLoginMode()
				: (this.state.registerView && !this.state.login)
				? this.ShowRegisterMode()
				: this.state.showBoardList 
				? this.ShowBoardListMode(lists, boards) 
				: this.state.showCard 
				? this.ShowCardMode(lists, boards) 
				: this.ShowBoardMode(lists, boards);
  	}

	ShowBoardListMode = (lists, boards) => {
		return (
			<div className="App">
				<HeadBar logoutCallBack = { this.Logout } showBoardCallBack = { this.SwitchBoardList }/>
				<TrolloBoard boards = {boards} boardId = {0} lists = { lists }/>
				<TrolloBoardsList boards = { boards }/>
			</div>
		)
	}

	ShowBoardMode = (lists, boards) => {
		return (
			<div className="App">
				<HeadBar logoutCallBack = { this.Logout } showBoardCallBack = { this.SwitchBoardList }/>
				<TrolloBoard boards = {boards} boardId = {0} lists = { lists }/>
			</div>
		)
	}

	ShowCardMode = (lists, boards) => {
		return (
			<div className="App">
				<HeadBar logoutCallBack = { this.Logout } showBoardCallBack = { this.SwitchBoardList }/>
				<TrolloBoard boards = {boards} boardId = {0} lists = { lists }/>
				<TrolloCardView lists = {lists} listId = { this.state.listId } cardId = { this.state.cardId } />
			</div>
		)
	}

	ShowLoginMode = () => {
		return (
			<div className="App">
				<Login loginCallback = { this.LoginToBoard } signinCallback = { this.SwtchToLogin } signupCallback = { this.SwtchToRegister }/>
			</div>
		)
	}

	ShowRegisterMode = () => {
		return (
			<div className="App">
				<Register signinCallback = { this.SwtchToLogin } signupCallback = { this.SwtchToRegister }/>
			</div>
		)
	}

	OpenCard = (listId, cardId) => {
		this.state.listId = {listId};
		this.state.cardId = {cardId};
		this.setState({showCard: true});
	};

	CloseCard = () => {
		this.setState({showCard: false});
	};

	LoginToBoard = (login, password) => {
		this.setState({login: true});
		this.setState({loginView: false});
		this.state.username = {login};
		this.state.password = {password};
    }

	Logout = () => {
		sessionStorage.removeItem('Token');
		this.setState({login: false});
		this.setState({loginView: true});
	}
	
	SwtchToLogin = () => {
		this.setState({loginView: true});
		this.setState({registerView: false});
	}
	
	SwtchToRegister = () => {
		this.setState({loginView: false});
		this.setState({registerView: true});
	}

	SwitchBoardList = () => {
		if(this.state.showBoardList)
		{
			this.setState({showBoardList: false});
		}
		else
		{
			this.setState({showBoardList: true});
			this.setState({showCard: false});
		}
	}
}

const mapStateToProps = state => ({
	lists: state.lists,
	boards: state.boards,
});

export default connect(mapStateToProps)(App);

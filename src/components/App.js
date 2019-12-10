import React, {Component} from 'react';
import TrelloBoard from './TrelloBoard'
import HeadBar from './HeadBar'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import MainPage from './MainPage'
// import axios from "axios";

const page = {
    LOGIN: 'login',
    REGISTER: 'register',
    MAIN: 'main',
    BOARD: 'board'
}

class App extends Component {
    state = {
        page: page.MAIN,
        isLoggedIn: sessionStorage.getItem('Token') ? true : false
    }

    render(){
        switch(this.state.page){
            case page.LOGIN:
                return this.ShowLoginPage()
            case page.REGISTER:
                return this.ShowRegisterPage()
            case page.MAIN:
                return this.ShowMainPage()
            case page.BOARD:
                return this.ShowBoardPage()
            default:
                return this.ShowMainPage()
        }
    }

    ShowLoginPage = () => {
        return (
            <div className="App">
                <HeadBar logoutCallBack={this.Logout} isLoggedIn={false} mainPageCallBack={this.RedirectToMainPage}/>
                <LoginPage loginCallback={this.Login}/>
            </div>
        )
    }

    ShowRegisterPage = () => {
        return (
            <div className="App">
                <HeadBar logoutCallBack={this.Logout} isLoggedIn={false} mainPageCallBack={this.RedirectToMainPage}/>
                <RegisterPage/>
            </div>
        )
    }

    ShowMainPage = () => {
        return (
            <div>
                <HeadBar logoutCallBack={this.Logout} isLoggedIn={this.state.isLoggedIn} mainPageCallBack={this.RedirectToMainPage}/>
                <MainPage isLoggedIn={this.state.isLoggedIn} loginPageCallback={this.RedirectToLoginPage} registerPageCallback={this.RedirectToRegisterPage}/>
            </div>
        )
    }

    ShowBoardPage = () => {
        return (
            <div className="App">
                <HeadBar logoutCallBack={this.Logout} isLoggedIn={true} mainPageCallBack={this.RedirectToMainPage}/>
                <TrelloBoard/>
            </div>
        )
    }

//////////////////////////////

    Logout = () => {
        console.log("LOGOUT")
        this.setState({isLoggedIn: false})
        sessionStorage.removeItem('Token')
        sessionStorage.removeItem('Username')
        this.setState({page: 'main'})
    }

    Login = () => {
        console.log("LOGIN")
        if(sessionStorage.getItem('Token')){
            this.setState({isLoggedIn: true})
            this.setState({page: 'main'})
        }
    }

    RedirectToMainPage = () => {
        this.setState({page: 'main'})
    }

    RedirectToLoginPage = () => {
        this.setState({page: 'login'})
    }

    RedirectToRegisterPage = () => {
        this.setState({page: 'register'})
    }

}

export default App
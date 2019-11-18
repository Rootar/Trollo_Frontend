import React, { Component } from 'react';
import HeadBar from "./HeadBar";
import SignInSignUpBar from './SignInSignUpBar';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";
import TrolloCardView from "./TrolloCardView";
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { lists } = this.props;

    return (
      <div className="App">
        {/* <SignInSignUpBar/><br/> */}
        {/*<HeadBar />*/}
        {/* <SignIn/> */}
        {/* <SignUp/> */}
        <Grid container justify="center" spacing="2">
          {lists.map(list =>
            <Grid item>
              <TrolloList key={list.id} title={list.title} cards={list.cards} />
            </Grid>
          )}
        </Grid>


        {/*<TrolloCardView cardIndex={0} cards={lists[0].}/>*/}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);

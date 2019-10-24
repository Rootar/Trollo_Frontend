import React from 'react';
import HeadBar from "./HeadBar";
import List from "./List";
import SingInSingUpBar from './SingInSingUpBar';
import SingIn from "./SingIn";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";

import { connect } from 'react-redux';

function App() {
  return (
    <div className="App">
      {/* <SingInSingUpBar/>
      <br/> */}
      <HeadBar/>
      {/* <SingIn/> */}
      <TrolloList title = "test title"/>
    </div>
  );
}

const mapStateProps = state => ({
  lists: state.lists
});

//export default connect(mapStateProps)(App);
export default App;

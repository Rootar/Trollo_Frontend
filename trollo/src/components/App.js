import React from 'react';
import HeadBar from "./HeadBar";
import List from "./List";
import SingInSingUpBar from './SingInSingUpBar';
import SingIn from "./SingIn";

function App() {
  return (
    <div className="App">
      {/* <SingInSingUpBar/>
      <br/> */}
      <HeadBar/>
      <SingIn/>
    </div>
  );
}

export default App;

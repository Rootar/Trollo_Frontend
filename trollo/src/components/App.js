import React from 'react';
import HeadBar from "./HeadBar";
import List from "./List";
import SingInSingUpBar from './SingInSingUpBar';
import SingIn from "./SingIn";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";

function App() {
  return (
    <div className="App">
      {/* <SingInSingUpBar/>
      <br/> */}
      <HeadBar/>
      {/* <SingIn/> */}
      <TrolloList/>
    </div>
  );
}

export default App;

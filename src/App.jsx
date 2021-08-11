import React from 'react' ;
import {Switch, Route} from 'react-router-dom' ;
import Form from './components/Home/Form/Form';
import UpdateForm from './components/Home/Form/UpdateForm/UpdateForm';
import Home from './components/Home/Home';
import Navbar from './components/Home/Navbar/Navbar';
import Table from './components/Home/Table/Table';


const App = () => {

return (
    <>
    <Navbar/>
    <Switch>
        <Route path="/" exact component = {Home}/>
        <Route path="/form" exact component = {Form}/>
        <Route path="/table" exact component={Table} />
        <Route path="/update/:email" exact component={UpdateForm}/>
    </Switch>
    </>
)
}


export default App ;
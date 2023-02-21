import './App.css';
import NavBar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactList from './components/ContactList/contact_list';
import Details from './components/Details/details';
import Error from './components/Error/error';
import AddContact from './components/AddContact/addContact';

function App() {

  const navLabels = [
    {title: 'Contacts', mainCallback: null, subCallback: null, sub: [{title: 'List', path:'/'}, {title:'Add', path:'/contact/add'}]}
  ]

  return (
    <div className="App">
      <BrowserRouter>
        <div className='nav'>
          <NavBar labels={navLabels}></NavBar>
        </div>
        <div className='content'>
          <Routes>
            <Route
            element={<ContactList></ContactList>}
            path="/"
            ></Route>
            <Route
            element={<AddContact/>}
            path="/contact/add"
            ></Route>
            <Route
            element={<Error/>}
            path="*"
            ></Route>
            <Route
            element={<Details/>}
            path="/contact/:id"
            ></Route>
            <Route
            element={<Error/>}
            path="*"
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

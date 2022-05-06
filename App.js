import './App.css';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddBook from './components/addBook';
import Booklist from './components/Booklist';
import AddAuthor from './components/addAuthor';


function App() {
  return (
    <div className="App">
      {/* <BrowserRouter > */}
       <Nav /> 
      <Routes>
        <Route>
        <Route path="/" element={<Booklist />} />
        {/* <Route path="/add" element={<Author />} /> */}
        <Route path="/add" element={<AddBook />} />
        <Route path="/add" element={<AddAuthor />} />
        <Route path="/update/:id" element={<h1>Update Book</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      {/* </BrowserRouter> */}
      { <Footer /> }
    </div>
  );
}

export default App;

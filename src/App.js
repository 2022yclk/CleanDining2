import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import AdminLogin from './pages/AdminLogin';
import NearestRest from './pages/NearestRest';
import SearchRest from './pages/SearchRest';
import FindGps from './components/FindGps.js';
import ShowParty from './components/ShowParty.js';
import FindPeopleWith from './components/FindPeopleWith.js';
import WatchDetailInfo from './components/WatchDetailInfo.js';
import WriteReview from './components/WriteReview.js';
import CreateNewParty from './components/CreateNewParty.js'
import Form from './pages/Form.js'
import AdminPage from './pages/AdminPage';
import ShowReview from './components/ShowReview.js'; // add show Review new
import SearchParty from './pages/SearchParty.js';
import PartyGen from './pages/PartyGen.js';
import Info from './pages/Info.js';
import Review from './pages/Review.js';
import JoinParty from './pages/JoinParty.js';
import Mypage from './pages/Mypage.js';

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Login/>} />
       <Route path="/Signup" element={<Signup/>} />
       <Route path="/Main" element={<Main/>} />
       <Route path="/AdminLogin" element={<AdminLogin/>} />
       <Route path="/AdminPage" element={<AdminPage/>} />
       <Route path="/NearestRest/" element={<NearestRest/>} />
       <Route path="/SearchRest/" element={<SearchRest/>} />
       <Route path="/parentLocation" element={<FindGps />}></Route>
       <Route path="/findPeopleWith/:id/:key/:addr/:addr2/:grade/:phone/:cat" element={<FindPeopleWith />}></Route>
       <Route path="/watchDetailInfo/:id/:key/:addr/:addr2/:grade/:phone/:cat" element={<WatchDetailInfo />}></Route>
       <Route path="/showParty/:key/:postid" element={<ShowParty />}></Route>
       <Route path="/writeReview/:id/:key" element={<WriteReview />}></Route>
       <Route path="/showReview/:key/:reviewid" element={<ShowReview />}></Route>
       <Route path="/createNewParty/:id/:key" element={<CreateNewParty/>}></Route>
       <Route path="/form" element={<Form/>}></Route>
       <Route path="/admin" element={<AdminPage/>} />
       <Route path="/SearchParty/:id/:key/:addr/:addr2/:grade/:phone/:cat" element={<SearchParty />} />
       <Route path="/PartyGen/:id/:key" element={<PartyGen />} />
       <Route path="/Info/:id/:key/:addr/:addr2/:grade/:phone/:cat" element={<Info />} />
       <Route path="/Review/:id/:key" element={<Review />} />
       <Route path="/JoinParty/:key/:postid" element={<JoinParty />}></Route>\
       <Route path="/Mypage" element={<Mypage />}/>
      </Routes>
    </Router>
  )
}

export default App;

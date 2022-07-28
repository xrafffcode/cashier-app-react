import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { NavbarComopenent } from './components';
import { Home, Sukses } from './pages';

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComopenent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sukses" element={<Sukses />} />
          </Routes>
        </main>
      </Router>
    )
  }
}

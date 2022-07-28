import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { NavbarComopenent } from './components'
import { Home, Sukses } from './pages'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComopenent />
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/sukses" component={Sukses} exact />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}
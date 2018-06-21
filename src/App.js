import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Add from './components/Add';
import Home from './components/Home';
import Find from './components/Find';
import Delete from './components/Delete';

export default class App extends React.Component {
    render() {
        return (
          <Router>
            <div className="App">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link to="/" className="navbar-brand">
                      <code>Go Books</code>
                    </Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to="/find">Find</Link></li>
                    <li><Link to="/add">Add</Link></li>
                    <li><Link to="/delete">Delete</Link></li>
                    <li className="disabled"><Link to="/">Update</Link></li>
                  </ul>
                </div>
              </nav>
              
              <div align="center" className="App-intro">
              </div>

              <Switch>
                {/* <div> */}
                  <Route exact path='/' component={Home} />
                  <Route exact path='/find' component={Find} />
                  <Route path='/add' component={Add} />
                  <Route path='/delete' component={Delete} />
                {/* </div>   */}
              </Switch>

              </div>
            </Router>
      );
    }
  }

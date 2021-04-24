import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// *Functions
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// *Components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import ConfirmDelete from './components/ConfirmDelete';

// * Functions to Inject context
// Class based component require context injection, this was a one-off for experience
const UserSignInWithContext = withContext(UserSignIn);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Courses}></Route>
          <PrivateRoute path="/courses/create" component={CreateCourse}></PrivateRoute>
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse}></PrivateRoute>
          <Route exact path="/courses/:id" component={CourseDetail}></Route>
          <PrivateRoute exact path="/courses/:id/delete" component={ConfirmDelete}></PrivateRoute>
          <Route exact path="/signin" component={UserSignInWithContext}></Route>
          <Route exact path="/signup" component={UserSignUp}></Route>
          <Route exact path="/signout" component={UserSignOut}></Route>
          {/* Handle errors */}
          <Route exact path="/forbidden" component={Forbidden} />
          <Route exact path="/notfound" component={NotFound} />
          <Route exact path="/error" component={UnhandledError} />
          {/* 404 */}
          <Route render={() => <Redirect to={'/notfound'} />} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;

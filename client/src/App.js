import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// *Components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Courses}></Route>
          <Route exact path="/courses/create" component={CreateCourse}></Route>
          <Route exact path="/courses/:id/update" component={UpdateCourse}></Route>
          <Route path="/courses/:id" component={CourseDetail}></Route>
          <Route exact path="/signin" component={UserSignIn}></Route>
          <Route exact path="/signup" component={UserSignUp}></Route>
          <Route exact path="/signout" component={UserSignOut}></Route>
          {/* Handle 404 requests */}
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;

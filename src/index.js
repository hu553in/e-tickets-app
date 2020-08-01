import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AuthProvider } from './components/index';
import { ROUTES } from './constants';
import { MainLayout, UnauthorizedLayout } from './layouts/index';
import {
  AddExistingTicket,
  GenerateNewTicket,
  IssuedTickets,
  IssueTicket,
  Main,
  SignIn,
} from './pages/index';
import store from './store';
import './style.scss';

const renderMainLayout = (ChildComponent) => (
  <MainLayout><ChildComponent /></MainLayout>
);
const renderUnauthorizedLayout = (ChildComponent) => (
  <UnauthorizedLayout><ChildComponent /></UnauthorizedLayout>
);
ReactDOM.render(
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={ROUTES.SIGN_IN}>
            {renderUnauthorizedLayout(SignIn)}
          </Route>
          <Route exact path={ROUTES.DEFAULT}>
            {renderMainLayout(Main)}
          </Route>
          <Route path={ROUTES.ISSUE_TICKET}>
            {renderMainLayout(IssueTicket)}
          </Route>
          <Route path={ROUTES.GENERATE_NEW_TICKET}>
            {renderMainLayout(GenerateNewTicket)}
          </Route>
          <Route path={ROUTES.ADD_EXISTING_TICKET}>
            {renderMainLayout(AddExistingTicket)}
          </Route>
          <Route path={ROUTES.ISSUED_TICKETS}>
            {renderMainLayout(IssuedTickets)}
          </Route>
          <Route>
            <Redirect to={ROUTES.DEFAULT} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  </AuthProvider>,
  document.getElementById('root'),
);

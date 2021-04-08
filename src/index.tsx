import 'normalize.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/index';
import { ROUTES } from './constants';
import './effector/init';
import withParentComponent from './hoc/withParentComponent';
import { MainLayout, UnauthorizedLayout } from './layouts/index';
import {
  AddExistingTicket,
  GenerateNewTicket,
  IssuedTickets,
  IssueTicket,
  Lottery,
  Main,
  SignIn,
} from './pages/index';
import './style.scss';
import './utils/setupI18next';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.SIGN_IN}>
          {withParentComponent(SignIn, UnauthorizedLayout)}
        </Route>
        <Route exact path={ROUTES.DEFAULT}>
          {withParentComponent(Main, MainLayout)}
        </Route>
        <Route path={ROUTES.ISSUE_TICKET}>
          {withParentComponent(IssueTicket, MainLayout)}
        </Route>
        <Route path={ROUTES.GENERATE_NEW_TICKET}>
          {withParentComponent(GenerateNewTicket, MainLayout)}
        </Route>
        <Route path={ROUTES.ADD_EXISTING_TICKET}>
          {withParentComponent(AddExistingTicket, MainLayout)}
        </Route>
        <Route path={ROUTES.ISSUED_TICKETS}>
          {withParentComponent(IssuedTickets, MainLayout)}
        </Route>
        <Route path={ROUTES.LOTTERY}>
          {withParentComponent(Lottery, MainLayout)}
        </Route>
        <Route>
          <Redirect to={ROUTES.DEFAULT} />
        </Route>
      </Switch>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);

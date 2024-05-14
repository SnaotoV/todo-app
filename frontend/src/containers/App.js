import '../styles/App.scss';
import { connect } from 'react-redux';
import Home from './page/Home';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
function App(props) {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Switch>
          <Route path={'/'} exact component={(Home)} />
        </Switch>
      </div>
      <ToastContainer></ToastContainer>
    </BrowserRouter>
  );
}
const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

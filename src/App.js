
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import NewsList from './components/news/NewsList';
import NewsDetails from './components/news/NewsDetails';
import ScrollToTop from './components/misc/scrollToTop';


import Container from 'react-bootstrap/Container';
import PageNotFound from './components/misc/pageNotFound';
function App() {
  return (
    <div className="App">
       <Header />
      <Container>
      <Router>
      <ScrollToTop />
      <Switch>
      <Route path="/" exact component={NewsList} />
      <Route path="/news/:newsId" exact component={NewsDetails} />
      <Route path="/search/:value" exact component={NewsList} />
      <Route component={PageNotFound}></Route>
      </Switch>
      </Router>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

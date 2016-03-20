import { Router, Route } from 'react-router';
import { connect } from 'react-redux';

// It expects a factory function that it can inject dependencies into.
export default ({ React }) => {

  const Home = React => {
    const component = ({ title }) => {
      return (<h1 className="title">{ title }</h1>);
    };

    const mapStateToProps = (state) => {
      const { title } = state;
      return { title };
    };

    return connect(mapStateToProps)(component);
  };

  const Data = React => {
    const component = ({ data }) => <div className="data">{ data }</div>;

    const mapStateToProps = (state) => {
      const { data } = state;
      return { data };
    };

    return connect(mapStateToProps)(component);
  };

  return (
    <Router>
      <Route path="/" component={ Home(React) } />
      <Route path="/data" component={ Data(React) } />
    </Router>
  );
};

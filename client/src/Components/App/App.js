import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Nav from '../Nav/Nav';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import './App.scss';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
})

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="App">
					<Nav />
					<Switch>
						<Route exact path="/" component={Home}/>	
						<Route path="/signup" render={() => <Auth path="/signup"/>}/>
						<Route path="/login" render={() => <Auth path="/login"/>}/>
					</Switch>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
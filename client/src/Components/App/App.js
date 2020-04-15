import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import Nav from '../Nav/Nav';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import './App.scss';


const client = new ApolloClient({
    link: createHttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include"
    }),
    cache: new InMemoryCache()
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="app">
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
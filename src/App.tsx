import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import DashboardPage from "./pages/Dashboard";
import AlphaTestingPage from "./pages/AlphaTesting";
import Leaderboard from "./pages/Leaderboard";
import ConnectBrokerPage from "./pages/ConnectBroker";
import InsightsPage from "./pages/Insights";
import AdminPage from "./pages/Admin";
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/SignIn";
import CheckoutCompletePage from "./pages/CheckoutComplete";
import ProductListingsPage from "./pages/ProductListings";
import LogoutPage from "./pages/LoggedOut";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL, //'/graphql',
});


// setContext allows addition of the auth token to the auth header
// TODO: upon each sign in, get the token and put it in local
// storage ? 
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/itr-sass" element={<ItrSassPage />} /> */}
            <Route path="/dash" element={<DashboardPage />} />
            <Route path="/connect-broker" element={<ConnectBrokerPage />} />
            <Route path="/alphatesting" element={<AlphaTestingPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/product-listing" element={<ProductListingsPage />} />
            <Route
              path="/checkout-complete"
              element={<CheckoutCompletePage />}
            />
          </Routes>
        </ApolloProvider>

        <Footer />
      </Router>
    </div>
  );
}

export default App;

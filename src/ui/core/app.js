import React, { Component, Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Router } from '@reach/router'
import client from './client'

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Fragment>
          <h1>App</h1>
          <React.Suspense fallback={<div>Loading</div>}>
            <Router>
              <Home path="/" />
              <About path="/about" />
              <Contact path="/contact" />
            </Router>
          </React.Suspense>
        </Fragment>
      </ApolloProvider>
    )
  }
}

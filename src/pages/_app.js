import App from 'next/app';
import "../styles/index.scss"
import {Provider} from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../redux';

class Main extends App {
    render() {
        //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps} = this.props;

        if(store) {
            return (
                <Provider store={store}>
                    <Component {...pageProps}/>
                </Provider>
            );
        }

        return <div />
    }
}
//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(Main);
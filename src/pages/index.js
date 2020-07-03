import Layout from 'Components/layouts/layout';
import TopGrossing from 'Components/TopGrossing';
import TopFree from 'Components/TopFree';
import { connect } from 'react-redux';
import React from 'react';
const axios = require('axios');

import { showLoadingIndicator } from 'src/redux/action/main';

import Router, { withRouter } from 'next/router'

const fetchHeader = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain',
    "Access-Control-Allow-Credentials" : true 
});

class Home extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            scrollHeight: 0
        };

    }

    componentDidMount() {
        window.addEventListener("scroll", () => this.handleScroll());
       
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", () => this.handleScroll());
    }

    componentWillReceiveProps(nextProps) {
        let { props } = this;
        if(!props.router.query.items || nextProps.router.query.items != props.router.query.items ) {
            setTimeout(() => {          
                window.scrollTo(0, this.state.scrollHeight);
            }, 10);
        }

    } 

    handleScroll() {
        let { props } = this;
        let { searchKeyword } = props;
        let query = props.router.query
        let items = query.items || 10

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight && items < 100 && searchKeyword == "") { 
            let indicatorHeight = html.scrollHeight - windowHeight / 2
            this.setState({scrollHeight: indicatorHeight})
            this.props.dispatch(showLoadingIndicator(true))
            if(document.getElementById("loading-indicator")) {
                document.getElementById("loading-indicator").style.top = indicatorHeight + 'px';
            }        
            const currentPath = props.router.pathname;
            items = parseInt(items) + 10
            props.router.push({
                pathname: currentPath,
                query: 'items=' + items,
            });

            
        } 
    }

    render() {
        let { props } = this;
        let { searchKeyword, topGrossingData, topFreeData } = props;

        return (
            <Layout title="Top grossing & free apps"> 
                <TopGrossing data={topGrossingData} filterString={searchKeyword} />
                <TopFree data={topFreeData} filterString={searchKeyword} />   
            </Layout>
        );
    }
}

Home.getInitialProps = async ({ query, store }) => {
    // fetch API pre-render
    // useful for SEO.

    const items = query.items || 10;

    const [topGrossingData, topFreeData] = await Promise.all([
        fetch(`https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json`)
        .then(r => r.json())
        .then(data => data.feed.results),
        fetch(`https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/${items}/explicit.json`)
        .then(r => r.json())
        .then(async (data)=> {
            let results = data.feed.results
            await Promise.all(results.map(async (result) => { 
                result.detail = await fetch(`https://itunes.apple.com/hk/lookup?id=${result.id}`)
                .then(detail => detail = detail.json())
                .then(detail => detail = detail.results[0])
            }))
            store.dispatch(showLoadingIndicator(false))
            return results
        })
    ]);

    return { topGrossingData, topFreeData };
};

const mapStateToProps = (state, ownProps) => {

    return {
        searchKeyword: state.main.searchKeyword,
        itemPerPage: state.main.itemPerPage
    }
}

export default connect(mapStateToProps)(withRouter(Home));
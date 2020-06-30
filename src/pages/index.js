import Layout from 'Components/layouts/layout';
import TopGrossing from 'Components/TopGrossing';
import TopFree from 'Components/TopFree';
import { connect } from 'react-redux';
import React from 'react';

class Home extends React.Component {

    render() {
        let { props } = this;
        let { searchKeyword, topGrossingData, topFreeData } = props;
        console.log("topGrossingData", topGrossingData)
        console.log("topFreeData", topFreeData)

        return (
        <Layout title="Top grossing & free apps">
            <TopGrossing data={topGrossingData} filterString={searchKeyword} />
            <TopFree data={topFreeData} filterString={searchKeyword} />
           
        </Layout>
        );
    }
}

Home.getInitialProps = async function(context) {
    // fetch API pre-render
    // useful for SEO.
    const [topGrossingData, topFreeData] = await Promise.all([
        fetch('https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json')
        .then(r => r.json())
        .then(data => data.feed.results),
        fetch('https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/10/explicit.json')
        .then(r => r.json())
        .then(async (data)=> {
        let results = data.feed.results
        await Promise.all(results.map(async (result) => { 
            result.detail = await fetch(`https://itunes.apple.com/hk/lookup?id=${result.id}`)
            .then(detail => detail = detail.json())
            .then(detail => detail = detail.results[0])
        }))
        return results
        })
    ]);

    return { topGrossingData, topFreeData };
};

const mapStateToProps = (state, ownProps) => {

    console.log("state", state)
    return {
        searchKeyword: state.main.searchKeyword
    }
}

export default connect(mapStateToProps)(Home);
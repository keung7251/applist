import { connect } from 'react-redux';
import React from 'react';
import { updateSearchKeyword } from 'src/redux/action/main';

class Header extends React.Component {

    render() {
        console.log("searchKeyword", this.props.searchKeyword)

        return (
            <header>
                <div>
                    <input 
                        type="text" 
                        className="form-control search-input" 
                        placeholder="&#xF002; 搜尋" 
                        onChange={(e)=> {
                            this.props.dispatch(updateSearchKeyword(e.target.value))
                        }}  
                    />
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        searchKeyword: state.main.searchKeyword
    }
}

export default connect(mapStateToProps)(Header);
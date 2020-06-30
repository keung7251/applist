
class TopGrossing extends React.Component {

    filterDataByString(item) {
        // only shows the apps whose app name, category, author or summary contains the keyword
        let filterString = this.props.filterString.toUpperCase()
        let categoryName = ""
        for(let i = 0; i < item.genres.length; i++) {
            if(i < 2) {
                categoryName += item.genres[i].name + " "
            }
        }

        if(
            item.artistName.includes(filterString) ||
            item.name.includes(filterString) ||
            item.kind.includes(filterString) ||
            item.copyright.includes(filterString) || 
            categoryName.includes(filterString) 
        ) {
            return item
        }
     
    }

    render() {

        return (
            <div id="top-grossing">
                <h1>推介</h1>
                <div className="top-grossing-container">
                {
                    this.props.data.filter((item)=> this.filterDataByString(item)).map((item, index)=> {

                        let categoryName = ""
                        for(let i = 0; i < item.genres.length; i++) {
                            if(i < 2) {
                                if(i != 0) categoryName += '和'
                                categoryName += item.genres[i].name
                            }
                        }
                        
                        return (
                            <div key={index} className="top-grossing-item-contrainer flex-center">
                                <div className="item-image-container">
                                    <img src={item.artworkUrl100} className="img-rounded"/>
                                </div>
                                <div className="item-text-container">
                                    <p className="title"> 
                                        {item.name}
                                    </p>
                                    <p className="category"> 
                                        {categoryName}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}


export default TopGrossing;
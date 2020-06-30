
import Rating from 'react-rating';

class TopFree extends React.Component {

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
            item.detail.description.includes(filterString) || 
            categoryName.includes(filterString) 
        ) {
            return item
        }
     
    }

    render() {
        return (
            <div id="top-free">
                {
                    this.props.data.filter((item)=> this.filterDataByString(item)).map((item, index)=> {
                        let categoryName = ""
                        for(let i = 0; i < item.genres.length; i++) {
                            if(i < 2) {
                                if(i != 0) categoryName += '和'
                                categoryName += item.genres[i].name
                            }
                        }

                        let ratingPoint = parseFloat(item.detail.contentAdvisoryRating.replace("+", ".5"));  
                
                        return(
                            <div className="top-free-container flex-center" key={index}>
                                <p className="flex-center item-order-container">{index + 1}</p>
                                <div className="flex-center item-image-container">
                                    <img src={item.artworkUrl100} className={(index % 2 == 0) ? "rounded" : "rounded-circle"} />
                                </div>  
                                <div className="item-detail-container">  
                                    <h2>{item.name}</h2>
                                    <p> 
                                        {categoryName}
                                    </p>
                                    <Rating 
                                        readonly  
                                        initialRating={ratingPoint} 
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        className="rating"
                                    />
                                </div>  
                            </div>
                        )    
                    })
                }
            </div>
        )
    }
}

export default TopFree;
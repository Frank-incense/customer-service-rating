import Header from "../components/Header";

function Review(){
    return(
        <main className="container">
            <Header/>
            <div className="body">
                <div className="top">
                    <h6>Company()</h6>
                    <div className="sort">
                        <span>
                            Sort by: {" "}
                            <select name="sort" id="sort">
                                <option value="recent">Most recent</option>
                                <option value="reviews">Most reviews</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className="reviews">
                    {<div className="review">
                        <div className="info">
                            <div className="image">
                                <img src="/public/shell-seeklogo.png" alt="" />
                            </div>
                            <div className="company">
                                <h4>Company name</h4>
                                <div className="rating_count">
                                    <div className="stars">
                                        
                                    </div>
                                    <p>number of reviews</p>
                                </div>
                            
                            </div>
                        </div>
                        <p className="location">Location</p>
                        
                    </div>}
                </div>
            </div>
        </main>
    )
}

export default Review
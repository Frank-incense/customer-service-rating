
function HomePage(){
    
    return (
        <main className="container">
            <div className="header">
                <h2>Measure. Improve. Delight.</h2>
                <h5>Your one-stop platform for collecting, analyzing, and improving customer service experiences.</h5>
                <div className="search">
                    <form action="">
                        <div className="formGroup">
                            <input type="search" name="search" id="search" />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="line">
            </div>
            <div className="sep">
                <span>Write a review of a product you have bought</span>
            </div>
            <div className="categories">
                <h4>Categories</h4>
                <ul>
                    <li className="category">Banking and Financial Services</li>
                    <li className="category">Food & Beverage</li>
                    <li className="category">Retail & Shops</li>
                    <li className="category">Health & Wellness</li>
                    <li className="category">Telecommunication</li>
                    <li className="category">Transport and logistics</li>
                    <li className="category">Hotel & Hospitality</li>
                </ul>
            </div>
            <div className="cta">
                <h4>Looking to get feedback?</h4>
                <p>Get started with us and receive feedback from your customers.</p>
                <button>Get Started</button>
            </div>
            <div className="business_reviews">
                <div className="review_head d-flex">
                    <h4>Business reviews</h4>
                    <button>See more</button>
                </div>
                <div className="review_body">

                </div>
            </div>
            <div className="customer_reviews">
                <div className="review_head d-flex">
                    <span><h4>Recent reviews</h4></span>
                    <button>See more</button>
                </div>
                <div className="review_body">

                </div>
            </div>
        </main>
    )
}

export default HomePage
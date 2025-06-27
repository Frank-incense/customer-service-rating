function Card(){
    return (
        <>
            <div className="card">
                <img src="" alt="company logo" />
                <h4 className="name"></h4>
                <div className="rating">
                    <div className="stars"></div>
                    <span className="average"></span>
                    <span className="review_count"></span>
                </div>
            </div>
        </>
    )
}

export default Card
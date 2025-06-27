import { useState } from "react";
import OffCanvas from "./OffCanvas";
import { Button } from "react-bootstrap";

function Header(){
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
        <>
        <OffCanvas show={show} handleClose={handleClose}/>
        <div className="company_reviews">
            <h4>{} Reviews</h4>
            <div className="filters">
                <Button variant="outline-primary" onClick={handleShow}>
                    All filter
                </Button>
            </div>
        </div>
        </> 
    )
}

export default Header
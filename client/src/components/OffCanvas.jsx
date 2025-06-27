import { Button, ListGroup, Offcanvas } from 'react-bootstrap';


function OffCanvas({show, handleClose}) {
  
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>All filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div className="rating">
                <h5>Rating</h5>
                <ListGroup horizontal>
                    <ListGroup.Item action variant='secondary'>All</ListGroup.Item>
                    <ListGroup.Item action variant='secondary'>3+</ListGroup.Item>
                    <ListGroup.Item action variant='secondary'>4+</ListGroup.Item>
                    <ListGroup.Item action variant='secondary'>4.5+</ListGroup.Item>
                </ListGroup>
            </div>
            <div className="location">
                <h5>Location</h5>
                
                <select className='location'>
                    <option value="">{}</option>
                </select>

            </div>
            
        </Offcanvas.Body>
        <div className="footer d-flex">
            <Button>Reset</Button>
            <Button>Show Results</Button>
        </div>

      </Offcanvas>
    </>
  );
}

export default OffCanvas;
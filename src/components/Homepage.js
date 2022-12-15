import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
 import STATIC from "../images/STATIC.jpg"

export const Homepage = () =>{
    return(

      <div>
        <img className="splashImage" src={STATIC}></img>      
        <Container id="Homepage" fluid>
                
            <Row >
                <Col style={{marginTop:"20vh"}} >
                    <Card >
                        <Card.Img variant="top"src="https://media.newyorker.com/photos/5dd6be9a6424850008eca793/16:9/w_1280,c_limit/Hutson-CrimeStatistics.jpg"></Card.Img>
                    </Card>
                </Col>
                <Col >
                    <Card style={{marginTop:"24vh", backgroundColor:"#FFB81C"}} >
                        <Card.Body>
                            <Card.Title><h2> A B O U T </h2></Card.Title>
                            <Card.Text className="hpcard"><h4>Static is intended to be used as an educational resource for the public. Accurately depicting crime within the United States and how it changes over time. In its current state Static displays crime data from prior years at a state level. Static is a tool to visualize severity of categorical crimes within your area and neighboring states. Modern day crime reporting can be misleading, so our application aims to inform our users by providing unbiased statistics</h4></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop:"20vh"}}>
                <Col >
                    <Card style={{marginTop:"15vh", backgroundColor:"#FFB81C"}} >
                        <Card.Body>
                            <Card.Title><h2>T R A J E C T O R Y</h2></Card.Title>
                            <Card.Text className="hpCard"><h4>Looking forward we intend to render real time crime data and develop new technologies to help achieve our goals. We believe awareness of your communities safety is important and plan to provide users statistics at a county and local level</h4></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col style={{marginBottom:"20vh"}}>
                    <Card >
                        <Card.Img variant="top"src="https://images.seattletimes.com/wp-content/uploads/2017/07/web-csi-footsteps-portland.jpg?d=780x501"></Card.Img>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
      
       
    )
}

export default Homepage
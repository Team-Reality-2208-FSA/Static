import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

export const Homepage = () =>{
    return(
       
        <Container id="Homepage" fluid>
                    {/* <img className="splashImage" src="https://everytownresearch.org/wp-content/uploads/sites/4/2020/05/gg-web-assets_twitter-meta-1.png"></img> */}
                    {/* <img className="splashImage" src="https://www2.deloitte.com/content/dam/Deloitte/sg/Images/header_images/sea-fsi-financial-crime-management-banner.jpg"></img> */}
                    {/* <img className="splashImage" src="https://pinkerton.com/media/risk-snapshots/pcirs-us-1200.png"></img> */}
                    <img className="splashImage" src="https://www.stewardship.org.uk/sites/default/files/styles/hero/public/2021-06/blog-corporate-criminal-offence.png?h=c673cd1c&itok=MGgHaBps"></img>
                    <h1 id="STATIC">S T A T I C</h1>
            <Row >
                <Col style={{marginTop:"20vh"}} >
                    <Card >
                        <Card.Img variant="top"src="https://media.newyorker.com/photos/5dd6be9a6424850008eca793/16:9/w_1280,c_limit/Hutson-CrimeStatistics.jpg"></Card.Img>
                    </Card>
                </Col>
                <Col >
                    <Card style={{marginTop:"30vh", backgroundColor:"#FFB81C"}} >
                        <Card.Body>
                            <Card.Title>S T A T I C</Card.Title>
                            <Card.Text>Static is intended to be used as an educational resource for the public. Accurately depicting crime within the United States and how it changes over time. In its current state Static displays crime data from prior years at a state level. Static is a tool to visualize severity of categorical crimes within your area and neighboring states. Modern day crime reporting can be misleading, so our application aims to inform our users by providing unbiased statistics</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop:"20vh"}}>
                <Col >
                    <Card style={{marginTop:"15vh", backgroundColor:"#FFB81C"}} >
                        <Card.Body>
                            <Card.Title>A B O U T</Card.Title>
                            <Card.Text>Looking forward we intend to render real time crime data and develop new technologies to help achieve our goals. We believe awareness of your communities safety is important and plan to provide users statistics at a county and local level</Card.Text>
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
      
       
    )
}

export default Homepage
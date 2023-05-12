import React, { Fragment } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./style/Information.css"

const AboutUs = () => {
  return (
    <Fragment>
      <div className="container">
        <Card className="my-5">
          <CardBody>
            <CardTitle className="text-center mb-3"><h1>About Us</h1></CardTitle>
            <CardText>
              <p>
                At our company, we pride ourselves on having a good team of
                talented and dedicated individuals who work together to achieve
                our goals. Each member of our team brings their unique skills,
                experiences, and perspectives to the table, and we value and
                respect their contributions.
              </p>
              <p>
                Thank you for visiting our website! We are grateful for your
                time and attention, and we hope that you find the information
                and resources here helpful and informative.
              </p>

              <Card className="w-75 m-auto">
                <CardBody>
                  <CardTitle className="text-center mb-3">
                    <h2>Our team includes:</h2>
                  </CardTitle>
                  <CardText className="text-center">
                    <div className="team-list m-5">
                      <ul className="list-unstyled">
                        <li>
                          <Card className="team-card">
                            <CardBody>
                              <h3>Hend</h3>
                            </CardBody>
                          </Card>
                        </li>
                        <li>
                          <Card className="team-card">
                            <CardBody>
                              <h3>Nada</h3>
                            </CardBody>
                          </Card>
                        </li>
                        <li>
                          <Card className="team-card">
                            <CardBody>
                              <h3>Amany</h3>
                            </CardBody>
                          </Card>
                        </li>
                        <li>
                          <Card className="team-card">
                            <CardBody>
                              <h3>Mohamed</h3>
                            </CardBody>
                          </Card>
                        </li>
                        <li>
                          <Card className="team-card">
                            <CardBody>
                              <h3>Montaser</h3>
                            </CardBody>
                          </Card>
                        </li>
                      </ul>
                    </div>
                  </CardText>
                </CardBody>
              </Card>

              <p>
                Our team has put a lot of effort and love into creating this
                site, and we are excited to share it with you. If you have any
                feedback or suggestions for us, please don't hesitate to reach
                out. We appreciate your support and hope to see you again soon!
              </p>
            </CardText>
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};

export default AboutUs;
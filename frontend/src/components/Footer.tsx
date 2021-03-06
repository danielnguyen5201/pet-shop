import React from 'react'
import {Col, Container, Row} from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Puppy Store
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

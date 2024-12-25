import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../Search/search.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const Search = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    return (
        <>
            <section className="box-search-advance">
                <Container>
                    <Row>
                        <Col md={12} xs={12}>
                            <div className="box-search shadow-sm">

                                <div className="item-search item-search-2">
                                    <label className="item-search-label"> Pick-up date </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}

                                        dateFormat="dd, MMMM, yyyy"
                                     />
                                </div>
                                <div className="item-search item-search-2">
                                    <label className="item-search-label"> Drop-off date </label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={endDate}
                                        endDate={startDate}
                                        dateFormat="dd, MMMM, yyyy"
                                    />
                                </div>

                                <button className="search-btn">
                                    Find a Vehicle
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Search;
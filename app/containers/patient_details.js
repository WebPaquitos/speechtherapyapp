import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/lib/fa';
import { ROUTES } from '../common/constants';
import { fetchPatient } from '../actions';

class PatientDetails extends Component {
    componentWillMount() {
        this.props.fetchPatient(this.props.match.params.id);
    }

    renderPatientHistory() {
        const { history } = this.props.patient;
        if (!history) return null;
        return history.map((patientCase) => {
            const { _id, score, scoreLabelAspiracao, scoreLabelDisfagia } = patientCase;
            return (
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{score}</td>
                    <td>{scoreLabelAspiracao}</td>
                    <td>{scoreLabelDisfagia}</td>
                    <td>
                        <Link to={`${ROUTES.HISTORY}/${_id}`}>{FaEye()}</Link>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { patient } = this.props;
        if (!patient) return <div>Loading...</div>;
        const patientBirthdate = new Date(patient.birthdate);
        return (
            <div className="content">
                <Row>
                    <Col xs="12">
                        <h1 className="push-down">Patient Details</h1>
                        <Row>
                            <Col xs="12" className="push-down">
                                <h3 className="text-primary"><strong>{patient.id}</strong> - {patient.name}</h3>
                                <small className="text-muted">
                                    {`${patientBirthdate.getDate()}/${patientBirthdate.getMonth()}/${patientBirthdate.getFullYear()}`}
                                </small>
                                <p className="lead">Additional data: {patient.description}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <h1 className="push-down">Patient Evaluation History</h1>
                        <Row>
                            <Col xs="12">
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Score</th>
                                            <th>Dysphagia Category</th>
                                            <th>Aspiration Category</th>
                                            <th/>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPatientHistory()}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps({ patients }, ownProps) {
    return {
        patient: patients[ownProps.match.params.id],
    };
}

export default connect(mapStateToProps, { fetchPatient })(PatientDetails);
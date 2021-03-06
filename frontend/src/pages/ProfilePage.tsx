import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, updateUserProfile} from "../state/actionCreators";
import {RootState} from "../state/store";
import {useHistory} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@material-ui/core";
import * as yup from "yup";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {UserDetails} from "../models/user";

const validationSchema = yup.object({
    name: yup.string().required().max(20),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPw: yup.string().required('Confirm password is a required field')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const ProfilePage: React.FC = () => {
    const [success, setSuccess] = useState<boolean>(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const {userInfo, error, loading} = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (userInfo) dispatch(getUserDetails(userInfo.token))
        else history.push('/login')
    }, [dispatch, userInfo, history])

    return (
        <Row className="justify-content-center">
            <Col xs={12} sm={4}>
                <h3 className="font-weight-normal">Profile</h3>
                {error && <Message variant="danger">{error}</Message>}
                {(success && !loading) && <Message variant="success">Profile Updated</Message>}
                {loading && <Loader/>}
                <Formik
                    validateOnChange={false}
                    validateOnBlur={true}
                    initialValues={{
                        name: userInfo?.name,
                        email: userInfo?.email,
                        password: '',
                        confirmPw: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (data) => {
                        if (userInfo) {
                            const updateUser: UserDetails = {
                                ...userInfo,
                                name: data.name!,
                                email: data.email!,
                                password: data.password
                            }
                            await dispatch(updateUserProfile(updateUser))
                            if(!error) setSuccess(true)
                        }
                    }}
                >
                    {({values, errors}) => (
                        <Form autoComplete="off">
                            <Field placeholder="Name" name="name" type="input" as={TextField}
                                   fullWidth style={{margin: 10}} error={!!errors.name}
                                   helperText={errors.name}/>
                            <Field placeholder="Email" name="email" type="input" as={TextField}
                                   fullWidth style={{margin: 10}} error={!!errors.email}
                                   helperText={errors.email}/>
                            <Field placeholder="Password" name="password" type="password"
                                   as={TextField} fullWidth style={{margin: 10}}
                                   error={!!errors.password} helperText={errors.password}/>
                            <Field placeholder="Confirm Password" name="confirmPw" type="password"
                                   as={TextField} fullWidth style={{margin: 10}}
                                   error={!!errors.confirmPw} helperText={errors.confirmPw}/>
                            <Button variant="contained" color="primary" type="submit"
                                    style={{margin: 8}}>
                                Update
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Col>
            <Col xs={12} sm={8}>
                <h3 className="font-weight-normal">My Orders</h3>
            </Col>
        </Row>
    );
};

export default ProfilePage;

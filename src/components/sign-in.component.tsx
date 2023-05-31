import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export type SignInProps = {
    setLoggedIn(loggedIn: boolean) : void
}

export function SignIn(props: SignInProps) {
    const navigate = useNavigate()
    const [requiredNavigation, setRequiredNavigation] = useState<string>("/")

    useEffect(() => {
        if (requiredNavigation != "/"){
            navigate(requiredNavigation, { replace: true })
        }
    }, [requiredNavigation]);

    const [message, setMessage] = useState<string>();

    function validationSchema() {
        return Yup.object().shape({
            username: Yup.string().required("This field is required!"),
            password: Yup.string().required("This field is required!"),
        });
    }

    function handleLogin(formValue: { username: string; password: string }) {
        const { username, password } = formValue;
        setMessage("");

        AuthService.signIn(username, password).then(
            response => {
                props.setLoggedIn(true)

                setRequiredNavigation("/transactions")
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
            }
        );
    }

    const initialValues = {
        username: "",
        password: "",
    };

    return <div className="col-md-12">
        <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"/>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Field name="username" type="text" className="form-control" />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    </div>
}

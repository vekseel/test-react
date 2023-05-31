import { ErrorMessage, Field, Form, Formik } from "formik";
import AuthService from "../services/auth.service";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type SignInProps = {
    setLoggedIn(loggedIn: boolean) : void
}

export function SignUp(props: SignInProps){
    const navigate = useNavigate()
    const [requiredNavigation, setRequiredNavigation] = useState<string>("/")

    useEffect(() => {
        if (requiredNavigation != "/"){
            navigate(requiredNavigation, { replace: true })
        }
    }, [requiredNavigation]);

    const initialValues = {
        email: "",
        password: "",
        username: ""
    };

    const [message, setMessage] = useState<string>();
    const [successful, setSuccessful] = useState<boolean>();

    function validationSchema() {
        return Yup.object().shape({
            email: Yup.string()
                .email("This is not a valid email.")
                .required("This field is required!"),
            password: Yup.string()
                .test(
                    "len",
                    "The password must be between 6 and 40 characters.",
                    (val: any) =>
                        val &&
                        val.toString().length >= 6 &&
                        val.toString().length <= 40
                )
                .required("This field is required!"),
        });
    }

    function handleRegister(formValue: { username: string; email: string; password: string }) {
        const { username, email, password } = formValue;

        setMessage("")
        setSuccessful(false)

        AuthService.signUp(
            username,
            email,
            password
        ).then(
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


                setMessage(resMessage)
                setSuccessful(false)
            }
        );
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username"> Username </label>
                                    <Field name="username" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email"> Email </label>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password"> Password </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

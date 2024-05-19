import React, { useContext, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SuperContext } from "../../Context/SuperContext";
import { BallTriangle } from 'react-loader-spinner'
import { AdminContext } from "../../Context/AdminContext";

function Login() {
    let [error, seterror] = useState(null);
    let [isloading, setIsLoading] = useState(false);
    let { setSuperToken ,setsuperName} = useContext(SuperContext);
    let { setAdminToken, setAdminOrganizationId,setAdminName } = useContext(AdminContext);

    let navigate = useNavigate();

    useEffect(() => {
        const storedAdminToken = localStorage.getItem('orgAdminToken');
        const storedAdminOrganizationId = localStorage.getItem('adminOrganizationId');
        const storedAdminName = localStorage.getItem('adminName');

        if (storedAdminToken && storedAdminOrganizationId && storedAdminName) {
            setAdminToken(storedAdminToken);
            setAdminOrganizationId(storedAdminOrganizationId);
            setAdminName(storedAdminName);
        }
    }, [setAdminToken, setAdminOrganizationId, setAdminName]);

    async function loginSubmit(values) {
        setIsLoading(true);
        try {
            let x = await axios.post(`https://seated-booking.onrender.com/users/signin`, values);
            if (x.data.message === 'success' && x.data.data.role === 'superAdmin') {
                setIsLoading(false);
                localStorage.setItem('superAdminToken', x.data.token);
                localStorage.setItem('supername', x.data.data.Username);
                setsuperName(x.data.data.Username);
                setSuperToken(x.data.token);
                navigate('/home');
            } else if (x.data.message === 'success' && (x.data.data.role === 'orgAdmin' || x.data.data.role === 'consumer')) {
                setIsLoading(false);
                localStorage.setItem('orgAdminToken', x.data.token);
                localStorage.setItem('adminOrganizationId', x.data.data.OrganizationID);
                localStorage.setItem('adminName', x.data.data.Username);
                setAdminToken(x.data.token);
                setAdminOrganizationId(x.data.data.OrganizationID);
                setAdminName(x.data.data.Username);
                navigate(`/homeorgadmin`);
            }
        } catch (error) {
            setIsLoading(false);
            seterror("Invalid email or password");
        }
    }

    let validationSchema = Yup.object({
        UserEmail: Yup.string().email('Invalid email address').required('Email is required'),
    })
    let formik = useFormik({
        initialValues: {
            UserEmail: '',
            UserPassword: ''
        }, validationSchema: validationSchema,
        onSubmit: loginSubmit
    });
    return <>

        <section className="bg-blue">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="bk-img">
                            <div className="layer d-flex align-items-center">
                                <div>
                                    <div className="d-flex align-items-center">
                                        <h5 className="P-sec ms-5 me-4">P</h5>
                                        <h5 className="Travel-sec">Travel</h5>
                                        <h5 className="Pro-sec">Pro</h5>
                                    </div>
                                    <div >
                                        <p className="span-sec ">The ultimate way for booking trips</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="form-sec mx-auto ">
                            <h5 className="Login-sec my-3">Log in </h5>
                            <div className="w-75 mx-auto py-3">
                                <form onSubmit={formik.handleSubmit}>
                                    <input value={formik.values.UserEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your email" type="email" name="UserEmail" id="UserEmail" className="inputs mb-4" />

                                    <input value={formik.values.UserPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your password" type="password" name="UserPassword" id="UserPassword" className="inputs mb-2" />
                                    {error ? <div className="alert p-2 mt-4 alert-danger text-center">{error}</div> : ''}
                                    {isloading ? <><button type="button" className="btnn fw-bolder"><BallTriangle
                                        height={25}
                                        width={50}
                                        radius={5}
                                        color="white"
                                        ariaLabel="ball-triangle-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    /></button> </> : <button type="submit" className="btnn fw-bolder">Login</button>}
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>

    </>
}

export default Login;
//   
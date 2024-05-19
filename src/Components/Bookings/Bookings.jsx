import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SuperContext } from '../../Context/SuperContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome, CiLogout } from "react-icons/ci";
import DuckImage from '../../imgs/Duck.png';
function Bookings() {
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    let { setSuperToken ,setsuperName} = useContext(SuperContext);
    let superName = localStorage.getItem('supername');

    async function getAllticket() {
        setLoading(false);
        return await axios.get(`https://seated-booking.onrender.com/ticket`);
    }
    const { data } = useQuery('getAllticket', getAllticket)

    if (loading) {
        return <div>Loading...</div>; // Render loading indicator until data is fetched
    }


    function logout() {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('supername');
        setSuperToken(null);
        setsuperName(null);
        navigate('/');
    }

    return <>
        <div className=' homeBg container-fluid'>
            <div className='row pb-3'>
                <div className='col-md-2 ms-4 mt-5 position-relative'>
                    <div>
                        <div className="d-flex align-items-center ms-2">
                            <h4 className='text-white p me-2'>P</h4>
                            <h5 className='text-black'>Travel</h5>
                            <h5 className='text-white'>Pro</h5>
                        </div>

                        <div className='d-flex mt-5'>
                            <div>
                                <img src={DuckImage} alt="Duck Image" />
                            </div>
                            <div className='align-self-center'>
                                <h4>Duck UI</h4>
                                <h6>{superName}</h6>
                            </div>
                        </div>

                        <div className='mt-5'>

                            <div>
                                <CiHome />
                                <Link to="/home" className='text-decoration-none text-dark ms-2'>Home</Link>
                            </div>
                            <div className='mt-3'>
                                <BsBuildings />
                                <Link to="/organizations" className='text-decoration-none text-dark ms-2'>Organizaiton</Link>
                            </div>
                            <div className='mt-3'>
                                <GiRoad />
                                <Link to="/trips" className='text-decoration-none text-dark ms-2'>Trips</Link>
                            </div>
                            <div className='mt-3'>
                                <FaBusAlt />
                                <Link to="/vehicles" className='text-decoration-none text-dark ms-2'>Vehicles</Link>
                            </div>
                            <div className='mt-3'>
                                <LuTicket />
                                <Link to="/bookings" className='text-decoration-none text-dark ms-2'>Bookings</Link>
                            </div>

                        </div>

                        <div className='position-absolute bottom-0 mb-4'>
                            <CiLogout />
                            <span onClick={() => logout()} className='text-decoration-none text-dark ms-2 cursor-pointer'>Logout</span>
                        </div>

                    </div>
                </div>


                <div className='col-md-9 ms-5 mt-5 dashboardBg rounded-3 p-4'>

                    <div>
                        <h4>All Bookings</h4>
                        {data?.data.data && Array.isArray(data?.data.data) && data?.data.data.map((orgs) => (
                            <div key={orgs.id} >
                                <h6 className='my-4 fw-bolder'>{orgs.Trip_ID.Trip_Start_Date}</h6>
                                <Link className='linknone' to={`/bookingdetails/${orgs._id}`}>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Trip ID</th>
                                                <th scope="col">Organization</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Boarding governrate</th>
                                                <th scope="col">Destination governrate</th>
                                                <th scope="col">PNR</th>
                                                <th scope="col">Seat price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">{orgs.Trip_ID.Trip_ID}</th>
                                                <td>{orgs.Trip_ID.Organization_ID.OrganizationName}</td>
                                                <td>{orgs.Passenger_Name}</td>
                                                <td>{orgs.Trip_ID.Boarding_Station.Governorate_Name}</td>
                                                <td>{orgs.Trip_ID.Destination_Station.Governorate_Name}</td>
                                                <td>{orgs.PNR}</td>
                                                <td>{orgs.Seat_Number.Seat_Price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Link>
                            </div>
                        ))}




                    </div>

                </div>


            </div>
        </div>
    </>
}

export default Bookings;

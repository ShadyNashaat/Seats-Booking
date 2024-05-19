import React, { useContext } from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate } from 'react-router-dom';
import { SuperContext } from '../../Context/SuperContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner'
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
function Organizations() {
    let superName = localStorage.getItem('supername');

    function getAllOrganizations() {
        const token = localStorage.getItem('superAdminToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.get(`https://seated-booking.onrender.com/org/all`, config);
    }
    let { data, isLoading } = useQuery('getallorganizations', getAllOrganizations)
    console.log(data);
    let navigate = useNavigate();
    let { setSuperToken ,setsuperName} = useContext(SuperContext);
    function logout() {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('supername');
        setsuperName(null);
        setSuperToken(null);
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
                                <img src={DuckImage} alt="Duck-Image" />
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

                    {isLoading ? <div className='w-100 py-5 d-flex justify-content-center'>
                        <BallTriangle
                            height={100}
                            width={100}
                            radius={5}
                            color="#4fa94d"
                            ariaLabel="ball-triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div> : <>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4>All organizations</h4>
                            </div>
                        </div>
                        <div className='row g-5 mt-1'>
                            {data?.data.data && Array.isArray(data.data.data) && data.data.data.map((orgs) => (
                                <div key={orgs.id} className='col-md-2'>
                                    <Link className='linknone' to={`/organizationdetails/${orgs._id}`}>
                                        <div>
                                            <img src={orgs.OrganizationImage} alt="Organization" className='w-100 rounded-circle' />
                                            <p className='text-center pt-2'>{orgs.OrganizationName}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </>}


                </div>

            </div>
        </div>
    </>
}

export default Organizations;
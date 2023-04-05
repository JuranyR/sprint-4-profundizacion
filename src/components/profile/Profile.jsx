import React from "react";
import { NavLink } from "react-router-dom";
import userIcon from '../../images/userIcon.png'
import next from '../../images/next.png'
import paymentIcon from '../../images/payment.png'
import Footer from "../commons/footer/Footer";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((store) => store.login);
    return (
        <>
            <section className="profile-page">
                {user &&
                    <>
                        <figure>
                            <img src={user.photo} alt="profile" />
                            <p className="user-name">{user.name}</p>
                        </figure>
                        <NavLink className="button-item"
                            to={`/editProfile/${user.id}`}
                        >
                            <div>
                                <img src={userIcon} alt="icon" />
                                <span>Account edit</span>
                            </div>
                            <img src={next} alt="next-arrow" />
                        </NavLink>
                        <NavLink className="button-item"
                            to="/paymentMethod"
                        >
                            <div>
                                <img src={paymentIcon} alt="icon" />
                                <span>Payment</span>
                            </div>
                            <img src={next} alt="next-arrow" />
                        </NavLink>   
                    </>
                }
            </section>
            <Footer/>
        </>
    );
};

export default Profile;
import React from "react";
import { NavLink } from "react-router-dom";
import photo from '../../images/photo.png'
import userIcon from '../../images/userIcon.png'
import next from '../../images/next.png'
import paymentIcon from '../../images/payment.png'
import Footer from "../commons/footer/Footer";

const Profile = () => {
    return (
        <>
            <section className="profile-page">
                <figure>
                    <img src={photo} alt="profile" />
                    <p className="user-name">Jenny Wilson</p>
                </figure>
                <NavLink className="button-item"
                    to="/editProfile"
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
            </section>
            <Footer/>
        </>
    );
};

export default Profile;
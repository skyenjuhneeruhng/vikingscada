import React from 'react';
import Slider from 'react-slick';

const settings = {
  autoplay: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

/**
 * Sign In Slider
 */
const SignInSlider = () => (
  <div className="m-grid__item m-grid__item--fluid m-grid m-grid--center m-grid--hor m-grid__item--order-tablet-and-mobile-1 m-login__content">
    <div className="m-grid__item m-grid__item--middle">
      <div className="slider-wrp">
        <Slider {...settings}>
          <div className="sign-item sign-item1">
            <aside>
              <header>Water & Waste Water System</header>
              <span>Fluid Resource Management provides design/build/operation services to the Water, Wastewater and Winery industries throughout California</span>
            </aside>
          </div>
          <div className="sign-item sign-item2">
            <aside>
              <header>Oil & Gas System</header>
              <span>CNW in OKC uses Viking SCADA’s System to monitor field production levels and get text, email and voice callout’s based on a tiered callout system if set alarm conditions are tripped</span>
            </aside>
          </div>
        </Slider>
      </div>
    </div>
  </div>
);

export default SignInSlider;

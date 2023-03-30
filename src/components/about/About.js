import React from 'react'
import './about.css';

export default function About() {
  return (
    <>
      <div class="container-fluid main_header">
        <div class="row">
            <div class="col-md-10 col-12 mx-auto">
                <div class="row">
                    {/* <!-- left side div --> */}
                    <div class="col-md-6 col-12  main_header_left">
                        <p>Welcome to CityWeather</p>
                        <h1>Hey! I am <span class="text_color">Nitish Kumar Panchal</span>, i am pursuing my btech in EEE from NIT Jamshedpur and I am learning Full stack development.</h1>
                        <a href="https://www.linkedin.com/in/nitish-kumar-panchal-0aa07321a/" target="_nitish"><button>Linkedin</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

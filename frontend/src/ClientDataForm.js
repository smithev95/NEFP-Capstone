import { Fragment } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';

const ClientDataForm = () => {
    const languageCodes = ['EN', 'ES', 'ZH', 'VI', 'UK', 'RU', 'AR', 'HT', 'FA', 'LO'];
    const zipCodes = ['97206', '97213', '97216', '97218', '97220', '97230', '97233', '97236', '97266'];
    const yesNo = ['Yes', 'No'];

    useEffect(() => {
        console.log('form loaded')
    })

    const log_information = (e) => {
        // prevents form from refreshing when submitting
        e.preventDefault();

        const form_data = new FormData(e.target)

        const form_data_object = {};
            form_data.forEach((value, key) => {
                form_data_object[key] = value;
        });

        const json_data = JSON.stringify(form_data_object)

        console.log(json_data)
        
        axios.post('http://127.0.0.1:8000/newsubmission/', json_data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log('Response', response.data)
        })
        .catch(error => {
            console.error('Error sending data', error)
        })
    }

    return (
        <div class="container">
            <div class="row mb-2 border-bottom">
                <h1>Client Form</h1>
            </div>
            <form method="post">
                <div class="row mb-2 border-bottom">
                    <div class="col mb-2">
                        <label class="fs-5 fw-normal" htmlFor="language">Language:</label>
                        <div class="form-check">
                            {
                            languageCodes.map((code, index) => 
                                (
                                    <Fragment key={index}>
                                        <input class="form-check-input" type="radio" id={`language-${code}`} name="language" value={code} required />
                                        <label class="form-check-label" htmlFor={`language-${code}`}>{code}</label>
                                        <br />
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div class="row mb-2 border-bottom">
                    <div class="col mb-1">
                        <label class="fs-5 fw-normal" htmlFor="family_size">Family Size:</label>
                        <div class="form-check">
                            {
                                Array.from({ length: 8 }, (_, index) => 
                                (
                                    <Fragment key={index}>
                                        <input class="form-check-input" type="radio" id={`family_size-${index + 1}`} name="family_size" value={`family_size-${index + 1}`} required />
                                        <label class="form-check-label" htmlFor={`family_size-${index + 1}`}>{index + 1}</label><br />
                                    </Fragment>
                                ))
                            }
                        </div>
                        <div class="form-outline w-25 mb-2">
                            <input class="form-control" type="text" id="family_size-other" name="family_size" placeholder="Other"/>
                        </div>
                    </div>
                </div>
                <div class="row mb-2 border-bottom">
                    <div class="col mb-2">
                        <label class="fs-5 fw-normal" htmlFor="snap_benefits">SNAP Benefits:</label>
                        <div class="form-check">
                            {
                                yesNo.map((ans, index) => 
                                    (
                                        <Fragment key={index}>
                                            <input class="form-check-input" type="radio" id={`snap_benefits-${ans}`} name="snap_benefits" value={ans} required />
                                            <label class="form-check-label" htmlFor={`snap_benefits-${ans}`}>{ans}</label>
                                            <br />
                                        </Fragment>
                                    ))
                            }
                        </div>
                    </div>
                </div>
                <div class="row mb-2 border-bottom">
                    <div class="col mb-2">
                        <label class="fs-5 fw-normal" htmlFor="travel_by_car">Travel by Car:</label><br />
                        <div class="form-check">
                                {
                                    yesNo.map((ans, index) => 
                                        (
                                            <Fragment key={index}>
                                                <input class="form-check-input" type="radio" id={`travel_by_car-${ans}`} name="travel_by_car" value={ans} required />
                                                <label class="form-check-label" htmlFor={`travel_by_car-${ans}`}>{ans}</label>
                                                <br />
                                            </Fragment>
                                        ))
                                }
                        </div>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col mb-2">
                        <label class="fs-5 fw-normal" htmlFor="zip_code">ZIP Code:</label><br />
                        <div class="form-check">
                            {
                                zipCodes.map((code, index) => 
                                    (
                                        <Fragment key={index}>
                                            <input class="form-check-input" type="radio" id={`zip_code-${code}`} name="zip_code" value={`zip_code-${code}`} required />
                                            <label class="form-check-label" htmlFor={`zip_code-${code}`}>{`${code}`}</label><br />
                                        </Fragment>
                                    ))
                            }
                        </div>
                        <div class="form-outline w-25">
                            <input class="form-control" type="text" id="family_size-other" name="family_size" placeholder="Other"/>
                        </div>
                    </div>
                </div>
                <div class="row my-2">
                    <div class="col mb-2" align="center">
                        <button class="btn btn-primary btn-lg" type="button" value="Submit">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default ClientDataForm;
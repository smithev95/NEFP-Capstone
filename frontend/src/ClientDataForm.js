import React from 'react';

const ClientDataForm = () => {
    const languageCodes = ['EN', 'ES', 'ZH', 'VI', 'UK', 'RU', 'AR', 'HT', 'FA', 'LO'];
    const zipCodes = ['97206', '97213', '97216', '97218', '97220', '97230', '97233', '97236', '97266']

    return (
        <div>
            <h1>Client Form</h1>
            <form method="post">
                <label htmlFor="language">Language:</label><br />
                {languageCodes.map((code,index) => (
                    <React.Fragment key={index}>
                        <input type="radio" id={`language-${code}`} name="language" value={code} required />
                        <label htmlFor={`language-${code}`}>{code}</label><br />
                    </React.Fragment>
                ))}
                <label htmlFor="family_size">Family Size:</label><br />
                {Array.from({ length: 9 }, (_, index) => (
                    <React.Fragment key={index}>
                        <input type="radio" id={`family_size-${index + 1}`} name="family_size" value={`family_size-${index + 1}`} required />
                        <label htmlFor={`family_size-${index + 1}`}>{index + 1}</label><br />
                    </React.Fragment>
                ))}
                <label htmlFor="snap_benefits">SNAP Benefits:</label><br />
                <input type="radio" id="snap_benefits-yes" name="snap_benefits" value="Yes" required />
                <label htmlFor="snap_benefits-yes">Yes</label><br />
                <input type="radio" id="snap_benefits-no" name="snap_benefits" value="No" required />
                <label htmlFor="snap_benefits-no">No</label><br />
                <label htmlFor="travel_by_car">Travel by Car:</label><br />
                <input type="radio" id="travel_by_car-yes" name="travel_by_car" value="Yes" required />
                <label htmlFor="travel_by_car-yes">Yes</label><br />
                <input type="radio" id="travel_by_car-no" name="travel_by_car" value="No" required />
                <label htmlFor="travel_by_car-no">No</label><br />
                <label htmlFor="zip_code">ZIP Code:</label><br />
                {zipCodes.map((code, index) => (
                    <React.Fragment key={index}>
                        <input type="radio" id={`zip_code-${code}`} name="zip_code" value={`zip_code-${code}`} required />
                        <label htmlFor={`zip_code-${code}`}>{`${code}`}</label><br />
                    </React.Fragment>
                ))}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default ClientDataForm;
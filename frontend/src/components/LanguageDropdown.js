import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown, Form, Row, Col } from 'react-bootstrap'

// TODO: replace constant array with call to Google translate API in the future.
const languages = [
    { name: 'Afrikaans', abbreviation: 'af' },
    { name: 'Albanian', abbreviation: 'sq' },
    { name: 'Arabic', abbreviation: 'ar' },
    { name: 'Armenian', abbreviation: 'hy' },
    { name: 'Azerbaijani', abbreviation: 'az' },
    { name: 'Basque', abbreviation: 'eu' },
    { name: 'Bengali', abbreviation: 'bn' },
    { name: 'Bosnian', abbreviation: 'bs' },
    { name: 'Bulgarian', abbreviation: 'bg' },
    { name: 'Catalan', abbreviation: 'ca' },
    { name: 'Cebuano', abbreviation: 'ceb' },
    { name: 'Chinese (Simplified)', abbreviation: 'zh-CN' },
    { name: 'Chinese (Traditional)', abbreviation: 'zh-TW' },
    { name: 'Croatian', abbreviation: 'hr' },
    { name: 'Czech', abbreviation: 'cs' },
    { name: 'Danish', abbreviation: 'da' },
    { name: 'Dutch', abbreviation: 'nl' },
    { name: 'English', abbreviation: 'en' },
    { name: 'Esperanto', abbreviation: 'eo' },
    { name: 'Estonian', abbreviation: 'et' },
    { name: 'Filipino', abbreviation: 'tl' },
    { name: 'Finnish', abbreviation: 'fi' },
    { name: 'French', abbreviation: 'fr' },
    { name: 'Galician', abbreviation: 'gl' },
    { name: 'Georgian', abbreviation: 'ka' },
    { name: 'German', abbreviation: 'de' },
    { name: 'Greek', abbreviation: 'el' },
    { name: 'Gujarati', abbreviation: 'gu' },
    { name: 'Haitian Creole', abbreviation: 'ht' },
    { name: 'Hausa', abbreviation: 'ha' },
    { name: 'Hebrew', abbreviation: 'he' },
    { name: 'Hindi', abbreviation: 'hi' },
    { name: 'Hungarian', abbreviation: 'hu' },
    { name: 'Icelandic', abbreviation: 'is' },
    { name: 'Igbo', abbreviation: 'ig' },
    { name: 'Indonesian', abbreviation: 'id' },
    { name: 'Irish', abbreviation: 'ga' },
    { name: 'Italian', abbreviation: 'it' },
    { name: 'Japanese', abbreviation: 'ja' },
    { name: 'Javanese', abbreviation: 'jw' },
    { name: 'Kannada', abbreviation: 'kn' },
    { name: 'Kazakh', abbreviation: 'kk' },
    { name: 'Khmer', abbreviation: 'km' },
    { name: 'Korean', abbreviation: 'ko' },
    { name: 'Kurdish (Kurmanji)', abbreviation: 'ku' },
    { name: 'Kyrgyz', abbreviation: 'ky' },
    { name: 'Lao', abbreviation: 'lo' },
    { name: 'Latin', abbreviation: 'la' },
    { name: 'Latvian', abbreviation: 'lv' },
    { name: 'Lithuanian', abbreviation: 'lt' },
    { name: 'Luxembourgish', abbreviation: 'lb' },
    { name: 'Macedonian', abbreviation: 'mk' },
    { name: 'Malagasy', abbreviation: 'mg' },
    { name: 'Malay', abbreviation: 'ms' },
    { name: 'Malayalam', abbreviation: 'ml' },
    { name: 'Maltese', abbreviation: 'mt' },
    { name: 'Maori', abbreviation: 'mi' },
    { name: 'Marathi', abbreviation: 'mr' },
    { name: 'Mongolian', abbreviation: 'mn' },
    { name: 'Myanmar (Burmese)', abbreviation: 'my' },
    { name: 'Nepali', abbreviation: 'ne' },
    { name: 'Norwegian', abbreviation: 'no' },
    { name: 'Odia', abbreviation: 'or' },
    { name: 'Pashto', abbreviation: 'ps' },
    { name: 'Persian', abbreviation: 'fa' },
    { name: 'Polish', abbreviation: 'pl' },
    { name: 'Portuguese', abbreviation: 'pt' },
    { name: 'Punjabi', abbreviation: 'pa' },
    { name: 'Romanian', abbreviation: 'ro' },
    { name: 'Russian', abbreviation: 'ru' },
    { name: 'Samoan', abbreviation: 'sm' },
    { name: 'Scots Gaelic', abbreviation: 'gd' },
    { name: 'Serbian', abbreviation: 'sr' },
    { name: 'Sesotho', abbreviation: 'st' },
    { name: 'Shona', abbreviation: 'sn' },
    { name: 'Sindhi', abbreviation: 'sd' },
    { name: 'Sinhala', abbreviation: 'si' },
    { name: 'Slovak', abbreviation: 'sk' },
    { name: 'Slovenian', abbreviation: 'sl' },
    { name: 'Somali', abbreviation: 'so' },
    { name: 'Spanish', abbreviation: 'es' },
    { name: 'Sundanese', abbreviation: 'su' },
    { name: 'Swahili', abbreviation: 'sw' },
    { name: 'Swedish', abbreviation: 'sv' },
    { name: 'Tajik', abbreviation: 'tg' },
    { name: 'Tamil', abbreviation: 'ta' },
    { name: 'Telugu', abbreviation: 'te' },
    { name: 'Thai', abbreviation: 'th' },
    { name: 'Turkish', abbreviation: 'tr' },
    { name: 'Ukrainian', abbreviation: 'uk' },
    { name: 'Urdu', abbreviation: 'ur' },
    { name: 'Uzbek', abbreviation: 'uz' },
    { name: 'Vietnamese', abbreviation: 'vi' },
    { name: 'Welsh', abbreviation: 'cy' },
    { name: 'Xhosa', abbreviation: 'xh' },
    { name: 'Yiddish', abbreviation: 'yi' },
    { name: 'Yoruba', abbreviation: 'yo' },
    { name: 'Zulu', abbreviation: 'zu' },
];

const LanguageDropdown = () => {
    const [selectedLanguage,setSelectedLanguage] = useState('');

    const handleSelect = (abreviation) => {
        const selected = languages.find(lang => lang.abbreviation === abreviation);
        setSelectedLanguage(selected ? `${selected.name} (${selected.abbreviation})` : '')
    };

    return (
        <Row className="align-items-center">
            <Col md="auto">
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle varient="primary" id="dropdown-basic">
                        Select Language
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {languages.map((language) => (
                            <Dropdown.Item key={language.abbreviation} eventKey={language.abbreviation}>
                                {language.name} ({language.abbreviation})
                            </Dropdown.Item>
                        ))}     
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col>
                <Form.Control
                    type="text"
                    placeholder="Selected Language"
                    readOnly
                    value={selectedLanguage}
                />
            </Col>
        </Row>
    );
}

export default LanguageDropdown;
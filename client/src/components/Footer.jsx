import React from "react";

function Footer () {

    const year = new Date().getFullYear();

    return (
        <footer>
            <p>Copyright {year}</p>
            <p><h5>Pashmeen Kaur</h5></p>
        </footer>
    );
}

export default Footer;
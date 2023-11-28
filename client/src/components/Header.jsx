import React from "react";
// import BookIcon from '@mui/icons-material/Book';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function Header () {
    return (
        <header>
            <h1>
                <DriveFileRenameOutlineIcon fontSize="large"></DriveFileRenameOutlineIcon>
                Note Up!
            </h1>
        </header>
    );
}

export default Header;
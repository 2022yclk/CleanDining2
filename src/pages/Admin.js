// @mui material components
import Grid from "@mui/material/Grid";

import React, { Component } from "react";
//import { Card, Button } from "tabler-react";
import Header from "../components/adminComponents/Header"
import Reportboard from "../components/adminComponents/Reportboard.js"

const Admin = () => {
    return (
        <>
            <Header title="web"></Header>
            <Reportboard></Reportboard>
        </>
    );
    
}

export default Admin;
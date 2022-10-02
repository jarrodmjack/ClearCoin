import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from "../components/Table"
import TripleSectionContent from "../components/TripleSectionContent"

const Landing = () => {
    return (
        <div className="container mx-auto">
            <TripleSectionContent />
            <Table />
        </div>
    )
}

export default Landing
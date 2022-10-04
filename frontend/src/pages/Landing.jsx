import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from "../components/Table"
import TripleSectionContent from "../components/TripleSectionContent"
import { toast } from 'react-toastify';

const Landing = () => {



    return (
        <div className="container mx-auto">
            <TripleSectionContent />
            <Table />
            <button onClick={() => toast.error('WRONG', {
                position: toast.POSITION.TOP_RIGHT,
            })}>CLICK ME</button>
        </div>
    )
}

export default Landing
import React from "react";
import { Link } from "react-router-dom";
/**
 * CompanyCard component takes in details about a single company
 * then renders a card to display company information
 * 
 */
function CompanyCard({ company }) {
    return (
        <div>
            <h1>
                <Link to={`/companies/${company.handle}`}>{company.name}</Link>
            </h1>
            <p>
                Total Employees:{company.numEmployees}
            </p>
            <p>
                {company.description}
            </p>
        </div>
    )
}

export default CompanyCard
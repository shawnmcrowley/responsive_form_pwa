"use client"

const getBasePath = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/responsive_forms')) return '/responsive_forms';
  }
  return '';
};

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { useMemo, useState, useEffect } from "react"

ModuleRegistry.registerModules([AllCommunityModule]);


export default function Page() {

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            filter: true,
            floatingFilter: true,
            //filterParams: { buttons: ['apply', 'clear'] }
        }

    })

    // Get Dynamic Data from API
    const [rowData, setRowData] = useState()
    useEffect(() => {

        const fetchData = async () => {

            const basePath = getBasePath();
            const response = await fetch(`${basePath}/api/v1/persons`)
            const persons = await response.json()
            console.log(persons.data)
            setRowData(persons.data)
        }
        fetchData()
    }, [])

    /*
        // Row Data to Display
        const [rowData, setRowData] = useState([
            {
                make: "Tesla", model: {
                    large: "Model Y",
                    small: "Model X"
                },
                price: 69500,
                electric: false,
                date: "12/24/2024"
            },
            {
                make: "Tesla", model:
                {
                    large: "Model S",
                    small: "Model X"
                },
                price: 64500, electric: true, date: "11/15/2013"
            },
            {
                make: "Tesla", model: {
                    large: "Model G",
                    small: "Model G"
                },
                price: 68500, electric: true, date: "09/12/2006"
            },
            {
                make: "Chevy",
                model: {
                    large: "Suburban",
                    small: "Blazer"
                },
                price: 57000,
                electric: true,
                date: "12/10/2023"
    
            }
    
    
        ])
    */
    // Column Definitions for Headers
    const [colDefs, setColDefs] = useState([
        {
            field: "ID",
            headerName: "ID"
        },
        {
            headerName: "First Name",
            field: 'FIRSTNAME'
        },
        {
            headerName: "Last Name",
            field: "LASTNAME",

        },
        {
            headerName: "Email",
            field: "EMAIL",

        },
        { 
            headerName: "Created Date",
            field: "CREATED_DATE", 
            filter: 'agDateColumnFilter'
         },
        {
            headerName: "Deleted",
            field: "DELETED",
            width: 90,
        }
       
    ])





    return (

        <main className="flex-grow">
        <div className="grid-container pt-8" style={{
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "2rem",
          paddingLeft: "2rem",
          paddingRight: "2rem"

      }}>
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Data Visualization Console</h3>        
          <div className="ag-theme-quartz" style={{ width: "100%" }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              theme="legacy"
              domLayout="autoHeight"
              pagination="true"
              paginationPageSize="10"
              paginationPageSizeSelector="[10,20,50,100]"
            />
          </div>
        </div>
      </main>
    )

}
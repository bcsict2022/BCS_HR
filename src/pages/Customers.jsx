import React from 'react'
import ProductTable from '../components/Table/ProductTable'
import CustomerTable from '../components/Table/CustomersTable'

const Customers = () => {
  return (
    <h1 className="text-3xl text-red-700 font-bold ">
      <CustomerTable/>
    </h1>
  )
}

export default Customers
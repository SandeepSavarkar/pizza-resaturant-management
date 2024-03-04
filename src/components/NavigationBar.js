import React from "react"
import { Link } from "react-router-dom"
import CircleWithNumber from "./CircleWithNumber"
import { useSelector } from "react-redux"

const NavigationBar = () => {
  const { orders } = useSelector((state) => state?.order)
  const pizzasInProgressCount = orders
    ?.filter((item) => item?.stage !== "picked")
    ?.length

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex text-white">
          <div className="flex-shrink-0 ">
            <Link to="/" hrefLang="" className="font-semibold text-xl">
              Home
            </Link>
          </div>
          <div className="flex ms-4">
            <Link to="/orders" className="font-semibold text-xl">
              Order
            </Link>
            <CircleWithNumber number={pizzasInProgressCount} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar

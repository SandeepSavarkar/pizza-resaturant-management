import React, { useState } from "react"
import NavigationBar from "../../components/NavigationBar"
import PizzaStages from "./components/PizzaStages"
import MainDisplay from "./components/MainDisplay"

const Orders = () => {
  const [showMainDisplay, setShowMainDisplay] = useState(true)

  const handleToggle = () => {
    setShowMainDisplay((prevState) => !prevState)
  }

  return (
    <div>
      <NavigationBar />

      {/* <PizzaStages /> */}
      <div className="flex justify-end my-4 me-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleToggle}
        >
          {showMainDisplay ? "Show Pizza Stages" : "Show Main Display"}
        </button>
      </div>
      {showMainDisplay ? <MainDisplay /> : <PizzaStages />}
    </div>
  )
}

export default Orders

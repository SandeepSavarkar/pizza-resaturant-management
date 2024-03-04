import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateOrder } from "../../../store/slices/orderSlice"
import clsx from "clsx"

const PizzaStages = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state?.order)
  // eslint-disable-next-line no-unused-vars
  const [key,setKey] = useState(0)

  const pizzasByStage = orders.reduce(
    (acc, pizza) => {
      const { stage } = pizza

      if (!acc[stage]) {
        acc[stage] = []
      }

      acc[stage].push(pizza)

      return acc
    },
    {
      placed: [],
      inMaking: [],
      ready: [],
      picked: [],
    }
  )

  const handleReload = () => {
    setKey((prevKey) => prevKey + 1)
  }

  const handleNextClick = (pizza) => () => {
    let payload
    if (pizza.stage === "picked") return false
    if (pizza.stage === "placed") {
      payload = {
        ...pizza,
        stage: "inMaking",
        timeStampInStage: Date.now(),
      }
    } else if (pizza.stage === "inMaking") {
      payload = {
        ...pizza,
        stage: "ready",
        timeStampInStage: Date.now(),
      }
    } else if (pizza.stage === "ready") {
      payload = {
        ...pizza,
        stage: "picked",
        timeStampInStage: Date.now(),
      }
    }
    dispatch(updateOrder(payload))
  }

  const calculateTimeSpend = (timestamp) => {
    const currentTime = new Date().getTime()
    const timeDifference = currentTime - timestamp
    const minutes = Math.floor(timeDifference / 60000) 
    const seconds = Math.floor((timeDifference % 60000) / 1000) 
    return `${minutes} min ${seconds} sec`
  }

  const calculateTimeDifference = (timestampInStage) => {
    const currentTime = new Date().getTime()
    const timeDifference = currentTime - timestampInStage
    return Math.floor(timeDifference / 60000) 
  }

  const getHeading = (stage) => {
    const heading = {
      placed: "Order Placed",
      inMaking: "Order in Making",
      ready: "Order Ready",
      picked: "Order Picked",
    }
    return heading[stage]
  }

  return (
    <div className="container mx-auto text-center">
      <button
        onClick={handleReload}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-2 px-4 rounded"
      >
        Reload to check updates{" "}
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(pizzasByStage).map(([stage, pizzas]) => (
          <div key={stage}>
            <h2 className="text-lg font-bold mb-2 text-center mt-4">
              {getHeading(stage)}
            </h2>
            <div>
              {pizzas.map((pizza) => {
                const timeSpentInStage = calculateTimeSpend(
                  pizza?.timeStampInStage
                )
                const isDelayed =
                  calculateTimeDifference(pizza?.timeStampInStage) > 3
                return (
                  <div
                    key={pizza.id}
                    className={clsx("p-4 border border-gray-300 rounded", {
                      "bg-red-700": isDelayed && pizza?.stage !== "picked",
                    })}
                  >
                    <h3 className="text-md font-semibold mt-2">{pizza.name}</h3>
                    <p>Type: {pizza.type}</p>
                    <p>Size: {pizza.size}</p>
                    <p>Base: {pizza.base}</p>
                    <p>Time Spent: {timeSpentInStage}</p>
                    {pizza?.stage !== "picked" ? (
                      <button
                        onClick={handleNextClick(pizza)}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-2 px-4 rounded"
                      >
                        Next
                      </button>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PizzaStages

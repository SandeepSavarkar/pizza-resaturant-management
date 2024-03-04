import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { cancelOrder } from "../../../store/slices/orderSlice"

const MainDisplay = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state?.order)
  const pizzasInProgress = orders?.filter((item) => item?.stage !== "picked")
  const totalDelivered = orders?.filter(
    (item) => item?.stage === "picked"
  )?.length

  const calculateTotalTimeSpend = (timestamp) => {
    const currentTime = new Date().getTime()
    const timeDifference = currentTime - timestamp
    const minutes = Math.floor(timeDifference / 60000)
    const seconds = Math.floor((timeDifference % 60000) / 1000)
    return `${minutes} min ${seconds} sec`
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

  const onCancelClick = (id) => {
    dispatch(cancelOrder(id))
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-lg font-bold mb-4">Main Display</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stage
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Remaining Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pizzasInProgress?.map?.((pizza) => (
            <tr key={pizza.orderId}>
              <td className="px-6 py-4 whitespace-nowrap">{pizza.orderId}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getHeading(pizza.stage)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {calculateTotalTimeSpend(pizza.timestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {pizza.stage !== "picked" && (
                  <>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => onCancelClick(pizza.orderId)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <p className="text-lg font-bold">
          Total Pizzas Delivered Today: {totalDelivered}
        </p>
      </div>
    </div>
  )
}

export default MainDisplay

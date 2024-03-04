import React, { useMemo, useState } from "react"
import tempPizzaData from "../../../common/tempData"
import CustomModal from "../../../components/CustomModal"
import { options } from "../helper"
import { Formik, Form, Field } from "formik"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import { addOrder } from "../../../store/slices/orderSlice"

const PizzaCard = ({ pizza, handleAddClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-4">
      <img src={pizza.imageUrl} alt={pizza.name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{pizza.name}</div>
        <p className="text-gray-700 text-base">
          Price: {pizza.price}
          <br />
        </p>
        <button
          onClick={handleAddClick(pizza)}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-2 px-4 rounded"
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}

const PizzaList = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state?.order)
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleAddClick = (item) => () => {
    setOpenModal(true)
    if (item) setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setOpenModal((prevValue) => !prevValue)
  }

  const handleSelectChange = (formik, name) => (selectedOption) => {
    formik.setFieldValue(name, selectedOption)
  }

  const handleSubmit = (values) => {
    const orderId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    const payload = {
      orderId,
      itemId: selectedItem?.id,
      name: selectedItem?.name,
      type: values?.type?.value,
      size: values?.size?.value,
      base: values?.base?.value,
      stage: "placed",
      timestamp: Date.now(),
      timeStampInStage: Date.now(),
    }
    dispatch(addOrder(payload))
    handleCloseModal()
  }

  const numOfOngoingOrders = useMemo(() => {
    return orders?.filter((item) => item?.stage !== "picked").length > 10
  }, [orders])

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tempPizzaData.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            handleAddClick={handleAddClick}
          />
        ))}
      </div>
      <CustomModal isOpen={openModal} onClose={handleCloseModal}>
        {!numOfOngoingOrders ? (
          <Formik
            initialValues={{
              type: {},
              size: {},
              base: {},
              name: selectedItem?.name || "",
              price: selectedItem?.price || "",
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <div className="mb-4 flex">
                  <label htmlFor="type" className="block text-gray-700 me-2">
                    Name:
                  </label>
                  {formik?.values?.name}
                </div>
                <div className="mb-4 flex">
                  <label htmlFor="type" className="block text-gray-700 me-2">
                    Price:
                  </label>
                  {formik?.values?.price}
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block text-gray-700">
                    Type:
                  </label>
                  <Field name="type">
                    {({ field }) => (
                      <Select
                        {...field}
                        options={options.types}
                        placeholder="Select Type"
                        isSearchable={false}
                        onChange={handleSelectChange(formik, "type")}
                        values={formik.values?.type}
                      />
                    )}
                  </Field>
                </div>

                <div className="mb-4">
                  <label htmlFor="size" className="block text-gray-700">
                    Size:
                  </label>
                  <Field name="size">
                    {({ field }) => (
                      <Select
                        {...field}
                        options={options.sizes}
                        placeholder="Select Size"
                        isSearchable={false}
                        onChange={handleSelectChange(formik, "size")}
                        values={formik.values?.size}
                      />
                    )}
                  </Field>
                </div>

                <div className="mb-4">
                  <label htmlFor="base" className="block text-gray-700">
                    Base:
                  </label>
                  <Field name="base">
                    {({ field }) => (
                      <Select
                        {...field}
                        options={options.bases}
                        placeholder="Select Base"
                        isSearchable={false}
                        onChange={handleSelectChange(formik, "base")}
                        values={formik.values?.base}
                      />
                    )}
                  </Field>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Order
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <h3 className="text-danger">Not taking any order for now</h3>
        )}
      </CustomModal>
    </div>
  )
}

export default PizzaList

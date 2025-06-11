import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const UpdateCategory = () => {
  const location = useLocation();
  const item = location.state?.item;

  const [formdata, setForm] = useState(item)

  const handelChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name === 'category-name' ? 'name' : name]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-red-800 text-center">Update Category</h2>

        <form action="#" method="POST" encType="multipart/form-data" className="space-y-6">

          <div>
            <label htmlFor="category-name" className="block text-sm font-medium text-red-700 mb-1">Category Name</label>
            <input
              type="text"
              name="category-name"
              value={formdata.name}
              onChange={handelChange}
              id="name"
              className="w-full px-4 py-2 border border-red-600 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-700 mb-1">Category Image</label>

            {/* Show existing image */}
            {formdata.food_image && (
              <img
                src={formdata.food_image}
                alt="Current category"
                className="mx-auto mb-4 max-h-40 object-contain"
              />
            )}

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-red-600 border-dashed rounded-lg">
              <div className="space-y-5 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="food_image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="food_image"
                      name="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default UpdateCategory

import React, { useEffect, useState } from "react";
import {
  Utensils,
  Plus,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
} from "lucide-react";
import { addRestaurant } from "../../../store/restaurant/restaurantSlice";
import api from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { categories, type IRestaurant } from "./restaurantsTypes";
import { RestaurantCard } from "./restaurantCard";
import { Modal } from "./modal";
import {
  deleteRestaurantAction,
  fetchRestaurantsAction,
} from "../../../store/restaurant/restaurantAction";
import type { RootState } from "../../../store";

export const RestaurantsPage: React.FC = () => {
  const restaurants = useSelector(
    (state: RootState) => state.restaurants.restaurants
  );

  const dispatch = useDispatch();
  // const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<IRestaurant | null>(null);

  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [formData, setFormData] = useState<IRestaurant>({
    name: "",
    description: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      coordinates: { type: "Point", coordinates: [0, 0] },
    },
    category: "",
    openingTime: "",
    closingTime: "",
    rating: 0,
    isOpen: true,
    images: [],
  });

  useEffect(() => {
    fetchRestaurantsAction(dispatch);
  }, [dispatch]);

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.name?.toLowerCase() || "";
    const desc = restaurant.description?.toLowerCase() || "";
    const search = searchQuery.toLowerCase();

    const matchesSearch = name.includes(search) || desc.includes(search);

    const matchesCategory =
      selectedCategory === "All" || restaurant.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isOpen: e.target.checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Convert to FormData
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description || "");
      payload.append("email", formData.email || "");
      payload.append("phone", formData.phone || "");
      payload.append("category", formData.category || "");
      payload.append("openingTime", formData.openingTime || "");
      payload.append("closingTime", formData.closingTime || "");
      payload.append("isOpen", String(formData.isOpen));

      // Append nested address fields
      if (formData.address) {
        payload.append("address[street]", formData.address.street || "");
        payload.append("address[city]", formData.address.city || "");
        payload.append("address[state]", formData.address.state || "");
        payload.append("address[pincode]", formData.address.pincode || "");
        // coordinates optional
        if (formData.address.coordinates) {
          payload.append(
            "address[coordinates][coordinates][]",
            formData.address.coordinates.coordinates[0].toString()
          );
          payload.append(
            "address[coordinates][coordinates][]",
            formData.address.coordinates.coordinates[1].toString()
          );
        }
      }

      // Append image (single file)
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => payload.append("images", file));
      }

      // 1. API Request
      const response = await api.post(
        "http://localhost:9000/restaurant/add-restaurant",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      // 2. Dispatch to Redux store
      dispatch(addRestaurant(response.data)); // result.data is server restaurant object

      fetchRestaurantsAction(dispatch);

      // 3. Close modal + reset
      setIsAddModalOpen(false);
      setPreviewImages([]);
      resetForm();
      setFileInputKey(Date.now());

      // clear file input element
      const fileInput = document.querySelector(
        'input[name="images"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      toast.success("Restaurant created successfully!");
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to create restaurant");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
        coordinates: { type: "Point", coordinates: [0, 0] },
      },
      category: "",
      openingTime: "",
      closingTime: "",
      rating: 0,
      isOpen: true,
      images: [],
    });
  };

  // Handle view restaurant
  const handleView = (restaurant: IRestaurant) => {
    setSelectedRestaurant(restaurant);
    setIsViewModalOpen(true);
  };

  // Handle edit restaurant
  const handleEdit = (restaurant: IRestaurant) => {
    setFormData({
      ...restaurant,
      images: [], // prevent showing previous images as new preview
    });
    setPreviewImages([]); // IMPORTANT: clear preview on edit start
    setIsAddModalOpen(true);
  };

  // Handle delete restaurant
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?"))
      return;
    try {
      const res = await deleteRestaurantAction(id, dispatch);
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    // Store File[] in formData (for uploading)
    setFormData((prev) => ({
      ...prev,
      images: fileArray,
    }));

    // Generate preview URLs for UI
    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Restaurants Management
        </h1>
        <p className="text-gray-600">
          Manage restaurant partners and their details
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Restaurant
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Restaurants</p>
              <p className="text-2xl font-bold text-gray-900">
                {restaurants.length}
              </p>
            </div>
            <Utensils className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open Now</p>
              <p className="text-2xl font-bold text-gray-900">
                {restaurants.filter((r) => r.isOpen).length}
              </p>
            </div>
            <Clock className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(
                  restaurants.reduce((acc, r) => acc + (r.rating || 0), 0) /
                  restaurants.length
                ).toFixed(1)}
              </p>
            </div>
            <Star className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add/Edit Restaurant Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
          setPreviewImages([]);
          setFileInputKey(Date.now());
        }}
        title={formData._id ? "Edit Restaurant" : "Add New Restaurant"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter restaurant name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter restaurant description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="restaurant@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 234-567-8900"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Address</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address?.street}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address?.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address?.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.address?.pincode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Time
              </label>
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Closing Time
              </label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>

            <input
              key={fileInputKey}
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />

            {/* Preview */}
            {previewImages.length > 0 && (
              <div className="mt-3 flex gap-3 flex-wrap">
                {previewImages.map((src, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 rounded overflow-hidden border"
                  >
                    <img
                      src={src}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isOpen"
              checked={formData.isOpen}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isOpen" className="ml-2 text-sm text-gray-700">
              Restaurant is currently open
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {formData._id ? "Update Restaurant" : "Create Restaurant"}
            </button>
          </div>
        </div>
      </Modal>

      {/* View Restaurant Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Restaurant Details"
      >
        {selectedRestaurant && (
          <div className="space-y-4">
            {selectedRestaurant.images && selectedRestaurant.images[0] && (
              <div className="h-64 rounded-lg overflow-hidden">
                <img
                  src={selectedRestaurant.images[0]}
                  alt={selectedRestaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedRestaurant.name}
              </h3>
              <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {selectedRestaurant.category}
              </span>
            </div>

            <p className="text-gray-600">{selectedRestaurant.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedRestaurant.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedRestaurant.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedRestaurant.address?.street},{" "}
                    {selectedRestaurant.address?.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Hours</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedRestaurant.openingTime} -{" "}
                    {selectedRestaurant.closingTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedRestaurant.rating} / 5.0
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedRestaurant.isOpen ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedRestaurant.isOpen ? "Open" : "Closed"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

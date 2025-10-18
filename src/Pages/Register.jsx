import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllStateData,
  GetStateWiseCitydata,
} from "../Redux/Features/City_StateServicesSlice";
import { Register } from "../Redux/Features/AuthenticationServicesSlice";
import toast from "react-hot-toast";

export const SellerRegistration = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role_id: "",

    // Step 2: Shop Info
    shopName: "",
    shopAddress: "",
    pickupAddress: "",
    state: "",
    city: "",
    gstNumber: "",
    pincode: "",

    // Step 4: Bank Details
    bankName: "",
    ifsc: "",
    accountNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [StateID, SetStateID] = useState(null);

  const [files, setFiles] = useState({
    shopImage: null,
    adharCard: null,
    panCard: null,
    gstCertificate: null,
    cancelCheck: null,
  });

  const [previewFiles, setPreviewFiles] = useState({
    shopImage: null,
    adharCard: null,
    panCard: null,
    gstCertificate: null,
    cancelCheck: null,
  });

  const [agreeReturnPolicy, setAgreeReturnPolicy] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const { State, Cities, loading, error } = useSelector(
    (state) => state.City_StateOpration
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Save the file in state
    setFiles({ ...files, [e.target.id]: file });

    // Show preview if image
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFiles((prev) => ({ ...prev, [e.target.id]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs, remove preview
      setPreviewFiles((prev) => ({ ...prev, [e.target.id]: null }));
    }
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.role_id) newErrors.role_id = "Role is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.email) newErrors.email = "Email is required";
    }

    if (step === 2) {
      if (!formData.shopName) newErrors.shopName = "Shop Name is required";
      if (!formData.shopAddress)
        newErrors.shopAddress = "Shop Address is required";
      if (!formData.pickupAddress)
        newErrors.pickupAddress = "Pickup Address is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
      if (!files.shopImage) newErrors.shopImage = "Shop Image is required";
    }

    if (step === 3) {
      if (!files.adharCard) newErrors.adharCard = "Aadhar card is required";
      if (!files.panCard) newErrors.panCard = "PAN card is required";
      if (!files.gstCertificate)
        newErrors.gstCertificate = "GST Certificate is required";

      if (!agreeReturnPolicy)
        newErrors.agreeReturnPolicy = "You must agree return policy";
    }

    if (step === 4) {
      if (!formData.bankName) newErrors.bankName = "Bank Name is required";
      if (!formData.ifsc) newErrors.ifsc = "IFSC code is required";
      if (!formData.accountNumber)
        newErrors.accountNumber = "Account Number is required";
      if (!files.cancelCheck)
        newErrors.cancelCheck = "Cancel Cheque is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e) => {
    if (e) e.preventDefault();
    if (!validateStep()) return;
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = (e) => {
    if (e) e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const formDataToSend = new FormData();

    // text fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // files
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formDataToSend.append(key, files[key]);
      }
    });

    dispatch(Register(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success("🎉 Registration In Process!");
        resetForm();
      })
      .catch((err) => {
        toast.error("❌ Registration Failed ");
      });
  };

  // Calculate progress percentage
  const progressPercentage = (step / totalSteps) * 100;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    dispatch(GetAllStateData()); //API che
  }, [dispatch]);

  useEffect(() => {
    if (StateID) {
      dispatch(GetStateWiseCitydata(StateID)); // API call
    }
  }, [StateID, dispatch]);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      role_id: "",

      shopName: "",
      shopAddress: "",
      pickupAddress: "",
      state: "",
      city: "",
      gstNumber: "",
      pincode: "",

      bankName: "",
      ifsc: "",
      accountNumber: "",
    });

    setFiles({
      shopImage: null,
      adharCard: null,
      panCard: null,
      gstCertificate: null,
      cancelCheck: null,
    });

    setPreviewFiles({
      shopImage: null,
      adharCard: null,
      panCard: null,
      gstCertificate: null,
      cancelCheck: null,
    });

    setAgreeReturnPolicy(false);
    setStep(1);
    SetStateID(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {/* Header */}
      <header className="flex items-center mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg">
        {/* Logo on the left */}
        <div className="flex-shrink-0 mr-4 ">
          <img
            src="Logo.png"
            alt="Logo"
            className="h-16 w-16 object-contain rounded-full"
          />
        </div>

        {/* Text on the right */}
        <div className="ml-1">
          <h1 className="text-3xl font-bold mb-1">
            Seller Registration Portal
          </h1>
          <p className="text-blue-100">
            Complete your onboarding process to start selling on our platform
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-8 bg-white p-4 rounded-xl shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-blue-500">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-blue-600 to-orange-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span className={step >= 1 ? "text-blue-600 font-medium" : ""}>
            Personal Details
          </span>
          <span className={step >= 2 ? "text-blue-600 font-medium" : ""}>
            Shop Info
          </span>
          <span className={step >= 3 ? "text-blue-600 font-medium" : ""}>
            Documents
          </span>
          <span className={step >= 4 ? "text-blue-600 font-medium" : ""}>
            Bank Details
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg space-y-6"
      >
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <section className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // ફક્ત digits allow
                    if (/^\d*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  required
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  required
                />

                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring"
                  required
                >
                  <option value="">-- Select Role --</option>
                  <option value={2}>Only Seller</option>
                  <option value={3}>Seller && Token Trader</option>
                </select>
                {errors.role_id && (
                  <p className="text-red-500 text-sm">{errors.role_id}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Step 2: Shop Info */}
        {step === 2 && (
          <section className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Shop Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Shop Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  required
                />
                {errors.shopName && (
                  <p className="text-red-500 text-sm">{errors.shopName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Shop Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="shopAddress"
                  rows={3}
                  value={formData.shopAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  required
                />
                {errors.shopAddress && (
                  <p className="text-red-500 text-sm">{errors.shopAddress}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Pickup Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="pickupAddress"
                  rows={2}
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  required
                />
                {errors.pickupAddress && (
                  <p className="text-red-500 text-sm">{errors.pickupAddress}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  // value={formData.state}
                  onChange={(e) => {
                    const selectedState = State.find(
                      (st) => st.id === Number(e.target.value)
                    );

                    if (selectedState) {
                      // state name save karo formData ma
                      setFormData({
                        ...formData,
                        state: selectedState.name,
                      });

                      // city fetch mate id set karo
                      SetStateID(selectedState.id);
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring"
                  required
                >
                  <option value="">-- Select State --</option>
                  {State.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring"
                  required
                >
                  <option value="">-- Select City --</option>
                  {Cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>

                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="pincode"
                  value={formData.pincode}
                  onChange={(e) => {
                    const value = e.target.value;
                    // ફક્ત digits allow
                    if (/^\d*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  required
                />

                {errors.pincode && (
                  <p className="text-red-500 text-sm">{errors.pincode}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Shop Image <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-2 flex flex-col items-center">
                  <label
                    className={`w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 ${
                      previewFiles.shopImage
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    {previewFiles.shopImage ? (
                      <img
                        src={previewFiles.shopImage}
                        alt="Shop Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <svg
                          className="w-10 h-10 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm">Click to upload</p>
                        <p className="text-xs">PNG, JPG (Max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="shopImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                  {errors.shopImage && (
                    <p className="text-red-500 text-sm">{errors.shopImage}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <section className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-2 rounded-full mr-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-black-800">
                Document Uploads
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Aadhaar Card <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    {previewFiles.adharCard ? (
                      <img
                        src={previewFiles.adharCard}
                        alt="Shop Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <svg
                          className="w-10 h-10 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm">Click to upload</p>
                        <p className="text-xs">PNG, JPG (Max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="adharCard"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
                {errors.adharCard && (
                  <p className="text-red-500 text-sm">{errors.adharCard}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  PAN Card <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    {previewFiles.panCard ? (
                      <img
                        src={previewFiles.panCard}
                        alt="Shop Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <svg
                          className="w-10 h-10 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm">Click to upload</p>
                        <p className="text-xs">PNG, JPG (Max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="panCard"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
                {errors.panCard && (
                  <p className="text-red-500 text-sm">{errors.panCard}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  GST Certificate
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    {previewFiles.gstCertificate ? (
                      <img
                        src={previewFiles.gstCertificate}
                        alt="Shop Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <svg
                          className="w-10 h-10 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm">Click to upload</p>
                        <p className="text-xs">PNG, JPG (Max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="gstCertificate"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.gstCertificate && (
                  <p className="text-red-500 text-sm">
                    {errors.gstCertificate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  placeholder="Optional if not applicable"
                />
              </div>

              <div className="md:col-span-2 flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="returnPolicy"
                    type="checkbox"
                    checked={agreeReturnPolicy}
                    onChange={(e) => setAgreeReturnPolicy(e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="returnPolicy"
                    className="font-medium text-black-700"
                  >
                    I agree to the Return Policy
                  </label>
                  <p className="text-gray-500">
                    You must agree to the return policy to complete registration
                  </p>
                </div>
              </div>
              {errors.agreeReturnPolicy && (
                <p className="text-red-500 text-sm">
                  {errors.agreeReturnPolicy}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Step 4: Bank Details */}
        {step === 4 && (
          <section className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-black-800">
                Bank Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  // required
                />
                {errors.bankName && (
                  <p className="text-red-500 text-sm">{errors.bankName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  //  required
                />
                {errors.ifsc && (
                  <p className="text-red-500 text-sm">{errors.ifsc}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    // ફક્ત digits allow
                    if (/^\d*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring "
                  //  required
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-sm">{errors.accountNumber}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Cancelled Check / Passbook{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    {previewFiles.cancelCheck ? (
                      <img
                        src={previewFiles.cancelCheck}
                        alt="Shop Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <svg
                          className="w-10 h-10 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm">Click to upload</p>
                        <p className="text-xs">PNG, JPG (Max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="cancelCheck"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {errors.cancelCheck && (
                    <p className="text-red-500 text-sm">{errors.cancelCheck}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-orange-700 transition duration-200"
            >
              Submit Application
              <svg
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

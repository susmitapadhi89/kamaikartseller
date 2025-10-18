import { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiSave,
  FiEdit,
  FiX,
  FiEdit2,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserInformation,
  UpdateUserInformation,
} from "../../Redux/Features/UserInfoServicesSlice";
import { Loader } from "../Common/Loader";
import { ErrorMessage } from "../Common/Error";
import toast from "react-hot-toast";

export const Profileinfo = () => {
  const dispatch = useDispatch();
  const { GetinfoDetail, error, loading } = useSelector(
    (state) => state.UserInfoOpration
  );

  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(GetUserInformation());
  }, [dispatch]);

  // Update local state when API data changes
  useEffect(() => {
    if (GetinfoDetail) {
      setUserData({ ...GetinfoDetail });
    }
  }, [GetinfoDetail]);

  // Initialize temp data when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setTempData({ ...userData });
    }
  }, [isEditing, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }

      setIsUploading(true);

      try {
        // Create a preview while uploading
        const previewUrl = URL.createObjectURL(file);
        setUserData((prev) => ({ ...prev, profileImage: previewUrl }));

        // Create form data for upload
        const formData = new FormData();
        formData.append("profileImage", file);

        // Dispatch the upload action
        const result = await dispatch(UpdateUserInformation(formData)).unwrap();

        // Update user data with the new image URL from server
        setUserData((prev) => ({ ...prev, profileImage: result.imageUrl }));

        alert("Profile image updated successfully!");
      } catch (error) {
        console.error("Upload failed:", error);
        // Revert to original image if upload fails
        setUserData((prev) => ({
          ...prev,
          profileImage: GetinfoDetail.profileImage,
        }));
        alert("Failed to upload image: " + error.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Prepare and trim data
    const data = {
      name: tempData.name?.trim(),
      phoneno: tempData.phoneno?.trim(),
    };

    // Basic validation
    if (!data.name || !data.phoneno) {
      toast.error("Name and Phone Number cannot be empty");
      setIsSaving(false);
      return;
    }

    try {
      // Dispatch thunk
      await dispatch(UpdateUserInformation({ data })).unwrap();

      // Update local state
      setUserData({ ...userData, ...data });
      setIsEditing(false);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({});
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          </div>

          <div className="p-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-200">
              <div className="relative">
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />

                {/* Clickable Avatar */}
                <label
                  htmlFor="profileUpload"
                  className={`cursor-pointer w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border relative group ${
                    isUploading ? "opacity-70" : ""
                  }`}
                >
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-12 h-12 text-blue-600" />
                  )}

                  {/* Uploading Spinner */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}

                  {/* Pencil Icon Overlay */}
                  {!isUploading && (
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow-md opacity-100 group-hover:opacity-100 transition">
                      <FiEdit2 className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </label>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-800">
                  {userData.name}
                </h2>
                <p className="text-gray-600">{userData.role_id}</p>
              </div>

              <div className="flex space-x-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      <FiX className="mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Form */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={tempData.name || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-white border border-transparent rounded-md">
                        {userData.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      User Type
                    </label>
                    <p className="px-3 py-2 bg-gray-100 border border-transparent rounded-md">
                      {userData.role_id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiMail className="mr-2" /> Email Address
                    </label>

                    <p className="px-3 py-2 bg-white border border-transparent rounded-md">
                      {userData.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiPhone className="mr-2" /> Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="phoneno"
                        value={tempData.phoneno || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-white border border-transparent rounded-md">
                        {userData.phoneno}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Security
              </h3>

              <div className="space-y-4">
                <button className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

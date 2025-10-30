import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiUpload, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./EditAdminProfile.css";
import Loader from "../../../components/Loader/Loader";

const EditAdminProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    phoneNumber: "",
    role: "",
    department: "",
    profileImage: "",
  });

  const [preview, setPreview] = useState({
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // TODO: Replace with actual API call to fetch admin profile
        // const response = await getAdminByToken();

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data for testing
        const mockData = {
          adminName: "Admin User",
          email: "admin@reptrack.com",
          phoneNumber: "+1 (555) 999-8888",
          role: "Super Administrator",
          department: "Management",
          profileImage: null,
        };

        setFormData({
          adminName: mockData.adminName || "",
          email: mockData.email || "",
          phoneNumber: mockData.phoneNumber || "",
          role: mockData.role || "",
          department: mockData.department || "",
          profileImage: mockData.profileImage || "",
        });

        setPreview({
          profileImage: mockData.profileImage || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle text field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setFormData({ ...formData, [name]: file });
      setPreview({ ...preview, [name]: URL.createObjectURL(file) });
    }
  };

  // ✅ Save updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedForm = new FormData();

      // ⚠️ IMPORTANT: Append ALL text fields (backend expects them)
      updatedForm.append("adminName", formData.adminName || "");
      updatedForm.append("phoneNumber", formData.phoneNumber || "");
      updatedForm.append("department", formData.department || "");

      // Append file only if it is a new File object
      if (formData.profileImage instanceof File) {
        updatedForm.append("profile_image", formData.profileImage);
      }

      // TODO: Replace with actual API call to update admin profile
      // const response = await updateAdmin(updatedForm);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Profile updated successfully!");

      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Reset form to original fetched data
  const handleCancel = () => {
    navigate("/dashboard/profile");
  };

  if (loading) return <Loader />;

  return (
    <div className="editprofile__wrapper">
      {/* Back Button */}
      <Link to="/dashboard/profile" className="editprofile__back-btn">
        <FiArrowLeft size={20} />
        Back
      </Link>

      {/* Form Container */}
      <div className="editprofile__container">
        <div className="editprofile__header">
          <h1 className="editprofile__title">Edit Admin Profile</h1>
          <p className="editprofile__subtitle">Update your administrator information</p>
        </div>

        {error && (
          <div className="editprofile__error">
            {error}
          </div>
        )}

        {success && (
          <div className="editprofile__success">
            {success}
          </div>
        )}

        <form className="editprofile__form-wrapper" onSubmit={handleSubmit}>
          {/* Image Section */}
          <div className="editprofile__image-section">
            <div className="editprofile__image-group">
              <div className="editprofile__avatar">
                {preview.profileImage ? (
                  <img src={preview.profileImage} alt="Profile" />
                ) : (
                  <FiUser size={48} />
                )}
              </div>
              <div>
                <label className="editprofile__upload-btn">
                  <FiUpload size={18} />
                  Upload Profile Image
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="editprofile__file-input"
                  />
                </label>
                <p className="editprofile__upload-hint">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="editprofile__form-grid">
            {/* Admin Name */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Full Name *</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="editprofile__input"
              />
            </div>

            {/* Phone Number */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter phone number"
              />
            </div>

            {/* Role */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Role</label>
              <input
                type="text"
                value={formData.role}
                disabled
                className="editprofile__input"
              />
            </div>

            {/* Department */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter department"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="editprofile__actions">
            <button
              type="button"
              onClick={handleCancel}
              className="editprofile__btn editprofile__btn--cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="editprofile__btn editprofile__btn--save"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminProfile;

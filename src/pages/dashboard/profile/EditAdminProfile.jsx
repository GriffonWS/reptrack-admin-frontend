import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiUpload, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./EditAdminProfile.css";
import Loader from "../../../components/Loader/Loader";
import { getAdminByToken, updateAdminByToken } from "../../../services/auth/authService";

const EditAdminProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
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
        const response = await getAdminByToken();

        if (response.success && response.data) {
          const data = response.data;
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            role: data.role || "admin",
          });
        } else {
          setError("Failed to load profile data.");
        }
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


  // ✅ Save updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Backend only allows firstName and lastName to be updated
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      const response = await updateAdminByToken(updatedData);

      if (response.success) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => {
          navigate("/dashboard/profile");
        }, 2000);
      } else {
        setError(response.message || "Failed to update profile.");
      }
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
          {/* Form Grid */}
          <div className="editprofile__form-grid">
            {/* First Name */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Email (Read-only) */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="editprofile__input"
              />
            </div>

            {/* Role (Read-only) */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Role</label>
              <input
                type="text"
                value={formData.role}
                disabled
                className="editprofile__input"
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

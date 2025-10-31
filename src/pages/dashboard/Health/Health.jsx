import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import './Health.css';
import { getHealthInfo, updateHealthInfo } from '../../../services/health/healthService';
import Loader from '../../../components/Loader/Loader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Health = () => {
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getHealthInfo();

      if (response.success && response.data && response.data.length > 0) {
        setContent(response.data[0].content);
        setNewContent(response.data[0].content);
      } else {
        setError('Failed to load health information');
      }
    } catch (err) {
      console.error('Error loading content:', err);
      setError(err.message || 'Failed to load health information');
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
    setError('');
    setSuccess('');
  };

  const hideEditModal = () => {
    setIsEditModalVisible(false);
    setNewContent(content);
    setError('');
    setSuccess('');
  };

  const updateContent = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await updateHealthInfo(1, { content: newContent });

      if (response.success) {
        setContent(newContent);
        setSuccess('Health information updated successfully!');
        setTimeout(() => {
          hideEditModal();
        }, 1500);
      } else {
        setError(response.message || 'Failed to update content');
      }
    } catch (err) {
      console.error('Error updating content:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="health__wrapper">
      <div className="health__container">
        {/* Header */}
        <div className="health__header">
          <div className="health__header-left">
            <h1 className="health__title">Health Information</h1>
          </div>
          <button className="health__edit-btn" onClick={showEditModal}>
            <FiEdit size={18} />
            Edit
          </button>
        </div>

        {/* Content Card */}
        <div className="health__content-card">
          <div
            className="health__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalVisible && (
        <div className="health__modal-overlay" onClick={hideEditModal}>
          <div className="health__modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="health__modal-title">Edit Health Information</h3>

            {/* Error & Success Messages */}
            {error && (
              <div className="health__error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="health__success-message">
                {success}
              </div>
            )}

            <form onSubmit={updateContent}>
              <div className="health__editor-wrapper">
                <CKEditor
                  editor={ClassicEditor}
                  data={newContent}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setNewContent(data);
                  }}
                  config={{
                    toolbar: [
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'link',
                      'bulletedList',
                      'numberedList',
                      '|',
                      'blockQuote',
                      'insertTable',
                      '|',
                      'undo',
                      'redo'
                    ]
                  }}
                />
              </div>

              <div className="health__modal-actions">
                <button
                  type="button"
                  className="health__btn health__btn--secondary"
                  onClick={hideEditModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="health__btn health__btn--primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Health;

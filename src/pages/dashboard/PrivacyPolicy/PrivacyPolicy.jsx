import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy__wrapper">
      <div className="privacy-policy__container">
        <h1 className="privacy-policy__title">Privacy Policy</h1>

        <p className="privacy-policy__intro">
          Welcome to Reptrack! We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our application.
        </p>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Information We Collect</h2>
          <p>
            When you register for an account or use our services, we may collect the following information:
          </p>
          <ul className="privacy-policy__list">
            <li><strong>Personal Details:</strong> Name, email address, phone number, and address.</li>
            <li><strong>Health Information:</strong> Optional details about your fitness goals, medical conditions, or dietary preferences.</li>
            <li><strong>Payment Information:</strong> Billing details for subscription or one-time payments (processed securely).</li>
            <li><strong>Activity Data:</strong> Attendance logs, workout plans, and progress tracking.</li>
            <li><strong>Device Information:</strong> IP address, browser type, and operating system for analytics purposes.</li>
          </ul>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul className="privacy-policy__list">
            <li>Provide and manage your account.</li>
            <li>Track your fitness progress and goals.</li>
            <li>Send reminders for gym schedules, appointments, or classes.</li>
            <li>Process payments securely.</li>
            <li>Improve our services and provide customer support.</li>
          </ul>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Sharing Your Information</h2>
          <p>
            We do not share your personal information with third parties except:
          </p>
          <ul className="privacy-policy__list">
            <li>With service providers who help us process payments or manage data (e.g., payment gateways).</li>
            <li>To comply with legal obligations or protect the safety and rights of others.</li>
            <li>With your explicit consent, such as sharing progress with personal trainers.</li>
          </ul>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Data Security</h2>
          <p>
            We use industry-standard security measures to protect your data, including encryption, secure servers, and access controls. However, no system is 100% secure, and we cannot guarantee absolute protection.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="privacy-policy__list">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of receiving marketing communications.</li>
            <li>Request a copy of your stored data.</li>
          </ul>
          <p>
            To exercise these rights, please contact us at{' '}
            <a href="mailto:reptrackapp@gmail.com" className="privacy-policy__link">
              reptrackapp@gmail.com
            </a>.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Changes to This Privacy Policy</h2>
          <p>
            We may update this policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted in the app, and your continued use of the app constitutes acceptance of these changes.
          </p>
        </section>

        <p className="privacy-policy__footer">
          If you have any questions about this privacy policy, please contact us at{' '}
          <a href="mailto:reptrackapp@gmail.com" className="privacy-policy__link">
            reptrackapp@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from "react";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Terms and Conditions</h1>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using our platform, you agree to comply with these
          Terms and Conditions. If you do not agree, please do not use this
          platform.
        </p>

        <h2>2. User Responsibilities</h2>
        <ul>
          <li>You must provide accurate and truthful information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>You agree not to use this platform for illegal or unauthorized purposes.</li>
        </ul>

        <h2>3. Privacy Policy</h2>
        <p>
          Your privacy is important to us. We will not share your personal
          information with third parties without your consent, except as
          required by law.
        </p>

        <h2>4. Prohibited Activities</h2>
        <ul>
          <li>Uploading harmful or malicious code.</li>
          <li>Attempting to gain unauthorized access to the system.</li>
          <li>Sharing offensive, discriminatory, or harmful content.</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, logos, and designs on this platform are protected by
          copyright. You may not copy, reproduce, or distribute our content
          without permission.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          We are not responsible for any damages, losses, or issues that may
          arise from the use of this platform. Users are responsible for their
          actions and data.
        </p>

        <h2>7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts if users
          violate these Terms and Conditions.
        </p>

        <h2>8. Updates to Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. Users
          will be notified of significant changes.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions regarding these Terms and Conditions,
          please contact us at <b>support@example.com</b>.
        </p>
      </div>
    </div>
  );
};

export default Terms;

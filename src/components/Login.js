import React, { useState } from 'react';
import { auth, setUpRecaptcha, signInWithPhoneNumber } from '../firebase';  // Import firebase setup
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';   // Import the correct method

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  const requestOTP = async (e) => {
    e.preventDefault();
    setUpRecaptcha();  // Setup the Recaptcha
    const phoneNumber = `+92${phone}`;  // Append Pakistan's country code +92
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);  // Save verification ID
      setShowOtpInput(true);  // Show OTP input after sending OTP
    } catch (error) {
      console.error('Error during signInWithPhoneNumber', error);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    const credential = PhoneAuthProvider.credential(verificationId, otp);  // Use PhoneAuthProvider
    try {
      await signInWithCredential(auth, credential);  // Authenticate the user
      alert('User authenticated successfully');
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login with OTP</h2>

        {!showOtpInput ? (
          <form onSubmit={requestOTP}>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full p-2 mt-2 border rounded"
            />
            <div id="recaptcha-container"></div>  {/* Recaptcha */}
            <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={verifyOTP}>
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-2 mt-2 border rounded"
            />
            <button className="w-full mt-4 p-2 bg-green-500 text-white rounded">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

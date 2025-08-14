import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    // The main container with the Aurora background effect
    <div className="min-h-screen w-full bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] font-sans text-white antialiased">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            We'd love to hear from you. Whether you have a question, feedback,
            or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information Section - Glassmorphism Card */}
          <div className="space-y-8">
            <div className="p-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-400/10 p-3 rounded-full ring-1 ring-cyan-400/30">
                    <Mail className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                      Email
                    </h3>
                    <p className="text-slate-400">Reach out to us via email.</p>
                    <a
                      href="mailto:contact@carenow.com"
                      className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                    >
                      contact@carenow.com
                    </a>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-400/10 p-3 rounded-full ring-1 ring-cyan-400/30">
                    <Phone className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                      Phone
                    </h3>
                    <p className="text-slate-400">
                      Give us a call for immediate assistance.
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-400/10 p-3 rounded-full ring-1 ring-cyan-400/30">
                    <MapPin className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                      Office Location
                    </h3>
                    <p className="text-slate-400">
                      123 Health St, Wellness City, 45678
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section - Glassmorphism Card */}
          <div className="p-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
                <h2 className="text-2xl font-bold text-white">Thank You!</h2>
                <p className="mt-2 text-slate-300">
                  Your message has been sent successfully. We'll get back to you
                  shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Send us a Message
                </h2>
                {/* Form Inputs */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 bg-slate-800/60 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:bg-slate-800 transition"
                    placeholder="Ananya Sharma"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 bg-slate-800/60 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:bg-slate-800 transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 bg-slate-800/60 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:bg-slate-800 transition"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-x-2 py-3 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="h-5 w-5" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

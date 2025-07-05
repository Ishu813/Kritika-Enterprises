import { useState } from "react";
import { Send, Phone, Mail, MessageSquare, User, Building } from "lucide-react";
import { Button } from './Ui/Button';
import { Input } from "./Ui/Input";
import { Textarea } from "./Ui/Textarea";
import { toast } from './Ui/Use-toast';

const ExpertAssistance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "",
    budget: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.phone.trim()) errors.phone = 'Mobile is required.';
    if (!formData.email.trim()) errors.email = 'Email is required.';
    if (!formData.inquiryType.trim()) errors.inquiryType = 'Inquiry type is required.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    console.log("Form submitted:", formData);
    toast({
      title: "Request Submitted",
      description: "Our experts will get back to you within 24 hours!",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      inquiryType: "",
      budget: "",
      message: ""
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+1 (555) 123-4567",
      available: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed technical assistance",
      contact: "support@kritikeenterprises.com",
      available: "24/7 Response"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant help with our AI assistant",
      contact: "Available on website",
      available: "24/7 Online"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Expert Assistance</h1>
          <p className="text-base text-gray-400 max-w-3xl mx-auto">
            Get personalized help from our tech experts. Whether you need product recommendations, 
            technical support, or custom solutions, we're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Get Expert Help</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="placeholder:text-gray-400"
                  />
                  {submitted && formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="placeholder:text-gray-400"
                  />
                  {submitted && formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Company</label>
                  <Input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Phone *</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="placeholder:text-gray-400"
                  />
                  {submitted && formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Inquiry Type *</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-3 placeholder:text-gray-400"
                    required
                  >
                    <option value="" disabled>
                      Select Inquiry Type
                    </option>
                    <option value="product_recommendation">Product Recommendation</option>
                    <option value="technical_support">Technical Support</option>
                    <option value="custom_solution">Custom Solution</option>
                    <option value="other">Other</option>
                  </select>
                  {submitted && formErrors.inquiryType && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.inquiryType}</p>
                  )}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-3 placeholder:text-gray-400"
                  >
                    <option value="" disabled>
                      Select Budget Range
                    </option>
                    <option value="under_1000">Under 1,000</option>
                    <option value="1000_5000">1,000 - 5,000</option>
                    <option value="5000_10000">5,000 - 10,000</option>
                    <option value="above_10000">Above 10,000</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Message</label>
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="placeholder:text-gray-400"
                />
              </div>
              <Button type="submit" className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white py-3 flex items-center justify-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Submit</span>
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Methods</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-2 sm:space-y-0"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <method.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{method.title}</h3>
                      <p className="text-gray-400 mb-1">{method.description}</p>
                      <p className="text-blue-400 font-medium">{method.contact}</p>
                      <p className="text-sm text-gray-500">{method.available}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose Our Expert Assistance?</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-center">
                  <User className="h-4 w-4 mr-3 text-blue-400" />
                  Certified tech specialists
                </li>
                <li className="flex items-center">
                  <Building className="h-4 w-4 mr-3 text-blue-400" />
                  Enterprise-level support
                </li>
                <li className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-3 text-blue-400" />
                  Personalized recommendations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertAssistance;
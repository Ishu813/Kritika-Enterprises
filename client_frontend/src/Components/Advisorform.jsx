const Advisorform = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-gradient-to-br from-[#f2f3ff] to-[#f8f4ff] font-sans">
      <div className="flex flex-col md:flex-row w-full rounded bg-white shadow-xl p-6">
      <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <div className="flex flex-col items-center">
          <span className="px-4 py-2 bg-[#040273] text-white font-semibold rounded-full text-xl mb-4">
            Talk to our Advisor!
          </span>
          <img 
            src="https://th.bing.com/th/id/OIP.ZKbOB4BmKvIiKy-fHieivAHaHa?rs=1&pid=ImgDetMain" 
            alt="Advisor"
            className="rounded-full shadow-lg object-cover w-auto h-auto max-w-full"
          />
        </div>
      </div>
      <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#040273] mb-6">Book a session!</h1>
        <form className="space-y-4">
          <div>
            <label className="block font-medium text-[#3c3b85] mb-1">Your Topic of Interest*</label>
            <select required className="w-full p-3 border border-gray-300 rounded text-base">
              <option value="">Select Product</option>
              <option value="Monitors">Monitors</option>
              <option value="LED screens">LED screens</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-[#3c3b85] mb-1">Enter Name</label>
            <input type="text" placeholder="Enter Name" required className="w-full p-3 border border-gray-300 rounded text-base" />
          </div>
          <div>
            <label className="block font-medium text-[#3c3b85] mb-1">Enter Email</label>
            <input type="email" placeholder="Enter Email" required className="w-full p-3 border border-gray-300 rounded text-base" />
          </div>
          <div>
            <label className="block font-medium text-[#3c3b85] mb-1">Enter Phone</label>
            <input type="tel" placeholder="Enter Phone" required className="w-full p-3 border border-gray-300 rounded text-base" />
          </div>
          <button type="submit" className="w-full py-3 bg-[#040273] text-white rounded-lg font-semibold hover:bg-[#4947d6] transition">
            CONTINUE
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Advisorform;

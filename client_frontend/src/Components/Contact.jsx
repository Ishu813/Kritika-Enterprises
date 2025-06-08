const Contact = () => {
  return (
    <>
      {/* Contact info */}
      <footer className=" bg-gray-200 rounded-lg pl-2 pr-2 ">
        <div className="max-w-7xl  py-8 mx-auto flex flex-col md:flex-row justify-between gap-8 px-4">
          <div>
            <h2 className="text-[#6870D1] text-2xl font-bold">Kritika enterprises</h2>
            <div className=''>
              <a href="tel:+919927055680" className=" hover:underline">+91 9927055680</a>
            <br/>
            <a href="mailto:email@example.com" className=" hover:underline">email@example.com</a>
            <div className="mt-4 ">
              C-8 Butler Plaza<br />
              Civil Lines, Bareilly
            </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2   text-bold text-xl hover:underline hover:cursor-pointer"><a href="/products">Products</a></h4>
            <ul className="space-y-1 ">
              <li><a href="/products/B2B" className="hover:underline   hover:cursor-pointer">B2B products</a></li>
              <li><a href="/products#laptops" className="hover:underline   hover:cursor-pointer">Laptops</a></li>
              <li><a href="/products#medical-equipments" className="hover:underline hover:cursor-pointer">Medical equipments</a></li>
            </ul>
          </div>
          <div className="w-3/4 md:w-96 h-40">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6289.0364960883335!2d79.41779768907527!3d28.349743886954816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0014c01f5f6df%3A0x41ff26c72c5735f4!2sASUS%20Premium%20Retailer%20-%20Kritika%20Enterprises!5e0!3m2!1sen!2sin!4v1748867630371!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kritika Enterprises Map"
            ></iframe>
          </div>
        </div>
        <div className="text-center text-sm ">
          © 2025 KE. All rights reserved.
        </div>
      </footer>
    </>
  )
}

export default Contact

const Contact = () => {
  return (
    <>
      {/* Contact info */}
      <footer className=" bg-[#192747]  rounded-lg pl-4 pr-4 sm:pl-8 sm:pr-8 ">
        <div className="max-w-7xl  text-white py-6 sm:py-8 mx-auto flex flex-col md:flex-row justify-between gap-6 sm:gap-8 px-2 sm:px-4">
          <div>
            <h2 className="text-[#F33539] text-2xl font-bold">
              Kritika enterprises
            </h2>
            <div className="">
              <a
                href="tel:+916396538256"
                className="text-[#a1c2ef] hover:underline"
              >
                6396538256
              </a>
              <br />
              <a
                href="tel:+917982151940"
                className="text-[#a1c2ef] hover:underline"
              >
                7982151940
              </a>
              <br />
              <a
                href="mailto:kritika.thekayee@gmail.com"
                className="text-[#a1c2ef] hover:underline"
              >
                kritika.thekayee@gmail.com
              </a>
              <div className="mt-4 text-[#a1c2ef] ">
                C-8 Butler Plaza
                <br />
                Civil Lines, Bareilly
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-[#a1c2ef]  text-bold text-xl hover:underline hover:cursor-pointer">
              <a href="/products">Products</a>
            </h4>
            <ul className="space-y-1 ">
              <li>
                <a
                  href="/products/B2B"
                  className="hover:underline text-[#a1c2ef]  hover:cursor-pointer"
                >
                  B2B products
                </a>
              </li>
              <li>
                <a
                  href="/products#laptops"
                  className="hover:underline text-[#a1c2ef]  hover:cursor-pointer"
                >
                  Laptops
                </a>
              </li>
              <li>
                <a
                  href="/products#medical-equipments"
                  className="hover:underline text-[#a1c2ef] hover:cursor-pointer"
                >
                  Medical equipments
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-3/4 md:w-96 h-40 sm:h-48">
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
        <div className="text-center text-[#a1c2ef] text-sm ">
          © 2025 KE. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Contact;

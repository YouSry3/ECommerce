export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-4 mt-10">
      <div className="container mx-auto w-11/12">
      
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <div className="text-center lg:text-left mb-4 lg:mb-0">
            <h3 className="text-xl font-semibold text-gray-800">
              Get the FreshCart app
            </h3>
            <p className="text-gray-600 text-sm">
              We will send you a link, open it on your phone to download the app.
            </p>
          </div>

          <div className="flex w-full lg:w-1/2 bg-white border border-gray-300 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Email .."
              className="w-full p-3 px-4 text-gray-700 outline-none placeholder-gray-500"
            />
            <button className="bg-green-600 text-white px-6 text-sm font-semibold hover:bg-green-700 transition-all">
              Share App Link
            </button>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-200 pt-4">
 
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <span className="text-gray-600 text-sm font-medium">Payment Partners</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>

          {/* App Store Links */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm font-medium">Get deliveries with FreshCart</span>
            <a href="#">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="h-10" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

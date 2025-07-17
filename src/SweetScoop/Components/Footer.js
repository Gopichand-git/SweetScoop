import React, { useState } from "react";
import { motion } from "framer-motion";

const ModernIceCreamFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden"
    >

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: `linear-gradient(45deg, ${
                ['#ff6b9d', '#c44569', '#f8b500', '#ff9ff3', '#54a0ff', '#5f27cd'][i]
              }, transparent)`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
       
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="flex flex-col sm:flex-row items-center justify-center mb-6"
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-2xl mb-4 sm:mb-0">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl sm:text-3xl"
              >
                🍦
              </motion.div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent sm:ml-4">
              Sweet Scoop
            </h2>
          </motion.div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Where every scoop tells a story of passion, quality, and pure deliciousness
          </p>
        </motion.div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
  
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { name: '🏠 Home', href: '#' },
                { name: '🍨 Flavors', href: '#' },
                { name: '📸 Gallery', href: '#' },
                { name: '📍 Locations', href: '#' },
                { name: '💫 About Us', href: '#' },
                { name: '📞 Contact', href: '#' }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a 
                    href={link.href}
                    className="text-gray-700 hover:text-pink-600 transition-all duration-300 flex items-center justify-between group text-sm sm:text-base"
                  >
                    <span className="group-hover:mr-2 transition-all duration-300">{link.name}</span>
                    <motion.span 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Get in Touch
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-3 bg-white/40 rounded-xl"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm">📍</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">123 Sweet Street</p>
                  <p className="text-gray-600 text-xs sm:text-sm">Dessert City, DC 12345</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-3 bg-white/40 rounded-xl"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm">📞</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">(123) 456-7890</p>
                  <p className="text-gray-600 text-xs sm:text-sm">Call us anytime!</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-3 bg-white/40 rounded-xl"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm">✉️</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-700 font-medium text-sm sm:text-base break-all">hello@scoopdelight.com</p>
                  <p className="text-gray-600 text-xs sm:text-sm">We love hearing from you!</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              Opening Hours
            </h3>
            <div className="space-y-3">
              {[
                { day: 'Monday - Friday', time: '12:00 PM - 10:00 PM', isOpen: true },
                { day: 'Saturday - Sunday', time: '10:00 AM - 11:00 PM', isOpen: true },
                { day: 'Today', time: 'Open until 10:00 PM', isOpen: true, special: true }
              ].map((schedule, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-xl ${
                    schedule.special 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200' 
                      : 'bg-white/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{schedule.day}</span>
                    {schedule.isOpen && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">{schedule.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

  
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Sweet Updates
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Join our sweet community for exclusive offers and flavor drops! 🎉
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 text-sm sm:text-base"
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                {isSubscribed ? '🎉 Subscribed!' : 'Subscribe'}
              </motion.button>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-200"
            >
              <p className="text-yellow-800 font-semibold mb-2 flex items-center text-sm sm:text-base">
                🎁 Current Promotion:
              </p>
              <p className="text-yellow-700 text-xs sm:text-sm">
                Free waffle cone with any purchase of 3 scoops or more!
              </p>
            </motion.div>
          </motion.div>
        </div>

      
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Follow Our Sweet Journey</h3>
          <div className="flex justify-center space-x-3 sm:space-x-4 flex-wrap gap-2 sm:gap-0">
            {[
              { 
                name: 'Facebook', 
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
                color: 'from-blue-500 to-blue-600' 
              },
              { 
                name: 'Instagram', 
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                color: 'from-pink-500 to-purple-600' 
              },
              { 
                name: 'Twitter', 
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
                color: 'from-blue-400 to-blue-500' 
              },
              { 
                name: 'TikTok', 
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>,
                color: 'from-black to-gray-800' 
              },
              { 
                name: 'YouTube', 
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
                color: 'from-red-500 to-red-600' 
              }
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <span className="text-white">{social.icon}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

  
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-pink-200 to-purple-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white/60 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full text-gray-500 text-sm sm:text-base">
              🍨 Made with love since 2010 🍨
            </span>
          </div>
        </div>

       
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left space-y-4 lg:space-y-0"
        >
          <p className="text-gray-600 text-sm sm:text-base">
            © 2025 SweetScoop . All rights reserved. Made with 💖 and lots of ice cream.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((link, index) => (
              <motion.a 
                key={index}
                href="#" 
                whileHover={{ y: -2 }}
                className="text-gray-500 hover:text-pink-600 text-xs sm:text-sm transition-all duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default ModernIceCreamFooter;
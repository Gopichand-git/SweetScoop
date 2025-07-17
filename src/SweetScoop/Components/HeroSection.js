import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Menu, X,  User, LogOut } from "lucide-react";
import { initializeApp } from "firebase/app";
import { signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";
import { Eye, EyeOff, Loader } from 'lucide-react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getRedirectResult,
  updateProfile
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxUTPxF1bdOdIrvpkEu-hujoRgFuzZBcY",
  authDomain: "sweet-scoop-12da3.firebaseapp.com",
  projectId: "sweet-scoop-12da3",
  storageBucket: "sweet-scoop-12da3.appspot.com",
  messagingSenderId: "149542246651",
  appId: "1:149542246651:web:7347949b76c5604bc6385e",
  measurementId: "G-P5H6T9ZGQ6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


const flavors = [
  {
    name: "Vanilla Dream",
    desc: "Classic creamy vanilla made with real beans.",
    price: "$4.99",
    img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    calories: 180,
    ingredients: ["Cream", "Sugar", "Vanilla beans", "Milk"]
  },
  {
    name: "Strawberry Bliss",
    desc: "Fresh strawberry puree blended into creamy delight.",
    price: "$5.49",
    img: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    calories: 160,
    ingredients: ["Strawberries", "Cream", "Sugar", "Natural flavor"]
  },
  {
    name: "Choco Overload",
    desc: "Rich Belgian chocolate with fudge brownie bites.",
    price: "$5.99",
    img: "https://hyderabadbazaar.com/images/10071/nutsoverloaded_B_090920.jpg",
    rating: 4.7,
    calories: 220,
    ingredients: ["Belgian chocolate", "Cream", "Brownie pieces", "Cocoa"]
  },
  {
    name: "Mint Choco Chip",
    desc: "Refreshing mint with crunchy chocolate chips.",
    price: "$5.49",
    img: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Mint-Chip-Ice-Cream_EXPS_TOHcom24_15301_DR_06_25_18b.jpg",
    rating: 4.6,
    calories: 190,
    ingredients: ["Mint", "Chocolate chips", "Cream", "Sugar"]
  },
  {
    name: "Caramel Swirl",
    desc: "Velvety caramel ribbons in sweet cream base.",
    price: "$5.99",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6v3h3wrnmoqCw4sPZuwCM0dD6MtoA7CsnGn5BxmazXd-FCTYEm_xzkLJHeZS-5QhePC5NN5QsOY33VHVGRnuw2W0Yjq2hcSL8-RgGyNYqjsPbQszqb22XYyc73P0tN_0zVODy4kSqmXR18nDRvnqQyuhqBKyF1lfeTP-nBAIW3ItR4WbEKCq1zdDPGQ/s1600-rw/Caramel%20Ice%20Cream-2.jpg",
    rating: 4.8,
    calories: 200,
    ingredients: ["Caramel", "Cream", "Butter", "Sea salt"]
  },
  {
    name: "Berry Burst",
    desc: "Mixed berries with dark chocolate chunks.",
    price: "$5.49",
    img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    calories: 170,
    ingredients: ["Mixed berries", "Dark chocolate", "Cream", "Sugar"]
  },
  {
    name: "Cookie Dough Delight",
    desc: "Vanilla ice cream with chunks of cookie dough.",
    price: "$5.99",
    img: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    calories: 240,
    ingredients: ["Cookie dough", "Vanilla", "Cream", "Chocolate chips"]
  },
  {
    name: "Pistachio Paradise",
    desc: "Roasted pistachios in creamy pistachio base.",
    price: "$5.99",
    img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    calories: 210,
    ingredients: ["Pistachios", "Cream", "Sugar", "Almond extract"]
  },
  {
    name: "Mango Tango",
    desc: "Tropical mango swirl with coconut flakes.",
    price: "$5.49",
    img: "https://media.istockphoto.com/id/1456234806/photo/mango-ice-cream-served-in-cup-isolated-on-grey-background-top-view-of-indian-and-bangladesh.jpg?s=612x612&w=0&k=20&c=Uks87rmzZT5tQtD48aRG9S-EUqSBTlAlkpOKgLUlIe4=",
    rating: 4.6,
    calories: 150,
    ingredients: ["Mango", "Coconut", "Cream", "Tropical spices"]
  },
  {
    name: "Coffee Crunch",
    desc: "Cold brew coffee with chocolate-covered espresso beans.",
    price: "$5.99",
    img: "https://images.squarespace-cdn.com/content/v1/533f584fe4b0f77e1bd2e4d1/1397707232184-HU6BZIK2UVXMXV7M5PT5/image-asset.jpeg",
    rating: 4.8,
    calories: 190,
    ingredients: ["Cold brew coffee", "Espresso beans", "Cream", "Sugar"]
  },
  {
    name: "Salted Caramel",
    desc: "Buttery caramel with sea salt crystals.",
    price: "$5.99",
    img: "https://www.thespruceeats.com/thmb/jZmYRDpWby4VM4r2w5Cah1Vth_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SaltedCaramelIceCreamHERO-9e49945bc9fb4afca856e37f5b1bbbe5.jpg",
    rating: 4.9,
    calories: 200,
    ingredients: ["Salted caramel", "Cream", "Sea salt", "Butter"]
  },
  {
    name: "Peanut Butter Cup",
    desc: "Creamy peanut butter with chocolate chunks.",
    price: "$5.99",
    img: "https://www.smells-like-home.com/wp-content/uploads/2012/06/peanut-butter-cup-fudge-swirl-ice-cream-2-1.jpg",
    rating: 4.7,
    calories: 230,
    ingredients: ["Peanut butter", "Chocolate", "Cream", "Honey"]
  }
];


const galleryImages = [
  "https://classicgelato.com.au/wp-content/uploads/2023/11/classic_gelato_assets_16.jpg",
  "https://c8.alamy.com/comp/D2MC00/ice-cream-shop-in-hong-kong-D2MC00.jpg",
  "https://images.pexels.com/photos/31865067/pexels-photo-31865067/free-photo-of-colorful-ice-cream-selection-in-stockholm-shop.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://thumbs.dreamstime.com/b/family-eating-ice-cream-mall-bags-shopping-52292441.jpg",
  "https://images.stockcake.com/public/d/c/e/dcedd112-e587-4dc1-84e6-78099e29a35d_large/bustling-ice-cream-shop-stockcake.jpg",
  "https://s.abcnews.com/images/GMA/baskin-robbins-3-ht-gmh-250611_1749669432261_hpMain_16x9_1600.jpg",
  "https://antdisplay.com/pub/media/magefan_blog/ice_cream_cake_shop_6_.png",
  "https://www.tasteofhome.com/wp-content/uploads/2024/05/GettyImages-1009629822-e1715116327694.jpg?fit=700%2C700",
  "https://media.istockphoto.com/id/1200969413/photo/female-confectioner-serving-ice-cream.jpg?s=612x612&w=0&k=20&c=2wvKteJzeU1YAOmMLp_b-QbaLIwrAtJRq_7N0mkvPzs="
];

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "The best ice cream in town! Their strawberry bliss is absolutely divine.",
    rating: 5,
    avatar: "https://llso.uchicago.edu/sites/default/files/styles/large/public/2023-01/IMG_4420.jpeg?h=d318f057&itok=-3_1475w"
  },
  {
    name: "Mike Chen",
    text: "Cookie dough delight is my go-to flavor. Always fresh and creamy!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "Emma Wilson",
    text: "Amazing variety and quality. ",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "David Rodriguez",
    text: "Their mint chocolate chip is perfection! Rich, creamy.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "Robert Taylor",
    text: "Been coming here for 3 years. Consistently high quality.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
  }
];

const LandingPage = () => {
  const [showFlavorsModal, setShowFlavorsModal] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [intendedAction, setIntendedAction] = useState(null);
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPack, setSelectedPack] = useState('normal');
 
  


  /* ───────────── EFFECTS ───────────── */

  useEffect(() => {
    const id = setInterval(
      () =>
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  
  useEffect(() => {
    (async () => {
      try {
        const res = await getRedirectResult(auth);
        if (res?.user) {
          setUser(res.user);
          await loadUserCart(res.user.uid);
          await loadUserFavorites(res.user.uid);
          showNotification("Logged in successfully!");
        }
      } catch (err) {
      
        if (err.code === 'auth/redirect-cancelled-by-user') {
          showNotification("Google login was cancelled");
        } else {
          setError(err.message);
          showNotification(`Google login failed: ${err.message}`);
        }
      }
    })();
  }, []);


  // auth state listener
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (usr) => {
      setUser(usr);
      if (usr) {
        await loadUserCart(usr.uid);
        await loadUserFavorites(usr.uid);
        if (intendedAction) {
          intendedAction();
          setIntendedAction(null);
        }
      } else {
        setCart([]);
        setFavorites([]);
      }
    });
    return unSub;
  }, [intendedAction]);

 
  useEffect(() => {
    if (user) saveCartToFirestore(user.uid, cart);
  }, [cart, user]);

  useEffect(() => {
    if (user) saveFavoritesToFirestore(user.uid, favorites);
  }, [favorites, user]);

  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showAuthModal]);


  /* ───────────── HELPERS ───────────── */
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const saveCartToFirestore = async (uid, items) => {
    try {
      await setDoc(doc(collection(db, "users"), uid), { cart: items }, { merge: true });
    } catch (err) {
      console.error("saveCart:", err);
    }
  };

  const saveFavoritesToFirestore = async (uid, items) => {
    try {
      await setDoc(doc(collection(db, "users"), uid), { favorites: items }, { merge: true });
    } catch (err) {
      console.error("saveFav:", err);
    }
  };

  const loadUserCart = async (uid) => {
    try {
      const snap = await getDoc(doc(collection(db, "users"), uid));
      setCart(snap.exists() && snap.data().cart ? snap.data().cart : []);
    } catch (err) {
      console.error("loadCart:", err);
    }
  };

  const loadUserFavorites = async (uid) => {
    try {
      const snap = await getDoc(doc(collection(db, "users"), uid));
      setFavorites(
        snap.exists() && snap.data().favorites ? snap.data().favorites : []
      );
    } catch (err) {
      console.error("loadFav:", err);
    }
  };
  const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
     
      
      
      
      setUser(result.user);
      showNotification("Logged in successfully with Google!");
      
      
      setShowAuthModal(false); 
    })
    .catch((error) => {
      console.error("Google sign-in error:", error);
      setError(error.message);
      showNotification(`Google login failed: ${error.message}`);
    });
};

  /* ───────────── CART ───────────── */
  const addToCart = (flavor) => {
    const perform = () => {
      setCart((prev) => {
        const existing = prev.find((i) => i.name === flavor.name);
        if (existing) {
          return prev.map((i) =>
            i.name === flavor.name ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
         
          const normalizedFlavor = {
            ...flavor,
            price: typeof flavor.price === 'string'
              ? flavor.price
              : `$${flavor.price}`
          };
          return [...prev, { ...normalizedFlavor, quantity: 1 }];
        }
      });
      showNotification(`${flavor.name} added to cart!`);
    };

    if (!user) {
      setShowAuthModal(true);
      setAuthMode("login");
      setIntendedAction(() => perform);
    } else {
      perform();
    }
  };

  /* ───────────── FAVORITES ───────────── */
  const toggleFavorite = (flavorName) => {
    const perform = () =>
      setFavorites((prev) =>
        prev.includes(flavorName)
          ? prev.filter((n) => n !== flavorName)
          : [...prev, flavorName]
      );

    if (!user) {
      setShowAuthModal(true);
      setAuthMode("login");
      setIntendedAction(() => perform);
    } else {
      perform();
      showNotification(
        favorites.includes(flavorName)
          ? `${flavorName} removed from Favorites`
          : `${flavorName} added to Favorites`
      );
    }
  };

  /* ───────────── SEARCH & SORT ───────────── */
  const filteredFlavors = flavors
    .filter(
      (f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.desc.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
        case "rating":
          return b.rating - a.rating;
        case "calories":
          return a.calories - b.calories;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  /* ───────────── AUTH ───────────── */
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });
      closeAuthModal();
      showNotification("Account created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
     
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      closeAuthModal();
      showNotification("Logged in successfully!");
    } catch (err) {
     
      if (err.code === 'auth/web-storage-unsupported') {
        setError("Your browser doesn't support login features. Try Chrome or Safari.");
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAuthForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setShowPassword(false);
    setError("");
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
      showNotification("Logged out successfully!");
    } catch (err) {
      console.error("logout:", err);
    }
  };
  const scrollToProducts = () => {
    const section = document.getElementById("menu");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewFlavors = () => {
    setShowFlavorsModal(true); 
  };

  const closeFlavorsModal = () => {
    setSelectedFlavor(null);
    setShowFlavorsModal(false);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    document.body.classList.remove('modal-open');
    clearAuthForm();
  };
  const getTotalPrice = () => {
    return cart
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.slice(1)) * item.quantity,
        0
      )
      .toFixed(2);
  };

  useEffect(() => {
    const anyModalOpen = showFlavorsModal || showFavoritesModal || showCart || showAuthModal || mobileMenuOpen;

    if (anyModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showFlavorsModal, showFavoritesModal, showCart, showAuthModal, mobileMenuOpen]);


  return (
    <div className="bg-pink-50 min-h-screen font-sans">
      {/* Add CSS for scroll locking */}
      <style jsx>{`
        body.modal-open {
          overflow: hidden;
          position: fixed;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .modal-content {
            max-height: 80vh;
            overflow-y: auto;
          }
          
          .touch-target {
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[1000]"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2 touch-target"
      >
        <ShoppingCart size={24} />
        {getTotalItems() > 0 && (
          <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {getTotalItems()}
          </span>
        )}
      </motion.button>

      {/*-------------------------------------------------------Navbar------------------------------------------ */}
      
      <nav className="backdrop-blur-md bg-white/60 w-full shadow-md sticky top-0 z-50 border-b border-pink-100">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <motion.h1
                className="text-3xl font-extrabold text-blue-600 tracking-wide text-shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                SweetScoop
              </motion.h1>
            </motion.div>

        
            <div className="hidden md:flex items-center space-x-6">
              {["Home", "About", "Menu", "Gallery", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Home" ? "#" : `#${item.toLowerCase().replace(" ", "-")}`}
                  className="px-3 py-2 rounded-full text-gray-700 hover:text-white hover:bg-pink-500 transition-all duration-300 font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

          
            <div className="flex items-center gap-4 flex-wrap justify-end">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-gray-700 hover:text-pink-600 relative transition"
                onClick={() => setShowFavoritesModal(true)}
              >
                <Heart size={20} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {favorites.length}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-gray-700 hover:text-pink-600 relative transition"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>

              {user ? (
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  <div className="hidden sm:flex items-center gap-1 text-sm text-pink-600">
                    <User size={16} />
                    <span className="max-w-32 truncate">
                      {user.displayName || user.email.split("@")[0]}
                    </span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-pink-600 transition"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode("login");
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium"
                >
                  Login
                </motion.button>
              )}

             
              <button
                className="md:hidden text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

         
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden overflow-y-auto max-h-[80vh] bg-white/95 shadow-lg rounded-b-2xl"
              >
                <div className="flex flex-col space-y-3 py-4 border-t border-gray-200">
                  {user && (
                    <div className="px-4 py-3 flex items-center gap-3 bg-pink-50 rounded-lg mx-4 mb-2">
                      <User size={20} className="text-pink-600" />
                      <span className="text-pink-600 font-medium flex-1">
                        {user.displayName || user.email.split("@")[0]}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="text-gray-700 hover:text-pink-600 transition"
                        title="Logout"
                      >
                        <LogOut size={18} />
                      </motion.button>
                    </div>
                  )}

                  {!user && (
                    <div className="px-4 mb-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowAuthModal(true);
                          setAuthMode("login");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                      >
                        Login
                      </motion.button>
                    </div>
                  )}

                  {["Home", "About", "Menu", "Gallery", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={item === "Home" ? "#" : `#${item.toLowerCase().replace(" ", "-")}`}
                      className="px-4 py-2 text-gray-700 hover:text-white hover:bg-pink-500 rounded-full transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}

                  <div className="px-4 py-2 flex items-center justify-around border-t border-gray-200 pt-4">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-600 transition"
                      onClick={() => {
                        setShowFavoritesModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <div className="relative">
                        <Heart size={20} />
                        {favorites.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                            {favorites.length}
                          </span>
                        )}
                      </div>
                      <span className="text-xs">Favorites</span>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-600 transition"
                      onClick={() => {
                        setShowCart(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <div className="relative">
                        <ShoppingCart size={20} />
                        {getTotalItems() > 0 && (
                          <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                            {getTotalItems()}
                          </span>
                        )}
                      </div>
                      <span className="text-xs">Cart</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      

      {/* ----------------------------------------------Search Bar-------------------------------------------------*/}
      <div className="relative w-1/2 md:w-full max-w-md mx-auto mb-8 mt-10">
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search our flavors…"
          className="w-full py-3 px-6 rounded-full border border-pink-300 shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {searchTerm && (
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="
                            absolute mt-2 bg-white rounded-xl shadow-lg
                            max-h-72 overflow-y-auto z-50
                            w-[200%] -left-1/2
                            md:w-full md:left-0
                          "
            >
              {filteredFlavors.slice(0, 10).map((flavor) => (
                <motion.li
                  key={flavor.name}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer px-4 py-3 flex items-center justify-between gap-4 hover:bg-pink-50"
                  onClick={() => {
                    
                    setSearchTerm("");

                    
                    setSelectedFlavor(flavor);
                    setShowFlavorsModal(true);
                  }}
                >
                  
                  <div className="flex items-center gap-3">
                    <img
                      src={flavor.img}
                      alt={flavor.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-pink-200"
                    />
                    <div className="leading-tight">
                      <p className="font-semibold text-gray-900">{flavor.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{flavor.desc}</p>
                    </div>
                  </div>

                 
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-pink-600 font-semibold">{flavor.price}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();        
                        addToCart(flavor);          
                      }}
                      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 shadow-md"
                      title="Add to cart"
                    >
                      <ShoppingCart size={16} />
                    </motion.button>
                  </div>
                </motion.li>

              ))}

              {filteredFlavors.length === 0 && (
                <li className="px-4 py-2 text-gray-500">No matches</li>
              )}
            </motion.ul>
          </AnimatePresence>
        )}
      </div>


      <section className="text-gray-600 body-font ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center ">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
          >
            <motion.h1
              className="title-font sm:text-5xl text-3xl mb-4 font-bold text-pink-600 mt-0"
              animate={{
                textShadow: [
                  "0 0 0px rgba(236, 72, 153, 0.5)",
                  "0 0 10px rgba(236, 72, 153, 0.5)",
                  "0 0 0px rgba(236, 72, 153, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              
              <br className="hidden lg:inline-block" />
              <motion.span
                animate={{ color: ["#ec4899", "#8b5cf6", "#ec4899"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Taste the Joy of Ice Cream!
              </motion.span>
            </motion.h1>
            <p className="mb-8 leading-relaxed text-gray-700 text-lg">
              Dive into the world of luscious scoops, handcrafted with love. From classic vanilla to exotic mango chili,
              our ice creams are made with natural ingredients to cool your soul and warm your heart.
            </p>


            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProducts}
                className="inline-flex text-white bg-gradient-to-r from-pink-500 to-purple-500 border-0 py-3 px-8 focus:outline-none rounded-full text-lg font-semibold shadow-lg"
              >
                Order Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewFlavors}
                className="inline-flex text-blue-600 bg-black border-2 border-black-500 py-3 px-8 focus:outline-none hover:bg-pink-50 rounded-full text-lg font-semibold shadow-lg"
              >
                View Flavors
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
          >
            <motion.img
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="object-cover object-center rounded-lg shadow-xl w-full h-auto"
              alt="ice cream"
              src="https://aws.cricketmedia.com/media/20210413133327/Ice-Cream-kids.jpg"
            />
          </motion.div>
        </div>
      </section>


      {/*--------------------------------------------About Section------------------------------------------------*/}

      <section id="about" className="container mx-auto px-5 py-12">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">About SweetScoop</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img
              src="https://static.toiimg.com/thumb/msid-112019658,width-1280,height-720,resizemode-4/112019658.jpg"
              alt="Ice cream shop"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700 mb-4 font-bold">
              SweetScoop was founded in 2010 with a passion for creating the creamiest, most delicious ice cream using only the finest natural ingredients.
            </p>
            <p className="text-lg text-gray-700">
              Visit us today and experience the joy of real ice cream!
            </p>
          </div>
        </div>
      </section>


      {/* -------------------------------------------------Menu Section--------------------------------------------------------- */}
      <section id="menu" className="container mx-auto px-5 py-12">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">
          Our Menu
        </h2>

        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setSelectedPack("normal")}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${selectedPack === "normal"
                ? "bg-pink-500 text-white shadow-md"
                : "text-gray-600 hover:text-pink-500"
                }`}
            >
              Normal Pack
            </button>
            <button
              onClick={() => setSelectedPack("family")}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${selectedPack === "family"
                ? "bg-pink-500 text-white shadow-md"
                : "text-gray-600 hover:text-pink-500"
                }`}
            >
              Family Pack
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredFlavors.map((flavor, index) => {
           
            const normalPrice = parseFloat(flavor.price.replace(/[₹$,]/g, ""));
            const familyPrice = flavor.familyPrice
              ? parseFloat(flavor.familyPrice.replace(/[₹$,]/g, ""))
              : Math.round(normalPrice * 1.7);

            const priceValue =
              selectedPack === "family" ? familyPrice : normalPrice;

            
            const displayPrice = priceValue.toFixed(2);

           
            const savings = (normalPrice * 2 - familyPrice).toFixed(2);

            return (
              <motion.div
                key={flavor.name + index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedFlavor(flavor)}
              >
                
                <div className="relative">
                  <img
                    src={flavor.img}
                    alt={flavor.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(flavor.name);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
                  >
                    <Heart
                      size={20}
                      fill={favorites.includes(flavor.name) ? "#ec4899" : "none"}
                      color={
                        favorites.includes(flavor.name) ? "#ec4899" : "#6b7280"
                      }
                    />
                  </motion.button>

                  
                  <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                    {selectedPack === "family" ? "Family Pack" : "Normal Pack"}
                  </div>
                </div>

                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-pink-600">
                      {flavor.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <span className="text-sm text-gray-600">
                        {flavor.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {flavor.desc}
                  </p>

                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-black-500 font-bold">
                        {selectedPack === "family" ? "Serves 4‑6" : "Serves 1‑2"}
                      </span>
                      <span className="text-green-500 font-semibold">
                        {selectedPack === "family" ? "1 kg" : "500 g"}
                      </span>
                    </div>
                  </div>

                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex flex-col">
                     
                      <p className="text-lg sm:text-xl font-bold text-pink-500">
                        ${displayPrice}
                      </p>
                      {selectedPack === "family" && savings > 0 && (
                        <p className="text-xs text-green-600 font-medium">
                          Save ${savings}
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          ...flavor,
                          packSize: selectedPack,
                          price: Number(displayPrice),      
                          weight: selectedPack === "family" ? "1 kg" : "500 g"
                        });
                      }}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-full sm:w-auto text-xs sm:text-sm px-3 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/*-------------------------------------------------Live Stats-------------------------------------------- */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                className="text-4xl font-bold text-pink-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                50K+
              </motion.div>
              <div className="text-gray-600">Happy Customers</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                className="text-4xl font-bold text-pink-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                12
              </motion.div>
              <div className="text-gray-600">Unique Flavors</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                className="text-4xl font-bold text-pink-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                4.8
              </motion.div>
              <div className="text-gray-600">Average Rating</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                className="text-4xl font-bold text-pink-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                24/7
              </motion.div>
              <div className="text-gray-600">Fresh Made</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*---------------------------------------------------Gallery Section------------------------------------------------------ */}
      <section id="gallery" className="container mx-auto px-5 py-12">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">Sweet Moments Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img}
                alt={`Ice cream gallery ${index + 1}`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=400&q=80";
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>


      {/*---------------------------------------------------Special Offers Banner--------------------------------------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 py-12 my-12 rounded-xl shadow-lg mx-4 relative overflow-hidden"
      >
        <motion.div
          animate={{
            background: [
              "linear-gradient(45deg, #ec4899, #8b5cf6, #ec4899)",
              "linear-gradient(45deg, #8b5cf6, #ec4899, #8b5cf6)",
              "linear-gradient(45deg, #ec4899, #8b5cf6, #ec4899)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
        />
        <div className="container mx-auto text-center px-4 relative z-10">
          <motion.h2
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            🍦 Summer Special Offer! 🍦
          </motion.h2>
          <p className="text-xl text-white mb-6 max-w-2xl mx-auto">
            Get 3 scoops for the price of 2 on all fruit flavors. Limited time only!
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-pink-50 transition-all duration-200 shadow-lg"
          >
            Claim Offer Now
          </motion.button>
        </div>
      </motion.section>

      {/*------------------------------------------------Testimonials Carousel-------------------------------------------------------*/}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-8 sm:mb-10">
            What Our Customers Say
          </h2>

          <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="bg-pink-50 rounded-2xl p-5 sm:p-8 shadow-md">
                  <div className="flex justify-center mb-4">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 mb-4 italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <h4 className="font-semibold text-pink-600 text-sm sm:text-base">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-pink-500 scale-110' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/*-------------------------------------------------- Contact Section-------------------------------------------- */}
      <section id="contact" className="bg-pink-50 py-12">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">Contact Us</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea id="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── Flavors Modal ─────────────────────────── */}

      <AnimatePresence>
        {showFlavorsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeFlavorsModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-pink-600">
                  {selectedFlavor ? selectedFlavor.name : "All Our Flavors"}
                </h2>
                <button
                  onClick={closeFlavorsModal}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              {selectedFlavor ? (
               
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={selectedFlavor.img}
                    alt={selectedFlavor.name}
                    className="w-full md:w-1/2 h-72 object-cover rounded-xl shadow"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-gray-600 mb-4">{selectedFlavor.desc}</p>

                    <div className="mb-2">
                      <strong>Price:</strong>{" "}
                      <span className="text-pink-600 font-bold">
                        {selectedFlavor.price}
                      </span>
                    </div>

                    <div className="mb-2 flex items-center gap-2">
                      <strong>Rating:</strong>
                      <Star size={18} fill="#fbbf24" color="#fbbf24" />
                      <span>{selectedFlavor.rating}</span>
                    </div>

                    <div className="mb-2">
                      <strong>Calories:</strong>{" "}
                      <span>{selectedFlavor.calories} per serving</span>
                    </div>

                    {selectedFlavor.ingredients && (
                      <div className="mb-6">
                        <strong>Ingredients:</strong>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedFlavor.ingredients.map((ing) => (
                            <span
                              key={ing}
                              className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 flex-wrap">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(selectedFlavor)}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow"
                      >
                        Add to Cart
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFavorite(selectedFlavor.name)}
                        className={`px-4 py-2 rounded-full border ${favorites.includes(selectedFlavor.name)
                          ? "border-pink-500 text-pink-600"
                          : "border-gray-400 text-gray-600"
                          }`}
                      >
                        <Heart
                          size={18}
                          fill={
                            favorites.includes(selectedFlavor.name) ? "#ec4899" : "none"
                          }
                          color={
                            favorites.includes(selectedFlavor.name)
                              ? "#ec4899"
                              : "#6b7280"
                          }
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
               
                <>
                  {/*----------------------------------------------- search & sort------------------ */}

                  <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <input
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-pink-500"
                      placeholder="Search flavors…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border rounded-lg focus:ring-pink-500"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="rating">Sort by Rating</option>
                      <option value="calories">Sort by Calories</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {(searchTerm ? filteredFlavors : flavors).map((fl, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-pink-50 rounded-xl overflow-hidden shadow cursor-pointer"
                        onClick={() => setSelectedFlavor(fl)}
                      >
                        <img
                          src={fl.img}
                          alt={fl.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-pink-600 font-semibold">{fl.name}</h3>
                          <p className="text-gray-500 text-sm line-clamp-2">
                            {fl.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      

      {/*---------------------------------------------------------Favorites Modal----------------------------------------------------*/}
      <AnimatePresence>
        {showFavoritesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFavoritesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-y-auto p-6 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-pink-600">Your Favorite Flavors</h2>
                <button
                  onClick={() => setShowFavoritesModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart size={48} className="mx-auto text-pink-300 mb-4" />
                  <p className="text-xl text-gray-600">You haven't added any favorites yet!</p>
                  <button
                    onClick={() => {
                      setShowFavoritesModal(false);
                      setShowFlavorsModal(true);
                    }}
                    className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
                  >
                    Browse Flavors
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {flavors
                    .filter(flavor => favorites.includes(flavor.name))
                    .map((flavor, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-pink-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedFlavor(flavor)}
                      >
                        <div className="relative">
                          <img
                            src={flavor.img}
                            alt={flavor.name}
                            className="w-full h-40 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=400&q=80";
                            }}
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(flavor.name);
                            }}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                          >
                            <Heart
                              size={16}
                              fill={favorites.includes(flavor.name) ? "#ec4899" : "none"}
                              color={favorites.includes(flavor.name) ? "#ec4899" : "#6b7280"}
                            />
                          </motion.button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-pink-600">{flavor.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star size={14} fill="#fbbf24" color="#fbbf24" />
                              <span className="text-xs text-gray-600">{flavor.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{flavor.desc}</p>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-lg font-semibold text-pink-500">{flavor.price}</p>
                            <span className="text-xs text-gray-500">{flavor.calories} cal</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(flavor);
                            }}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
                          >
                            Add to Cart
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/*-------------------------------------------------------Flavor Detail Modal---------------------------------------------------*/}
      <AnimatePresence>
        {selectedFlavor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedFlavor(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-pink-600">{selectedFlavor.name}</h2>
                <button
                  onClick={() => setSelectedFlavor(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedFlavor.img}
                    alt={selectedFlavor.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-gray-600 mb-4">{selectedFlavor.desc}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Price:</span>
                      <span className="text-pink-600 font-bold">{selectedFlavor.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star size={16} fill="#fbbf24" color="#fbbf24" />
                        <span>{selectedFlavor.rating}</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold">Calories:</span>
                      <span>{selectedFlavor.calories} per serving</span>
                    </div>

                    <div>
                      <span className="font-semibold">Ingredients:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedFlavor.ingredients.map((ingredient, idx) => (
                          <span key={idx} className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        addToCart(selectedFlavor);
                        setSelectedFlavor(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFavorite(selectedFlavor.name)}
                      className="bg-white border-2 border-pink-500 text-pink-500 p-3 rounded-lg hover:bg-pink-50 transition-all duration-200"
                    >
                      <Heart
                        size={20}
                        fill={favorites.includes(selectedFlavor.name) ? "#ec4899" : "none"}
                        color="#ec4899"
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*-----------------------------------------------------------Cart Modal--------------------------------------------------------*/}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-pink-600">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowFlavorsModal(true);
                    }}
                    className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
                  >
                    Browse Flavors
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-pink-600">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setCart(prev => prev.map(cartItem =>
                                cartItem.name === item.name && cartItem.quantity > 1
                                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                  : cartItem
                              ));
                            }}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => {
                              setCart(prev => prev.map(cartItem =>
                                cartItem.name === item.name
                                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                  : cartItem
                              ));
                            }}
                            className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setCart(prev => prev.filter(cartItem => cartItem.name !== item.name));
                          }}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-pink-600">${getTotalPrice()}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*-------------------------------------------------------------Auth Modal-------------------------------------------------------*/}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeAuthModal}
            style={{
              
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md mx-auto my-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxHeight: '90vh',
                overflowY: 'auto',
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none', 
                WebkitScrollbar: 'none', 
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
            >
              <div className="p-6">
               
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-pink-600">
                    {authMode === 'login' ? 'Login' : 'Create Account'}
                  </h2>
                  <button
                    onClick={closeAuthModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold touch-manipulation"
                    style={{ minWidth: '44px', minHeight: '44px' }} 
                  >
                    ×
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b mb-6">
                  <button
                    className={`flex-1 py-3 text-center font-medium touch-manipulation ${authMode === 'login'
                      ? 'border-b-2 border-pink-500 text-pink-600'
                      : 'text-gray-500'
                      }`}
                    onClick={() => setAuthMode('login')}
                    style={{ minHeight: '44px' }} 
                  >
                    Login
                  </button>
                  <button
                    className={`flex-1 py-3 text-center font-medium touch-manipulation ${authMode === 'signup'
                      ? 'border-b-2 border-pink-500 text-pink-600'
                      : 'text-gray-500'
                      }`}
                    onClick={() => setAuthMode('signup')}
                    style={{ minHeight: '44px' }} 
                  >
                    Sign Up
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/*-------------------------------------------Form--------------------------------------- */}

                <form onSubmit={authMode === 'login' ? handleLogin : handleSignup} className="space-y-4">
                  {authMode === 'signup' && (
                    <div>
                      <label htmlFor="fullName" className="block text-gray-700 mb-1 text-sm sm:text-base">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
                        required
                        placeholder="Enter your full name"
                        autoComplete="name"
                        style={{
                          fontSize: '16px', 
                          WebkitAppearance: 'none'
                        }}
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
                      required
                      autoComplete="email"
                      style={{
                        fontSize: '16px', 
                        WebkitAppearance: 'none'
                      }}
                    />
                  </div>

                  {/* Password with eye toggle */}
                  <div className="relative">
                    <label htmlFor="password" className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12 text-base"
                      required
                      minLength="6"
                      autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                      style={{
                        fontSize: '16px', 
                        WebkitAppearance: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 touch-manipulation"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      style={{
                        minWidth: '44px',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                 
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation"
                    style={{ minHeight: '44px' }} 
                  >
                    {isSubmitting && <Loader size={18} className="animate-spin" />}
                    {isSubmitting ? 'Please wait…' : authMode === 'login' ? 'Login' : 'Create Account'}
                  </button>
                </form>

                {/* Social login */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg hover:bg-gray-50 touch-manipulation"
                    style={{ minHeight: '44px' }} 
                  >
                    <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95.1h146.9c-6.3 34-25 62.7-53.5 81.9v67.6h86.4c50.6-46.6 81.7-115.5 81.7-194.4z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272 544.3c72.6 0 133.5-24 178-65.1l-86.4-67.6c-24 16.1-54.6 25.6-91.6 25.6-70.5 0-130.3-47.6-151.6-111.4H30.1v69.9c44.5 88.1 136.1 148.6 241.9 148.6z"
                        fill="#34a853"
                      />
                      <path
                        d="M120.4 325.8c-10.3-30-10.3-62.2 0-92.2v-69.9H30.1c-40.6 81.2-40.6 176.4 0 257.6l90.3-69.9z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272 107.7c39.5-.6 77.6 13.7 107.2 39.9l80.2-80.2C408.4 23.2 341.8-2.3 272 0 166.1 0 74.5 60.5 30.1 148.6l90.3 69.9C141.7 155.2 201.5 107.7 272 107.7z"
                        fill="#ea4335"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
                  </button>
                </div>



                {/* Switch link */}
                <p className="text-center text-sm mt-6 text-gray-600">
                  {authMode === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        className="text-pink-600 font-medium hover:underline touch-manipulation"
                        onClick={() => setAuthMode('signup')}
                        style={{ minHeight: '44px' }} 
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        className="text-pink-600 font-medium hover:underline touch-manipulation"
                        onClick={() => setAuthMode('login')}
                        style={{ minHeight: '44px' }} 
                      >
                        Login
                      </button>
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
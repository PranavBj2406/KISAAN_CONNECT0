import React from 'react';
import gardenBg from "../assets/bg.jpg";

const products = [
  // Vegetables
  { id: 1, name: "Tomatoes", category: "Vegetables", price: 40, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200" },
  { id: 4, name: "Carrots", category: "Vegetables", price: 50, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200" },
  { id: 7, name: "Spinach", category: "Vegetables", price: 35, image: "https://th.bing.com/th/id/OIP.sb_552N9wJAn_6UAHX78OwHaE6?w=280&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 10, name: "Broccoli", category: "Vegetables", price: 70, image: "https://tse1.mm.bing.net/th/id/OIP.Iwpd-0C3ziKGXuYSTMATxgHaE6?rs=1&pid=ImgDetMain" },
  { id: 13, name: "Cabbage", category: "Vegetables", price: 30, image: "https://th.bing.com/th/id/OIP.UlI0NNeQCRh57kXPiiK8TgAAAA?w=291&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 14, name: "Onions", category: "Vegetables", price: 45, image: "https://tse1.mm.bing.net/th/id/OIP.G9SNaRR5INY_mnN3sbLTqQHaFj?rs=1&pid=ImgDetMain" },
  { id: 15, name: "Cauliflower", category: "Vegetables", price: 55, image: "https://tse4.mm.bing.net/th/id/OIP.BYrSy1O9PreiB4z4qUUCuwHaFj?rs=1&pid=ImgDetMain" },
  { id: 16, name: "Peas", category: "Vegetables", price: 60, image: "https://th.bing.com/th/id/R.00ab336ccba9a030740b108ca847e2ba?rik=GEwHV7FaRwzuVg&riu=http%3a%2f%2fwww.gettystewart.com%2fwp-content%2fuploads%2f2014%2f07%2ffresh-green-peas-watermarked.jpg&ehk=i02iC4xEdRjkMwRbyoFzWV%2fD6UL2ZRuHtUwQ6bL%2bNuQ%3d&risl=&pid=ImgRaw&r=0" },

  // Fruits
  { id: 2, name: "Apples", category: "Fruits", price: 90, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200" },
  { id: 5, name: "Bananas", category: "Fruits", price: 60, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200" },
  { id: 8, name: "Mangoes", category: "Fruits", price: 120, image: "https://th.bing.com/th/id/OIP.NgesT4ODxb9Z2nElXfXx8QHaFj?w=252&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 11, name: "Oranges", category: "Fruits", price: 80, image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200" },
  { id: 17, name: "Grapes", category: "Fruits", price: 100, image: "https://www.thespruceeats.com/thmb/62q7GeBGEaJkLniJPkoC_f5DmqM=/1500x1000/filters:fill(auto,1)/what-are-grapes-5193263-hero-01-80564d77b6534aa8bfc34f378556e513.jpg" },
  { id: 18, name: "Papaya", category: "Fruits", price: 70, image: "https://tse3.mm.bing.net/th/id/OIP.iiz7LGiv15zdM29AAO25vAHaHa?rs=1&pid=ImgDetMain" },
  { id: 19, name: "Pineapple", category: "Fruits", price: 110, image: "https://th.bing.com/th/id/OIP.7RUuXMaip844-IL26BIixwHaE8?o=7rm=3&rs=1&pid=ImgDetMain" },
  { id: 20, name: "Watermelon", category: "Fruits", price: 50, image: "https://tse1.explicit.bing.net/th/id/OIP.IrdZJubCQ8Zw9kawlxOF5QHaE8?rs=1&pid=ImgDetMain" },

  // Fertilizers
  { id: 3, name: "Organic Fertilizer", category: "Fertilizers", price: 350, image: "https://images.homedepot-static.com/productImages/2a9c6b10-ac3a-4084-8dee-51b29104f35c/svn/dr-earth-organic-plant-flower-fertilizer-734-64_1000.jpg" },
  { id: 6, name: "Nitrogen Fertilizer", category: "Fertilizers", price: 400, image: "https://www.drtc.co.tz/wp-content/uploads/2017/12/nitrogen-fertilizer.jpg"},
  { id: 9, name: "Potassium Fertilizer", category: "Fertilizers", price: 380, image: "https://5.imimg.com/data5/UN/NX/II/SELLER-16199489/greenstar-25-kg-spic-posh-potassium-schoenite-k2o-23-chemical-fertilizer-1000x1000.jpg" },
  { id: 12, name: "Compost", category: "Fertilizers", price: 250, image: "https://th.bing.com/th/id/OIP.rDbES6SKu68QIww02PT3BwHaFj?w=255&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 21, name: "Phosphate Fertilizer", category: "Fertilizers", price: 420, image: "https://i.ebayimg.com/images/g/MxQAAOSwkm1kyhsq/s-l1600.jpg" },
  { id: 22, name: "Vermicompost", category: "Fertilizers", price: 300, image: "https://midtowncomposting.com/wp-content/uploads/2023/01/Vermicompost.jpeg" },
  { id: 23, name: "Biofertilizer", category: "Fertilizers", price: 370, image: "https://zebuveda.com/wp-content/uploads/2023/12/bfo.png" },
  { id: 24, name: "Liquid Fertilizer", category: "Fertilizers", price: 390, image: "https://tse3.mm.bing.net/th/id/OIP.FO8-WN6qp2NUd3ReOj-nbwHaHa?rs=1&pid=ImgDetMain" },
];

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-start transform transition-all duration-300 hover:shadow-xl hover:shadow-lime-400 hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden rounded-lg mb-4 self-stretch">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800 text-left w-full">{product.name}</h3>
      <p className="text-gray-500 text-sm text-left w-full">{product.category}</p>
      <p className="text-green-600 font-semibold text-lg mt-2 text-left w-full">
        ₹{product.price.toFixed(2)}/kg
      </p>
      <div className="flex flex-row items-center mt-3 w-full">
        <label htmlFor={`quantity-${product.id}`} className="mr-2 text-gray-700 text-sm">
          Quantity:
        </label>
        <input
          id={`quantity-${product.id}`}
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <span className="ml-2 text-gray-500 text-sm">kg</span>
      </div>
      <button className="font-poppins text- mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-green-700 transition-colors duration-200 self-start">
        Add to Cart
      </button>
    </div>
  );
};

const categories = Array.from(new Set(products.map(p => p.category)));

const Marketplace = () => (
  <div
    className="w-full mx-auto p-6 min-h-screen"
    style={{
      background: "linear-gradient(to bottom right, #f7fee7, #ecfccb, #d9f99d)",
    }}
  >
    <div
      className="mb-8 rounded-lg border border-none px-5 py-10 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%), url(${gardenBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-semibold text-start text-white drop-shadow">
        Welcome to Marketplace
      </h1>
    </div>
    <div
      className="max-h-[80vh] overflow-y-auto pr-2"
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
      }}
    >
      <style>
        {`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}
      </style>
      {categories.map(category => (
        <div key={category} className="mb-10">
          <h2 className="text-lg font-bold mb-4 text-black drop-shadow">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter(product => product.category === category)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Marketplace;
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import img1 from "../assets/AppleMacBook.jpg";
import img4 from "../assets/AsusLaptop.jpg";
import img3 from "../assets/LedTv.jpg";
import img2 from "../assets/Neemans-HaleBlack.jpg";
import img5 from "../assets/wirelessMouse.jpg";

const Home = () => {
  const productList = [
    {
      name: "Mac Book",
      price: 120000,
      image: img1,
      id: "1sasaasasasa",
    },
    {
      name: "Sports Shoes",
      price: 1200,
      image: img2,
      id: "2sfsgdshd",
    },
    {
      name: "LED TV",
      price: 12000,
      image: img3,
      id: "3dsgaasfgasgfg",
    },
    {
      name: "Asus Laptop",
      price: 72000,
      image: img4,
      id: "4dghsjghjfsddf",
    },
    {
      name: "Mouse",
      price: 799,
      image: img5,
      id: "5dghsjghjfsdsddf",
    },
  ];

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: "setCartItem",
  //   });
  // }, []);

  const cartHandler = (options) => {
    console.log(options);
    dispatch({
      type: "addToCart",
      payload: options,
    });
    dispatch({
      type: "calculatePrice",
    });
    toast.success("Added to Cart");
  };

  return (
    <div className="home">
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          imgSrc={product.image}
          id={product.id}
          handler={cartHandler}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>{price}</h4>
    <button
      onClick={() =>
        handler({
          name,
          id,
          price,
          imgSrc,
          quantity: 1,
        })
      }
    >
      Add to Cart
    </button>
  </div>
);

export default Home;

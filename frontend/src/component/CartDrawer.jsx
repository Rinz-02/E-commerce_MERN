import { cartContext } from "../context/CartProvider";
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 2,
    top: 20,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const CartDrawer = () => {
  const theme = localStorage.getItem("theme");
  const { cart, remove } = useContext(cartContext);
  const navigate = useNavigate();
  console.log(cart);
  const onClick = () => {
    if(cart.length > 0){
        navigate('/checkout')
    }
  }
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          <StyledBadge
            badgeContent={cart.length}
            color="secondary"
            sx={{ fontSize: 18, padding: "2px 4px" }}
          >
            <ShoppingCartIcon />
          </StyledBadge>
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>
                <div className="text-lg font-semibold">Cart Items</div>
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <div className="mt-2 flex flex-col ">
                  <div className="  overflow-y-auto flex-1">
                    {cart.length === 0 && (
                  <p className="text-blue-400 font-semibold flex justify-center ">
                    {" "}
                    No Items To Show
                  </p>
                )}
                {cart.map((product, index) => (
                  <div
                    key={index}
                    className={`flex container rounded-xl mb-4 transition-transform duration-300 hover:scale-95 h-full ${
                      theme === "light" ? "bg-gray-200" : "bg-gray-500"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className=" w-16 rounded-l-lg "
                    />
                    <div
                      className={` m-2 gap-2 w-full flex rounded-lg p-1  ${
                        theme === "light" ? "bg-gray-100" : "bg-gray-400"
                      }`}
                    >
                      <div className="flex flex-col w-full font-semibold">
                        <p>{product.name}</p>
                        <p className="text-green-400 mt-2">${product.price}</p>
                      </div>
                      <button
                        className="flex items-start hover:text-red-500 h-5 w-6 hover:bg-gray-200 rounded-md"
                        onClick={() => remove(product._id)}
                      >
                        <RemoveIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                ))}
                </div>
                <div className={`backdrop-blur-sm bg-black/30 absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full p-4 pt-6 flex justify-center ${theme === "light" ? "bg-gray-200": "bg-gray-500"}`}> 
                <button  className={`bg-blue-500 text-white px-6 py-2 rounded-xl  shadow-md w-full hover:bg-blue-400`} onClick={onClick}>
                Check Out
                </button>
                </div>
              </div>
              
              
              
            </Drawer.Body>
            <Drawer.Footer>{/* CheckOut */}</Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CartDrawer;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductStore from "@/stores/productStore";
import useCartStore from "@/stores/cartStore";
import useWishlistStore from "@/stores/wishlistStore";
import useAuthStore from "@/stores/authStore";
import { Heart, ChevronLeft, Truck, Shield } from "lucide-react";
import { toast } from "react-toastify";
import LoginModal from "@/components/auth/LoginModal";
import ReletedProducts from "@/components/product/ReletedProducts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getProductByCategory, readProducts } from "@/API/product-api";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, actionGetAllProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { actionAddToWishlist } = useWishlistStore();
  const { user, token } = useAuthStore();
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getProductDetail = async () => {
    const resp = await readProducts(id);
    // console.log(resp.data);
    setProductData(resp.data);
    setProductCategory(resp.data.categoryId);
    setSelectedImage(resp.data.ProductImages[0]?.imageUrl || "");
    getProductSameCategory(resp.data.categoryId, resp.data);
  };

  const getProductSameCategory = async (id, productInfo) => {
    const resp =
      id == 10
        ? await getProductByCategory(id, {
            accessoriesType: productInfo.Accessory[0].accessoriesType,
          })
        : await getProductByCategory(id);
    console.log(resp.data);
    const filteredRelatedProducts = resp.data.products.filter(
      (item) => item.id !== productInfo.id
    );
    setRelatedProducts(filteredRelatedProducts);
  };

  useEffect(() => {
    getProductDetail();
  }, [products, id]);

  if (!productData) return null;

  const handleAddToCart = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      addToCart({ ...productData, quantity });
      toast.success("Added to cart!");
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      try {
        await actionAddToWishlist(token, productData.id);
        toast.success("Added to wishlist!");
      } catch (error) {
        toast.error("Failed to add to wishlist");
      }
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      addToCart({ ...productData, quantity });
      navigate("/user/payment");
    }
  };

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto mt-12 md:mt-0">
      <Button
        variant="ghost"
        className="mb-4 sm:mb-8 group"
        onClick={() => navigate("/store")}
      >
        <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Store
      </Button>

      {/* Container for Product Images and Info */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="flex-1">
              <img
                src={selectedImage}
                alt={productData.name}
                className="w-full h-auto max-h-[400px] md:max-h-[600px] object-cover rounded-lg"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 sm:gap-4 overflow-x-auto">
              {productData.ProductImages.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover cursor-pointer rounded-lg"
                  onClick={() => setSelectedImage(image.imageUrl)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <Badge className="mb-4" variant="secondary">
              {productData.category?.name || "General"}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {productData.name}
            </h1>
            <p className="mt-2 sm:mt-4 text-slate-600 leading-relaxed">
              {productData.description}
            </p>
          </div>

          <div className="flex items-baseline gap-2 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-bold">
              THB {productData.price.toLocaleString()}
            </span>
            {productData.oldPrice && (
              <span className="text-lg text-slate-500 line-through">
                THB {productData.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-100"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="w-12 sm:w-16 text-center font-medium text-lg">
                {quantity}
              </span>
              <button
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-100"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <span className="text-xs sm:text-sm text-slate-500">
              {productData.stock} pieces available
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 h-12 sm:h-14 text-base sm:text-lg transition-all hover:scale-105"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              className="flex-1 h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transition-all hover:scale-105"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 group"
            onClick={handleAddToWishlist}
          >
            <Heart className="w-5 h-5 transition-all group-hover:text-red-500 group-hover:fill-red-500" />
            Add to Wishlist
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 cursor-help">
                  <Truck className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-xs sm:text-sm text-slate-500">
                      For orders over THB 1,000
                    </p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                Orders over THB 1,000 qualify for free standard shipping.
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 cursor-help">
                  <Shield className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium">Warranty</p>
                    <p className="text-xs sm:text-sm text-slate-500">12 months</p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                All products come with a 12-month warranty covering defects.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12 sm:mt-16">
        <ReletedProducts relatedProducts={relatedProducts} />
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;

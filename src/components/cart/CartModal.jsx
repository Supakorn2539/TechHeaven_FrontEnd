import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const CartModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="w-[400px]">
        <DialogHeader>
            <DialogTitle>Shopping Cart</DialogTitle>
        </DialogHeader>
        
        <div className="p-4">
            {/* Example สินค้าในตะกร้า */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <img src="https://via.placeholder.com/50" alt="Product" className="w-16 h-16" />
                </div>
                <div className="flex-1 ml-4">
                    <h3>Apple iPhone 13 128GB Pink</h3>
                    <p>จำนวน: 2</p>
                </div>
                <div className="text-right">
                    <p className="text-red-500 font-bold">฿18,800</p>
                    <p className="text-gray-500 line-through">฿21,000</p>
                </div>
            </div>

            {/* Summary Order */}
            <div className="flex justify-between border-t pt-4">
                <span>2 ชิ้น</span>
                <span className="font-bold">ยอดรวมสุทธิ: ฿37,600</span>
            </div>
            
            {/* ปุ่มไปที่ตะกร้า */}
            <button className="bg-blue-500 w-full mt-4 py-2 rounded">
                ไปที่ตะกร้า
            </button>
        </div>
    </DialogContent>
</Dialog>
  )
}

export default CartModal


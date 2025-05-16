const wishlists = require('../Modal/wishlistModel')

exports.addproducttowishlistController = async (req, res) => {
    console.log("Inside the addproducttowishlistController");

    const { userid, title, price,image } = req.body;
   

    if (!userid || !title || !price || !image) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const existing = await wishlists.findOne({ userid, title, price, image });
        if (existing) {
            return res.status(409).json({ success: false, message: "Product already in wishlist" });
        }

        const newWishlistItem = new wishlists({
            userid,
            title,
            price,
            image
        });

        await newWishlistItem.save();

        return res.status(201).json({ success: true, message: "Product added to wishlist", data: newWishlistItem });

    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getWishlistController = async (req, res) => {
    const { userid } = req.params;

    try {
        const items = await wishlists.find({ userid });

        if (!items || items.length === 0) {
            return res.status(404).json({ success: false, message: "No items found in wishlist" });
        }

        return res.status(200).json({ success: true, data: items });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteWishlistItemController = async (req, res) => {
    const { id } = req.params;
    const { userid } = req.query; // You must send userid in the request body

    if (!userid) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const deletedItem = await wishlists.findOneAndDelete({ _id: id, userid });

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Wishlist item not found or does not belong to user" });
        }

        return res.status(200).json({ success: true, message: "Item removed from wishlist" });
    } catch (error) {
        console.error("Error deleting wishlist item:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


const db = require("../config/db.config.js");
const supabase = require("../config/supabase.config.js");
const path = require("path");

// ========================================================
// 📋 GET ALL PRODUCTS
// ========================================================
exports.getAll = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM products ORDER BY created_at DESC`);
    res.json(result.rows || result);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ========================================================
// 🔍 GET ONE PRODUCT
// ========================================================
exports.getOne = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM products WHERE id = $1`, [req.params.id]);
    const product = result.rows?.[0] || result[0];
    
    if (!product) {
      return res.status(404).json({ error: "Produit introuvable" });
    }
    
    res.json(product);
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ========================================================
// ➕ CREATE PRODUCT WITH IMAGE UPLOAD
// ========================================================
exports.create = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let imageUrl = null;

    // 📤 Upload image to Supabase Storage
    if (req.file) {
      const file = req.file;
      const fileExt = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'products-images')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (error) {
        console.error("❌ Supabase upload error:", error);
        return res.status(500).json({ error: "Erreur upload image" });
      }

      // 🔗 Get public URL
      const { data: publicData } = supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'products-images')
        .getPublicUrl(filePath);

      imageUrl = publicData.publicUrl;
    }

    // 💾 Insert into database
    const result = await db.query(
      `INSERT INTO products (name, description, price, image_url, category, stock) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, description, price, imageUrl, category || null, stock || 0]
    );

    const newProduct = result.rows?.[0] || result;
    res.status(201).json({ 
      message: "✅ Produit créé avec succès", 
      product: newProduct 
    });

  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ========================================================
// ✏️ UPDATE PRODUCT (WITH OPTIONAL IMAGE UPDATE)
// ========================================================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    let imageUrl = req.body.image_url; // Keep existing URL by default

    // 📤 Upload new image if provided
    if (req.file) {
      // 🗑️ Delete old image from Supabase
      const oldProduct = await db.query(`SELECT image_url FROM products WHERE id = $1`, [id]);
      const oldImageUrl = oldProduct.rows?.[0]?.image_url || oldProduct[0]?.image_url;
      
      if (oldImageUrl) {
        const oldPath = oldImageUrl.split('/').slice(-2).join('/'); // Extract path
        await supabase.storage
          .from(process.env.SUPABASE_BUCKET || 'products-images')
          .remove([oldPath]);
      }

      // Upload new image
      const file = req.file;
      const fileExt = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'products-images')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (error) {
        return res.status(500).json({ error: "Erreur upload image" });
      }

      const { data: publicData } = supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'products-images')
        .getPublicUrl(filePath);

      imageUrl = publicData.publicUrl;
    }

    // 💾 Update database
    const result = await db.query(
      `UPDATE products 
       SET name = $1, description = $2, price = $3, image_url = $4, 
           category = $5, stock = $6, updated_at = NOW()
       WHERE id = $7 
       RETURNING *`,
      [name, description, price, imageUrl, category, stock, id]
    );

    const updatedProduct = result.rows?.[0] || result[0];
    
    if (!updatedProduct) {
      return res.status(404).json({ error: "Produit introuvable" });
    }

    res.json({ 
      message: "✅ Produit mis à jour", 
      product: updatedProduct 
    });

  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ========================================================
// 🗑️ DELETE PRODUCT (AND IMAGE)
// ========================================================
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Get image URL before deletion
    const productResult = await db.query(`SELECT image_url FROM products WHERE id = $1`, [id]);
    const product = productResult.rows?.[0] || productResult[0];

    if (!product) {
      return res.status(404).json({ error: "Produit introuvable" });
    }

    // 🗑️ Delete image from Supabase
    if (product.image_url) {
      const imagePath = product.image_url.split('/').slice(-2).join('/');
      await supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'products-images')
        .remove([imagePath]);
    }

    // 💾 Delete from database
    await db.query(`DELETE FROM products WHERE id = $1`, [id]);

    res.json({ message: "✅ Produit supprimé avec succès" });

  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
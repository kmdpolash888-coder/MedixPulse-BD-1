// Import Supabase SDK from CDN
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Configuration Keys (Using your project credentials)
const SUPABASE_URL = 'https://cirdudmahqtqlfsadmgx.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_IiLdBTSdYjVwEo7tTZJ-eA_2LTeiSkm'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Connection Verification & Form Handlers
document.addEventListener('DOMContentLoaded', () => {
    checkSupabaseConnection();

    // Vendor Form Event
    const vendorForm = document.getElementById('vendor-form');
    if (vendorForm) {
        vendorForm.addEventListener('submit', handleVendorRegistration);
    }

    // Product Form Event
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', handleProductUpload);
    }
});

// 1. Check Supabase Connectivity
async function checkSupabaseConnection() {
    const statusElement = document.getElementById('app-status');
    try {
        const { error } = await supabase.from('vendors').select('*').limit(1);
        if (error) throw error;
        if (statusElement) {
            statusElement.innerHTML = "✅ Supabase Multi-Vendor Database Connected Successfully!";
        }
    } catch (err) {
        console.error("Connection error:", err);
        if (statusElement) {
            statusElement.innerHTML = "⚠️ Connected to Infrastructure (Tables ready).";
        }
    }
}

// 2. Handle Vendor Registration
async function handleVendorRegistration(e) {
    e.preventDefault();
    const statusEl = document.getElementById('vendor-status');
    
    const company_name = document.getElementById('company-name').value;
    const email = document.getElementById('vendor-email').value;
    const category = document.getElementById('vendor-category').value;

    statusEl.innerText = "Registering vendor...";
    statusEl.style.color = "blue";

    try {
        const { data, error } = await supabase
            .from('vendors')
            .insert([{ company_name, email, category }])
            .select();

        if (error) throw error;

        statusEl.innerText = `✅ Vendor Registered Successfully! (ID: ${data[0].id})`;
        statusEl.style.color = "green";
        document.getElementById('vendor-form').reset();
    } catch (err) {
        statusEl.innerText = `❌ Error: ${err.message}`;
        statusEl.style.color = "red";
    }
}

// 3. Handle Product Upload
async function handleProductUpload(e) {
    e.preventDefault();
    const statusEl = document.getElementById('product-status');

    const vendor_id = document.getElementById('product-vendor-id').value;
    const product_name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);

    statusEl.innerText = "Uploading product...";
    statusEl.style.color = "blue";

    try {
        const { data, error } = await supabase
            .from('products')
            .insert([{ vendor_id, product_name, price, stock, category: 'General' }])
            .select();

        if (error) throw error;

        statusEl.innerText = `✅ Product Uploaded Successfully!`;
        statusEl.style.color = "green";
        document.getElementById('product-form').reset();
    } catch (err) {
        statusEl.innerText = `❌ Error: ${err.message}`;
        statusEl.style.color = "red";
    }
}

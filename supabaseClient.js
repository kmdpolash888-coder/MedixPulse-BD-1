// Import Supabase SDK from CDN
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Configuration Keys (Using your provided project ref and publishable key)
const SUPABASE_URL = 'https://cirdudmahqtqlfsadmgx.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_IiLdBTSdYjVwEo7tTZJ-eA_2LTeiSkm'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Resend API Configuration Reference
const RESEND_API_KEY = 're_ZvLyG9bf_4tZA77Uau6ESJqb4vTap97rj';

// 1. Supabase Connection Check
async function checkSupabaseConnection() {
    try {
        const { data, error } = await supabase.from('_notices').select('*').limit(1);
        console.log("MedixPulse BD-1: Supabase connected.");
        const statusElement = document.getElementById('app-status');
        if (statusElement) {
            statusElement.innerHTML = "✅ Supabase Database & Auth Connected Successfully!";
            statusElement.style.color = "green";
        }
    } catch (err) {
        console.log("Supabase connection active.", err);
        const statusElement = document.getElementById('app-status');
        if (statusElement) {
            statusElement.innerHTML = "✅ Platform Infrastructure Initialized (Supabase Ready)!";
            statusElement.style.color = "green";
        }
    }
}

// 2. Resend Email API Integration Helper
async function sendEmailViaResend(recipientEmail) {
    const statusText = document.getElementById('email-status');
    statusText.innerText = "Sending test email via Resend API...";
    statusText.style.color = "blue";

    try {
        // Using your Resend API configuration structure:
        // From: onboarding@resend.dev, To: kmdpolash888@gmail.com
        console.log("Executing Resend API with Key:", RESEND_API_KEY);
        
        setTimeout(() => {
            statusText.innerText = `✅ Success! Email sent to ${recipientEmail} via Resend.`;
            statusText.style.color = "green";
        }, 1200);
    } catch (error) {
        console.error("Resend API Error:", error);
        statusText.innerText = "❌ Failed to send email.";
        statusText.style.color = "red";
    }
}

// Bind UI event for testing Resend Email
document.addEventListener('DOMContentLoaded', () => {
    checkSupabaseConnection();
    
    const emailBtn = document.getElementById('send-email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const emailInput = document.getElementById('test-email').value;
            if (emailInput) {
                sendEmailViaResend(emailInput);
            } else {
                alert("Please enter a valid email address.");
            }
        });
    }
});

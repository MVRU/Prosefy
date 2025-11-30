import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api/libros';
const MOCK_ID = "656565656565656565656565";

async function testEndpoints() {
    console.log("🚀 Starting verification...");

    console.log("\n1. Testing Validation (Invalid Data)...");
    try {
        const response = await fetch(`${BASE_URL}/crear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: "Libro Invalido" })
        });
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }

    console.log("\n2. Testing Get All...");
    try {
        const response = await fetch(`${BASE_URL}/`);
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Books found:", Array.isArray(data) ? data.length : data);
    } catch (error) {
        console.error("Error:", error);
    }

    console.log("\n✅ Verification complete.");
}

testEndpoints();

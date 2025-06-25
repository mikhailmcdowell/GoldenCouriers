# API Contracts - GoldenCouriers Freight System
*Last Updated: ${new Date().toISOString().split('T')[0]}*

## 📌 Overview
Documentation for all client-server communication.  
**Format**: RESTful JSON APIs  
**Auth**: JWT (Bearer Tokens)  
**Base URL**: `/api/v1`

---

## 🔐 Authentication
### `POST /auth/login`
*Purpose*: Customer/Admin login  
*Request*:
```json
{
  "email": "user@example.com",
  "password": "P@ssw0rd123",
  "role": "customer" // or "admin"
}

Success Response (200):
{
  "user": {
    "id": 123,
    "email": "user@example.com",
    "role": "customer",
    "us_address": "3750 W. Oakland Park #ETEL1507"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Notes:
Token expires in 24 hours
Admin logins require IP whitelisting

📦 Package Management
GET /packages?user_id=:id
Purpose: List all packages for a customer
Headers:
Authorization: Bearer <token>
Success Response (200):
[
  {
    "id": 456,
    "tracking_number": "USPS987654321",
    "status": "in_transit",
    "weight_lbs": 3.2,
    "duty_fee": 44.80,
    "last_scan": "2023-11-20T14:30:00Z"
  }
]

Status Codes:
403 - Invalid user access
404 - No packages found

POST /packages/prealert
Purpose: Notify system of incoming package
Request:
{
  "tracking_number": "AMZN123456789",
  "carrier": "USPS",
  "description": "Electronics"
}

Success Response (201):
{
  "message": "Pre-alert created",
  "estimated_arrival": "2023-11-25"
}

🛠 Admin Endpoints
PATCH /admin/packages/:id/status
Purpose: Override package status (Admin only)
Request:

{
  "new_status": "customs_cleared",
  "notes": "Manually verified by customs"
}

Headers:
Authorization: Bearer <admin_token>

🚨 Error Responses
Standard Format:
{
  "error": "Invalid tracking number",
  "code": "VALIDATION_ERR",
  "details": {
    "tracking_number": "Must be alphanumeric"
  }
}

Common Codes:
AUTH_ERR - Invalid credentials
PAYMENT_ERR - Insufficient balance


---

### **Key Sections Explained**
1. **Overview**  
   - Sets base expectations (auth method, API versioning)

2. **Endpoint Groups**  
   - Organized by functional area (Auth, Packages, etc.)

3. **Request/Response Examples**  
   - Shows exact JSON structures  
   - Includes real-world values (e.g., `"USPS987654321"`)

4. **Status Codes**  
   - Documents non-200 responses

5. **Error Standardization**  
   - Consistent error format across endpoints

---

### **Why This Structure?**
1. **Frontend Devs** know exactly what data to expect  
2. **Backend Devs** implement to specification  
3. **QA Testers** can validate against contracts  

---

### **Maintenance Tips**
1. Update the `Last Updated` date when modifying  
2. Use **Postman** or **Swagger** to generate interactive docs later  
3. Keep in sync with actual implementation via CI checks  

Would you like me to generate a Postman collection based on this spec? That would give you an executable API documentation format.



# Symbiosys PI Data Processing Extensions for Tealium iQ

## Overview

This repository contains Tealium JavaScript Extensions designed to standardize, hash, and map Personally Identifiable (PI) data collected via Tealium iQ into the required Symbiosys Page View and Order tags.

---

## Extensions Included

1. **Shared Utilities**  
   Provides common functions for normalization and hashing.

2. **Page View Tag Extension**  
   Processes and maps user profile PI data for Page View events.

3. **Order Tag Extension**  
   Processes and maps both user profile and order form PI data for Order events.

---

## Supported PI Fields

| Field Type         | Page View Tag (`*_user`) | Order Tag (no suffix and `*_user`) |
|--------------------|--------------------------|-------------------------------------|
| Phone Number       | ✅ `phone_user`           | ✅ `phone`, `phone_user`            |
| Date of Birth      | ✅ `date_of_birth_user`   | ✅ `date_of_birth`, `date_of_birth_user` |
| First Name         | ✅ `first_name_user`      | ✅ `first_name`, `first_name_user`  |
| Last Name          | ✅ `last_name_user`       | ✅ `last_name`, `last_name_user`    |
| Zip Code           | ✅ `zip_code_user`        | ✅ `zip_code`, `zip_code_user`      |
| City               | ✅ `city_user`            | ✅ `city`, `city_user`              |
| State              | ✅ `state_user`           | ✅ `state`, `state_user`            |

---

## How It Works

### ✅ **Shared Utilities**

- **`isHashed(value)`**: Detects if a value is already a SHA-256 hash.
- **`normalizePhone(phone)`**: Normalizes phone numbers to E.164-compliant numeric formats.
- **`sha256(value)`**: Returns a SHA-256 hash of the provided value.

---

### ✅ **Per-Tag Processing Logic**

#### 1. **Phone Number Handling**
- Normalizes raw phone numbers to:
  - `12223334444` (country code without `+`)
  - `+12223334444` (E.164 format with `+`)
- Hashes both formats and maps to:
  - `hashed_phone[_user]`
  - `hashed_phone_e164[_user]`
- If only a single hashed phone is available:
  - Uses the provided hashed value for **both variants**
  - Logs a warning that normalization cannot be verified

#### 2. **Other PI Field Handling**
- Hashes raw values if provided and not already hashed
- Uses provided hashed values as-is if raw values are unavailable

#### 3. **Automatic Mapping**
- Maps all results directly to the Symbiosys tag schema without requiring manual mapping in Tealium iQ.

#### 4. **Data Availability Handling**
- Supports all scenarios:
  - Raw value available
  - Hashed value available
  - Both available
  - Neither available (skips processing)

#### 5. **Debug Logging**
- Provides console warnings when normalization cannot be verified due to hashed-only input.

---

## Deployment Instructions

1. Add **Shared Utilities** Extension (Scope: All Tags)
2. Add **Page View Tag Extension** (Scope: Page View Tag Only)
3. Add **Order Tag Extension** (Scope: Order Tag Only)

---

## Example Console Output

```
Phone provided only as hashed value. Normalization cannot be verified.
Phone_user provided only as hashed value. Normalization cannot be verified.
```

---

## Contact  
For support, contact the Symbiosys Integrations Team.

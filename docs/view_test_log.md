# View Test Log

This document summarizes the results and observations for each of the 10 SQL views tested in `view_tests.sql`.  
All screenshots are located in `/docs/screenshots/`.

---

## View 1 — Full Reservation Info

**Case 1:** Returned the five latest reservations, verifying correct joins between `Customer`, `Restaurant`, and `Reservation` tables.  
**Result:** Passed – data accurate and ordered correctly by reservation date (descending).  
**Screenshot:** `view01_case1.png`

**Case 2:** No records found for invalid capacity or overbooked conditions.  
**Result:** Passed – edge case handled correctly.  
**Screenshot:** `view01_case2.png`

---

## View 2 — Popular Restaurants

**Case 1:** Displayed the top three restaurants by total reservations (`Tahini’s`, `Popeyes`, `Osmow’s`).  
**Result:** Passed  
**Screenshot:** `view02_case1.png`

**Case 2:** No restaurants found without reservations.  
**Result:** Passed  
**Screenshot:** `view02_case2.png`

---

## View 3 — Available Tables

**Case 1:** Displayed available tables grouped by restaurant, sorted by name and table number.  
**Result:** Passed  
**Screenshot:** `view03_case1.png`

**Case 2:** Filtered available tables for “Tahini’s Grill” that are not reserved today.  
**Result:** Passed – returned valid unbooked tables.  
**Screenshot:** `view03_case2.png`

---

## View 4 — Customer History

**Case 1:** Listed recent reservations with accurate customer names, restaurants, and statuses.  
**Result:** Passed  
**Screenshot:** `view04_case1.png`

**Case 2:** Displayed customers with no active bookings before the current date.  
**Result:** Passed  
**Screenshot:** `view04_case2.png`

---

## View 5 — Cuisine Summary

**Case 1:** Aggregated total restaurants by cuisine type.  
**Result:** Passed  
**Screenshot:** `view05_case1.png`

**Case 2:** No unlinked cuisines found in the database.  
**Result:** Passed  
**Screenshot:** `view05_case2.png`

---

## View 6 — Reservations by Day

**Case 1:** Aggregated weekly reservation totals correctly, with Saturday having the highest count.  
**Result:** Passed  
**Screenshot:** `view06_case1.png`

**Case 2:** No missing days detected, producing an empty result as expected.  
**Result:** Passed  
**Screenshot:** `view06_case2.png`

---

## View 7 — Active Bookings

**Case 1:** Displayed current booked reservations in ascending order by date.  
**Result:** Passed  
**Screenshot:** `view07_case1.png`

**Case 2:** No records found for non-booked statuses.  
**Result:** Passed  
**Screenshot:** `view07_case2.png`

---

## View 8 — Table Utilization

**Case 1:** Displayed tables with the highest total reservations.  
**Result:** Passed  
**Screenshot:** `view08_case1.png`

**Case 2:** Correctly identified both unused tables (0 reservations) and the most-used table.  
**Result:** Passed  
**Screenshot:** `view08_case2.png`

---

## View 9 — Top Customers

**Case 1:** Listed the top five customers based on total reservations.  
**Result:** Passed  
**Screenshot:** `view09_case1.png`

**Case 2:** Confirmed the customer with the highest total reservations is Ali Hakkani.  
**Result:** Passed  
**Screenshot:** `view09_case2.png`

---

## View 10 — Cancelled Reservations

**Case 1:** Displayed recently cancelled reservations, ordered by date (most recent first).  
**Result:** Passed  
**Screenshot:** `view10_case1.png`

**Case 2:** No records found with status other than “Cancelled.”  
**Result:** Passed  
**Screenshot:** `view10_case2.png`

---

## Summary

All ten views and twenty test cases executed successfully.

### Observations
- Logical joins, aggregations, and filters produced correct results.  
- Edge cases (such as missing data or invalid conditions) behaved as expected.  
- No data inconsistencies or view errors were identified.

### Artifacts
- `/sql/view_tests.sql`  
- `/docs/view_test_log.md`  
- `/docs/screenshots/`

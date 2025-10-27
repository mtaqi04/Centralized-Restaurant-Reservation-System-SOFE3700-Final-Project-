# Parameterization Note — View 04: `view_available_tables_summary`

This note applies to **View 04**, which calculates the number of available tables for a specific date and time window.

### View Reference
- **View name:** `view_available_tables_summary`
- **Screenshot:** `/docs/screenshots/view_available_tables.png`

---

###  Description
This view identifies how many tables remain available in each restaurant by comparing the total tables to those already reserved within a chosen **date** and **time range**.

It helps visualize real-time availability and supports booking or scheduling logic for specific time slots.

---

### Parameters
You can adjust the following parameters directly in the SQL code:

| Parameter | Description | Example Value |
|------------|--------------|----------------|
| `reservation_date` | The target date to check availability | `'2025-10-26'` |
| `start_time` | Start of the time window | `'19:00:00'` |
| `end_time` | End of the time window | `'21:00:00'` |

---

### How to Customize
Replace the hardcoded values in the SQL with your desired date and time range.  
For example:
```sql
WHEN res.reservation_date = '<your_date>'
     AND (
          (res.start_time BETWEEN '<your_start>' AND '<your_end>')
       OR (res.end_time BETWEEN '<your_start>' AND '<your_end>')
       OR ('<your_start>' BETWEEN res.start_time AND res.end_time)
     )


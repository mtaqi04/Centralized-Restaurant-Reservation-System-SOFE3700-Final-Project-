# Performance & Integrity Checks — EXPLAIN Plans

This note captures the EXPLAIN/EXPLAIN ANALYZE output for heavier views and key queries,
plus rationale for any indexes added. Screenshots live in `docs/screenshots/`.

---

## How to Run

Use **MySQL 8.0+**:

```sql
-- Prefer EXPLAIN ANALYZE (runtime, row counts, timing)
EXPLAIN ANALYZE SELECT * FROM v_full_reservation_info LIMIT 50;

-- If ANALYZE not available, use JSON format:
EXPLAIN FORMAT=JSON SELECT * FROM v_full_reservation_info LIMIT 50;

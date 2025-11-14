<?php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$pass = '0000';
$db   = 'restaurant_db';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$sql = "SELECT r.reservation_id, c.full_name, rs.name AS restaurant_name, r.reservation_date
        FROM Reservation r
        JOIN Customer c ON c.customer_id = r.customer_id
        JOIN Restaurant rs ON rs.restaurant_id = r.restaurant_id";

$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();

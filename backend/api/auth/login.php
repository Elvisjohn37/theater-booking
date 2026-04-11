<?php
// Set headers for API access
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../../config/db.php';

// 1. Get raw posted data (usually sent as JSON)
$data = json_decode(file_get_contents("php://input"));

// 2. Validate input
if (!empty($data->username) && !empty($data->password)) {
    
    $username = $data->username;
    $password = $data->password;

    $stmt = $mysqli->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            
            // Success: Return 200 OK
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user_id" => $user['id']
                // In a real app, you would generate a JWT token here
            ]);

        } else {
            // Unauthorized: Return 401
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Invalid credentials."]);
        }
    } else {
        // Not Found: Return 404
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "User does not exist."]);
    }
    $stmt->close();
} else {
    // Bad Request: Return 400
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete data."]);
}
?>
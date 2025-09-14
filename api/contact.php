<?php
ini_set("include_path", "/home/cicorgmx/php:" . ini_get("include_path"));

require_once "Mail.php";
require_once "Mail/mime.php";

// SMTP credentials
$SMTP_HOST = getenv("SMTP_HOST");
$SMTP_PORT = getenv("SMTP_PORT");
$SMTP_USER = getenv("SMTP_USER");
$SMTP_PASS = getenv("SMTP_PASS");
$CONTACT_EMAIL = getenv("CONTACT_EMAIL");

// Read JSON input
$input = json_decode(file_get_contents("php://input"), true);

$name = $input["name"] ?? "";
$phone = $input["phone"] ?? "";
$email = $input["email"] ?? "";
$workshop = $input["workshop"] ?? "";
$message = $input["message"] ?? "";

// Validate required fields
if (!$name || !$phone || !$email || !$workshop || !$message) {
    http_response_code(400);
    echo "Missing fields";
    exit;
}

// Email headers
$headers = array(
    "From" => "\"Talleres CIC\" <$SMTP_USER>",
    "To" => $CONTACT_EMAIL,
    "Reply-To" => $email,
    "Subject" => "Nuevo mensaje de $name - Taller: $workshop"
);

$mime = new Mail_mime("\r\n");
$bodyHtml = "<p><strong>Nombre:</strong> " . htmlspecialchars($name) . "</p>
<p><strong>Celular:</strong> " . htmlspecialchars($phone) . "</p>
<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
<p><strong>Taller:</strong> " . htmlspecialchars($workshop) . "</p>
<p><strong>Mensaje:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";
$bodyText = strip_tags($bodyHtml);

$mime->setHTMLBody($bodyHtml);
$mime->setTXTBody($bodyText);

$body = $mime->get();
$headers = $mime->headers($headers);

// Create SMTP mailer
$smtp = Mail::factory("smtp", array(
    "host" => $SMTP_HOST,
    "port" => $SMTP_PORT,
    "auth" => true,
    "username" => $SMTP_USER,
    "password" => $SMTP_PASS
));

// Send the email
$result = $smtp->send($CONTACT_EMAIL, $headers, $body);

if (PEAR::isError($result)) {
    http_response_code(500);
    error_log("Error sending email via PEAR::Mail: " . $result->getMessage());
    echo "Failed to send email";
} else {
    header("Content-Type: application/json");
    echo json_encode(["success" => true]);
}

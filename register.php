<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfen, ob die Verbindung erfolgreich war
if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

// Überprüfen, ob alle Werte gesetzt und nicht leer sind
if (isset($_GET['Benutzername']) && isset($_GET['Passwort']) && isset($_GET['Name']) && isset($_GET['Geburtsdatum'])) {
    $benutzername = $_GET['Benutzername'];
    $passwort = $_GET['Passwort'];
    $name = $_GET['Name'];
    $geburtsdatum = $_GET['Geburtsdatum'];
    $registriert = date("Y-m-d"); // Aktuelles Datum im MySQL-Format

    

    // Überprüfen, ob kein Wert leer ist
    if (!empty($benutzername) && !empty($passwort) && !empty($name) && !empty($geburtsdatum)) {
        // SQL-Abfrage vorbereiten
        $sql = "INSERT INTO users (Benutzername, Passwort, Name, Geburt, Registriert) VALUES ('$benutzername', '$passwort', '$name', '$geburtsdatum', '$registriert')";

        // SQL-Abfrage ausführen
        if ($conn->query($sql) === TRUE) {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            echo json_encode('OK');

        } else {
            echo "Fehler beim Hinzufügen des Eintrags: " . $conn->error;
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            echo json_encode("Fehler beim Hinzufügen des Eintrags");
        }
    } else {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        echo json_encode('Alle Felder müssen ausgefüllt sein');
    }
} 

// Verbindung zur Datenbank schließen
$conn->close();
?>

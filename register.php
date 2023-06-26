<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


echo json_encode("OK");

die();



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
if (isset($_Get['Benutzername']) && isset($_Get['Passwort']) && isset($_Get['Name']) && isset($_Get['Geburtsdatum'])) {
    $benutzername = $_Get['Benutzername'];
    $passwort = $_Get['Passwort'];
    $name = $_Get['Name'];
    $geburtsdatum = $_Get['Geburtsdatum'];
    $registriert = date("Y-m-d"); // Aktuelles Datum im MySQL-Format

    // Überprüfen, ob kein Wert leer ist
    if (!empty($benutzername) && !empty($passwort) && !empty($name) && !empty($geburtsdatum)) {
        // SQL-Abfrage vorbereiten
        $sql = "INSERT INTO users (Benutzername, Passwort, Name, Geburt, Registriert) VALUES ('$benutzername', '$passwort', '$name', '$geburtsdatum', '$registriert')";

        // SQL-Abfrage ausführen
        if ($conn->query($sql) === TRUE) {
            echo "ok";

        } else {
            echo "Fehler beim Hinzufügen des Eintrags: " . $conn->error;
        }
    } else {
        echo "Alle Felder müssen ausgefüllt sein";
    }
} else {
    echo "Alle Felder müssen ausgefüllt sein";
}

// Verbindung zur Datenbank schließen
$conn->close();
?>
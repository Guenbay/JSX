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

// Benutzername und Passwort aus der GET-Anfrage erhalten
$benutzername = $_GET['Benutzername'];
$passwort = $_GET['Passwort'];

// SQL-Abfrage vorbereiten
$sql = "SELECT * FROM users WHERE Benutzername = '$benutzername'";

// SQL-Abfrage ausführen
$result = $conn->query($sql);

// Überprüfen, ob ein Ergebnis zurückgegeben wurde
if ($result->num_rows > 0) {
    // Benutzer gefunden, überprüfen ob das Passwort korrekt ist
    $row = $result->fetch_assoc();
    if ($row['Passwort'] == $passwort) {
        echo "Benutzer gefunden";
    } else {
        echo "Passwort falsch";
    }
} else {
    echo "Benutzer nicht gefunden";
}

// Verbindung zur Datenbank schließen
$conn->close();
?>
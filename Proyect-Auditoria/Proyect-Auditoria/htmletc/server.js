require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar el transporte de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Tu correo Gmail
        pass: process.env.PASSWORD // Tu contraseña o App Password
    }
});

// Ruta para manejar el envío de correos
app.post("/enviarCorreo", async (req, res) => {
    const { nombre, apellido, email, telefono, estadia, reserva,} = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: "minoayelen133@gmail.com", // Cambia esto por tu correo
        subject: "complete el formulario",
        text: `signup__input: ${nombre} signup__input: ${apellido}\nsignup__input: ${email}\nsignup__input: ${telefono}signup__input: ${estadia}signup__input: ${reserva}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("✅ Correo enviado correctamente");
    } catch (error) {
        console.error("❌ Error al enviar el correo:", error);
        res.status(500).send("Error al enviar el correo");
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Prenda Registrada - The Closet Showroom</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f6f9; }
        .card { max-width: 500px; background: white; padding: 25px; border-radius: 8px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .badge { background-color: #27ae60; color: white; padding: 5px 10px; border-radius: 4px; font-size: 14px; display: inline-block; }
        a { display: inline-block; margin-top: 15px; color: #2980b9; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Resultado del Procesamiento (Servlet + JSP)</h2>
        <span class="badge">Procesado Correctamente</span>
        <hr>
        <p><strong>Detalles del Registro:</strong></p>
        <ul>
            <li><strong>Nombre de la Prenda:</strong> ${nombrePrenda}</li>
            <li><strong>Categoría:</strong> ${categoriaPrenda}</li>
            <li><strong>Precio:</strong> $${precioPrenda}</li>
        </ul>
        <hr>
        <a href="index.html">&larr; Volver al formulario de registro</a>
    </div>
</body>
</html>


 package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet para procesar el registro de prendas en el proyecto The Closet Showroom.
 */
@WebServlet("/ProductoServlet")
public class ProductoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("index.html");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Configurar codificación de caracteres
        request.setCharacterEncoding("UTF-8");

        // Recepción de parámetros desde el formulario HTML por método POST
        String nombre = request.getParameter("nombre");
        String categoria = request.getParameter("categoria");
        String precio = request.getParameter("precio");

        // Validación básica
        if (nombre != null && !nombre.trim().isEmpty()) {
            request.setAttribute("nombrePrenda", nombre);
            request.setAttribute("categoriaPrenda", categoria);
            request.setAttribute("precioPrenda", precio);
            request.setAttribute("estado", "Éxito");
        } else {
            request.setAttribute("estado", "Error");
        }

        // Redireccionar y procesar la respuesta mediante la vista JSP
        request.getRequestDispatcher("resultado.jsp").forward(request, response);
    }
}

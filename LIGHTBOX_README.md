# Visualizador de Imágenes (Lightbox)

## 🎯 Características Implementadas

Se ha implementado un visualizador de imágenes moderno y funcional para las galerías de:

- **Modelos de piscinas** (11 modelos)
- **Proyectos realizados** (5 proyectos)
- **Productos** (5 productos)
- **Accesorios** (3 accesorios)

## ✨ Funcionalidades

### Navegación

- **Flechas en pantalla**: Haz clic en las flechas izquierda/derecha para navegar
- **Teclado**:
  - `←` (izquierda) - Imagen anterior
  - `→` (derecha) - Imagen siguiente
  - `Esc` - Cerrar lightbox
  - `Home` - Primera imagen
  - `End` - Última imagen
- **Gestos táctiles**: Swipe izquierda/derecha en dispositivos móviles
- **Contador**: Muestra "X / Total" para saber tu posición en la galería

### Interacción

- **Clic en la imagen miniatura**: Abre el lightbox
- **Clic en el fondo oscuro**: Cierra el lightbox
- **Botón X**: Cierra el lightbox
- **Efecto hover**: Al pasar el mouse sobre las miniaturas, se muestra un ícono de lupa 🔍

### Características Visuales

- Fondo oscuro con blur para mejor enfoque
- Animación de zoom suave al abrir
- Loading spinner mientras cargan las imágenes
- Títulos descriptivos debajo de cada imagen
- Diseño responsive para todos los dispositivos
- Bordes redondeados y sombras elegantes

### Accesibilidad

- Navegación con teclado completa
- Focus visible en todos los controles
- Atributos ARIA para lectores de pantalla
- Contraste adecuado en todos los elementos

## 📱 Responsive Design

### Desktop (> 768px)

- Controles grandes y visibles
- Imágenes hasta 80vh de altura
- Navegación óptima con mouse y teclado

### Tablet (≤ 768px)

- Controles adaptados al tamaño de pantalla
- Imágenes hasta 70vh de altura
- Soporte para gestos táctiles

### Mobile (≤ 480px)

- Controles compactos optimizados
- Tamaños de fuente reducidos para mejor lectura
- Interfaz simplificada y fácil de usar

## 🎨 Personalización

### Colores principales

- Fondo overlay: `rgba(0, 0, 0, 0.95)` con blur
- Color de acento (hover): `#007bff` (azul)
- Botón cerrar hover: `rgba(255, 0, 0, 0.7)` (rojo)

### Archivos

- **CSS**: `/assets/css/lightbox.css`
- **JavaScript**: `/assets/js/lightbox.js`

## 🚀 Ventajas

1. **Sin salir del sitio**: Las imágenes se muestran en una overlay sin navegar a otra página
2. **Navegación rápida**: Cambia entre imágenes sin cerrar el visualizador
3. **Carga optimizada**: Preload de imágenes para transiciones suaves
4. **Performance**: Código ligero y eficiente
5. **UX mejorada**: Experiencia de usuario fluida y moderna

## 🔧 Implementación Técnica

- Vanilla JavaScript (sin dependencias externas)
- CSS3 moderno con animaciones
- Event listeners optimizados
- Manejo de errores en carga de imágenes
- Preload inteligente para mejor performance

## 📊 Compatibilidad

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅
- Mobile browsers: ✅

---

**Desarrollado con ❤️ para Todo Fibra Piscinas**

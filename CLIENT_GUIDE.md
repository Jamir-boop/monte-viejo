# Guía para editar contenido de Monte Viejo

Editar solo estos dos lugares:

- `content.js`: textos, número de WhatsApp y rutas de imágenes.
- `assets/images/`: imágenes nuevas.

Al publicar, GitHub genera automáticamente el título, la descripción, los enlaces de WhatsApp y los datos para Google desde `content.js`. No duplicar esos cambios en `index.html`.

## Cambiar texto

1. Abrir `content.js` en GitHub.
2. Hacer clic en el ícono de lápiz.
3. Cambiar solo el texto que está dentro de comillas.
4. No borrar comillas, comas, corchetes ni llaves.
5. Hacer clic en `Commit changes`.

Ejemplo:

```js
title: "Monte Viejo",
```

Puede cambiar a:

```js
title: "Monte Viejo Café",
```

## Cambiar imagen

1. Abrir `assets/images/`.
2. Hacer clic en `Add file` > `Upload files`.
3. Subir imagen nueva.
4. Usar nombre simple: minúsculas, sin espacios.
5. Abrir `content.js`.
6. Cambiar ruta de imagen.
7. Hacer clic en `Commit changes`.

Ejemplo:

```js
image: "assets/images/bag-table.jpg",
```

Puede cambiar a:

```js
image: "assets/images/cafe-tostado-2026.jpg",
```

### Cambiar la imagen al compartir el enlace

La vista previa de WhatsApp y redes usa `site.socialImage` en `content.js`. Use una imagen JPEG de `1200 x 630` píxeles y cambie esta ruta:

```js
socialImage: "assets/images/share-monte-viejo-graphic.jpg",
```

Opciones incluidas:

- `assets/images/share-monte-viejo-graphic.jpg` — producto y origen; opción activa.
- `assets/images/share-monte-viejo-origin.jpg` — paisaje y producto.
- `assets/images/share-monte-viejo-family.jpg` — familia y origen.

## Reglas para imágenes

- Usar `.jpg`, `.png` o `.webp`.
- Usar nombres en minúsculas.
- Usar guiones en vez de espacios.
- Mantener imágenes debajo de 500 KB cuando sea posible.
- Imágenes de productos deben usar formato horizontal 16:9, idealmente 1600 × 900 px.
- Imagen familiar funciona mejor en formato cuadrado.

## No editar

- `index.html`
- `assets/css/styles.css`
- `assets/js/content-loader.js`

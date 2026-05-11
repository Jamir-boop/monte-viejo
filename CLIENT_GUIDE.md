# Guía para editar contenido de Monte Viejo

Editar solo estos dos lugares:

- `content.js`: textos, número de WhatsApp y rutas de imágenes.
- `assets/images/`: imágenes nuevas.

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

## Reglas para imágenes

- Usar `.jpg`, `.png` o `.webp`.
- Usar nombres en minúsculas.
- Usar guiones en vez de espacios.
- Mantener imágenes debajo de 500 KB cuando sea posible.
- Imágenes de productos funcionan mejor en formato vertical.
- Imagen familiar funciona mejor en formato cuadrado.

## No editar

- `index.html`
- `assets/css/styles.css`
- `assets/js/content-loader.js`

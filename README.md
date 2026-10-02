# Chi va là?

Pagina della caccia al tesoro con fototrappole per «Le Camelie d'autunno» a Sant'Andrea di Compito.

- `index.html`: tutta la pagina. L'indirizzo `.../#3` apre la tappa 3, quello senza `#` apre la pagina di partenza con il pulsante che scarica i video.
- `video/t1.mp4` … `video/t9.mp4`: le clip (H.264, 480-720p, 15-45 s, circa 1,4 MB l'una).

Il nome dell'animale non compare mai in questi file.

## Scheda da stampare

- `stampa/fototrappola.pdf`: 4 pagine A4 su com'è fatta una fototrappola, come scatta e cosa cambia tra giorno e notte.
- `stampa/fototrappola.html` è il sorgente (disegni in SVG, font e foto in `stampa/font` e `stampa/img`). Per rigenerare il PDF: `node stampa/build.js`.

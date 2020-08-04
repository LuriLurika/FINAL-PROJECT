**Endpoint Subjects**
|  ENDPOINT      |OPERACIÓN | PARÁMETROS DE ENTRADA |PARÁMETROS DE SALIDA|DESCRIPCIÓN|
|----------------|----------|-----------------------|--------------------|-----------|
|/subjects       |GET       |n/a            |[{name: String, id: String}] |Devuelve todas las asignaturas
|/subjects       |POST      |req.body {name: String} |[{name: String, id: String}] |Crear una asignatura y devuelve la asignatura creada
|/subjects/:id   |PUT       |req.params.id {name:String}|[{name: String, id: String}]|Modifica el nombre de la asignatura con el /:id
|/subjects/:id   |DELETE|req.params.id {name:String}|ok (http-200) TOAST | Eliminar una asignatura

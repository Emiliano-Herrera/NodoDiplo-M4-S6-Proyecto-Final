# NodoDiplo-M4-S6-Proyecto-Final
💥 Trabajo Práctico Épico y Final

---

## Estructura de Base de Datos - Proyecto Full-Stack

# BASE DE DATOS - DIPLOMATURA FULL-STACK

## 📌 Resumen de Colecciones (MongoDB)

| # | Colección | Descripción |
|---|------------|-------------|
| 1 | usuarios | Usuarios y roles (admin, editor, visitante) |
| 2 | profesores | Profesores de la diplomatura |
| 3 | modulos | Módulos de la diplomatura (4 en total) |
| 4 | temas | Temas de cada módulo |
| 5 | ejemplos | Ejemplos prácticos de cada tema |
| 6 | imagenes_ejemplos | Imágenes asociadas a ejemplos |
| 7 | videos_ejemplos | Videos asociados a ejemplos |
| 8 | recursos_ejemplos | Recursos externos (documentación, enlaces) |
| 9 | proyectos_finales | Proyectos finales de cada módulo |

---

## 1. usuarios (Roles y Autenticación)

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| nombre | String | Nombre completo |
| email | String | Email único para login |
| password | String | Hash de la contraseña (bcrypt) |
| rol | String | admin / editor / visitante |
| imagen | String | URL de la foto de perfil |
| activo | Boolean | Cuenta activa / desactivada |
| fecha_registro | Date | Fecha de registro |

### Roles

| Rol | Permisos |
|------|-----------|
| admin | CRUD completo (módulos, temas, ejemplos, profesores, usuarios) |
| editor | Puede editar contenido pero no eliminar |
| visitante | Solo lectura (ver material de estudio) |

---

## 2. profesores

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| nombre | String | Nombre completo del profesor |
| imagen | String | URL de la foto del profesor |
| biografia | String | Descripción del profesor |
| email | String | Email de contacto |
| especialidad | String | Área de especialización |
| redes_sociales | Object | { github, linkedin } |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Fecha de actualización |

---

## 3. modulos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| nombre | String | Nombre del módulo (ej: "Diseño Web") |
| descripcion | String | Descripción del módulo |
| orden | Number | 1, 2, 3, 4 (orden de la diplomatura) |
| profesor_id | ObjectId | Referencia a profesores |
| imagen_portada | String | URL de la imagen de portada |
| duracion_semanas | Number | Duración en semanas |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Fecha de actualización |

**Relaciones:**
- Un módulo pertenece a un profesor  
- Un módulo tiene muchos temas  
- Un módulo tiene un proyecto_final  

---

## 4. temas

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| modulo_id | ObjectId | Referencia a modulos |
| titulo | String | Título del tema (ej: "HTML semántico") |
| contenido | String | Contenido teórico (HTML/Markdown) |
| orden | Number | Orden dentro del módulo |
| video_url | String | URL de video introductorio (opcional) |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Fecha de actualización |

**Relaciones:**
- Un tema pertenece a un módulo  
- Un tema tiene muchos ejemplos  

---

## 5. ejemplos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| tema_id | ObjectId | Referencia a temas |
| titulo | String | Título del ejemplo |
| codigo | String | Código del ejemplo (HTML/CSS/JS) |
| explicacion | String | Explicación de qué hace el código |
| html_code | String | HTML específico para vista previa |
| css_code | String | CSS específico para vista previa |
| js_code | String | JavaScript específico para vista previa |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Fecha de actualización |

**Relaciones:**
- Un ejemplo pertenece a un tema  
- Un ejemplo tiene muchas imagenes_ejemplos  
- Un ejemplo tiene muchos videos_ejemplos  
- Un ejemplo tiene muchos recursos_ejemplos  

---

## 6. imagenes_ejemplos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| ejemplo_id | ObjectId | Referencia a ejemplos |
| url | String | URL de la imagen (Cloudinary) |
| descripcion | String | Descripción de la imagen |
| orden | Number | Orden de visualización |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Fecha de actualización |

**Relaciones:**
- Una imagen_ejemplo pertenece a un ejemplo  

---

## 7. videos_ejemplos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| ejemplo_id | ObjectId | Referencia a ejemplos |
| url | String | URL del video (YouTube, Vimeo, local) |
| titulo | String | Título del video |
| tipo | String | youtube / vimeo / local / otro |
| orden | Number | Orden de visualización |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Fecha de actualización |

**Relaciones:**
- Un video_ejemplo pertenece a un ejemplo  

---

## 8. recursos_ejemplos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| ejemplo_id | ObjectId | Referencia a ejemplos |
| url | String | URL del recurso externo |
| titulo | String | Título del recurso |
| descripcion | String | Descripción del recurso |
| tipo | String | documentacion / github / articulo / tutorial / herramienta / otro |
| orden | Number | Orden de visualización |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Fecha de actualización |

**Relaciones:**
- Un recurso_ejemplo pertenece a un ejemplo  

---

## 9. proyectos_finales

| Campo | Tipo | Descripción |
|--------|------|-------------|
| _id | ObjectId | Identificador único |
| modulo_id | ObjectId | Referencia a modulos (único por módulo) |
| titulo | String | Título del proyecto final |
| descripcion | String | Descripción del proyecto |
| requisitos | String | Requisitos técnicos y entregables |
| imagen_ejemplo | String | URL de imagen de referencia |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Fecha de actualización |

**Relaciones:**
- Un proyecto_final pertenece a un módulo  

---



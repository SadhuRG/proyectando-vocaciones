// src/data/editionsData.js
import { organizadoresDataPV1 } from './organizadoresDataPV1';
import { organizadoresDataPV2 } from './organizadoresDataPV2';
import { organizadoresDataPV3 } from './organizadoresDataPV3';

export const editionsData = [
    {
        id: 1,
        version: "1.0",
        year: 2024,
        title: "El Inicio",
        fecha: "16 de Diciembre 2022",
        description: "Proyectando Vocaciones busca orientar a los estudiantes pre universitarios de los distintos colegios y academias de la ciudad de Trujillo para que puedan escoger de manera adecuada la carrera universitaria que estudiarán. Contará con el apoyo de los integrantes de SEDIPRO UNT, quienes realizarán una feria laboral que se llevará a cabo el 18 y 19 de noviembre en las instalaciones de la Universidad Nacional de Trujillo.",
        objetivos: [
            "Dar a conocer las diferentes carreras profesionales que ofrece la Universidad Nacional de Trujillo.",
            "Ayudar a tomar una decisión informada con respecto a la carrera que elijan.",
            "Brindar motivación y ayudar a los jóvenes a despertar intereses profesionales."
        ],
        actividades: [
            {
                nombre: "Etapa 1: Apertura",
                descripcion: "Ceremonia de apertura de 20 minutos con palabras de la presidenta de Sedipro UNT y la Directora del Proyecto, además de indicaciones para el recorrido. Al finalizar, se realizará un test vocacional de 10 minutos."
            },
            {
                nombre: "Etapa 2: División de grupos",
                descripcion: "Los alumnos serán divididos en cinco grupos de 30 estudiantes. La división estará previamente definida y solo deberán ordenarse afuera del auditorio."
            },
            {
                nombre: "Etapa 3: Recorrido",
                descripcion: "El recorrido iniciará en cinco puntos de la universidad con un cronograma definido para evitar aglomeraciones. Los alumnos visitarán 12 escuelas de la UNT, donde conocerán laboratorios, equipos y experiencias de cada carrera."
            }
        ],
        estadisticas: [
            { numero: "100+", label: "Asistentes" },
            { numero: "10", label: "Carreras" },
            { numero: "10", label: "Aliados" }
        ],
        aliados: [
            { src: "/aliados/ed1/aliado1.png", nombre: "Aliado 1" },
            { src: "/aliados/ed1/aliado2.png", nombre: "Aliado 2" },
            { src: "/aliados/ed1/aliado3.png", nombre: "Aliado 3" },
            { src: "/aliados/ed1/aliado4.png", nombre: "Aliado 4" },
            { src: "/aliados/ed1/aliado5.png", nombre: "Aliado 5" }
        ],
        imagenes: [
            "/ediciones/pv3.0-one.jpg",
            "/ediciones/pv3.0-two.jpg",
            "/ediciones/pv3.0-three.jpg",
            "/ediciones/pv3.0-four.jpg",
            "/ediciones/pv3.0-five.jpg",
            "/ediciones/pv3.0-six.jpg",
            "/ediciones/pv3.0-seven.jpg",
            "/ediciones/pv3.0-eight.jpg"
        ],
        isActive: false,
        organizadores: organizadoresDataPV1
    },
    {
        id: 2,
        version: "2.0",
        year: 2025,
        title: "Crecimiento",
        fecha: "22 de Febrero del 2025",
        description: "Proyectando Vocaciones 2.0 fue un proyecto social de SEDIPRO UNT que tuvo como objetivo guiar a estudiantes preuniversitarios de colegios y academias de Trujillo en la elección informada de su futura carrera en la Universidad Nacional de Trujillo. Se llevó a cabo el 22 de febrero en las instalaciones de la UNT, donde los aspirantes realizaron un recorrido por el campus y asistieron a charlas vocacionales de tres carreras de su interés.",
        objetivos: [
            "Proporcionar información clara y actualizada sobre las diversas opciones profesionales y campos laborales.",
            "Facilitar el contacto entre estudiantes y profesionales de diferentes áreas a través de la feria vocacional.",
            "Inspirar a los estudiantes a perseguir carreras que contribuyan a su desarrollo personal y profesional."
        ],
        actividades: [
            {
                nombre: "7:30 am - 8:40 am",
                descripcion: "Programa de bienvenida. Auditorio Nicolás Copérnico."
            },
            {
                nombre: "9:00 am - 10:30 am",
                descripcion: "Recorrido por la Universidad Nacional de Trujillo."
            },
            {
                nombre: "11:00 am - 11:45 am",
                descripcion: "1ª Charla vocacional"
            },
            {
                nombre: "12:00 pm - 12:45 pm",
                descripcion: "2ª Charla vocacional"
            },
            {
                nombre: "1:00 pm - 1:45 pm",
                descripcion: "3ª Charla vocacional"
            }
        ],
        estadisticas: [
            { numero: "500+", label: "Asistentes" },
            { numero: "25", label: "Carreras" },
            { numero: "12", label: "Profesionales" }
        ],
        aliados: [
            { src: "/aliados/ed2/aliado1.png", nombre: "Aliado 1" },
            { src: "/aliados/ed2/aliado2.png", nombre: "Aliado 2" },
            { src: "/aliados/ed2/aliado3.png", nombre: "Aliado 3" },
            { src: "/aliados/ed2/aliado4.png", nombre: "Aliado 4" },
            { src: "/aliados/ed2/aliado5.png", nombre: "Aliado 5" },
            { src: "/aliados/ed2/aliado6.png", nombre: "Aliado 6" }
        ],
        imagenes: [
            "/ediciones/pv2.0-organizadores.jpg",
            "/ediciones/pv2.0-recorrido.jpg",
            "/ediciones/pv2.0-estudiantes.jpg",
            "/ediciones/pv2.0-general.jpg"
        ],
        isActive: false,
        organizadores: organizadoresDataPV2
    },
    {
        id: 3,
        version: "3.0",
        year: 2026,
        title: "Expansión Total",
        fecha: "28 de Febrero 2026",
        description: "Proyectando Vocaciones 3.0 fue un proyecto social de SEDIPRO UNT que tuvo como objetivo orientar a estudiantes preuniversitarios de Trujillo en la elección adecuada de su futura carrera en la Universidad Nacional de Trujillo. Se llevó a cabo el sábado 28 de febrero en las instalaciones de la UNT, donde los aspirantes realizaron un recorrido por la universidad, participaron en ferias vocacionales y asistieron a charlas informativas sobre 2 o 3 carreras de su interés.",
        objetivos: [
            "Ofrecer datos precisos y actuales sobre las carreras y oportunidades laborales del mercado",
            "Propiciar intercambios significativos entre estudiantes y referentes de cada sector.",
            "Alentar a los estudiantes a elegir carreras que los realicen tanto a nivel personal como profesional.",
            "Acompañar la elección universitaria de los estudiantes, alineando intereses y aptitudes con su proyección profesional."
        ],
        actividades: [
            {
                nombre: "8:30 am - 9:45 am",
                descripcion: "Recorrido por la Universidad Nacional de Trujillo."
            },
            {
                nombre: "8:50 am - 10:30 am",
                descripcion: "Feria vocacional de las carreras universitarias"
            },
            {
                nombre: "10:30 am - 11:15 am",
                descripcion: "1ª Charla vocacional"
            },
            {
                nombre: "11:45 am - 12:30 pm",
                descripcion: "2ª Charla vocacional"
            },
            {
                nombre: "1:00 pm - 1:45 pm",
                descripcion: "3ª Charla vocacional"
            }
        ],
        estadisticas: [
            { numero: "1000+", label: "Asistentes" },
            { numero: "35+", label: "Carreras" },
            { numero: "20+", label: "Profesionales" }
        ],
        aliados: [
            { src: "/aliados/ed3/aliado1.png", nombre: "Aliado 1" },
            { src: "/aliados/ed3/aliado2.png", nombre: "Aliado 2" },
            { src: "/aliados/ed3/aliado3.png", nombre: "Aliado 3" },
            { src: "/aliados/ed3/aliado4.png", nombre: "Aliado 4" },
            { src: "/aliados/ed3/aliado5.png", nombre: "Aliado 5" },
            { src: "/aliados/ed3/aliado6.png", nombre: "Aliado 6" },
            { src: "/aliados/ed3/aliado7.png", nombre: "Aliado 7" }
        ],
        imagenes: [
            "/ediciones/pv3.0-one.jpg",
            "/ediciones/pv3.0-two.jpg",
            "/ediciones/pv3.0-three.jpg",
            "/ediciones/pv3.0-four.jpg",
            "/ediciones/pv3.0-five.jpg",
            "/ediciones/pv3.0-six.jpg",
            "/ediciones/pv3.0-seven.jpg",
            "/ediciones/pv3.0-eight.jpg"
        ],
        isActive: true,
        organizadores: organizadoresDataPV3
    }
];
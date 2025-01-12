const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    
    test('Verificar ruta GET/cafes - Devuelve los cafe con al menos un objeto', async() => {
        const response = await request(server)
            .get("/cafes")
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    })

    test('se obtiene un código 404 al intentar eliminar un café con un id que no existe - 404', async() => {
        const response = await request(server)
            .get("/cafes/5")
            expect(response.statusCode).toBe(404);
    })

    test('ruta POST /cafes agrega un nuevo café y devuelve un código 201 - 201', async() => {
        const cafePrueba = {"id": 5,"nombre": "Cafe Prueba"}
        const response = await request(server)
            .post("/cafes")
            .send(cafePrueba)
            expect(response.statusCode).toBe(201);
    })

    test('ruta PUT /cafes con cafe distinto - 400', async() => {
        const cafePrueba = {"id": 3,"nombre": "Cafe Prueba"}
        const response = await request(server)
        .put("/cafes/4")
        .send(cafePrueba)
        expect(response.statusCode).toBe(400);
    })
});

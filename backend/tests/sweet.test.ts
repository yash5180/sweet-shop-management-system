import request from "supertest";
import app from "../src/app";

let adminToken = "";
let userToken = "";
let sweetId = "";

describe("Sweet & Inventory APIs", () => {
  beforeAll(async () => {
    const adminEmail = `admin_${Date.now()}@test.com`;
    const userEmail = `user_${Date.now()}@test.com`;

    // Register ADMIN
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: adminEmail,
      password: "admin123",
      role: "ADMIN",
    });

    // Register USER
    await request(app).post("/api/auth/register").send({
      name: "User",
      email: userEmail,
      password: "user123",
      role: "USER",
    });

    // Login ADMIN
    const adminRes = await request(app).post("/api/auth/login").send({
      email: adminEmail,
      password: "admin123",
    });
    adminToken = adminRes.body.token;

    // Login USER
    const userRes = await request(app).post("/api/auth/login").send({
      email: userEmail,
      password: "user123",
    });
    userToken = userRes.body.token;
  });

  it("ADMIN should create sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Sweet",
        price: 10,
        quantity: 20,
        category: "Indian",
      });

    expect(res.statusCode).toBe(201);
    sweetId = res.body._id;
  });

  it("PUBLIC should get sweets", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("USER should purchase sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(19);
  });

  it("ADMIN should restock sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(29);
  });

  it("ADMIN should delete sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});

import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  const adminEmail = `admin_${Date.now()}@test.com`;

  it("should register admin user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Admin User",
      email: adminEmail,
      password: "admin123",
      role: "ADMIN",
    });

    expect(res.statusCode).toBe(201);
  });

  it("should login admin user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: adminEmail,
      password: "admin123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

/*
 Navicat Premium Data Transfer

 Source Server         : Postgres Local
 Source Server Type    : PostgreSQL
 Source Server Version : 100012
 Source Host           : localhost:5432
 Source Catalog        : nestjs
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100012
 File Encoding         : 65001

 Date: 15/02/2022 01:56:59
*/


-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."permission";
CREATE TABLE "public"."permission" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "parent_menu" varchar COLLATE "pg_catalog"."default",
  "parent_id" varchar COLLATE "pg_catalog"."default",
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "alias" varchar COLLATE "pg_catalog"."default",
  "url" varchar COLLATE "pg_catalog"."default",
  "icon" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO "public"."permission" VALUES ('d021b8a7-bef7-493e-8940-fd305f49a90e', NULL, '2fc5ec90-e959-4c75-b393-8f5a8f02c11a', 'user-create', NULL, NULL, NULL);
INSERT INTO "public"."permission" VALUES ('74d5e4ac-fe53-4039-98ea-5c2e372e6eb0', NULL, '2fc5ec90-e959-4c75-b393-8f5a8f02c11a', 'user-edit', NULL, NULL, NULL);
INSERT INTO "public"."permission" VALUES ('0658e8d2-f6f1-4e8c-9d39-527b8a8d84bf', NULL, '2fc5ec90-e959-4c75-b393-8f5a8f02c11a', 'user-show', NULL, NULL, NULL);
INSERT INTO "public"."permission" VALUES ('a2c4376a-1790-4079-9bbd-4a4f49518246', NULL, '2fc5ec90-e959-4c75-b393-8f5a8f02c11a', 'user-delete', NULL, NULL, NULL);
INSERT INTO "public"."permission" VALUES ('b2483339-9b1f-40f5-8049-e22553af5c80', NULL, 'f0285487-b880-4cd8-a53d-fde43375dd63', 'role-create', NULL, NULL, NULL);
INSERT INTO "public"."permission" VALUES ('c878bc56-9b09-47a8-9b92-68283d1d3f08', NULL, 'f0285487-b880-4cd8-a53d-fde43375dd63', 'role-edit', NULL, NULL, NULL);
INSERT INTO "public"."permission" VALUES ('ebb8e57a-8227-4d2d-8e4c-d0b3e7756f06', NULL, 'f0285487-b880-4cd8-a53d-fde43375dd63', 'role-show', NULL, NULL, NULL);
INSERT INTO "public"."permission" VALUES ('eefb66f5-23f0-42e3-b3f7-f1dfdf6c5876', NULL, 'f0285487-b880-4cd8-a53d-fde43375dd63', 'role-delete', NULL, NULL, NULL);
INSERT INTO "public"."permission" VALUES ('f0285487-b880-4cd8-a53d-fde43375dd63', 'Administrator', NULL, 'role-index', 'Role', NULL, NULL);
INSERT INTO "public"."permission" VALUES ('2fc5ec90-e959-4c75-b393-8f5a8f02c11a', 'Administrator', NULL, 'user-index', 'User', NULL, NULL);

-- ----------------------------
-- Table structure for permission_roles_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."permission_roles_role";
CREATE TABLE "public"."permission_roles_role" (
  "permissionId" uuid NOT NULL,
  "roleId" uuid NOT NULL
)
;

-- ----------------------------
-- Table structure for refresh_token
-- ----------------------------
DROP TABLE IF EXISTS "public"."refresh_token";
CREATE TABLE "public"."refresh_token" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "isRevoked" bool NOT NULL,
  "expired_at" timestamp(6) NOT NULL,
  "user_id" uuid
)
;

-- ----------------------------
-- Records of refresh_token
-- ----------------------------
INSERT INTO "public"."refresh_token" VALUES ('996ad8c1-3b68-4caf-9e5f-ff80bbc5c1de', 'f', '2022-02-13 13:55:54.796', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('d42ab615-e80b-4ac4-94bc-d7c963cd5e89', 'f', '2022-02-13 16:17:35.957', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('88902e8f-d093-4d65-b180-f58474d2d01c', 'f', '2022-02-13 17:36:33.474', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('ec14f791-a93a-412e-973b-e88ab3cf0e29', 'f', '2022-02-13 17:38:08.637', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('4dfc2207-e529-41be-ac66-4ef457635d1e', 'f', '2022-02-13 17:41:34.866', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('eebd4908-0aa4-42f6-bbdd-52ad739e1cb8', 'f', '2022-02-13 21:38:20.998', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('44c5b3f7-9694-4e6c-8237-c5dc9219a956', 'f', '2022-02-13 23:54:40.898', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('a3ceda88-e3db-4202-8dd0-9b928a35ddce', 'f', '2022-02-14 00:47:01.501', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('800920ef-89c7-49c0-bde4-d88f86f30660', 'f', '2022-02-14 02:02:41.891', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('c652cac1-e99b-416a-a829-f02fdb37a951', 'f', '2022-02-14 02:03:31.064', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('03e3c13b-2756-43f7-8523-8db5969ebf38', 'f', '2022-02-14 19:11:33.302', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('64a6d425-30b3-4f50-86e8-12eaf18d837d', 'f', '2022-02-14 19:12:22.717', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');
INSERT INTO "public"."refresh_token" VALUES ('477611fa-e6fb-45f0-be8b-f426fd3c1c8a', 'f', '2022-02-14 23:38:44.451', '0ec24b0a-f9e1-4640-82ab-720e938aa5c2');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "deleted_at" timestamp(6)
)
;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO "public"."role" VALUES ('73d6f600-31dd-4271-8bbd-7a37e10a17e4', 'Super Admin', '2022-02-14 02:13:16.341124', '2022-02-14 19:32:21.00239', NULL);
INSERT INTO "public"."role" VALUES ('b2854135-4145-46ca-95ac-8ce48176a215', 'Admin', '2022-02-14 19:37:21.583115', '2022-02-14 19:52:08.854232', '2022-02-14 19:52:08.85');

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_permission";
CREATE TABLE "public"."role_permission" (
  "role_id" uuid NOT NULL,
  "permission_id" uuid NOT NULL
)
;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO "public"."role_permission" VALUES ('73d6f600-31dd-4271-8bbd-7a37e10a17e4', 'f0285487-b880-4cd8-a53d-fde43375dd63');
INSERT INTO "public"."role_permission" VALUES ('73d6f600-31dd-4271-8bbd-7a37e10a17e4', '2fc5ec90-e959-4c75-b393-8f5a8f02c11a');
INSERT INTO "public"."role_permission" VALUES ('73d6f600-31dd-4271-8bbd-7a37e10a17e4', 'd021b8a7-bef7-493e-8940-fd305f49a90e');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "salt" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "deleted_at" timestamp(6),
  "role_id" uuid,
  "created_by" char(36) COLLATE "pg_catalog"."default",
  "updated_by" char(36) COLLATE "pg_catalog"."default",
  "photo" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" VALUES ('0ec24b0a-f9e1-4640-82ab-720e938aa5c2', 'Hery Fidiawan', 'heryfidiawan07@gmail.com', '$2b$10$.aDvWiAHMSRdTHn3WKDxTegyXACBqSnSAnyFFCjUcxVS5LQuzuVHq', '$2b$10$.aDvWiAHMSRdTHn3WKDxTe', '2022-02-13 21:52:22.172822', '2022-02-13 21:52:22.172822', NULL, '73d6f600-31dd-4271-8bbd-7a37e10a17e4', NULL, NULL, NULL);

-- ----------------------------
-- Function structure for uuid_generate_v1
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v1mc
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1mc"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1mc"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v3
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v3"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v3'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v4"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v4"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v5
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v5"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v5'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_nil
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_nil"();
CREATE OR REPLACE FUNCTION "public"."uuid_nil"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_nil'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_dns
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_dns"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_dns"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_dns'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_oid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_oid"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_oid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_oid'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_url
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_url"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_url"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_url'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_x500
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_x500"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_x500"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_x500'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Primary Key structure for table permission
-- ----------------------------
ALTER TABLE "public"."permission" ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table permission_roles_role
-- ----------------------------
CREATE INDEX "IDX_7ec93d4fbf75b063f3ffd2646a" ON "public"."permission_roles_role" USING btree (
  "roleId" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_9f44b6228b173c7b9dfb8c6600" ON "public"."permission_roles_role" USING btree (
  "permissionId" "pg_catalog"."uuid_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table permission_roles_role
-- ----------------------------
ALTER TABLE "public"."permission_roles_role" ADD CONSTRAINT "PK_534958b0063b8ad39335d7bcfd0" PRIMARY KEY ("permissionId", "roleId");

-- ----------------------------
-- Foreign Keys structure for table permission_roles_role
-- ----------------------------
ALTER TABLE "public"."permission_roles_role" ADD CONSTRAINT "FK_7ec93d4fbf75b063f3ffd2646a5" FOREIGN KEY ("roleId") REFERENCES "public"."role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."permission_roles_role" ADD CONSTRAINT "FK_9f44b6228b173c7b9dfb8c66003" FOREIGN KEY ("permissionId") REFERENCES "public"."permission" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Primary Key structure for table refresh_token
-- ----------------------------
ALTER TABLE "public"."refresh_token" ADD CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table refresh_token
-- ----------------------------
ALTER TABLE "public"."refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Uniques structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table role_permission
-- ----------------------------
CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "public"."role_permission" USING btree (
  "role_id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "public"."role_permission" USING btree (
  "permission_id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table role_permission
-- ----------------------------
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "PK_19a94c31d4960ded0dcd0397759" PRIMARY KEY ("role_id", "permission_id");

-- ----------------------------
-- Foreign Keys structure for table role_permission
-- ----------------------------
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "public"."role" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "public"."permission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Uniques structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email");
ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_2ca4287be6514df9dc12a9d850c" UNIQUE ("photo");

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "public"."role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
